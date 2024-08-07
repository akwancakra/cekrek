import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import ConnectStudentDialog from "../alerts/ConnectStudentDialog";
import { Child } from "@/types/children.types";
import Link from "next/link";

interface TeacherDashboardHeaderType {
    showType: string;
    keyword: string;
    category: string;
    students: Child[];
    // studentsFull: Child[];
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setShowType: React.Dispatch<React.SetStateAction<string>>;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
    mutate: () => void;
}

export default function TeacherDashboardHeader({
    students,
    showType,
    setShowType,
    keyword,
    setKeyword,
    handleSearch,
    category,
    setCategory,
    // studentsFull,
    mutate,
}: TeacherDashboardHeaderType) {
    return (
        <div className="items-center justify-between mb-4 lg:flex group-[.open]:block lg:group-[.open]:flex">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <p className="text-large font-semibold tracking-tight">
                        Siswa kamu ({students.length})
                    </p>
                    {/* <ConnectStudentDialog
                        students={studentsFull}
                        className="hidden lg:inline-flex group-[.open]:hidden lg:group-[.open]:inline-flex"
                        mutate={mutate}
                    /> */}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="inline-flex gap-1 sm:hidden group-[.open]:inline-flex md:group-[.open]:hidden"
                    >
                        <Button variant="outline">
                            Menu{" "}
                            <span className="material-symbols-outlined cursor-pointer filled ms-1 !text-xl !leading-4 opacity-70">
                                {showType == "grid" ? "grid_view" : "list"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>Tampilan Data</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={showType}
                            onValueChange={setShowType}
                        >
                            <DropdownMenuRadioItem value="grid">
                                <span className="material-symbols-outlined cursor-pointer filled me-1 !text-xl !leading-4 opacity-70">
                                    grid_view
                                </span>{" "}
                                Kolom
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="table">
                                <span className="material-symbols-outlined cursor-pointer filled me-1 !text-xl !leading-4 opacity-70">
                                    list
                                </span>{" "}
                                Daftar
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Filter</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <span>Kategori Anak</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuRadioGroup
                                            value={category}
                                            onValueChange={setCategory}
                                        >
                                            <DropdownMenuRadioItem
                                                value="rendah"
                                                className="gap-2 items-center"
                                            >
                                                <span className="badge p-1.5 h-fit bg-yellow-500"></span>
                                                <span>Autis Rendah</span>
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem
                                                value="sedang"
                                                className="gap-2 items-center"
                                            >
                                                <span className="badge p-1.5 h-fit bg-primary"></span>
                                                <span>Autis Sedang</span>
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem
                                                value="tinggi"
                                                className="gap-2 items-center"
                                            >
                                                <span className="badge p-1.5 h-fit bg-red-500"></span>
                                                <span>Autis Tinggi</span>
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="gap-2 items-center"
                                                onClick={() => setCategory("")}
                                            >
                                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                    mop
                                                </span>{" "}
                                                <span>Bersihkan</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <ConnectStudentDialog
                            students={students}
                            mutate={mutate}
                        >
                            <button
                                type="button"
                                className="w-full text-sm py-1.5 rounded-md px-2 gap-0.5 flex justify-start items-center cursor-pointer bg-transparent border-none"
                            >
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    data_loss_prevention
                                </span>{" "}
                                Hubungkan siswa
                            </button>
                        </ConnectStudentDialog>
                        <DropdownMenuItem>
                            <Link
                                href={"/t/students/add"}
                                className="flex items-center"
                            >
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    person_add
                                </span>{" "}
                                Tambah siswa baru
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* <ConnectStudentDialog
                students={studentsFull}
                mutate={mutate}
                className="w-full my-2 inline-flex lg:hidden group-[.open]:inline-flex lg:group-[.open]:hidden"
            /> */}

            <div className="w-full flex justify-between gap-2 mt-2 lg:w-fit sm:mt-0 group-[.open]:mt-2 md:group-[.open]:mt-0">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="hidden gap-1 sm:inline-flex group-[.open]:hidden md:group-[.open]:inline-flex"
                    >
                        <Button variant="outline">
                            <span>Menu</span>{" "}
                            <span className="material-symbols-outlined cursor-pointer filled !text-xl !leading-4 opacity-70">
                                {showType == "grid" ? "grid_view" : "list"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Tampilan Data</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={showType}
                            onValueChange={setShowType}
                        >
                            <DropdownMenuRadioItem value="grid">
                                <span className="material-symbols-outlined cursor-pointer filled me-1 !text-xl !leading-4 opacity-70">
                                    grid_view
                                </span>{" "}
                                Kolom
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="table">
                                <span className="material-symbols-outlined cursor-pointer filled me-1 !text-xl !leading-4 opacity-70">
                                    list
                                </span>{" "}
                                Daftar
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Filter</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <span>Kategori Anak</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuRadioGroup
                                            value={category}
                                            onValueChange={setCategory}
                                        >
                                            <DropdownMenuRadioItem
                                                value="rendah"
                                                className="gap-2 items-center"
                                            >
                                                <span className="badge p-1.5 h-fit bg-yellow-500"></span>
                                                <span>Autis Rendah</span>
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem
                                                value="sedang"
                                                className="gap-2 items-center"
                                            >
                                                <span className="badge p-1.5 h-fit bg-primary"></span>
                                                <span>Autis Sedang</span>
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem
                                                value="tinggi"
                                                className="gap-2 items-center"
                                            >
                                                <span className="badge p-1.5 h-fit bg-red-500"></span>
                                                <span>Autis Tinggi</span>
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="gap-2 items-center"
                                                onClick={() => setCategory("")}
                                            >
                                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                    mop
                                                </span>{" "}
                                                <span>Bersihkan</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <ConnectStudentDialog
                            students={students}
                            mutate={mutate}
                        >
                            <button
                                type="button"
                                className="w-full text-small py-1.5 rounded-md px-2 gap-0.5 flex justify-start items-center cursor-pointer bg-transparent border-none"
                            >
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    data_loss_prevention
                                </span>{" "}
                                Hubungkan siswa
                            </button>
                        </ConnectStudentDialog>
                        <DropdownMenuItem>
                            <Link
                                href={"/t/students/add"}
                                className="flex items-center"
                            >
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    person_add
                                </span>{" "}
                                Tambah siswa baru
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <form className="w-full sm:w-fit" onSubmit={handleSearch}>
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
                            type="submit"
                        >
                            <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                                search
                            </span>
                        </Button>
                    </label>
                </form>
            </div>
        </div>
    );
}
