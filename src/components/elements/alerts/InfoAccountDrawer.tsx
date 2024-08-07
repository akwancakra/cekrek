"use client";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/types/user.types";
import { formattedDate } from "@/utils/formattedDate";
import { useState } from "react";

interface Props {
    profile: User;
}

export default function InfoAccountDrawer({ profile }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant={"default"} className="gap-1">
                    <span>Info</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        info
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
                <ScrollArea className="max-h-[70vh] p-0">
                    <DrawerHeader className="text-left">
                        <DrawerDescription>
                            <div className="col-span-3">
                                <p className="text-small -mb-1">Nama</p>
                                <p className="text-medium font-semibold tracking-tight break-words">
                                    {profile?.name || "N/A"}
                                </p>
                            </div>
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                            <div className="grid grid-cols-3 gap-2 justify-between">
                                <div>
                                    <p className="text-small -mb-1">E-mail</p>
                                    <p className="text-medium font-semibold tracking-tight break-words">
                                        {profile?.email || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-small -mb-1">
                                        Peran Akun
                                    </p>
                                    <p className="text-medium font-semibold tracking-tight break-words">
                                        {profile?.role || "N/A"}
                                    </p>
                                </div>
                                {profile?.role === "parent" && (
                                    <div>
                                        <p className="text-small -mb-1">Tipe</p>
                                        <p className="text-medium font-semibold tracking-tight break-words">
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
                                            <p className="text-medium font-semibold tracking-tight break-words">
                                                {profile?.religion || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-small -mb-1">
                                                Pendidikan
                                            </p>
                                            <p className="text-medium font-semibold tracking-tight break-words">
                                                {profile?.education || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-small -mb-1">
                                                Pekerjaan
                                            </p>
                                            <p className="text-medium font-semibold tracking-tight break-words">
                                                {profile?.job || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-small -mb-1">
                                                Tempat Lahir
                                            </p>
                                            <p className="text-medium font-semibold tracking-tight break-words">
                                                {profile?.place_birth || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-small -mb-1">
                                                Tgl Lahir
                                            </p>
                                            <p className="text-medium font-semibold tracking-tight break-words">
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
                                            <p className="text-medium font-semibold tracking-tight break-words">
                                                {profile?.phone || "N/A"}
                                            </p>
                                        </div>
                                        <div className="col-span-3">
                                            <p className="text-small -mb-1">
                                                Alamat
                                            </p>
                                            <p className="text-medium font-semibold tracking-tight break-words">
                                                {profile?.address || "N/A"}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline" className="text-medium">
                                Tutup
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
