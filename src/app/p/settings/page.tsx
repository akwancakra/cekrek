"use client";

import DeleteAccountDialog from "@/components/elements/alerts/DeleteAccountDialog";
import DeleteAccountDrawer from "@/components/elements/alerts/DeleteAccountDrawer";
import EditProfileDialog from "@/components/elements/alerts/EditProfileDialog";
import EditProfileDrawer from "@/components/elements/alerts/EditProfileDrawer";
import ThemeSelector from "@/components/elements/buttons/ThemeSelector";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useProfile from "@/utils/useProfile";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

export default function ParentSettings({}) {
    const { profile, isReady } = useProfile();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const { push } = useRouter();

    // const editAccountButton = () => {
    //     toast.success("Akun berhasil diubah!");
    // };

    const removeAccountButton = () => {
        toast.success("Akun berhasil dihapus!");
        push("/");
    };

    return (
        <section className="mx-auto max-w-7xl mb-4">
            <div className="rounded-lg p-4 w-full flex items-center bg-gradient-to-r from-purple-400 to-purple-600 h-28 sm:h-36">
                <div>
                    <p className="text-white text-sm -mb-1">Pengaturan</p>
                    <p className="font-semibold tracking-tight text-xl text-white">
                        CekRek
                    </p>
                </div>
            </div>
            <div className="my-5">
                <p className="text-large font-semibold tracking-tight">
                    Personalisasi
                </p>
                <div
                    className="divider my-0 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600
"
                />
                <div className="flex justify-between items-center my-3">
                    <p className="text-medium">Ubah tema</p>
                    <ThemeSelector />
                </div>
                <div className="flex justify-between items-center my-3">
                    <p className="text-medium">Ukuran font</p>
                    <Select disabled={true}>
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
                <p className="text-large font-semibold tracking-tight">Akun</p>
                <div className="divider my-0 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600" />
                <div className="flex justify-between items-center my-3">
                    <div>
                        <p className="text-medium">Info detil akun</p>
                        <p className="text-gray-400 text-small">
                            Ini untuk melakukan perubahan terhadap email dan
                            password anda.
                        </p>
                    </div>
                    <Button variant={"default"} asChild>
                        <Link href={"/p/settings/profile"}>
                            Detil{" "}
                            <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                                person
                            </span>
                        </Link>
                    </Button>
                </div>
                <div className="flex justify-between items-center my-3">
                    <div>
                        <p className="text-medium">Ubah akun</p>
                        <p className="text-gray-400 text-small">
                            Ini akan menampilkan seluruh informasi akun anda
                            secara detil.
                        </p>
                    </div>
                    {isDesktop ? (
                        <EditProfileDialog
                            // editAccountButton={editAccountButton}
                            profile={profile}
                        />
                    ) : (
                        <EditProfileDrawer
                            // editAccountButton={editAccountButton}
                            profile={profile}
                        />
                    )}
                </div>
                {/* <div className="flex justify-between items-center my-3">
                    <div>
                        <p className="text-medium">Info detil akun</p>
                        <p className="text-gray-400 text-small">
                            This will show you about your full account
                            informations
                        </p>
                    </div>
                    {isDesktop ? <InfoAccountDialog /> : <InfoAccountDrawer />}
                </div> */}
                {/* <div className="flex justify-between items-center my-3">
                    <div>
                        <p className="text-medium">Hapus akun saya</p>
                        <p className="text-gray-400 text-small">
                            Hapus akun akan menghapus semua data anda dan data
                            yang berkaitan dengan akun anda.
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
                </div> */}
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
