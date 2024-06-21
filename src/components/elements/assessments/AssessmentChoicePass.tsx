import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AssessmentChoicePass() {
    return (
        <section className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
            <Select>
                <SelectTrigger className="w-fit min-w-24">
                    <SelectValue placeholder="Pilih Nomor" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light" defaultChecked>
                        Soal 1 - 1
                    </SelectItem>
                    <SelectItem value="dark">Soal 1 - 2</SelectItem>
                    <SelectItem value="system">Soal 2 - 1</SelectItem>
                </SelectContent>
            </Select>
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
                        Lulus
                    </Button>
                    <Button variant={"outline"}>
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            close
                        </span>{" "}
                        Gagal
                    </Button>
                </div>
            </div>
        </section>
    );
}
