"use client";

import Button from "@/components/elements/buttons/Button";
import { error } from "console";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(3).required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Confirmation Password must match")
        .required("Confirmation Password is required"),
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(35, "Name must be less than 35 characters")
        .required("Name is required"),
});

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConf, setShowPasswordConf] = useState(false);

    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordConfVisibility = () => {
        setShowPasswordConf(!showPasswordConf);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            // setIsLoading(true);
            // setShowPassword(false);
            // setShowPasswordConf(false);
            // await axios
            //     .post("/api/register", {
            //         email: values.email,
            //         name: values.name,
            //         password: values.password,
            //     })
            //     .then(() => {
            //         toast.success("Registered successfully");
            //         setIsLoading(false);
            //         router.push("/login");
            //     })
            //     .catch((err) => {
            //         if (err?.response.status === 400) {
            //             toast.error(err?.response?.data?.message);
            //         } else if (err?.response.status === 500) {
            //             toast.error("Server Error");
            //         } else {
            //             toast.error("Something went wrong");
            //         }
            //         setIsLoading(false);
            //     });
        },
    });

    return (
        <main className="min-h-screen flex items-center justify-center sm:bg-gray-100">
            <div className="container mx-auto bg-white p-4 sm:border-gray-300 sm:rounded-lg sm:border sm:w-[400px]">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mx-auto w-fit mb-3">
                        <Image
                            src={"/static/images/logo.png"}
                            alt="SILAR logo"
                            width={112}
                            height={112}
                        />
                    </div>
                    <div className="text-center mb-8">
                        <p className="text-header">Hello There</p>
                        <p className="text-gray-400">
                            Register to join and try our features
                        </p>
                    </div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            name="email"
                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </label>
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-xs sm:text-sm">
                            {formik.errors.email}
                        </div>
                    )}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Name..."
                            name="name"
                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </label>
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-xs sm:text-sm">
                            {formik.errors.name}
                        </div>
                    )}
                    <label className="form-control w-full relative">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="password here..."
                            name="password"
                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span
                            className="material-symbols-outlined cursor-pointer absolute bottom-2.5 right-4 !text-xl !leading-4 opacity-70"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </label>
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500 text-xs sm:text-sm">
                            {formik.errors.password}
                        </div>
                    )}
                    <label className="form-control w-full h-fit relative">
                        <div className="label">
                            <span className="label-text">Confirm Password</span>
                        </div>
                        <input
                            id="confirmPassword"
                            type={showPasswordConf ? "text" : "password"}
                            placeholder="Confirm password here..."
                            name="confirmPassword"
                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span
                            className="material-symbols-outlined cursor-pointer absolute bottom-2.5 right-4 !text-xl !leading-4 opacity-70"
                            onClick={togglePasswordConfVisibility}
                        >
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </label>
                    {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <div className="text-red-500 text-xs sm:text-sm">
                                {formik.errors.confirmPassword}
                            </div>
                        )}
                    <Button
                        text={isLoading ? "Registering..." : "Register"}
                        icon="login"
                        textPosition="left"
                        buttonType="submit"
                        type="primary"
                        classnew="w-full text-center mt-3"
                        disabled={isLoading}
                    />
                    {/* DIVIDER */}
                    <div className="divider">Or</div>
                    {/* DIVIDER */}
                    <button
                        className="btn btn-outline rounded-lg w-full border-gray-500 text-gray-500 px-3 py-2 min-h-[2.5rem] h-10 hover:bg-transparent hover:text-gray-700"
                        type="button"
                        disabled={isLoading}
                        onClick={() =>
                            signIn("google", {
                                callbackUrl: "/",
                                redirect: false,
                            })
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            className="fill-gray-500 hover:fill-gray-700 me-1"
                        >
                            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                        </svg>
                        Continue with Google
                    </button>
                    <p className="text-sm text-gray-400 text-center mt-3">
                        Already have an account?{" "}
                        <Link href={"/login"} className="hover:text-primary">
                            Login now
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Page;
