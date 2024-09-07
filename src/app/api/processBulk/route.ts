// Essentials
import { NextResponse } from "next/server";
import axios from "axios";
import pLimit from "p-limit";

// Models
import { ArtRequest } from "@/models/ArtRequest";
import { ArtRequestForm } from "@/models/ArtRequestForm";
import { ArtResponse } from "@/models/ArtResponse";
import { dummyImages } from "@/app/results/dummyImages";

interface ProcessBulk {
    artRequest: ArtRequest,
    bulkAmount: ArtRequestForm["bulkAmount"]
}

export async function POST(request: Request) {
    try {
        const { artRequest, bulkAmount }: ProcessBulk = await request.json();

        if (!artRequest) return NextResponse.json({ error: "Request form is required." }, { status: 400 });
        if (!artRequest.uid) return NextResponse.json({ error: "Prompt uid is required." }, { status: 403 });
        if (!artRequest.model) return NextResponse.json({ error: "Prompt model is required." }, { status: 403 });
        if (!artRequest.prompt) return NextResponse.json({ error: "Prompt text is required." }, { status: 403 });

        let imageData;

        if (bulkAmount > 1) { // Bulk request.
            /* const artRequests = Array(bulkAmount).fill(artRequest);
            let artResponses: ArtResponse[] = [];

            // Send requests in parallel.
            const limit = pLimit(1); // Disable for parallel production.
            const requests = artRequests.map((artRequest: ArtRequest) =>
                limit(() => axios.post("https://api.artaistapp.com/generate/v2", artRequest))
            );

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
    } catch (error) {
        return NextResponse.json(error);
    }
}
