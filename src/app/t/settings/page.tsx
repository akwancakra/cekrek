"use client";

import DeleteAccountDialog from "@/components/elements/alerts/DeleteAccountDialog";
import DeleteAccountDrawer from "@/components/elements/alerts/DeleteAccountDrawer";
import EditProfileDialog from "@/components/elements/alerts/EditProfileDialog";
import EditProfileDrawer from "@/components/elements/alerts/EditProfileDrawer";
import InfoAccountDialog from "@/components/elements/alerts/InfoAccountDialog";
import InfoAccountDrawer from "@/components/elements/alerts/InfoAccountDrawer";
import ThemeSelector from "@/components/elements/buttons/ThemeSelector";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/user.types";
import { fetcher } from "@/utils/fetcher";
import useProfile from "@/utils/useProfile";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import useSWR from "swr";
import { useMediaQuery } from "usehooks-ts";

export default function TeacherSettings({}) {
    const { profile, isReady } = useProfile();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const {
        data,
        isLoading,
    }: { data: { status: string; user: User }; isLoading: boolean } = useSWR(
        isReady && profile?.id && `/api/users/${profile?.id}`,
        fetcher
    );

    const removeAccountButton = () => {
        toast.success("Akun berhasil dihapus！");
        console.log("Account Remove Button Clicked!");
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
                <div className="divider my-0 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600" />
                <div className="flex justify-between items-center my-3">
                    <p className="text-medium">Ubah tema</p>
                    <ThemeSelector />
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
                        <p className="text-medium">Ubah akun</p>
                        <p className="text-gray-400 text-small">
                            Ini untuk melakukan perubahan terhadap email dan
                            password anda.
                        </p>
                    </div>
                    {isDesktop ? (
                        <EditProfileDialog profile={profile} />
                    ) : (
                        <EditProfileDrawer profile={profile} />
                    )}
                </div>
                <div className="flex justify-between items-center my-3">
                    <div>
                        <p className="text-medium">Info detil akun</p>
                        <p className="text-gray-400 text-small">
                            Ini akan menampilkan seluruh informasi akun anda
                            secara detil.
                        </p>
                    </div>
                    {isDesktop ? (
                        <InfoAccountDialog profile={data?.user} />
                    ) : (
                        <InfoAccountDrawer profile={data?.user} />
                    )}
                </div>
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
