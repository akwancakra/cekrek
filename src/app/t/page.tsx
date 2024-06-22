"use client";

import Clock from "@/components/elements/Clock";
import StudentCard from "@/components/elements/cards/StudentCard";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export default function HomeTeacher({}) {
    const [position, setPosition] = useState("bottom");

    return (
        <>
            <section className="mx-auto max-w-7xl mb-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="h-32 overflow-hidden p-4 rounded-lg bg-gradient-to-b from-purple-200 to-purple-100 sm:h-64">
                    <p className="text-primary -mb-1">Selamat Pagi Guru</p>
                    <p className="text-primary font-semibold tracking-tight text-xl sm:text-3xl">
                        Nama Kamu
                    </p>
                </div>
                <Clock />
            </section>

            <section className="mx-auto max-w-7xl mb-4">
                <div className="items-center justify-between mb-4 sm:flex group-[.open]:block md:group-[.open]:flex">
                    <div className="flex justify-between items-center">
                        <p className="text-large font-semibold tracking-tight">
                            Murid kamu (1)
                        </p>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                className="inline-flex gap-1 sm:hidden group-[.open]:inline-flex md:group-[.open]:hidden"
                            >
                                <Button variant="outline">
                                    Tampilan{" "}
                                    <span className="material-symbols-outlined cursor-pointer filled ms-1 !text-xl !leading-4 opacity-70">
                                        grid_view
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>
                                    Tampilan Data
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={position}
                                    onValueChange={setPosition}
                                >
                                    <DropdownMenuRadioItem value="top">
                                        <span className="material-symbols-outlined cursor-pointer filled me-1 !text-xl !leading-4 opacity-70">
                                            grid_view
                                        </span>{" "}
                                        Kolom
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="bottom">
                                        <span className="material-symbols-outlined cursor-pointer filled me-1 !text-xl !leading-4 opacity-70">
                                            list
                                        </span>{" "}
                                        Daftar
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0 group-[.open]:mt-2 md:group-[.open]:mt-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                className="hidden gap-1 sm:inline-flex group-[.open]:hidden md:group-[.open]:inline-flex"
                            >
                                <Button variant="outline">
                                    <span>Tampilan</span>{" "}
                                    <span className="material-symbols-outlined cursor-pointer filled !text-xl !leading-4 opacity-70">
                                        grid_view
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>
                                    Tampilan Data
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={position}
                                    onValueChange={setPosition}
                                >
                                    <DropdownMenuRadioItem value="top">
                                        <span className="material-symbols-outlined cursor-pointer filled me-1 !text-xl !leading-4 opacity-70">
                                            grid_view
                                        </span>{" "}
                                        Kolom
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="bottom">
                                        <span className="material-symbols-outlined cursor-pointer filled me-1 !text-xl !leading-4 opacity-70">
                                            list
                                        </span>{" "}
                                        Daftar
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <form className="w-full">
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

                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 group-[.open]:grid-cols-2 md:group-[.open]:grid-cols-3 lg:group-[.open]:grid-cols-6">
                    <StudentCard />
                    <StudentCard />
                    <StudentCard />
                    <StudentCard />
                    <StudentCard />
                    <StudentCard />
                    <StudentCard />
                    <StudentCard />
                    <StudentCard />
                    <StudentCard />
                </div>

                <Pagination className="mt-5">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
        </>
    );
}
