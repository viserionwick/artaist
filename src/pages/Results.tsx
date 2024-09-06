// Essentials
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Contexts
import { useResultsContext } from "../context/Results";

// Models
import { ArtRequest, artRequestDefault } from "../models/ArtRequest";
import { ArtRequestForm } from "../models/ArtRequestForm";
import { ArtResponse } from "../models/ArtResponse";
import { dummyImages } from "./dummyImages";

const Results: React.FC = () => {
    const goTo = useNavigate();
    const { artRequestForm } = useResultsContext();
    const [images, setImages] = useState<ArtResponse[]>([]);

    useEffect(() => {
        if (artRequestForm) {
            if (artRequestForm.production === "queue") {
                proccessQueue(artRequestForm);
            } /* else if (artRequestForm.production === "bulk") {
                proccessBulk(artRequestForm);
            } */
        } else goTo("/");
    }, [artRequestForm, goTo]);

    useEffect(() => {
        console.log("images: ", images);
    }, [images]);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const proccessQueue = async (artRequestForm: ArtRequestForm) => {
        const formPrompts = artRequestForm.prompts;

        // Set the loading state for images (showing that processing has started)
        formPrompts.forEach(prompt => {
            setImages(prevImages => [
                ...prevImages,
                {
                    prompt: prompt.prompt,
                    loading: true
                }
            ]);
        });

        // Create an array of promises to process all prompts in parallel
        const promises = formPrompts.map(async (prompt, i) => {
            const imageRequest = {
                uid: artRequestDefault.uid,
                prompt: prompt.prompt,
                style: prompt.style,
                model: artRequestForm.model
            };

            // Simulate delay to mimic API request timing
            await delay(1000);

            // Simulated API response (replace with actual API request)
            /* const imageResponse = await axios.post("https://api.artaistapp.com/generate/v2", imageRequest); */
            const imageResponse = {
                data: dummyImages[0]
            };

            const imageData: ArtResponse = imageResponse.data;

            // Update the image state, replacing the loading item with the actual image
            setImages(prevImages => {
                const image = {
                    ...imageData,
                    prompt: prompt.prompt,
                    style: prompt.style
                };

                // Replace the loading item at index `i` with the completed image
                return prevImages.map((loadingImage, imageIndex) =>
                    imageIndex === i ? image : loadingImage
                );
            });
        });

        // Wait for all the prompts to be processed in parallel
        try {
            await Promise.all(promises);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Request failed with status:", error.response?.status);
                console.error("Error data:", error.response?.data);
                console.error("Error message:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };



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