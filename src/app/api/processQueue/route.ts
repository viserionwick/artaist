// Essentials
import { NextResponse } from "next/server";
import axios from "axios";
import { dummyImages } from "../../results/dummyImages";

// Models
import { ArtRequest } from "@/models/ArtRequest";
import { ArtResponse } from "@/models/ArtResponse";

export async function POST(request: Request) {
    try {
        /* const { artRequest }: { artRequest: ArtRequest } = await request.json();

        if (!artRequest) return NextResponse.json({ error: "Request form is required." }, { status: 400 });
        if (!artRequest.uid) return NextResponse.json({ error: "Prompt uid is required." }, { status: 403 });
        if (!artRequest.model) return NextResponse.json({ error: "Prompt model is required." }, { status: 403 });
        if (!artRequest.prompt) return NextResponse.json({ error: "Prompt text is required." }, { status: 403 });

        const imageResponse = await axios.post("https://api.artaistapp.com/generate/v2", artRequest);
        const imageData: ArtResponse = imageResponse.data; */
        await new Promise(resolve => setTimeout(resolve, 200));
        const imageData = dummyImages[0];

        return NextResponse.json(imageData);
    } catch (error) {
        return NextResponse.json(error);
    }
}
