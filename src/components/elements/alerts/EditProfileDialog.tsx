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

export default function EditProfileDialog({
    editAccountButton,
}: {
    editAccountButton: () => void;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"default"}
                    className="bg-yellow-300 text-yellow-800 gap-1 hover:bg-yellow-400 hover:text-yellow-900"
                >
                    <span>Ubah</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        edit
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <ScrollArea className="max-h-[80vh] p-3">
                    <AlertDialogHeader className="m-1">
                        <AlertDialogTitle>Ubah Profil</AlertDialogTitle>
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
                        <AlertDialogDescription />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                variant={"default"}
                                onClick={() => editAccountButton()}
                                className="bg-yellow-300 text-yellow-800 hover:bg-yellow-400 hover:text-yellow-900"
                            >
                                Ubah
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
}
