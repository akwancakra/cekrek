import CustomSuspense from "@/components/elements/suspsenses/CustomSuspense";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ubah Anak | CekRek",
};

export default function EditChild({ children }: { children: React.ReactNode }) {
    return <CustomSuspense>{children}</CustomSuspense>;
}
