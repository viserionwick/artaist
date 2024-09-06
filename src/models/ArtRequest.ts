export interface ArtRequest {
    uid: string;
    prompt: string;
    style: string;
    model: "zappy" | "masterpiece";
}

export const artRequestDefault: ArtRequest = {
    uid: "sinanpolat",
    prompt: "",
    style: "",
    model: "zappy"
}