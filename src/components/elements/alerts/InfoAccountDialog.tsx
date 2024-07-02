"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function InfoAccountDialog({}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"default"} className="gap-1">
                    <span>Info</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        info
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <ScrollArea className="max-h-[80vh] p-3">
                    <AlertDialogHeader className="m-1">
                        <AlertDialogTitle className="hidden">
                            Info Akun
                        </AlertDialogTitle>
                        <div>
                            <p className="text-small -mb-1">Nama</p>
                            <p className="text-medium font-semibold tracking-tight">
                                Sumarni
                            </p>
                        </div>
                        <div className="divider my-1"></div>
                        <div className="grid grid-cols-3 gap-2 justify-between">
                            <div>
                                <p className="text-small -mb-1">E-mail</p>
                                <p className="text-medium font-semibold tracking-tight">
                                    sumarni@mail.com
                                </p>
                            </div>
                            <div>
                                <p className="text-small -mb-1">
                                    Jenis Kelamin
                                </p>
                                <p className="text-medium font-semibold tracking-tight">
                                    Perempuan
                                </p>
                            </div>
                            <div>
                                <p className="text-small -mb-1">Total Anak</p>
                                <p className="text-medium font-semibold tracking-tight">
                                    3 Anak
                                </p>
                            </div>
                            <div className="col-span-3">
                                <p className="text-small -mb-1">Alamat</p>
                                <p className="text-medium font-semibold tracking-tight">
                                    Jl. H. Pukis No.13
                                </p>
                            </div>
                        </div>
                        <AlertDialogDescription />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Tutup</AlertDialogCancel>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
}
