"use client"

// Essentials
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Contexts
import { useResultsContext } from "../(contexts)/Results";

// Models
import { ArtRequest, artRequestDefault } from "../../models/ArtRequest";
import { ArtRequestForm } from "../../models/ArtRequestForm";
import { ArtResponse } from "../../models/ArtResponse";

import { dummyImages } from "./dummyImages";

const Results: React.FC = () => {
    const router = useRouter();
    const { artRequestForm } = useResultsContext();
    const [images, setImages] = useState<ArtResponse[]>([]);

    useEffect(() => {
        if (artRequestForm) {
            if (artRequestForm.production === "queue") {
                proccessQueue(artRequestForm);
            }
        } else router.push("/");
    }, [artRequestForm]);

    useEffect(() => {
        console.log("images: ", images);
    }, [images]);

    /* const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); */
    const proccessQueue = async (artRequestForm: ArtRequestForm) => {
        document.cookie = "artRequestForm=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        const formPrompts = artRequestForm.prompts;

        // Populate the images state with prompt results.
        try {

            // Set the loading state for images.
            let newImages = images;
            formPrompts.forEach(prompt => {
                newImages = [
                    ...newImages,
                    {
                        prompt: prompt.prompt,
                        loading: true
                    }
                ]
            });

            setImages(newImages);

            // Send request to backend to process the queue.
            /* const response = await axios.post("/api/processQueue", { artRequestForm });
            const imageResponses: ArtResponse[] = response.data;

            console.log(imageResponses); */

            // Update images state with backend response.
            /* setImages(imageResponses); */

            // Populate the images state with data.
            for (let i = 0; i < formPrompts.length; i++) {
                const prompt = formPrompts[i];
                const imageRequest = {
                    uid: artRequestDefault.uid,
                    prompt: prompt.prompt,
                    style: prompt.style,
                    model: artRequestForm.model
                }

                const response = await axios.post("/api/processQueue", { imageRequest });
                const imageData: ArtResponse[] = response.data.data;

                console.log("imageData: " ,imageData);
                // Send post request in queue.
                // const imageResponse = await axios.post("https://api.artaistapp.com/generate/v2", imageRequest);
                /* await delay(1000);
                const imageResponse = {
                    data: dummyImages[0]
                }

                const imageData: ArtResponse = imageResponse.data; */

                // Set images in order.
                setImages(prevImages => {
                    const image = {
                        ...imageData,
                        prompt: prompt.prompt,
                        style: prompt.style
                    }

                    // Replace the loading item with image.
                    return prevImages.map(
                        (loading, imageIndex) => (
                            imageIndex === i
                                ? image
                                : loading
                        ));
                })

            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Request failed with status:", error.response?.status);
                console.error("Error data:", error.response?.data);
                console.error("Error message:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }

    }



    return (
        <div className="p-Results">
            Results
            {
                images.map((image, imageIndex) => (
                    image.loading
                        ? <div key={imageIndex}>loading {imageIndex}</div>
                        : <div key={imageIndex}>{image.prompt} | {image.id} | {imageIndex}</div>

                ))
            }
        </div>
    )
}

export default Results;