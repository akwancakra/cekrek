import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HealthStatusOne() {
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
                <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant={"outline"} type="button">
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            check
                        </span>{" "}
                        Ya
                    </Button>
                    <Button variant={"outline"} type="button">
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            close
                        </span>{" "}
                        Tidak
                    </Button>
                </div>
            </div>
            <input
                type="text"
                name="full_name"
                placeholder="Keterangan..."
                className="input input-bordered rounded-lg mt-3 px-3 py-2 text-sm h-fit min-h-fit w-full"
                // value={formik.values.name}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
            />
        </>
    );
}
