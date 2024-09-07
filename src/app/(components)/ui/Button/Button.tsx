type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    name?: string;
    onClick?: (e?: any) => void;
};

const Button: React.FC<ButtonProps> = ({ children, className, type = "button", name, onClick = undefined }) => {
    return (
        <button
            type={type}
            name={name}
            className={`Button ${className ? className : ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;