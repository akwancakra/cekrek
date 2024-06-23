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

interface StudentGridType {}

export default function StudentsGrid({}: StudentGridType) {
    return (
        <>
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
        </>
    );
}
