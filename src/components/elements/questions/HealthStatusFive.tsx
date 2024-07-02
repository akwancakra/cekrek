import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function HealthStatusFive() {
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
                    Pernah dirawat kah
                </p>
                <p className="text-gray-500 text-center text-small">
                    Expression when getting advice from parents or teachers
                </p>
            </div>
            <div className="w-full">
                <p className="font-medium text-small mb-1">Jawaban</p>
                <div>
                    <div className="mb-3">
                        {/* <div className="label ps-0">
                            <span className="label-text">Agama</span>
                        </div> */}
                        <Select name="birth_assistance">
                            <SelectTrigger
                                className="w-full"
                                // value={formik.values.gender}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            >
                                <SelectValue placeholder="Pilih Jawaban" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="islam">
                                    Sama/Normal
                                </SelectItem>
                                <SelectItem value="kristen">
                                    Terlambat
                                </SelectItem>
                                <SelectItem value="other">Lainnya</SelectItem>
                            </SelectContent>
                        </Select>
                        {/* {formik.touched.name && formik.errors.name && (
                            <div className="text-red-500 text-xs sm:text-sm">
                                {formik.errors.name}
                            </div>
                        )} */}
                    </div>
                    <label className="form-control w-full">
                        <input
                            type="text"
                            name="full_name"
                            placeholder="Lainnya..."
                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                            // value={formik.values.name}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                        />
                    </label>
                    {/* {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-xs sm:text-sm">
                            {formik.errors.name}
                        </div>
                    )} */}
                </div>
            </div>
        </>
    );
}
