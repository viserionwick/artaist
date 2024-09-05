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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("Submitted: ", formData);
    };
    useEffect(() => {
        if (formData.production) {
            setFormData({
                ...formData,
                bulkAmount: artRequestFormDefault.bulkAmount
            });
        }
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
                    <Form.Field className="FormField" name="prompt" onChange={(e) => handleChange(e, 0)}>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter a prompt.
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <textarea
                                required
                                value={formData.prompts[0].prompt}
                                className="Textarea"
                                placeholder="A cute rabbit, white background, pastel hues, minimal illustration, line art, pen drawing"
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="FormField" name="style" onChange={(e) => handleChange(e, 0)}>
                        <Form.Control asChild>
                            <input
                                type="text"
                                value={formData.prompts[0].style}
                                className="Input"
                                pattern="[A-Za-z\s]+$"
                                placeholder="Style (Optional)"
                            />
                        </Form.Control>
                    </Form.Field>
                </div>

                {
                    formData.production === "queue" &&
                    <button>+Add Prompt to Queue</button>
                }

                <Form.Submit>
                    Submit
                </Form.Submit>
            </Form.Root>
        </div>
    )
}

export default Home;