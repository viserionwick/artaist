// Essentials
import { NextResponse } from "next/server";
import axios from "axios";
import createHttpError from "http-errors";

// Models
import { ArtRequest } from "@/models/ArtRequest";
import { ArtResponse } from "@/models/ArtResponse";

// Utils
import { nextErrorReturner } from "@/utils/errorReturner";
import { publicEnv } from "@/utils/envValidate";
/* import { dummyImages } from "../../results/dummyImages"; */

export async function POST(req: Request) {
    try {
        const { artRequest }: { artRequest: ArtRequest } = await req.json();

        if (!artRequest) throw createHttpError(400, "Request form is required.", { headers: { from: "process_queue", key: "required" } });
        if (!artRequest.uid || !artRequest.model || !artRequest.prompt) throw createHttpError(403, "Prompt params ('uid', 'model', 'prompt') is required.", { headers: { from: "process_queue", key: "required" } });

        const imageResponse = await axios.post(publicEnv.ARTAIST_API!, artRequest);
        const imageData: ArtResponse = imageResponse.data;

        // For dummy testing.
        /* await new Promise(resolve => setTimeout(resolve, 200));
        const imageData = dummyImages[0]; */

        return NextResponse.json(imageData);
    } catch (error: any) {
        return nextErrorReturner(error);
    }
}