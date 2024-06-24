"use client";

import Clock from "@/components/elements/Clock";
import TeacherDashboardHeader from "@/components/elements/headers/TeacherDashboardHeader";
import StudentsGrid from "@/components/elements/tables-and-grids/StudentsGrid";
import StudentsTable from "@/components/elements/tables-and-grids/StudentsTable";

import { useState } from "react";

export default function HomeTeacher({}) {
    const [showType, setShowType] = useState("grid");

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
                />

                <span>
                    {showType === "grid" ? <StudentsGrid /> : <StudentsTable />}
                </span>
            </section>
        </>
    );
}
