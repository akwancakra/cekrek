import ChildCard from "@/components/elements/cards/ChildCard";

export default function Template({}) {
    return (
        <div className="w-full min-h-svh flex justify-center items-center">
            <div className="max-w-4xl w-full mx-auto h-full mt-3 grid grid-cols-2 gap-2">
                <ChildCard />
                <ChildCard />
            </div>
        </div>
    );
}
