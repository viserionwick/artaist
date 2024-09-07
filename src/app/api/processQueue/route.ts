// Essentials
import { NextResponse } from "next/server";
import axios from "axios";
import createHttpError from "http-errors";
import { dummyImages } from "../../results/dummyImages";

// Models
import { ArtRequest } from "@/models/ArtRequest";
import { ArtResponse } from "@/models/ArtResponse";
import { nextErrorReturner } from "@/utils/errorReturner";

export async function POST(request: Request) {
    try {
        const { artRequest }: { artRequest: ArtRequest } = await request.json();

        /* if (!artRequest) throw createHttpError(400, "Request form is required.", { headers: { from: "process_queue", key: "required" } });
        if (!artRequest.uid) throw createHttpError(403, "Prompt uid is required.", { headers: { from: "process_queue", key: "required" } });
        if (!artRequest.model) throw createHttpError(403, "Prompt model is required.", { headers: { from: "process_queue", key: "required" } });
        if (!artRequest.prompt) throw createHttpError(403, "Prompt text is required.", { headers: { from: "process_queue", key: "required" } });

        const imageResponse = await axios.post("https://api.artaistapp.com/generate/v2", artRequest);
        const imageData: ArtResponse = imageResponse.data; */
        await new Promise(resolve => setTimeout(resolve, 200));
        const imageData = dummyImages[0];

        return NextResponse.json(imageData);
    } catch (error: any) {
        return nextErrorReturner(error);
    }
}
