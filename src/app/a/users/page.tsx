"use client";

import UsersTable from "@/components/elements/tables-and-grids/UsersTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersListAdmin() {
    // const isDesktop = useMediaQuery("(min-width: 768px)");
    const [keyword, setKeyword] = useState("");
    const searchParams = useSearchParams();
    const urlKeyword = searchParams.get("keyword");

    useEffect(() => {
        setKeyword(urlKeyword || "");
    }, [urlKeyword]);

    // const addAccountButton = () => {
    //     console.log("Account Add Button Clicked");
    // };

    return (
        <>
            <section className="mx-auto max-w-7xl mb-4">
                <div className="rounded-lg mb-3 p-4 w-full flex items-center bg-gradient-to-r from-purple-400 to-purple-600 h-28 sm:h-36">
                    <div>
                        <p className="text-white text-sm -mb-1">Daftar Akun</p>
                        <p className="font-semibold tracking-tight text-xl text-white">
                            CekRek
                        </p>
                    </div>
                </div>

                <div className="justify-between sm:flex group-[.open]:block md:group-[.open]:flex sm:mb-3">
                    <div className="justify-between items-center flex mb-2 sm:mb-0 sm:block group-[.open]:mb-2 md:group-[.open]:mb-0 group-[.open]:flex md:group-[.open]:block">
                        <p className="text-large font-semibold tracking-tight">
                            Daftar Akun
                        </p>

                        <Button variant={"outline"} asChild>
                            <Link
                                href="/a/users/add"
                                className="items-center gap-1 inline-flex sm:hidden group-[.open]:inline-flex md:group-[.open]:hidden"
                            >
                                <span>Tambah Akun</span>{" "}
                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                    person_add
                                </span>
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant={"outline"} asChild>
                            <Link
                                href="/a/users/add"
                                className="items-center gap-1 hidden sm:inline-flex group-[.open]:hidden md:group-[.open]:inline-flex"
                            >
                                <span>Tambah Akun</span>{" "}
                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                    person_add
                                </span>
                            </Link>
                        </Button>
                        <form
                            className="w-full grow"
                            method="GET"
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <label className="input w-full input-bordered rounded-lg flex items-center gap-2 py-2 px-3 text-sm h-fit min-h-fit sm:w-fit group-[.open]:w-full md:group-[.open]:w-fit dark:bg-neutral-800 dark:border-neutral-600">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Search"
                                    name="keyword"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <Button
                                    variant={"outline"}
                                    className="p-0 border-none h-fit"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                                        search
                                    </span>
                                </Button>
                            </label>
                        </form>
                    </div>
                </div>
                {/* 
                {isLoading ? (
                    <>
                        <div>
                            <div className="skeleton w-full h-72 rounded-lg"></div>
                        </div>
                    </>
                ) : ( */}
                <UsersTable keyword={keyword} />
                {/* )} */}
            </section>
        </>
    );
}
