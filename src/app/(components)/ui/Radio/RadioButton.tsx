import * as RadioGroup from "@radix-ui/react-radio-group";

type RadioButtonProps = {
    children: React.ReactNode;
    id: string;
    className?: string;
    value: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({ className, value, id, children }) => {
    return (
        <RadioGroup.Item
            className={`RadioGroupItem ${className}`}
            value={value}
            id={id}
        >
            <RadioGroup.Indicator className="RadioGroupIndicator" />
            <label htmlFor={id}>{children}</label>
        </RadioGroup.Item>
    );
};

export default RadioButton;
