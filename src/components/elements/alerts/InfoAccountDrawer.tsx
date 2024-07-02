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
import { useState } from "react";

export default function InfoAccountDrawer({}) {
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
                                    <p className="text-small -mb-1">
                                        Total Anak
                                    </p>
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
