type AlertProps = {
    icon?: string;
    text: string;
    desc?: string;
    textPosition?: "left" | "right";
    type?: "primary" | "primaryDark" | "secondary" | "error" | "warning";
    classnew?: string;
};

export default function Alert({
    icon = "info",
    text,
    desc,
    textPosition = "left",
    type = "primary",
    classnew,
}: AlertProps) {
    const typeList = {
        primary: "bg-primary text-white",
        primaryDark: "border border-purple-300 bg-purple-900 text-white",
        secondary: "bg-gray-300 text-black",
        error: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-black",
    };

    return (
        <div
            role="alert"
            className={`alert rounded-lg px-4 py-3 ${
                textPosition == "left"
                    ? "flex gap-2 justify-between items-center"
                    : ""
            } ${classnew} ${typeList[type]}`}
        >
            {textPosition == "right" && (
                <span className="material-symbols-outlined !leading-none text-xl">
                    {icon}
                </span>
            )}
            {/* TEXT GOES HERE */}
            <div>
                <p className="text-medium tracking-tighter font-semibold">
                    {text}
                </p>
                {desc && <p className="text-small">{desc}</p>}
            </div>
            {/* TEXT GOES HERE */}
            {textPosition == "left" && (
                <span className="material-symbols-outlined !leading-none text-xl">
                    {icon}
                </span>
            )}
        </div>
    );
}
