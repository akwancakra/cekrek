import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

export default function AssessmentChoice() {
    return (
        <section className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
            <div className="badge badge-outline badge-neutral">1/20</div>
            <p className="text-gray-500 text-center text-small">
                Expression when getting advice from parents or teachers
            </p>
            <div className="bg-gray-400 rounded-lg w-full">
                <AspectRatio ratio={16 / 9}>
                    <p>Test</p>
                </AspectRatio>
            </div>
            <div className="w-full">
                <p className="font-medium text-small mb-1">Jawaban</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant={"outline"}>
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            check
                        </span>{" "}
                        Ya
                    </Button>
                    <Button variant={"outline"}>
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            close
                        </span>{" "}
                        Tidak
                    </Button>
                </div>
            </div>
        </section>
    );
}
