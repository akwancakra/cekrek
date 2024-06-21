import Clock from "@/components/elements/Clock";
import Image from "next/image";

export default function HomeAdmin() {
    return (
        <>
            <section className="mx-auto max-w-7xl mb-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="h-32 overflow-hidden p-4 rounded-lg bg-gradient-to-b from-purple-200 to-purple-100 sm:h-64">
                    <p className="text-primary -mb-1">Good Morning</p>
                    <p className="text-primary font-semibold tracking-tight text-xl sm:text-3xl">
                        Nama Kamu
                    </p>
                </div>
                <Clock />
            </section>
            <section className="mx-auto max-w-7xl rounded-xl mb-4">
                <div className="items-center justify-between mb-4 sm:flex">
                    <p className="text-header">Asesmen Terakhir</p>
                    <div className="flex">
                        <label className="input w-full input-bordered rounded-lg flex items-center gap-2 py-2 px-3 text-sm h-fit min-h-fit mt-2 sm:w-fit sm:mt-0">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Search"
                            />
                            <span className="material-symbols-outlined !text-xl !leading-4 opacity-70">
                                search
                            </span>
                        </label>
                    </div>
                </div>
            </section>
        </>
    );
}
