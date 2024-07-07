"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Session } from "@/types/userSession.type";
import axios from "axios";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Format email tidak valid"),
    password: Yup.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password tidak cocok"
    ),
});

export default function EditProfileDialog({
    // editAccountButton,
    profile,
}: {
    // editAccountButton: () => void;
    profile: Session;
}) {
    const [isSubmit, setIsSubmit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const roles = ["admin", "teacher", "parent"];

    const formik = useFormik({
        initialValues: {
            email: profile?.email || "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmit(true);
            const apiUrl = [
                { role: "admin", url: `/api/admin/users/${profile?.id}` },
                { role: "teacher", url: `/api/parents/${profile?.id}` },
                { role: "parent", url: `/api/parents/${profile?.id}` },
            ].find((u) => u.role === profile?.role)?.url;

            // console.log(values);

            const submitPromise = new Promise<void>(async (resolve, reject) => {
                try {
                    await axios.put(apiUrl, values);
                    setIsOpen(false);
                    resolve();
                } catch (error) {
                    reject(error);
                } finally {
                    setIsSubmit(false);
                }
            });

            toast.promise(submitPromise, {
                loading: "Mengirimkan data...",
                success: () => {
                    router.push("/p/settings/profile");
                    return "Data orang tua telah diubah!";
                },
                error: (error) => {
                    return (
                        error?.response?.data?.message || "Gagal mengubah data"
                    );
                },
            });
        },
    });

    useEffect(() => {
        if (profile?.email !== formik.values.email) {
            formik.setFieldValue("email", profile?.email);
        }
    }, [profile]);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                {roles.some((r) => r === profile?.role) ? (
                    <Button
                        variant={"default"}
                        className="bg-yellow-300 text-yellow-800 gap-1 hover:bg-yellow-400 hover:text-yellow-900"
                    >
                        <span>Ubah</span>
                        <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                            edit
                        </span>
                    </Button>
                ) : (
                    <div className="skeleton rounded-lg w-36 h-9"></div>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <ScrollArea className="max-h-[80vh] p-3">
                    <AlertDialogHeader className="m-1">
                        <AlertDialogTitle>Ubah Profil</AlertDialogTitle>
                        <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                        <div>
                            <FormikProvider value={formik}>
                                <Form>
                                    <label className="form-control w-full mb-3">
                                        <div className="label">
                                            <span className="label-text">
                                                E-mail
                                            </span>
                                        </div>
                                        <Field
                                            type="email"
                                            placeholder="john@example.com"
                                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                            // name="email"
                                            {...formik.getFieldProps("email")}
                                        />
                                    </label>
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                    <label className="form-control w-full mb-3">
                                        <div className="label">
                                            <span className="label-text">
                                                Kata Sandi
                                            </span>
                                        </div>
                                        <Field
                                            type="password"
                                            placeholder="Masukkan Password..."
                                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                            // name="passwordConfirmation"
                                            {...formik.getFieldProps(
                                                "password"
                                            )}
                                        />
                                    </label>
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                    <label className="form-control w-full mb-3">
                                        <div className="label">
                                            <span className="label-text">
                                                Konfirmasi Kata Sandi{" "}
                                                {formik.errors
                                                    .confirmPassword && (
                                                    <span className="text-red-500 text-xs italic">
                                                        *wajib sama dengan
                                                        password
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <Field
                                            type="password"
                                            placeholder="Konfirmasi Password..."
                                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                            // name="passwordConfirmation"
                                            {...formik.getFieldProps(
                                                "confirmPassword"
                                            )}
                                        />
                                    </label>
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </Form>
                            </FormikProvider>
                        </div>
                        <AlertDialogDescription />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                variant={"default"}
                                onClick={() => formik.submitForm()}
                                className="bg-yellow-300 text-yellow-800 hover:bg-yellow-400 hover:text-yellow-900"
                                disabled={isSubmit || !formik.isValid}
                            >
                                Ubah
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
}
