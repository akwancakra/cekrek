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
                                Akwan Cakra
                            </p>
                        </div>
                        <div className="divider my-1"></div>
                        <div className="grid grid-cols-3 gap-2 justify-between">
                            <div>
                                <p className="text-small -mb-1">Nama</p>
                                <p className="text-medium font-semibold tracking-tight">
                                    Akwan Cakra
                                </p>
                            </div>
                            <div>
                                <p className="text-small -mb-1">Nama</p>
                                <p className="text-medium font-semibold tracking-tight">
                                    Akwan Cakra
                                </p>
                            </div>
                            <div>
                                <p className="text-small -mb-1">Nama</p>
                                <p className="text-medium font-semibold tracking-tight">
                                    Akwan Cakra
                                </p>
                            </div>
                            <div className="col-span-3">
                                <p className="text-small -mb-1">Nama</p>
                                <p className="text-medium font-semibold tracking-tight">
                                    Akwan Cakra
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
