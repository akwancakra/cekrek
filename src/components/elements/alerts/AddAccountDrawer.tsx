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

export default function AddAccountDrawer({
    addAccountButton,
}: {
    addAccountButton: () => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant={"outline"}
                    className="gap-1 text-small inline-flex sm:hidden group-[.open]:inline-flex md:group-[.open]:hidden"
                >
                    <span>Tambah akun</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                        person_add
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
                <ScrollArea className="max-h-[70vh] p-0">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Tambah Akun</DrawerTitle>
                        <div className="divider my-1"></div>
                        <div>
                            <label className="form-control w-full mb-3">
                                <div className="label">
                                    <span className="label-text">Nama</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="John doe..."
                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                    name="name"
                                />
                            </label>
                            <label className="form-control w-full mb-3">
                                <div className="label">
                                    <span className="label-text">E-mail</span>
                                </div>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                    name="email"
                                />
                            </label>
                            <label className="form-control w-full mb-3">
                                <div className="label">
                                    <span className="label-text">
                                        Kata Sandi
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password kamu..."
                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                    name="password"
                                />
                            </label>
                            <label className="form-control w-full mb-3">
                                <div className="label">
                                    <span className="label-text">
                                        Konfirmasi Kata Sandi
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password kamu..."
                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                    name="passwordConfirmation"
                                />
                            </label>
                        </div>
                        <DrawerDescription />
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <Button
                            variant={"default"}
                            onClick={() => addAccountButton()}
                        >
                            Tambah
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
