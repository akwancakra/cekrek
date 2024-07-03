import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Session } from "@/types/userSession.type";

const SidebarParent = ({
    isOpen,
    toggleSidebar,
}: {
    isOpen: boolean;
    toggleSidebar: () => void;
}) => {
    const contactModal = useRef<HTMLDialogElement>(null);
    const [profile, setProfile] = useState<Session>();
    const { data } = useSession();

    useEffect(() => {
        if (data?.user) {
            setProfile(data.user);
        }
    }, [data]);

    const showModal = () => {
        if (contactModal.current) {
            contactModal.current.showModal();
        }
    };

    const pathname = usePathname();

    return (
        <>
            {/* SIDEBAR */}
            <div
                className={`${
                    isOpen ? "open " : ""
                }bg-white group fixed h-full w-[78px] z-10 transition-all duration-500 ease-in-out px-3.5 py-1.5 left-0 top-0 border border-r border-gray-300 [&.open]:w-[250px] hidden sm:block`}
            >
                <div className="h-[60px] flex justify-between items-center relative">
                    <div className="hidden group-[.open]:block">
                        <Link
                            href="/"
                            className="text-2xl font-semibold opacity-0 transition-all duration-75 ease-in-out group-[.open]:opacity-100"
                        >
                            CekRek
                        </Link>
                    </div>
                    <i
                        className="material-symbols-outlined h-[60px] min-w-[50px] !leading-[60px] text-center absolute -translate-y-2/4 !text-xl transition-all duration-500 ease-in-out cursor-pointer right-0 top-2/4"
                        onClick={() => toggleSidebar()}
                    >
                        {isOpen ? "menu_open" : "menu"}
                    </i>
                </div>
                <ul className="h-full mt-5">
                    <li className="group/nav-link relative mx-0 my-2">
                        <Link
                            href="/p"
                            className={`${
                                pathname === "/p"
                                    ? "bg-primary text-white "
                                    : ""
                            }flex h-full w-full items-center no-underline transition-all duration-500 ease-in-out rounded-lg group-hover/nav-link:bg-primary group-hover/nav-link:text-white`}
                        >
                            <i
                                className={`${
                                    pathname === "/p" ? "filled " : ""
                                }material-symbols-outlined h-[50px] min-w-[47px] !text-xl text-center !leading-[50px]`}
                            >
                                home
                            </i>
                            <span className="whitespace-nowrap opacity-0 pointer-events-none text-sm group-[.open]:opacity-100 group-[.open]:pointer-events-auto">
                                Dasbor
                            </span>
                        </Link>
                        <span className="bg-white absolute z-10 shadow-lg rounded text-sm opacity-0 whitespace-nowrap pointer-events-none transition-all duration-500 ease-in-out px-3 py-1.5 left-[calc(100%_+_15px)] -top-5 group-[.open]:hidden group-hover/nav-link:opacity-100 group-hover/nav-link:pointer-events-auto group-hover/nav-link:-translate-y-2/4 group-hover/nav-link:top-2/4">
                            Dasbor
                        </span>
                    </li>
                    <li className="group/nav-link relative mx-0 my-2">
                        <Link
                            href="/p/childs"
                            className={`${
                                pathname.startsWith("/p/childs")
                                    ? "bg-primary text-white "
                                    : ""
                            }flex h-full w-full items-center no-underline transition-all duration-500 ease-in-out rounded-lg group-hover/nav-link:bg-primary group-hover/nav-link:text-white`}
                        >
                            <i
                                className={`${
                                    pathname.startsWith("/p/childs")
                                        ? "filled "
                                        : ""
                                }material-symbols-outlined h-[50px] min-w-[47px] !text-xl text-center !leading-[50px]`}
                            >
                                child_care
                            </i>
                            <span className="whitespace-nowrap opacity-0 pointer-events-none text-sm group-[.open]:opacity-100 group-[.open]:pointer-events-auto">
                                Anak
                            </span>
                        </Link>
                        <span className="bg-white absolute z-10 shadow-lg rounded text-sm opacity-0 whitespace-nowrap pointer-events-none transition-all duration-500 ease-in-out px-3 py-1.5 left-[calc(100%_+_15px)] -top-5 group-[.open]:hidden group-hover/nav-link:opacity-100 group-hover/nav-link:pointer-events-auto group-hover/nav-link:-translate-y-2/4 group-hover/nav-link:top-2/4">
                            Anak
                        </span>
                    </li>
                    <li className="group/nav-link relative mx-0 my-2">
                        <Link
                            href="/p/settings"
                            className={`${
                                pathname.startsWith("/p/settings")
                                    ? "bg-primary text-white "
                                    : ""
                            }flex h-full w-full items-center no-underline transition-all duration-500 ease-in-out rounded-lg group-hover/nav-link:bg-primary group-hover/nav-link:text-white`}
                        >
                            <i
                                className={`${
                                    pathname.startsWith("/p/settings")
                                        ? "filled "
                                        : ""
                                }material-symbols-outlined h-[50px] min-w-[47px] !text-xl text-center !leading-[50px]`}
                            >
                                settings
                            </i>
                            <span className="whitespace-nowrap opacity-0 pointer-events-none text-sm group-[.open]:opacity-100 group-[.open]:pointer-events-auto">
                                Pengaturan
                            </span>
                        </Link>
                        <span className="bg-white absolute z-10 shadow-lg rounded text-sm opacity-0 whitespace-nowrap pointer-events-none transition-all duration-500 ease-in-out px-3 py-1.5 left-[calc(100%_+_15px)] -top-5 group-[.open]:hidden group-hover/nav-link:opacity-100 group-hover/nav-link:pointer-events-auto group-hover/nav-link:-translate-y-2/4 group-hover/nav-link:top-2/4">
                            Pengaturan
                        </span>
                    </li>
                    <li className="mx-0 my-2 fixed h-[60px] w-[78px] transition-all duration-[0.5s] ease-[ease] overflow-hidden px-3.5 py-2.5 left-0 -bottom-2 group-[.open]:w-[250px] group-[.open]:border-t group-[.open]:border-gray-300">
                        <div className="flex items-center flex-nowrap">
                            <div>
                                <div className="text-sm whitespace-nowrap"></div>

                                <div className="text-xs whitespace-nowrap">
                                    Orang Tua
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={() => signOut()}>
                            <i
                                className="material-symbols-outlined text-white bg-primary !text-xl h-[60px] min-w-[50px] text-center !leading-[60px] absolute -translate-y-2/4 w-full transition-all duration-500 ease-in-out right-0 top-2/4 group-[.open]:w-[50px] group-[.open]:bg-none hover:text-white"
                                id="log_out"
                            >
                                logout
                            </i>
                        </button>
                    </li>
                </ul>
            </div>

            {/* BOTTOM BAR */}
            <div className="fixed bottom-0 border-t border-gray-300 grid grid-cols-4 w-full h-16 bg-white z-20 sm:hidden">
                <Link
                    href="/"
                    className={`flex flex-col justify-center items-center transition-colors duration-200 ease-in-out  hover:text-primary`}
                >
                    <span className={`material-symbols-outlined`}> home </span>
                    <p className="text-xs">Home</p>
                </Link>
                <Link
                    href="/p"
                    className={`${
                        pathname === "/p" ? "text-primary " : ""
                    }flex flex-col justify-center items-center transition-colors duration-200 ease-in-out  hover:text-primary`}
                >
                    <span
                        className={`${
                            pathname === "/p" ? "filled " : ""
                        }material-symbols-outlined`}
                    >
                        {" "}
                        grid_view{" "}
                    </span>
                    <p className="text-xs">Dasbor</p>
                </Link>
                <Link
                    href="/p/childs"
                    className={`${
                        pathname.startsWith("/p/childs") ? "text-primary " : ""
                    }flex flex-col justify-center items-center transition-colors duration-200 ease-in-out  hover:text-primary`}
                >
                    <span
                        className={`${
                            pathname.startsWith("/p/childs") ? "filled " : ""
                        }material-symbols-outlined`}
                    >
                        {" "}
                        child_care{" "}
                    </span>
                    <p className="text-xs">Anak</p>
                </Link>
                <Link
                    href="/p/settings"
                    className={`${
                        pathname.startsWith("/p/settings")
                            ? "text-primary "
                            : ""
                    }flex flex-col justify-center items-center transition-colors duration-200 ease-in-out  hover:text-primary`}
                >
                    <span
                        className={`${
                            pathname.startsWith("/p/settings") ? "filled " : ""
                        }material-symbols-outlined`}
                    >
                        {" "}
                        settings{" "}
                    </span>
                    <p className="text-xs">Pengaturan</p>
                </Link>
            </div>
        </>
    );
};

export default SidebarParent;
