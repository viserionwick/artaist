// Essentials
import { NextResponse } from "next/server";
import createHttpError from "http-errors";
import axios from "axios";
import pLimit from "p-limit";

// Models
import { ArtRequest } from "@/models/ArtRequest";
import { ArtRequestForm } from "@/models/ArtRequestForm";
import { ArtResponse } from "@/models/ArtResponse";

// Utils
import { nextErrorReturner } from "@/utils/errorReturner";
import { publicEnv } from "@/utils/envValidate";
/* import { dummyImages } from "@/app/results/dummyImages"; */

type ProcessBulkData = {
    artRequest: ArtRequest,
    bulkAmount: ArtRequestForm["bulkAmount"]
}

export async function POST(req: Request) {
    try {
        const { artRequest, bulkAmount }: ProcessBulkData = await req.json();

        if (!artRequest) throw createHttpError(400, "Request form is required.", { headers: { from: "process_bulk", key: "required" } });
        if (!artRequest.uid || !artRequest.model || !artRequest.prompt) throw createHttpError(403, "Prompt params ('uid', 'model', 'prompt') is required.", { headers: { from: "process_bulk", key: "required" } });

        let imageData;

        if (bulkAmount > 1) { // Bulk request.
            const artRequests = Array(bulkAmount).fill(artRequest);
            let artResponses: ArtResponse[] = [];

            // Send requests in parallel.
            const limit = pLimit(1); // Disable for parallel production.
            const requests = artRequests.map((artRequest: ArtRequest) => (
                limit(() => axios.post(publicEnv.ARTAIST_API, artRequest))
            ));

            const imageResponses = await Promise.all(requests);

            imageResponses.forEach((response) => {
                const imageResponse = response.data;
                artResponses = [
                    ...artResponses,
                    {
                        ...imageResponse,
                        style: artRequest.style
                    }
                ]
            });

            return NextResponse.json(artResponses);

            // For dummy testing.
            /* await new Promise(resolve => setTimeout(resolve, 10000));
            return NextResponse.json(Array(bulkAmount).fill(dummyImages[0])); */
        } else { // Single request.
            const response = await axios.post(publicEnv.ARTAIST_API, artRequest);

            imageData = {
                ...response.data,
                style: artRequest.style
            };

            return NextResponse.json([imageData]);

            // For dummy testing.
            /* await new Promise(resolve => setTimeout(resolve, 200));
            return NextResponse.json([dummyImages[0]]); */
        }
    } catch (error: any) {
        return nextErrorReturner(error);
    }
}