"use client"

// Essentials
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

// Contexts
import { useResultsContext } from "../(contexts)/Results";

// Models
import { artRequestDefault } from "../../models/ArtRequest";
import { ArtRequestForm } from "../../models/ArtRequestForm";
import { ArtResponse } from "../../models/ArtResponse";

import { dummyImages } from "./dummyImages";

const Results: React.FC = () => {
    const { artRequestForm } = useResultsContext();
    const [images, setImages] = useState<ArtResponse[]>([]);

    useEffect(() => {
        if (artRequestForm) {
            document.cookie = "artRequestForm=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            if (artRequestForm.production === "queue" || artRequestForm.production === "bulk") {
                proccessRequest(artRequestForm);
            }
        }
    }, [artRequestForm]);

    useEffect(() => {
        console.log("images: ", images);
    }, [images]);

    const proccessRequest = async (artRequestForm: ArtRequestForm) => {
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

            console.log("newImages: ", newImages);


            // Populate the images state with data.
            for (let i = 0; i < formPrompts.length; i++) {
                const promptSet = formPrompts[i];
                if (promptSet.prompt) {
                    const artRequest = {
                        uid: artRequestDefault.uid,
                        prompt: promptSet.prompt,
                        style: promptSet.style,
                        model: artRequestForm.model
                    }

                    if (artRequestForm.production === "queue") {
                        const response = await axios.post("/api/processQueue", { artRequest });
                        const responseData: ArtResponse = response.data;
                        // console.log(responseData); 

                        // Set images in order.
                        responseData && setImages(prevImages => {
                            const image = {
                                ...responseData,
                                prompt: promptSet.prompt,
                                style: promptSet.style
                            }

                            // Replace the loading item with image.
                            return prevImages.map(
                                (loading, imageIndex) => (
                                    imageIndex === i
                                        ? image
                                        : loading
                                ));
                        })
                    } else if (artRequestForm.production === "bulk") {

                        // Set bulk loading state.
                        if (artRequestForm.bulkAmount > 1) {
                            newImages = Array(artRequestForm.bulkAmount).fill({
                                prompt: artRequestForm.prompts[0].prompt,
                                loading: true
                            });
                            setImages(newImages);
                        }

                        const response = await axios.post("/api/processBulk", { artRequest, bulkAmount: artRequestForm.bulkAmount });
                        const responseData: ArtResponse[] = response.data;

                        if (responseData?.length) setImages(responseData);
                    }


                }
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }

    }


    return (
        <div className="p-Results">
            Results
            {
                images.map((image, imageIndex) => (
                    image.loading
                        ? <div key={imageIndex}>loading {imageIndex}</div>
                        : <div key={imageIndex}>{image.prompt} | <img src={`data:image/jpeg;base64,${image.b64}`} /> | {imageIndex}</div>

                ))
            }
        </div>
    )
}

export default Results;