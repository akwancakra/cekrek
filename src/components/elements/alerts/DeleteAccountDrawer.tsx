"use client";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function DeleteAccountDrawer({
    removeAccountButton,
}: {
    removeAccountButton: () => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant={"default"}
                    className="bg-red-500 text-white gap-1 hover:bg-red-600 hover:text-white"
                >
                    <span>Hapus</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        delete
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
                <ScrollArea className="max-h-[70vh] p-0">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Hapus akun</DrawerTitle>
                        <DrawerDescription>
                            <div>
                                Ini akan menghapus data akunmu{" "}
                                <span className="font-semibold">
                                    Dwiky Putra
                                </span>{" "}
                                dan tidak bisa dikembalikan, dan berikut rincian
                                data yang akan dihapus:
                                <span className="block mt-1">
                                    &gt; Data profil orang tua
                                </span>
                                <span className="block mt-1">
                                    &gt; Data profil anak
                                </span>
                                <span className="block">
                                    &gt; Data riwayat asesmen
                                </span>
                                <span className="block">
                                    &gt; Data rekomendasi
                                </span>
                            </div>
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <Button
                            variant={"default"}
                            onClick={() => removeAccountButton()}
                            className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                        >
                            Hapus
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline" className="text-medium">
                                Batal
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
