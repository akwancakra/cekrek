type AlertProps = {
    icon?: string;
    text: string;
    textPosition?: "left" | "right";
    type?: "primary" | "secondary" | "error" | "warning";
    classnew?: string;
};

export default function Pill({
    icon = "info",
    text,
    textPosition = "left",
    type = "primary",
    classnew,
}: AlertProps) {
    const typeList = {
        primary: "border border-purple-600 bg-purple-200 text-purple-600",
        secondary: "border border-gray-600 bg-gray-200 text-gray-600",
        error: "border border-red-600 bg-red-200 text-red-600",
        warning: "border border-yellow-600 bg-yellow-200 text-yellow-600",
    };

    return (
        <div
            className={`flex justify-center items-center gap-2 border rounded-full h-fit text-xs sm:text-sm min-h-0 px-3 py-1 ${classnew} ${typeList[type]}`}
        >
            {textPosition == "right" && (
                <span className="material-symbols-outlined !text-lg !leading-none min-h-0">
                    {icon}
                </span>
            )}
            {/* TEXT GOES HERE */}
            <p className="text-small !leading-none min-h-0">{text}</p>
            {/* TEXT GOES HERE */}
            {textPosition == "left" && (
                <span className="material-symbols-outlined !text-lg !leading-none min-h-0">
                    {icon}
                </span>
            )}
        </div>
    );
}
