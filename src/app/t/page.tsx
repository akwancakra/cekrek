"use client";

import Clock from "@/components/elements/Clock";
import TeacherDashboardHeader from "@/components/elements/headers/TeacherDashboardHeader";
import StudentsGrid from "@/components/elements/tables-and-grids/StudentsGrid";
import StudentsTable from "@/components/elements/tables-and-grids/StudentsTable";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { useState } from "react";

export default function HomeTeacher({}) {
    const [showType, setShowType] = useState("grid");
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");

    // const { data, error, isLoading } = useQuery(['assessments'], fetchAssessments);

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
                <div className="h-32 overflow-hidden p-4 rounded-lg bg-gradient-to-b from-purple-200 to-purple-100 sm:h-64">
                    <p className="text-primary -mb-1">Selamat Pagi Guru</p>
                    <p className="text-primary font-semibold tracking-tight text-xl sm:text-3xl">
                        Nakula Sadewa
                    </p>
                </div>
                <Clock />
            </section>

            <section className="mx-auto max-w-7xl mb-4">
                <TeacherDashboardHeader
                    showType={showType}
                    setShowType={setShowType}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    handleSearch={handleSearch}
                    category={category}
                    setCategory={setCategory}
                />

                <span>
                    {showType === "grid" ? (
                        <StudentsGrid keyword={keyword} category={category} />
                    ) : (
                        <StudentsTable keyword={keyword} category={category} />
                    )}
                </span>
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
