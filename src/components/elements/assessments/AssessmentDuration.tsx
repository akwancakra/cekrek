import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AssessmentDuration() {
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
            {/* <div class="bg-gray-400 rounded-lg w-full h-64"></div> */}
            <div className="grid grid-cols-3 gap-3 w-full my-3 max-w-xs">
                <label className="form-control w-full">
                    <input
                        type="number"
                        min={0}
                        max={23}
                        placeholder={"00"}
                        className="placeholder:text-center text-center font-semibold tracking-tighter input input-bordered w-24 h-24 text-3xl pl-0 number-input-no-arrow"
                    />
                </label>
                <label className="form-control w-full">
                    <input
                        type="number"
                        min={0}
                        max={59}
                        placeholder={"00"}
                        className="placeholder:text-center text-center font-semibold tracking-tighter input input-bordered w-24 h-24 text-3xl pl-0 number-input-no-arrow"
                    />
                </label>
                <label className="form-control w-full">
                    <input
                        type="number"
                        min={0}
                        max={59}
                        placeholder={"00"}
                        className="placeholder:text-center text-center font-semibold tracking-tighter input input-bordered w-24 h-24 text-3xl pl-0 number-input-no-arrow"
                    />
                </label>
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
