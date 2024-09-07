// Essentials
import { NextResponse } from "next/server";
import createHttpError from "http-errors";
import axios from "axios";
import pLimit from "p-limit";

// Models
import { ArtRequest } from "@/models/ArtRequest";
import { ArtRequestForm } from "@/models/ArtRequestForm";
import { ArtResponse } from "@/models/ArtResponse";
import { dummyImages } from "@/app/results/dummyImages";
import { nextErrorReturner } from "@/utils/errorReturner";

type ProcessBulkData = {
    artRequest: ArtRequest,
    bulkAmount: ArtRequestForm["bulkAmount"]
}

export const POST = async (req: Request) => {
    try {
        const { artRequest, bulkAmount }: ProcessBulkData = await req.json();

        if (!artRequest) throw createHttpError(400, "Request form is required.", { headers: { from: "process_bulk", key: "required" } });
        if (!artRequest.uid) throw createHttpError(403, "Prompt uid is required.", { headers: { from: "process_bulk", key: "required" } });
        if (!artRequest.model) throw createHttpError(403, "Prompt model is required.", { headers: { from: "process_bulk", key: "required" } });
        if (!artRequest.prompt) throw createHttpError(403, "Prompt text is required.", { headers: { from: "process_bulk", key: "required" } });

        let imageData;

        if (bulkAmount > 1) { // Bulk request.
            /* const artRequests = Array(bulkAmount).fill(artRequest);
            let artResponses: ArtResponse[] = [];

            // Send requests in parallel.
            const limit = pLimit(1); // Disable for parallel production.
            const requests = artRequests.map((artRequest: ArtRequest) => (
                limit(() => axios.post("https://api.artaistapp.com/generate/v2", artRequest))
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

            return NextResponse.json(artResponses); */

            await new Promise(resolve => setTimeout(resolve, 200));
            return NextResponse.json(dummyImages);
        } else { // Single request.
            /* const response = await axios.post("https://api.artaistapp.com/generate/v2", artRequest);

            imageData = {
                ...response.data,
                style: artRequest.style
            };

            console.log("SINGLE WHATDA HEEELL: ", imageData); 
            return NextResponse.json([imageData]); */
            await new Promise(resolve => setTimeout(resolve, 200));
            return NextResponse.json([dummyImages[0]]);
        }
    } catch (error: any) {
        return nextErrorReturner(error);
    }
}