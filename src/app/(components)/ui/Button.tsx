type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    name?: string;
    onClick: (e?: any) => void;
};

const Button: React.FC<ButtonProps> = ({ children, className, type = "button", name, onClick }) => {
    return (
        <button
            type={type}
            name={name}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;