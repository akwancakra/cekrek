"use client";

import AssessmentHistoryTable from "@/components/elements/tables-and-grids/AssessmentHistoryTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Assessments() {
    const [keyword, setKeyword] = useState("");

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            keyword: { value: string };
        };
        setKeyword(target.keyword.value);
    };

    return (
        <>
            <section className="mx-auto max-w-7xl mb-4">
                <div className="rounded-lg mb-3 p-4 w-full flex items-center bg-gradient-to-r from-purple-400 to-purple-600 h-28 sm:h-36">
                    <div>
                        <p className="text-white text-sm -mb-1">
                            Riwayat Asesmen
                        </p>
                        <p className="font-semibold tracking-tight text-xl text-white">
                            CekRek
                        </p>
                    </div>
                </div>

                <div className="flex justify-between mb-3">
                    <p className="text-large font-semibold tracking-tight">
                        Riwayat Asesmen
                    </p>

                    <div className="flex items-center gap-2">
                        <form className="w-full" onSubmit={handleSearch}>
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

                <AssessmentHistoryTable keyword={keyword} />
            </section>
        </>
    );
}
