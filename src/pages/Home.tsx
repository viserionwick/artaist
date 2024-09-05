// Hooks
import useGenerateArtForm from "../hooks/useGenerateArtForm";

// Components: UI
import * as Form from "@radix-ui/react-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Slider from "@radix-ui/react-slider";
import { useEffect } from "react";
import { artRequestFormDefault } from "../models/ArtRequestForm";

const Home: React.FC = () => {
    const { formData, setFormData, handleChange } = useGenerateArtForm();

    const addNewPromptSet = () => {
        setFormData({
            ...formData,
            prompts: [...formData.prompts, artRequestFormDefault.prompts[0]]
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Submitted: ", formData);
    };

    useEffect(() => {
        setFormData({
            ...formData,
            bulkAmount: artRequestFormDefault.bulkAmount,
            prompts: [formData.prompts[0]]
        });
    }, [formData.production]);

    return (
        <div className="p-Home">
            <Form.Root onSubmit={handleSubmit}>
                <h5>AI Model</h5>
                <Form.Field name="model" onChange={handleChange}>
                    <RadioGroup.Root className="RadioGroupRoot" name="model" defaultValue="zappy">
                        <div>
                            <RadioGroup.Item className="RadioGroupItem" value="zappy" id="model_zappy">
                                <RadioGroup.Indicator className="RadioGroupIndicator" />
                                <label htmlFor="model_zappy">Zappy</label>
                            </RadioGroup.Item>
                        </div>
                        <div>
                            <RadioGroup.Item className="RadioGroupItem" value="masterpiece" id="model_masterpiece">
                                <RadioGroup.Indicator className="RadioGroupIndicator" />
                                <label htmlFor="model_masterpiece">Masterpiece</label>
                            </RadioGroup.Item>
                        </div>
                    </RadioGroup.Root>
                </Form.Field>

                <h5>Production Type</h5>
                <Form.Field name="production" onChange={handleChange}>
                    <RadioGroup.Root className="RadioGroupRoot" name="production" defaultValue="bulk">
                        <div>
                            <RadioGroup.Item className="RadioGroupItem" value="bulk" id="production_bulk">
                                <RadioGroup.Indicator className="RadioGroupIndicator" />
                                <label htmlFor="production_bulk">Bulk Generation</label>
                            </RadioGroup.Item>
                        </div>
                        <div>
                            <RadioGroup.Item className="RadioGroupItem" value="queue" id="production_queue">
                                <RadioGroup.Indicator className="RadioGroupIndicator" />
                                <label htmlFor="production_queue">Queue Generation</label>
                            </RadioGroup.Item>
                        </div>
                    </RadioGroup.Root>
                </Form.Field>

                {
                    formData.production === "bulk" && <>
                        <h5>Number of Production</h5>
                        <Form.Field name="bulkAmount" onChange={handleChange}>
                            <Slider.Root
                                className="SliderRoot"
                                name="bulkAmount"
                                defaultValue={[artRequestFormDefault.bulkAmount]}
                                min={0}
                                max={10}
                                step={5}
                            >
                                <Slider.Track className="SliderTrack">
                                    <Slider.Range className="SliderRange" />
                                </Slider.Track>
                                <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                            </Slider.Root>
                            <div>
                                1 | 5 | 10
                            </div>
                        </Form.Field>
                    </>
                }

                <h5>Prompt Area</h5>
                <div>
                    {
                        formData.prompts.map((prompt, promptIndex) => (
                            <div key={promptIndex}>
                                {
                                    promptIndex !== 0 &&
                                    <button type="button" name="deletePrompt" onClick={(e) => handleChange(e, promptIndex)}>delete</button>
                                }
                                <Form.Field className="FormField" name={`prompt-${promptIndex}`} onChange={(e) => handleChange(e, promptIndex)}>
                                    <Form.Message className="FormMessage" match="valueMissing">
                                        Please enter a prompt.
                                    </Form.Message>
                                    <br />
                                    <Form.Control asChild>
                                        <textarea
                                            required
                                            value={prompt.prompt}
                                            className="Textarea"
                                            placeholder="A cute rabbit, white background, pastel hues, minimal illustration, line art, pen drawing"
                                        />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field className="FormField" name={`style-${promptIndex}`} onChange={(e) => handleChange(e, promptIndex)}>
                                    <Form.Control asChild>
                                        <input
                                            type="text"
                                            value={prompt.style}
                                            className="Input"
                                            placeholder="Style (Optional)"
                                        />
                                    </Form.Control>
                                </Form.Field>
                            </div>
                        ))
                    }

                </div>

                {
                    formData.production === "queue" &&
                    <button type="button" onClick={addNewPromptSet}>+Add Prompt to Queue</button>
                }
                <Form.Submit>
                    Submit
                </Form.Submit>
            </Form.Root>
        </div>
    )
}

export default Home;