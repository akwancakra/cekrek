"use client";

import DeleteAccountDialog from "@/components/elements/alerts/DeleteAccountDialog";
import DeleteAccountDrawer from "@/components/elements/alerts/DeleteAccountDrawer";
import EditProfileDialog from "@/components/elements/alerts/EditProfileDialog";
import EditProfileDrawer from "@/components/elements/alerts/EditProfileDrawer";
import InfoAccountDialog from "@/components/elements/alerts/InfoAccountDialog";
import InfoAccountDrawer from "@/components/elements/alerts/InfoAccountDrawer";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { signOut } from "next-auth/react";
import { useMediaQuery } from "usehooks-ts";

export default function TeacherSettings({}) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const editAccountButton = () => {
        console.log("Account Edit Button Clicked!");
    };

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
                            <SelectItem value="system">Tema Sistem</SelectItem>
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
                            <SelectItem value="light">12px Small</SelectItem>
                            <SelectItem value="dark">14px Normal</SelectItem>
                            <SelectItem value="system" defaultChecked={true}>
                                16px Large
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
                        <p className="text-medium">Ubah akun</p>
                        <p className="text-gray-400 text-small">
                            This action will remove your account permanently,
                            and can’t undo
                        </p>
                    </div>
                    {isDesktop ? (
                        <EditProfileDialog
                            editAccountButton={editAccountButton}
                        />
                    ) : (
                        <EditProfileDrawer
                            editAccountButton={editAccountButton}
                        />
                    )}
                </div>
                <div className="flex justify-between items-center my-3">
                    <div>
                        <p className="text-medium">Info detil akun</p>
                        <p className="text-gray-400 text-small">
                            This will show you about your full account
                            informations
                        </p>
                    </div>
                    {isDesktop ? <InfoAccountDialog /> : <InfoAccountDrawer />}
                </div>
                <div className="flex justify-between items-center my-3">
                    <div>
                        <p className="text-medium">Hapus akun saya</p>
                        <p className="text-gray-400 text-small">
                            This action will remove your account permanently,
                            and can’t undo
                        </p>
                    </div>
                    {isDesktop ? (
                        <DeleteAccountDialog
                            removeAccountButton={removeAccountButton}
                        />
                    ) : (
                        <DeleteAccountDrawer
                            removeAccountButton={removeAccountButton}
                        />
                    )}
                </div>
                <div className="flex justify-between items-center my-3">
                    <p className="text-medium">Keluar akun</p>
                    <Button
                        variant={"default"}
                        className="gap-1 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                        <span>Keluar</span>
                        <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                            logout
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    );
}
