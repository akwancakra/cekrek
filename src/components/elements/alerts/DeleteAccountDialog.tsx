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

export default function DeleteAccountDialog({
    removeAccountButton,
}: {
    removeAccountButton: () => void;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {/* <Button>Apus</Button> */}
                <Button
                    variant={"default"}
                    className="bg-red-500 text-white gap-1 hover:bg-red-600 hover:text-white"
                >
                    <span>Hapus</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        delete
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <ScrollArea className="max-h-[80vh] p-3">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ini akan menghapus data akunmu{" "}
                            <span className="font-semibold">Dwiky Putra</span>{" "}
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
                            <span className="block">&gt; Data rekomendasi</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            {/* <Button>Apus</Button> */}

                            <Button
                                variant={"destructive"}
                                onClick={() => removeAccountButton()}
                                className="bg-red-500 text-white hover:bg-red-700"
                            >
                                Hapus
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
}
