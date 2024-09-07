"use client"

// Essentials
import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Contexts
import { useResultsContext } from "../(contexts)/Results";

// Models
import { artRequestDefault } from "../../models/ArtRequest";
import { ArtRequestForm } from "../../models/ArtRequestForm";
import { ArtResponse } from "../../models/ArtResponse";
import errorReturner from "@/utils/errorReturner";

// Components: UI
import Button from "../(components)/ui/Button/Button";

/* import { dummyImages } from "./dummyImages"; */

const Results: NextPage = () => {
    const { artRequestForm } = useResultsContext();
    const [images, setImages] = useState<ArtResponse[]>([]);
    const [imageSelected, setImageSelected] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        if (artRequestForm) {
            if (artRequestForm.production === "queue" || artRequestForm.production === "bulk") {
                proccessRequest(artRequestForm);
            }
        }
    }, [artRequestForm]);

    useEffect(() => {
        if (images.length) {
            setImageSelected(images[0])
        }
    }, [images]);

    const proccessRequest = async (artRequestForm: ArtRequestForm) => {
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
                        style: prompt.style,
                        loading: true
                    }
                ]
            });
            setImages(newImages);

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

                        responseData?.length && setImages(responseData);
                    }
                }
            }
        } catch (originalError) {
            const error = errorReturner(originalError);
            console.error("Something went wrong:", error);
        }
    }
    return (
        <div className="p-Results">
            <div >
                {
                    images.length && (
                        <div className="p-Results__images">
                            {
                                images.map((image: any, index: any) => (
                                    image.loading ?
                                        <div key={index} className="p-Results__image loading" />
                                        :
                                        <div key={index} className="p-Results__image"
                                            onClick={() => setImageSelected(image)}>
                                            <img src={`data:image/jpeg;base64,${image.b64}`} />
                                        </div>
                                ))
                            }
                        </div>
                    )
                }

                <div className="p-Results__details">
                    <div className="wrapper">
                        <h1 className="headline">Prompt</h1>
                        <div className="text">
                            {imageSelected?.prompt}
                        </div>
                    </div>
                    <div className="wrapper">
                        <h1 className="headline">Style</h1>
                        <div className="text">
                            {imageSelected?.style}
                        </div>
                    </div>
                </div>
            </div>

            <Button onClick={() => (router.push("/"))} className="main">Close</Button>
        </div>
    )
}

export default Results;