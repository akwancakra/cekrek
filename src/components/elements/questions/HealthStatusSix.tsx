import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HealthStatusSix() {
    return (
        <>
            <div className="bg-gray-400 rounded-lg w-full">
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
            <div className="my-3">
                <p className="text-gray-700 text-center text-medium font-semibold">
                    Expression when getting advice from parents or teachers
                </p>
                <p className="text-gray-500 text-center text-small">
                    Expression when getting advice from parents or teachers
                </p>
            </div>
            <div className="w-full">
                <p className="font-medium text-small mb-1">Jawaban</p>
                <div className="flex items-center gap-1.5">
                    <span>Mulai mengucapkan kata-kata pada usia</span>{" "}
                    <label className="form-control">
                        <input
                            type="number"
                            name="year"
                            placeholder="0"
                            className="input rounded-none font-semibold ps-0 px-3 py-2 text-sm h-fit min-h-fit w-20 number-input-no-arrow placeholder:text-center text-center border-0 !border-b-2 focus:border-primary ring-0 focus:outline-none"
                            // value={formik.values.name}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </label>{" "}
                    <span>tahun</span>
                </div>
                <div className="flex justify-end mt-3">
                    <Button variant={"default"} type="button">
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            check
                        </span>{" "}
                        Selanjutnya
                    </Button>
                </div>
            </div>
        </>
    );
}
