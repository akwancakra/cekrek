"use client";

import AddAccountDialog from "@/components/elements/alerts/AddAccountDialog";
import AddAccountDrawer from "@/components/elements/alerts/AddAccountDrawer";
import UsersTable from "@/components/elements/tables-and-grids/UsersTable";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";

export default function UsersListAdmin() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const addAccountButton = () => {
        console.log("Account Add Button Clicked!");
    };

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

                        <AddAccountDrawer addAccountButton={addAccountButton} />
                    </div>

                    <div className="flex items-center gap-2">
                        <AddAccountDialog addAccountButton={addAccountButton} />
                        <form className="w-full grow">
                            <label className="input w-full input-bordered rounded-lg flex items-center gap-2 py-2 px-3 text-sm h-fit min-h-fit sm:w-fit group-[.open]:w-full md:group-[.open]:w-fit">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Search"
                                    name="keyword"
                                />
                                <Button
                                    variant={"outline"}
                                    className="p-0 border-none h-fit"
                                >
                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                                        search
                                    </span>
                                </Button>
                            </label>
                        </form>
                    </div>
                </div>

                <UsersTable />
            </section>
        </>
    );
}
