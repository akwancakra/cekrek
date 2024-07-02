"use client";

import { forwardRef } from "react";
import { ChildAssesment } from "@/types/childAssesment.type";
import { getRiskCategory, getScoreAssessments } from "@/utils/converters";
import { formattedDate } from "@/utils/formattedDate";
import { Child } from "@/types/children.types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type ValuesAssessment = {
    date: Date;
    child: Child;
    childAssessment: ChildAssesment[];
};

interface AssessmentPrintProps {
    values: ValuesAssessment;
}

const AssessmentPrint = forwardRef<HTMLDivElement, AssessmentPrintProps>(
    ({ values }, ref) => {
        return (
            <>
                <div className="hidden h-0 overflow-hidden">
                    <div ref={ref} className="w-full">
                        <div>
                            <p className="text-small text-gray-400 -mb-1">
                                Nama
                            </p>
                            <p className="text-large font-semibold tracking-tight">
                                {values.child.full_name}
                            </p>
                        </div>
                        <div className="divider my-1"></div>
                        <div className="grid grid-cols-3 gap-2 w-full h-full">
                            <div>
                                <p className="text-small text-gray-400 -mb-1">
                                    Skor
                                </p>
                                <p className="text-large font-semibold tracking-tight">
                                    {getScoreAssessments({
                                        childAssesment: values.childAssessment,
                                        type: "awal",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-small text-gray-400 -mb-1">
                                    Kategori
                                </p>
                                <p className="text-large font-semibold tracking-tight">
                                    {getRiskCategory({
                                        childAssesment: values.childAssessment,
                                        type: "awal",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-small text-gray-400 -mb-1">
                                    Tanggal Tes
                                </p>
                                <p className="text-large font-semibold tracking-tight">
                                    {values?.date?.toString()
                                        ? formattedDate(values.date.toString())
                                        : ""}
                                </p>
                            </div>
                        </div>
                        <div className="divider my-1"></div>
                        <div>
                            <p className="text-large font-semibold tracking-tight">
                                Daftar asesmen
                            </p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Pertanyaan</TableHead>
                                    <TableHead>Hasil</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {values.childAssessment.map((chass) => (
                                    <TableRow key={chass.id}>
                                        <TableCell className="font-medium">
                                            {chass.assesment?.assesment_number}
                                        </TableCell>
                                        <TableCell>
                                            {chass.assesment?.question}
                                        </TableCell>
                                        <TableCell>{chass.answer}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* <div className="page-break"></div> */}
                        {/* <div className="mt-[20mm]">
                            <p className="text-large font-semibold tracking-tight">
                                {values.createdAt}
                            </p>
                        </div> */}
                    </div>
                </div>
            </>
        );
    }
);

AssessmentPrint.displayName = "AssessmentPrint";

export { AssessmentPrint };
