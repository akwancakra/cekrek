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
    students: Child[];
    keyword: string;
    category: string;
    removeStudent: (id: string) => void;
}

export default function StudentsGrid({
    students,
    keyword,
    category,
    removeStudent,
}: StudentGridType) {
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
    }, [students, keyword, category]);

    return (
        <>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 group-[.open]:grid-cols-2 md:group-[.open]:grid-cols-3 lg:group-[.open]:grid-cols-6">
                {filteredData.map((item) => (
                    <StudentCard
                        key={item.id}
                        student={item}
                        removeStudent={removeStudent}
                    />
                ))}
            </div>

            {/* <Pagination className="mt-5">
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
            </Pagination> */}
        </>
    );
}
