import * as Form from "@radix-ui/react-form";
import * as RadioGroup from "@radix-ui/react-radio-group";

type RadioButtonsProps = {
    children: React.ReactNode;
    className?: string;
    name: string;
    defaultValue: string;
    onChange: (e?: any) => void;
};

const RadioButtons: React.FC<RadioButtonsProps> = ({ children, className, name, defaultValue, onChange }) => {
    return (
        <Form.Field name={name} onChange={onChange}>
            <RadioGroup.Root
                className={`RadioGroupRoot ${className}`}
                name={name}
                defaultValue={defaultValue}
            >
                {children}
            </RadioGroup.Root>
        </Form.Field>

    );
};

export default RadioButtons;