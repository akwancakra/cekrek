import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import StudentCard from "../cards/StudentCard";
import { useMemo } from "react";
import { Child } from "@/types/children.types";

interface StudentGridType {
    keyword: string;
    category: string;
}

const students: Child[] = [
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
        risk_category: "rendah",
        hearing_test: "pendengaran dalam batas normal",
    },
    {
        id: 2,
        full_name: "Padang Bulan",
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
        id: 3,
        full_name: "Bismillah Aja",
        teacher_id: 2,
        nick_name: "Aul",
        picture: "default.jpg",
        gender: "Laki-laki",
        place_birth: "Jakarta",
        date_time_birth: new Date("2010-05-12"),
        religion: "Islam",
        count_of_siblings: 2,
        risk_category: "tinggi",
        hearing_test: "pendengaran dalam batas normal",
    },
];

export default function StudentsGrid({ keyword, category }: StudentGridType) {
    const filteredData = useMemo(() => {
        if (!keyword && !category) return students;
        return students.filter((item) => {
            const matchesKeyword = item.full_name
                .toLowerCase()
                .includes(keyword.toLowerCase());
            const matchesCategory =
                !category || item.risk_category === category;
            return matchesKeyword && matchesCategory;
        });
    }, [keyword, category]);

    return (
        <>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 group-[.open]:grid-cols-2 md:group-[.open]:grid-cols-3 lg:group-[.open]:grid-cols-6">
                {filteredData.map((item) => (
                    <StudentCard key={item.id} student={item} />
                ))}
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
        </>
    );
}
