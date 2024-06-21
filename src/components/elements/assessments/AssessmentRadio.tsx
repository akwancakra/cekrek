import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AssessmentRadio() {
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
            <p className="text-gray-400 text-xs -mt-2 mb-2 sm:text-sm">
                (pilih salah satu)
            </p>
            <ul className="w-full flex flex-col gap-2">
                <li>
                    <input
                        type="radio"
                        id="option-one"
                        name="hosting"
                        defaultValue="option-one"
                        className="hidden peer"
                        required={true}
                    />
                    <label
                        htmlFor="option-one"
                        className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-2 h-fit">
                            <div className="bg-gray-400 rounded-lg w-28">
                                <AspectRatio ratio={1 / 1}>
                                    <p>Test</p>
                                </AspectRatio>
                            </div>
                            <div>
                                <div className="w-full text-lg font-semibold">
                                    0-50 MB
                                </div>
                                <div className="w-full">
                                    Good for small websites
                                </div>
                            </div>
                        </div>
                    </label>
                </li>
                <li>
                    <input
                        type="radio"
                        id="option-two"
                        name="hosting"
                        defaultValue="option-two"
                        className="hidden peer"
                    />
                    <label
                        htmlFor="option-two"
                        className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-2 h-fit">
                            <div className="bg-gray-400 rounded-lg w-28">
                                <AspectRatio ratio={1 / 1}>
                                    <p>Test</p>
                                </AspectRatio>
                            </div>
                            <div>
                                <div className="w-full text-lg font-semibold">
                                    0-50 MB
                                </div>
                                <div className="w-full">
                                    Good for small websites
                                </div>
                            </div>
                        </div>
                    </label>
                </li>
                <li>
                    <input
                        type="radio"
                        id="option-three"
                        name="hosting"
                        defaultValue="option-three"
                        className="hidden peer"
                    />
                    <label
                        htmlFor="option-three"
                        className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-2 h-fit">
                            <div className="bg-gray-400 rounded-lg w-28">
                                <AspectRatio ratio={1 / 1}>
                                    <p>Test</p>
                                </AspectRatio>
                            </div>
                            <div>
                                <div className="w-full text-lg font-semibold">
                                    0-50 MB
                                </div>
                                <div className="w-full">
                                    Good for small websites
                                </div>
                            </div>
                        </div>
                    </label>
                </li>
            </ul>
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
