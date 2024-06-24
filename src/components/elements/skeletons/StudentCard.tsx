import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function StudentCardSkeleton() {
    return (
        <AspectRatio ratio={11 / 16}>
            <div className="skeleton rounded-lg w-full h-full"></div>
        </AspectRatio>
    );
}
