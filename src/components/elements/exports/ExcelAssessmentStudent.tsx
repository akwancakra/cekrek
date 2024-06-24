import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Assessment } from "@/types/assessment.types";
import { useCallback, useRef } from "react";
import * as XLSX from "xlsx";

interface ExcelAssessmentStudentProps {
    assessment: Assessment;
}

export default function ExcelAssessmentStudent({
    assessment,
}: ExcelAssessmentStudentProps) {
    const tbl = useRef<HTMLTableElement>(null);

    const xport = useCallback(() => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([
            ["SLB Satria Galdin"],
            ["Alamat"],
            [" "],
        ]);

        // Merge cells for headers
        ws["!merges"] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
            { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
            { s: { r: 2, c: 0 }, e: { r: 2, c: 4 } },
        ];

        // Center align header cells
        ws["A1"].s = { alignment: { horizontal: "center" } };
        ws["A2"].s = { alignment: { horizontal: "center" } };

        // Convert table to workbook
        const tblData = XLSX.utils.table_to_sheet(tbl.current);

        // Convert table data to array of arrays
        const tableData = XLSX.utils.sheet_to_json(tblData, {
            header: 1,
        }) as any[][];

        // Append table data to worksheet starting from row 5
        XLSX.utils.sheet_add_aoa(ws, tableData, { origin: -1 });

        // Calculate column widths
        const colWidths = [
            { wch: 5 },
            { wch: 20 },
            { wch: 40 },
            { wch: 15 },
            { wch: 20 },
        ];

        // Apply column widths
        ws["!cols"] = colWidths;

        // Convert date column (index 4, assuming Tanggal Tes is in the 5th column)
        tableData.forEach((row, index) => {
            if (index > 0 && row[4]) {
                // Skip header row and check if date exists
                const date = new Date(row[4]);
                if (!isNaN(date.getTime())) {
                    const dateCell = XLSX.utils.encode_cell({
                        r: index + 3,
                        c: 4,
                    });
                    if (!ws[dateCell]) ws[dateCell] = {};
                    ws[dateCell].v = date;
                    ws[dateCell].t = "d";
                    ws[dateCell].z = "dd/mm/yyyy hh:mm"; // Set the desired date format
                }
            }
        });

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Asesmen Siswa");

        // Write workbook to file
        XLSX.writeFile(wb, "Asesmen-Siswa-Udin.xlsx");
    }, []);

    return (
        <>
            <DropdownMenuItem onClick={xport} className="cursor-pointer gap-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    className="fill-green-500"
                    viewBox="0 0 16 16"
                >
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64" />
                </svg>
                <span>Unduh excel</span>
            </DropdownMenuItem>

            <Table ref={tbl} className="hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Tanggal Tes</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow key={assessment.id}>
                        <TableCell className="font-medium">
                            {assessment.id}
                        </TableCell>
                        <TableCell>{assessment.title}</TableCell>
                        <TableCell>{assessment.description}</TableCell>
                        <TableCell>{assessment.category}</TableCell>
                        <TableCell>
                            {new Date(assessment.createdAt).toLocaleString(
                                "id-ID",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}
