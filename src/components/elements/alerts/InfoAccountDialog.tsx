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
import { User } from "@/types/user.types";
import { formattedDate } from "@/utils/formattedDate";

interface Props {
    profile: User;
}

export default function InfoAccountDialog({ profile }: Props) {
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
                                {profile?.name || "N/A"}
                            </p>
                        </div>
                        <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                        <div className="grid grid-cols-3 gap-2 justify-between">
                            <div>
                                <p className="text-small -mb-1">E-mail</p>
                                <p className="text-medium font-semibold tracking-tight">
                                    {profile?.email || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-small -mb-1">Peran Akun</p>
                                <p className="text-medium font-semibold tracking-tight">
                                    {profile?.role || "N/A"}
                                </p>
                            </div>
                            {profile?.role === "parent" && (
                                <div>
                                    <p className="text-small -mb-1">Tipe</p>
                                    <p className="text-medium font-semibold tracking-tight">
                                        {profile?.type || "N/A"}
                                    </p>
                                </div>
                            )}
                            {profile?.role != "admin" && (
                                <>
                                    <div>
                                        <p className="text-small -mb-1">
                                            Agama
                                        </p>
                                        <p className="text-medium font-semibold tracking-tight">
                                            {profile?.religion || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-small -mb-1">
                                            Pendidikan
                                        </p>
                                        <p className="text-medium font-semibold tracking-tight">
                                            {profile?.education || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-small -mb-1">
                                            Pekerjaan
                                        </p>
                                        <p className="text-medium font-semibold tracking-tight">
                                            {profile?.job || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-small -mb-1">
                                            Tempat Lahir
                                        </p>
                                        <p className="text-medium font-semibold tracking-tight">
                                            {profile?.place_birth || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-small -mb-1">
                                            Tgl Lahir
                                        </p>
                                        <p className="text-medium font-semibold tracking-tight">
                                            {profile?.date_time_birth &&
                                            typeof profile?.date_time_birth !=
                                                "string"
                                                ? formattedDate(
                                                      profile?.date_time_birth.toString()
                                                  )
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-small -mb-1">
                                            No. Tlp
                                        </p>
                                        <p className="text-medium font-semibold tracking-tight">
                                            {profile?.phone || "N/A"}
                                        </p>
                                    </div>
                                    <div className="col-span-3">
                                        <p className="text-small -mb-1">
                                            Alamat
                                        </p>
                                        <p className="text-medium font-semibold tracking-tight">
                                            {profile?.address || "N/A"}
                                        </p>
                                    </div>
                                </>
                            )}
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
