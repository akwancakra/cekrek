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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
import { Student } from "@/types/student.types";
import Image from "next/image";
import { useState } from "react";
import Select from "react-select";

const students: Student[] = [
    {
        id: "1",
        name: "Siswa 1",
        image: "/static/images/user-default.jpg",
        category: "Low",
        old: 6,
    },
    {
        id: "2",
        name: "Siswa 2",
        image: "/static/images/user-default.jpg",
        category: "Low",
        old: 6,
    },
    {
        id: "3",
        name: "Siswa 3",
        image: "/static/images/user-default.jpg",
        category: "High",
        old: 6,
    },
    {
        id: "4",
        name: "Siswa 4",
        image: "/static/images/user-default.jpg",
        category: "Medium",
        old: 6,
    },
    {
        id: "5",
        name: "Siswa 5",
        image: "/static/images/user-default.jpg",
        category: "High",
        old: 6,
    },
    {
        id: "6",
        name: "Siswa 6",
        image: "/static/images/user-default.jpg",
        category: "Low",
        old: 6,
    },
    {
        id: "7",
        name: "Siswa 7",
        image: "/static/images/user-default.jpg",
        category: "Low",
        old: 6,
    },
];

const options = students.map((student) => ({
    value: student.id,
    label: student.name,
    image: student.image,
    category: student.category,
}));

export default function ConnectStudentDialog({
    connectStudentButton,
    className,
}: {
    connectStudentButton: () => void;
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    // const [value, setValue] = useState("");
    // const [search, setSearch] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            display: "flex",
            alignItems: "center",
        }),
        singleValue: (provided: any, state: any) => ({
            ...provided,
            display: "flex",
            alignItems: "center",
        }),
    };

    const formatOptionLabel = ({ label, image, category }: any) => (
        <div className="flex items-center gap-2">
            <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg">
                <AspectRatio ratio={1 / 1}>
                    <Image
                        src={image}
                        alt="Child Profile"
                        fill={true}
                        className="rounded-lg object-cover"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <div className="flex flex-col items-start">
                <p>{label}</p>
                <Badge variant={"default"}>{category}</Badge>
            </div>
        </div>
    );

    // Fungsi untuk memfilter students berdasarkan name atau category
    // const filteredStudents = students.filter(
    //     (student) =>
    //         student.name.toLowerCase().includes(search.toLowerCase()) ||
    //         student.category.toLowerCase().includes(search.toLowerCase())
    // );

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className={`gap-1 text-small${
                        className ? ` ${className}` : ""
                    }`}
                >
                    <span>Tambah Siswa</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                        person_add
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <ScrollArea className="max-h-[80vh] p-3">
                    <AlertDialogHeader className="m-1">
                        <AlertDialogTitle>Tambah Siswa</AlertDialogTitle>
                        <div className="divider my-1"></div>
                        <div>
                            <AspectRatio ratio={12 / 13}>
                                <Image
                                    src={"/static/images/user-default.jpg"}
                                    alt="Child Profile"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                                <div className="absolute bottom-0 w-full">
                                    <div className="m-2 flex justify-between items-center bg-white rounded-lg p-2 min-h-20">
                                        <Select
                                            value={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                            styles={customStyles}
                                            formatOptionLabel={
                                                formatOptionLabel
                                            }
                                            placeholder="Cari siswa..."
                                            isClearable
                                            className="w-full z-20"
                                        />
                                        {/* <Popover
                                            open={open}
                                            onOpenChange={setOpen}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-fit justify-start"
                                                >
                                                    <StudentItem
                                                        studentId={value}
                                                    />
                                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                                        unfold_more
                                                    </span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-full p-0"
                                                align="start"
                                            ></PopoverContent>
                                        </Popover> */}
                                    </div>
                                </div>
                            </AspectRatio>
                        </div>
                        <AlertDialogDescription />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                variant={"default"}
                                onClick={() => connectStudentButton()}
                            >
                                Tambah
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
}

