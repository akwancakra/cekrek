"use client";

import Clock from "@/components/elements/Clock";
import TeacherDashboardHeader from "@/components/elements/headers/TeacherDashboardHeader";
import StudentCardSkeleton from "@/components/elements/skeletons/StudentCard";
import StudentsGrid from "@/components/elements/tables-and-grids/StudentsGrid";
import StudentsTable from "@/components/elements/tables-and-grids/StudentsTable";
import { Child } from "@/types/children.types";
import { fetcher } from "@/utils/fetcher";
import useProfile from "@/utils/useProfile";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export default function HomeTeacher({}) {
    const [showType, setShowType] = useState("grid");
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [students, setStudents] = useState<Child[]>([]);
    // const [studentsFull, setStudentsFull] = useState<Child[]>([]);
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
    const { profile, isReady } = useProfile();

    const {
        data,
        isLoading,
        mutate,
    }: {
        data: { status: string; children: Child[] };
        isLoading: boolean;
        mutate: () => void;
    } = useSWR(
        isReady && profile?.id && `/api/teachers/${profile?.id}/students`,
        fetcher
    );

    // const {
    //     data: fullStudents,
    //     isLoading: isLoadingFull,
    // }: { data: { status: string; children: Child[] }; isLoading: boolean } =
    //     useSWR(`/api/children?plain=true`, fetcher);

    const removeStudent = async (studentId: string) => {
        if (isReady && profile?.id) {
            await axios
                .put(`/api/teachers/${profile.id}/students/${studentId}/delete`)
                .then(() => {
                    toast.success("Siswa berhasil dihapus!");
                    setIsLoadingPost(false);

                    mutate();
                })
                .catch((err) => {
                    if (err?.response.status === 400) {
                        toast.error(err?.response?.data?.message);
                    } else if (err?.response.status === 500) {
                        toast.error("Server Error");
                    } else {
                        toast.error("Terjadi kesalahan");
                    }
                    setIsLoadingPost(false);
                });
        }
    };

    useEffect(() => {
        // && fullStudents
        if (data && !isLoading) {
            // Filter out children from fullStudents that are already in data.children
            // const filteredStudentsFull = fullStudents.children.filter(
            //     (fullStudent) =>
            //         data.children.every(
            //             (student) => student.id !== fullStudent.id
            //         )
            // );

            setStudents(data.children);
            // setStudentsFull(filteredStudentsFull);
        }
    }, [data, isLoading]);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            keyword: { value: string };
        };
        setKeyword(target.keyword.value);
    };

    return (
        <>
            <section className="mx-auto max-w-7xl mb-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="h-32 overflow-hidden p-4 rounded-lg bg-gradient-to-br from-purple-200 to-purple-100 sm:h-64 dark:from-purple-900 dark:to-purple-400">
                    <p className="text-primary -mb-1 dark:text-purple-100">
                        Selamat Pagi Guru
                    </p>
                    <p className="text-primary font-semibold tracking-tight text-xl sm:text-3xl dark:text-purple-100">
                        {profile?.name || "Guru"}
                    </p>
                </div>
                <Clock />
            </section>

            <section className="mx-auto max-w-7xl mb-4">
                {isLoading ? (
                    <>
                        <div className="flex gap-2 justify-between items-center mb-3">
                            <div>
                                <div className="skeleton rounded-lg w-36 h-9"></div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="skeleton rounded-lg w-20 h-9"></div>
                                <div className="skeleton rounded-lg w-40 h-9 hidden sm:block"></div>
                            </div>
                        </div>
                        <div className="skeleton rounded-lg w-full h-9 mb-3 block sm:hidden"></div>
                    </>
                ) : (
                    <TeacherDashboardHeader
                        showType={showType}
                        setShowType={setShowType}
                        keyword={keyword}
                        setKeyword={setKeyword}
                        handleSearch={handleSearch}
                        category={category}
                        setCategory={setCategory}
                        students={students}
                        // studentsFull={studentsFull}
                        mutate={mutate}
                    />
                )}

                {/* || isLoadingFull */}
                {isLoading ? (
                    <>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 group-[.open]:grid-cols-2 md:group-[.open]:grid-cols-3 lg:group-[.open]:grid-cols-6">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <StudentCardSkeleton key={i} />
                            ))}
                        </div>
                    </>
                ) : (
                    <span>
                        {showType === "grid" ? (
                            <StudentsGrid
                                students={students}
                                keyword={keyword}
                                category={category}
                                removeStudent={removeStudent}
                            />
                        ) : (
                            <StudentsTable
                                keyword={keyword}
                                link={`/api/teachers/${profile?.id}/students`}
                                role="t"
                            />
                        )}
                    </span>
                )}
            </section>
        </>
    );
}

{
    /* <QueryClientProvider client={queryClient}>
    <YourMainComponent />
</QueryClientProvider> */
}

// const fetchAssessments = async (page = 1, limit = 10) => {
//     const { data } = await axios.get("/api/assessments", {
//         params: { page, limit },
//     });

//     return data;
// };
