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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Template({}) {
    const removeAccountButton = () => {
        console.log("Account Remove Button Clicked!");
    };

    return (
        <section className="mx-auto max-w-7xl mb-4">
            <div className="rounded-lg p-4 w-full flex items-center bg-gradient-to-r from-purple-400 to-purple-600 h-28 sm:h-36">
                <div>
                    <p className="text-white text-sm -mb-1">Settings</p>
                    <p className="font-semibold tracking-tight text-xl text-white">
                        CekRek
                    </p>
                </div>
            </div>
            <div className="my-5">
                <p className="text-large font-semibold tracking-tight">
                    Personalize
                </p>
                <div className="divider my-0" />
                <div className="flex justify-between items-center my-3">
                    <p className="text-medium">Change Theme</p>
                    <Select>
                        <SelectTrigger className="w-fit min-w-24">
                            <SelectValue placeholder="Tema Terang (Utama)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light" defaultChecked={true}>
                                Tema Terang
                            </SelectItem>
                            <SelectItem value="dark">Tema Gelap</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* <div className="flex justify-between items-center my-3">
                    <p>Primary Color</p>
                    <Select>
                        <SelectTrigger className="w-fit min-w-24">
                            <SelectValue placeholder="Pilih Minggu" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Min 1 - Mar</SelectItem>
                            <SelectItem value="dark">Min 2 - Mar</SelectItem>
                            <SelectItem value="system" defaultChecked={true}>
                                Min 3 - Mar
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}
                <div className="flex justify-between items-center my-3">
                    <p className="text-medium">Font Size</p>
                    <Select>
                        <SelectTrigger className="w-fit min-w-24">
                            <SelectValue placeholder="14px Medium (Utama)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">12px Medium</SelectItem>
                            <SelectItem value="dark">14px Medium</SelectItem>
                            <SelectItem value="system" defaultChecked={true}>
                                16px Medium
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <p className="text-large font-semibold tracking-tight">
                    Account
                </p>
                <div className="divider my-0" />
                <div className="flex justify-between items-center my-3">
                    <div>
                        <p className="text-medium">Detail account info</p>
                        <p className="text-gray-400 text-small">
                            This will show you about your full account
                            informations
                        </p>
                    </div>
                    <Button
                        variant={"default"}
                        className="bg-primary text-white hover:bg-primary-foreground"
                    >
                        Info
                        <span className="material-symbols-outlined ms-1 !leading-none !text-lg hover:no-underline">
                            info
                        </span>
                    </Button>
                </div>
                <div className="flex justify-between items-center my-3">
                    <div>
                        <p className="text-medium">Remove my account</p>
                        <p className="text-gray-400 text-small">
                            This action will remove your account permanently,
                            and can’t undo
                        </p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant={"default"}
                                className="bg-red-500 text-white hover:bg-red-700"
                            >
                                Hapus
                                <span className="material-symbols-outlined ms-1 !leading-none !text-lg hover:no-underline">
                                    delete
                                </span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Apakah kamu yakin?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Ini akan menghapus data akunmu{" "}
                                    <span className="font-semibold">
                                        Dwiky Putra
                                    </span>{" "}
                                    dan tidak bisa dikembalikan, dan berikut
                                    rincian data yang akan dihapus:
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
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button
                                        variant={"destructive"}
                                        onClick={() => removeAccountButton()}
                                        className="bg-red-500 text-white hover:bg-red-700"
                                    >
                                        Hapus
                                    </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </section>
    );
}
