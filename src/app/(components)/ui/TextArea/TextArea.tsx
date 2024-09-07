import * as Form from "@radix-ui/react-form";

type TextAreaProps = {
    className?: string;
    name: string;
    required?: boolean;
    placeholder: string;
    valueMissing?: string;
    value: string;
    onChange: (e?: any) => void;
};

const TextArea: React.FC<TextAreaProps> = ({ className, name, required, placeholder, valueMissing, value, onChange }) => {
    return (
        <Form.Field className="FormField" name={name} onChange={onChange}>
            {
                valueMissing && <>
                    <Form.Message className="Textarea FormMessage" match="valueMissing">
                        {valueMissing}
                    </Form.Message>
                </>
            }
            <Form.Control asChild>
                <textarea
                    required={required}
                    value={value}
                    className={`Textarea ${className ? className : ""}`}
                    placeholder={placeholder}
                />
            </Form.Control>
        </Form.Field>
    );
};

export default TextArea;