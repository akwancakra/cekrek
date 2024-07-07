"use client";

import {
    AlertDialog,
    AlertDialogAction,
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

export default function AddAccountDialog({
    addAccountButton,
}: {
    addAccountButton: () => void;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="gap-1 text-small hidden sm:inline-flex group-[.open]:hidden md:group-[.open]:inline-flex"
                >
                    <span>Tambah akun</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                        person_add
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <ScrollArea className="max-h-[80vh] p-3">
                    <AlertDialogHeader className="m-1">
                        <AlertDialogTitle>Tambah Akun</AlertDialogTitle>
                        <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
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
                        <AlertDialogDescription />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                variant={"default"}
                                onClick={() => addAccountButton()}
                            >
                                Tambah
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
}
