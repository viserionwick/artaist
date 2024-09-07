import { publicEnv } from "@/utils/envValidate";

export interface ArtRequest {
    uid: string;
    prompt: string;
    style: string;
    model: "zappy" | "masterpiece";
}

export const artRequestDefault: ArtRequest = {
    uid: publicEnv.UID!,
    prompt: "",
    style: "",
    model: "zappy"
}