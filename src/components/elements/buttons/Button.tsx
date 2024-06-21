type ButtonProps = {
    icon?: string;
    classnew?: string;
    text?: string;
    textPosition?: "left" | "right";
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
    type?: "primary" | "secondary" | "error" | "ghost";
    disabled?: boolean;
    buttonType?: "button" | "submit";
};

const Button = ({
    icon,
    text,
    textPosition = "left",
    onClick = () => {},
    size = "md",
    type = "primary",
    classnew,
    disabled = false,
    buttonType = "button",
}: ButtonProps) => {
    const sizeList = {
        sm: "w-6 h-6 sm:h-8 sm:w-8",
        md: "w-8 h-8 sm:h-10 sm:w-10",
        lg: "w-10 h-10 sm:h-12 sm:w-12",
    };

    const typeList = {
        primary: "btn-primary text-white",
        secondary: "btn-secondary",
        error: "btn-error text-white",
        ghost: "btn-ghost border-gray-300",
    };

    return (
        <button
            type={buttonType}
            className={`btn ${classnew} ${!text && sizeList[size]} ${
                typeList[type]
            } px-3 py-2 flex justify-center items-center transition-colors duration-200 ease-in-out cursor-pointer pointer-events-auto text-sm h-fit min-h-fit`}
            onClick={onClick}
            disabled={disabled}
        >
            {text && textPosition == "left" && text + " "}
            {icon && (
                <i className="material-symbols-outlined pointer-events-none !text-xl !leading-none">
                    {icon}
                </i>
            )}
            {text && textPosition == "right" && " " + text}
        </button>
    );
};

export default Button;
