"use client";

import ChildCard from "@/components/elements/cards/ChildCard";
import { Child } from "@/types/children.types";
import { fetcher } from "@/utils/fetcher";
import useProfile from "@/utils/useProfile";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Template({}) {
    const [childs, setChilds] = useState<Child[]>();
    const { profile, isReady } = useProfile();

    const {
        data,
        isLoading,
    }: { data: { status: string; children: Child[] }; isLoading: boolean } =
        useSWR(
            isReady &&
                profile?.id &&
                `/api/parents/${profile?.id}/children?limit-rec=1&limit-assess=1`,
            fetcher
        );

    useEffect(() => {
        if (!isLoading && data?.children) {
            setChilds(data.children);
            // console.log(data.children);
        }
    }, [data, isLoading]);

    return (
        <div className="max-w-7xl mx-auto w-full min-h-svh flex justify-center items-center">
            {isLoading ? (
                <>
                    <div className="max-w-4xl w-full grid grid-cols-2 gap-2">
                        <div className="skeleton rounded-lg h-72 sm:h-96"></div>
                        <div className="skeleton rounded-lg h-72 sm:h-96"></div>
                    </div>
                </>
            ) : (
                <div
                    className={`max-w-4xl w-full mx-auto h-full mt-3 grid grid-cols-${
                        childs?.length == 0 || childs?.length == 1 ? "1" : "2"
                    } gap-2`}
                >
                    {!childs ||
                        (childs.length == 0 && (
                            <div className="flex items-center justify-center w-full">
                                <div className="max-w-md w-full border border-gray-300 rounded-lg p-2 dark:border-gray-600">
                                    <p className="text-center mb-2">
                                        Tidak ada data anak yang anda miliki
                                    </p>
                                    {/* <Button
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
                                    </Button> */}
                                </div>
                            </div>
                        ))}

                    {childs &&
                        childs.map((child) => (
                            <ChildCard key={child.id} child={child} />
                        ))}
                    {/* 
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
                    </div> */}
                </div>
            )}
        </div>
    );
}
