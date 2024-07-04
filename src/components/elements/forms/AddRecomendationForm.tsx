import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Form, Field, ErrorMessage, FormikProvider, FormikProps } from "formik";

interface Props {
    formik: FormikProps<Recommendation>;
    assessmentFails: AssessmentAnswer[];
}

type Recommendation = {
    id?: number;
    teacher_id?: string | number;
    is_main: boolean;
    assesment_number: string | number;
    title: string;
    description: string;
    icon?: string;
    frequency?: string;
    risk_category?: "other" | "rendah" | "sedang" | "tinggi";
};

export const AddRecomendationForm = ({ formik, assessmentFails }: Props) => {
    return (
        <FormikProvider value={formik}>
            <Form className="w-full space-y-6">
                <div className="flex flex-col">
                    <div>
                        <div className="label ps-0">
                            <span className="label-text">
                                Nomor Asesmen{" "}
                                {formik.errors.assesment_number && (
                                    <span className="text-red-500 text-xs italic">
                                        *wajib dipilih
                                    </span>
                                )}
                            </span>
                        </div>
                        <Select
                            value={
                                typeof formik.values.assesment_number ===
                                "string"
                                    ? formik.values.assesment_number
                                    : formik.values.assesment_number?.toString()
                            }
                            onValueChange={(value) =>
                                formik.setFieldValue("assesment_number", value)
                            }
                        >
                            <SelectTrigger
                                name="assesment_number"
                                onBlur={formik.handleBlur}
                                className="w-full max-w-[480px]"
                            >
                                <SelectValue placeholder="Pilih Nomor Asesmen" />
                            </SelectTrigger>
                            <SelectContent className="max-w-md">
                                <ScrollArea className="max-h-40">
                                    {assessmentFails.map((fail, idx) => (
                                        <SelectItem
                                            key={idx}
                                            value={fail?.assesment_id}
                                        >
                                            Asesmen {fail?.assesment_id}:{" "}
                                            {fail?.assesment?.question}
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>{" "}
                        <ErrorMessage
                            name="assesment_number"
                            component="div"
                            className="text-small text-red-500"
                        />
                    </div>
                    <div>
                        <label className="form-control w-full">
                            <div className="label ps-0">
                                <span className="label-text">
                                    Judul{" "}
                                    {formik.errors.title && (
                                        <span className="text-red-500 text-xs italic">
                                            *wajib diisi
                                        </span>
                                    )}
                                </span>
                            </div>
                            <Field
                                {...formik.getFieldProps("title")}
                                placeholder="Berikan judul rekomendasi..."
                                className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full"
                            />
                        </label>
                        <ErrorMessage
                            name="title"
                            component="div"
                            className="text-small text-red-500"
                        />
                    </div>
                    <div>
                        <div className="label">
                            <span className="label-text">
                                Deskripsi{" "}
                                {formik.errors.description && (
                                    <span className="text-red-500 text-xs italic">
                                        *wajib diisi
                                    </span>
                                )}
                            </span>
                        </div>
                        <MinimalTiptapEditor
                            value={formik.values.description} // Memastikan nilai dari Formik
                            className={cn("w-full", {
                                "border-red-500 focus-within:border-red-500":
                                    formik.errors.description,
                            })}
                            onValueChange={(value) =>
                                formik.setFieldValue("description", value)
                            } // Menggunakan setFieldValue untuk mengubah nilai description
                            outputValue="html"
                        />
                        <ErrorMessage
                            name="description"
                            component="div"
                            className="text-small text-red-500"
                        />
                    </div>
                    <div>
                        <label className="form-control w-full">
                            <div className="label ps-0">
                                <span className="label-text">
                                    Frekuensi{" "}
                                    {formik.errors.frequency && (
                                        <span className="text-red-500 text-xs italic">
                                            *wajib diisi
                                        </span>
                                    )}
                                </span>
                            </div>
                            <Field
                                {...formik.getFieldProps("frequency")}
                                placeholder="2 kali sehari..."
                                className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full"
                            />
                        </label>
                        <ErrorMessage
                            name="frequency"
                            component="div"
                            className="text-small text-red-500"
                        />
                    </div>
                    <div>
                        <div className="label ps-0">
                            <span className="label-text">
                                Kategori Risiko{" "}
                                {formik.errors.risk_category && (
                                    <span className="text-red-500 text-xs italic">
                                        *wajib dipilih
                                    </span>
                                )}
                            </span>
                        </div>
                        <Select
                            value={formik.values.risk_category}
                            onValueChange={(value) =>
                                formik.setFieldValue("risk_category", value)
                            }
                        >
                            <SelectTrigger
                                name="risk_category"
                                className="w-full"
                                onBlur={formik.handleBlur}
                            >
                                <SelectValue placeholder="Pilih Kategori Risiko" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="other">Semua</SelectItem>
                                <SelectItem value="rendah">Rendah</SelectItem>
                                <SelectItem value="sedang">Sedang</SelectItem>
                                <SelectItem value="tinggi">Tinggi</SelectItem>
                            </SelectContent>
                        </Select>{" "}
                        <ErrorMessage
                            name="risk_category"
                            component="div"
                            className="text-small text-red-500"
                        />
                    </div>
                    {/* <div>
                        <div className="label ps-0">
                            <span className="label-text">
                                Gambar ikon{" "}
                                {formik.errors.icon && (
                                    <span className="text-red-500 text-xs italic">
                                        *wajib dipilih
                                    </span>
                                )}
                            </span>
                        </div>
                        <Select
                            value={formik.values.icon}
                            onValueChange={(value) =>
                                formik.setFieldValue("icon", value)
                            }
                        >
                            <SelectTrigger
                                name="gender"
                                className="w-full"
                                onBlur={formik.handleBlur}
                            >
                                <SelectValue placeholder="Pilih Kategori Risiko" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="orangtua.jpg">Semua</SelectItem>
                                <SelectItem value="orangtuanunjuk.jpg">Rendah</SelectItem>
                                <SelectItem value="sedang">Sedang</SelectItem>
                                <SelectItem value="tinggi">Tinggi</SelectItem>
                            </SelectContent>
                        </Select>{" "}
                        <ErrorMessage
                            name="icon"
                            component="div"
                            className="text-small text-red-500"
                        />
                    </div> */}
                </div>
            </Form>
        </FormikProvider>
    );
};
