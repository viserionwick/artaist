// Essentials
import { useState } from "react";

// Models
import { ArtRequestForm, artRequestFormDefault } from "../../models/ArtRequestForm";

type UseArtRequestForm = () => {
    handleChange: (e: React.ChangeEvent<any>, promptIndex?: number) => void;
    formData: ArtRequestForm;
    setFormData: React.Dispatch<React.SetStateAction<ArtRequestForm>>;
};

const useArtRequestForm: UseArtRequestForm = () => {
    const [formData, setFormData] = useState<ArtRequestForm>(artRequestFormDefault);

    const handleChange = (e: any, promptIndex: number = 0) => {
        let { name } = e.target;
        const { value } = e.target;
        /* const promptInputRegex = /^[A-Za-z\s]+$/; */ // Enables letters only input.

        if (name.startsWith("prompt")) {
            name = "prompt"
        } else if (name.startsWith("style")) {
            name = "style"
        }

        switch (name) {
            case "bulkAmount":
                setFormData({
                    ...formData,
                    bulkAmount: Number(value)
                });
                break;

            case "prompt":
            case "style":
                /* (value === "" || promptInputRegex.test(value)) && */ // Enables letters only input.
                setFormData({
                    ...formData,
                    prompts: formData.prompts.map((prompt, index) =>
                        index === promptIndex
                            ? { ...prompt, [name]: value }
                            : prompt
                    ),
                });
                break;

            case "deletePrompt":
                setFormData({
                    ...formData,
                    prompts: formData.prompts.filter((_, index) => index !== promptIndex)
                });
                break;

            default:
                setFormData({
                    ...formData,
                    [name]: value
                });
                break;
        }
    };

    return {
        handleChange,
        formData, setFormData,
    }
}

export default useArtRequestForm;