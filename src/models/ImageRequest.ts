export interface ImageRequest {
    uid: string,
    prompt: string,
    style: string,
    model: "zappy" | "masterpiece"
}