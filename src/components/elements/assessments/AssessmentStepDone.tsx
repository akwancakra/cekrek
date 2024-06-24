import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AssessmentStepDone() {
    return (
        <section className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
            <div className="border border-gray-300 rounded-lg p-2 text-center">
                <div className="w-full bg-gray-400 rounded-lg">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={"/static/images/default.jpg"}
                            alt="Recomendation Image"
                            fill={true}
                            className="rounded-lg object-cover"
                            draggable={false}
                        />
                    </AspectRatio>
                </div>
                <p className="my-3 text-small">
                    Jika anda menunjuk sesuatu di ruangan, apakah $namaAnak
                    melihatnya
                </p>
                <p className="text-large tracking-tight font-semibold">
                    Lulus Soal 1
                </p>
            </div>

            <div className="flex justify-end w-full mt-2">
                <Button variant={"outline"}>
                    <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                        check
                    </span>{" "}
                    Next
                </Button>
            </div>
        </section>
    );
}
