// Essentials
import { useState } from "react";

// Models
import { ArtRequestForm, artRequestFormDefault } from "../models/ArtRequestForm";

const useGenerateArtForm = () => {
    const [formData, setFormData] = useState<ArtRequestForm>(artRequestFormDefault);

    const handleChange = (e: any, promptIndex: number = 0) => {
        const { name, value } = e.target;
        console.log(name, ": ", value);


        switch (name) {
            case "bulkAmount":
                setFormData({
                    ...formData,
                    bulkAmount: Number(value)
                });
                break;

            /* case "prompt":
                const promptKey = formData.prompts[promptIndex].prompt;
                setFormData({
                    ...formData,
                    [promptKey]: value
                });
                break; */

            default:
                setFormData({
                    ...formData,
                    [name]: value
                });
                break;
        }

    };

    return {
        // Funcs
        handleChange,

        // States
        formData, setFormData,
    }
}

export default useGenerateArtForm