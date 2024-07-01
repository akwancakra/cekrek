import ChildCard from "@/components/elements/cards/ChildCard";
import { Button } from "@/components/ui/button";
import { Child } from "@/types/children.types";
import Link from "next/link";

const childs: Child[] = [
    {
        id: 1,
        full_name: "Aulia Rahman",
        teacher_id: 2,
        nick_name: "Aul",
        picture: "default.jpg",
        gender: "Laki-laki",
        place_birth: "Jakarta",
        date_time_birth: new Date("2010-05-12"),
        religion: "Islam",
        count_of_siblings: 2,
        risk_category: "sedang",
        hearing_test: "pendengaran dalam batas normal",
    },
    {
        id: 23,
        full_name: "Fakhri Rahman",
        teacher_id: 2,
        nick_name: "Aul",
        picture: "default.jpg",
        gender: "Laki-laki",
        place_birth: "Jakarta",
        date_time_birth: new Date("2010-05-12"),
        religion: "Islam",
        count_of_siblings: 2,
        risk_category: "sedang",
        hearing_test: "pendengaran dalam batas normal",
    },
];

export default function Template({}) {
    return (
        <div className="max-w-7xl mx-auto w-full min-h-svh flex justify-center items-center">
            <div
                className={`max-w-4xl w-full mx-auto h-full mt-3 grid grid-cols-${
                    childs.length == 0 || childs.length == 1 ? "1" : "2"
                } gap-2`}
            >
                {childs.length == 0 && (
                    <div className="flex items-center justify-center w-full">
                        <div className="max-w-md w-full border border-gray-300 rounded-lg p-2">
                            <p className="text-center mb-2">
                                Tidak ada data anak yang anda miliki
                            </p>
                            <Button
                                variant={"default"}
                                className="w-full"
                                asChild
                            >
                                <Link href={"/p/childs/add"}>
                                    Tambah Anak{" "}
                                    <span className="material-symbols-outlined ms-1 !leading-none !text-xl hover:no-underline">
                                        folder_open
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}

                {childs.map((child) => (
                    <ChildCard key={child.id} child={child} />
                ))}

                <div className="flex justify-center items-center col-span-2">
                    <Button variant={"default"} asChild>
                        <Link
                            href={"/p/childs/add"}
                            className="w-fit gap-1 text-small"
                        >
                            <span>Tambah anak</span>
                            <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                                person_add
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
