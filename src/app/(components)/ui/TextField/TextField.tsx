import * as Form from "@radix-ui/react-form";

type TextFieldProps = {
    className?: string;
    name: string;
    required?: boolean;
    placeholder: string;
    valueMissing?: string;
    value: string;
    onChange: (e?: any) => void;
};

const TextField: React.FC<TextFieldProps> = ({ className, name, required, placeholder, valueMissing, value, onChange }) => {
    return (
        <Form.Field className="FormField" name={name} onChange={onChange}>
            {
                valueMissing && <>
                    <Form.Message className="FormMessage" match="valueMissing">
                        {valueMissing}
                    </Form.Message>
                    <br />
                </>
            }
            <Form.Control asChild>
                <input
                    required={required}
                    value={value}
                    className={`Textfield ${className ? className : ""}`}
                    placeholder={placeholder}
                />
            </Form.Control>
        </Form.Field>
    );
};

export default TextField;