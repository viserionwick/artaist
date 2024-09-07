type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    name?: string;
    onClick?: (e?: any) => void;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, className, type = "button", name, onClick = undefined, disabled }) => {
    return (
        <button
            type={type}
            name={name}
            className={`Button ${className ? className : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;