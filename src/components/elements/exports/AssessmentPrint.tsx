"use client";

import { forwardRef } from "react";
import { Assessment } from "@/types/assessment.types";

interface AssessmentPrintProps {
    values: Assessment;
}

const AssessmentPrint = forwardRef<HTMLDivElement, AssessmentPrintProps>(
    ({ values }, ref) => {
        return (
            <>
                <div className="hidden h-0 overflow-hidden">
                    <div ref={ref} className="w-full">
                        <div>
                            <p className="text-small text-gray-400 -mb-1">ID</p>
                            <p className="text-large font-semibold tracking-tight">
                                {values.id}
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 w-full h-full">
                            <div>
                                <p className="text-small text-gray-400 -mb-1">
                                    Title
                                </p>
                                <p className="text-large font-semibold tracking-tight">
                                    {values.title}
                                </p>
                            </div>
                            <div>
                                <p className="text-small text-gray-400 -mb-1">
                                    Description
                                </p>
                                <p className="text-large font-semibold tracking-tight">
                                    {values.description}
                                </p>
                            </div>
                            <div>
                                <p className="text-small text-gray-400 -mb-1">
                                    Category
                                </p>
                                <p className="text-large font-semibold tracking-tight">
                                    {values.category}
                                </p>
                            </div>
                        </div>
                        <div className="divider my-1"></div>
                        <div className="page-break"></div>
                        <div className="mt-[20mm]">
                            <p className="text-large font-semibold tracking-tight">
                                {values.createdAt}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
);

AssessmentPrint.displayName = "AssessmentPrint";

export { AssessmentPrint };
