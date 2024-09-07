import { ArtRequest } from "./ArtRequest";

export interface ArtRequestForm {
    model: ArtRequest["model"];
    production: "bulk" | "queue";
    bulkAmount: number;
    prompts: {
        prompt: ArtRequest["prompt"];
        style: ArtRequest["style"];
    }[];
}

export const artRequestFormDefault: ArtRequestForm = {
    model: "zappy",
    production: "bulk",
    bulkAmount: 5,
    prompts: [
        {
            prompt: "",
            style: "",
        }
    ],
}