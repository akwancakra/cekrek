import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Form, Field, ErrorMessage, FormikProvider, FormikProps } from "formik";

interface Props {
    formik: FormikProps<RecomendationAdd>;
}

type RecomendationAdd = {
    title: string;
    description: string;
    icon?: string;
    frequency?: string;
    risk_category?: "other" | "rendah" | "sedang" | "tinggi";
};

export const AddRecomendationForm = ({ formik }: Props) => {
    return (
        <FormikProvider value={formik}>
            <Form className="w-full space-y-6">
                <div className="flex flex-col">
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