const StudentItem = ({ studentId }: { studentId: string }) => {
    const student: Student | undefined = students.find(
        (student) => student.id === studentId
    );

    return (
        <div className="w-full flex items-center gap-2 cursor-pointer">
            <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg ">
                <AspectRatio ratio={1 / 1}>
                    <Image
                        src={
                            student?.image || "/static/images/user-default.jpg"
                        }
                        alt="Child Profile"
                        fill={true}
                        className="rounded-lg object-cover"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <div className="flex flex-col items-start">
                <p>{student?.name || "Siswa"}</p>
                <Badge variant={"default"}>
                    {student?.category || "Kategori"}
                </Badge>
            </div>
        </div>
    );
};

{
    /* <Command className="w-96">
                                                    <div className="p-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Cari siswa..."
                                                            value={search}
                                                            onChange={(e) =>
                                                                setSearch(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full p-2 border-b border-gray-300 text-small"
                                                        />
                                                    </div>
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No results found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            <ScrollArea>
                                                                {filteredStudents.map(
                                                                    (
                                                                        student
                                                                    ) => (
                                                                        <CommandItem
                                                                            key={
                                                                                student.id
                                                                            }
                                                                            value={
                                                                                student.id
                                                                            }
                                                                            onSelect={(
                                                                                value
                                                                            ) => {
                                                                                setValue(
                                                                                    value
                                                                                );
                                                                                setOpen(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            <div className="w-full flex items-center gap-2 cursor-pointer">
                                                                                <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg ">
                                                                                    <AspectRatio
                                                                                        ratio={
                                                                                            1 /
                                                                                            1
                                                                                        }
                                                                                    >
                                                                                        <Image
                                                                                            src={
                                                                                                student.image
                                                                                            }
                                                                                            alt="Child Profile"
                                                                                            fill={
                                                                                                true
                                                                                            }
                                                                                            className="rounded-lg object-cover"
                                                                                            draggable={
                                                                                                false
                                                                                            }
                                                                                        />
                                                                                    </AspectRatio>
                                                                                </div>
                                                                                <div className="flex flex-col items-start">
                                                                                    <p>
                                                                                        {
                                                                                            student.name
                                                                                        }
                                                                                    </p>
                                                                                    <Badge
                                                                                        variant={
                                                                                            "default"
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            student.category
                                                                                        }
                                                                                    </Badge>
                                                                                </div>
                                                                            </div>
                                                                        </CommandItem>
                                                                    )
                                                                )}
                                                            </ScrollArea>
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command> */
}

///////////

{
    /* <Select>
                                            <SelectTrigger
                                                id="framework"
                                                className="h-fit"
                                            >
                                                <SelectValue placeholder="Pilih Anak" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Cari siswa..."
                                                        value={search}
                                                        onChange={(e) =>
                                                            setSearch(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full p-2 border-b border-gray-300 text-small"
                                                    />
                                                </div>
                                                {filteredStudents.map(
                                                    (student) => (
                                                        <SelectItem
                                                            key={student.id}
                                                            value={student.id}
                                                            defaultChecked
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg ">
                                                                    <AspectRatio
                                                                        ratio={
                                                                            1 /
                                                                            1
                                                                        }
                                                                    >
                                                                        <Image
                                                                            src={
                                                                                student.image
                                                                            }
                                                                            alt="Child Profile"
                                                                            fill={
                                                                                true
                                                                            }
                                                                            className="rounded-lg object-cover"
                                                                            draggable={
                                                                                false
                                                                            }
                                                                        />
                                                                    </AspectRatio>
                                                                </div>
                                                                <div className="flex flex-col items-start">
                                                                    <p>
                                                                        {
                                                                            student.name
                                                                        }
                                                                    </p>
                                                                    <Badge
                                                                        variant={
                                                                            "default"
                                                                        }
                                                                    >
                                                                        {
                                                                            student.category
                                                                        }
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select> */
}
