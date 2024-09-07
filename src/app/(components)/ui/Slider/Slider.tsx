// Essentials
import * as Form from "@radix-ui/react-form";
import * as RadixSlider from "@radix-ui/react-slider";

type SliderProps = {
    className?: string;
    min: number;
    max: number;
    step: number;
    name: string;
    defaultValue: number[];
    onChange: (e?: any) => void;
}

const Slider: React.FC<SliderProps> = ({ className, name, defaultValue, onChange, min, max, step }) => {
    return (
        <Form.Field name={name} onChange={onChange}>
            <RadixSlider.Root
                className={`SliderRoot ${className ? className : ""}`}
                name={name}
                defaultValue={defaultValue}
                min={min}
                max={max}
                step={step}
            >
                <RadixSlider.Track className="SliderTrack">
                    <RadixSlider.Range className="SliderRange" />
                </RadixSlider.Track>
                <RadixSlider.Thumb className="SliderThumb" aria-label="Volume" />
            </RadixSlider.Root>
        </Form.Field>
    )
}

export default Slider;