"use client";

import { useFormik } from "formik";
import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Button from "@/components/elements/buttons/Button";

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const LoginForm = ({ callbackUrl }: { callbackUrl: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { push } = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setShowPassword(false);
            try {
                // console.log(values);
                const res = await signIn("credentials", {
                    callbackUrl,
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });

                if (!res?.error) {
                    toast.success("Berhasil masuk", {
                        duration: 1000,
                        dismissible: true,
                    });
                    push(callbackUrl);
                } else {
                    if (res?.status === 401) {
                        toast.error("Email or password is incorrect");
                    } else {
                        toast.error("Something went wrong");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <main className="min-h-screen flex items-center justify-center sm:bg-gray-100">
            <div className="container mx-auto bg-white p-4 sm:border-gray-300 sm:rounded-lg sm:border sm:w-[400px]">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mx-auto w-fit mb-3">
                        <Link href="/">
                            <Image
                                src={"/static/images/logo.png"}
                                alt="CekRek logo"
                                width={112}
                                height={112}
                            />
                        </Link>
                    </div>
                    <div className="text-center mb-8">
                        <p className="text-header">Hello There</p>
                        <p className="text-gray-400">
                            Login and access all the features
                        </p>
                    </div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@mail.com"
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
                    <label className="form-control w-full relative">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="password here..."
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
                    <Button
                        text={isLoading ? "Logging in..." : "Log In"}
                        icon="login"
                        textPosition="left"
                        buttonType="submit"
                        type="primary"
                        classnew="w-full text-center mt-3"
                        disabled={isLoading}
                    />
                    <div className="divider">Or</div>
                    <button
                        type="button"
                        className={`${
                            isLoading
                                ? "btn-disabled cursor-not-allowed disabled"
                                : ""
                        } btn btn-outline rounded-lg w-full border-gray-500 text-gray-500 px-3 py-2 min-h-[2.5rem] h-10 hover:bg-transparent hover:text-gray-700`}
                        disabled={isLoading}
                        onClick={() =>
                            signIn("google", { callbackUrl, redirect: false })
                        }
                    >
                        {isLoading ? (
                            <>
                                Log In with Google
                                <span className="loading loading-spinner loading-sm"></span>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </button>
                    <p className="text-sm text-gray-400 text-center mt-3">
                        Haven&apos;t account yet?{" "}
                        <Link href={"/register"} className="hover:text-primary">
                            Create one
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

type CallbackUrlWrapperProps = {
    children: (callbackUrl: string) => React.ReactNode;
};

const CallbackUrlWrapper: React.FC<CallbackUrlWrapperProps> = ({
    children,
}) => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    return children(callbackUrl);
};

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <CallbackUrlWrapper>
            {(callbackUrl) => <LoginForm callbackUrl={callbackUrl} />}
        </CallbackUrlWrapper>
    </Suspense>
);

export default Page;
