import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import useProfile from "@/utils/useProfile";

const SidebarAdmin = ({
    isOpen,
    toggleSidebar,
}: {
    isOpen: boolean;
    toggleSidebar: () => void;
}) => {
    const contactModal = useRef<HTMLDialogElement>(null);
    const pathname = usePathname();
    const { profile, isReady } = useProfile();

    const showModal = () => {
        if (contactModal.current) {
            contactModal.current.showModal();
        }
        1;
    };

    return (
        <>
            {/* SIDEBAR */}
            <div
                className={`${
                    isOpen ? "open " : ""
                }bg-white group fixed h-full w-[78px] z-10 transition-all duration-500 ease-in-out px-3.5 py-1.5 left-0 top-0 border border-r border-gray-300 [&.open]:w-[250px] hidden sm:block dark:bg-neutral-800 dark:border-neutral-600`}
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
                            href="/a"
                            className={`${
                                pathname === "/" ? "bg-primary text-white " : ""
                            }flex h-full w-full items-center no-underline transition-all duration-500 ease-in-out rounded-lg group-hover/nav-link:bg-primary group-hover/nav-link:text-white`}
                        >
                            <i
                                className={`${
                                    pathname === "/" ? "filled " : ""
                                }material-symbols-outlined h-[50px] min-w-[47px] !text-xl text-center !leading-[50px]`}
                            >
                                window
                            </i>
                            <span className="whitespace-nowrap opacity-0 pointer-events-none text-sm group-[.open]:opacity-100 group-[.open]:pointer-events-auto">
                                Dasbor
                            </span>
                        </Link>
                        <span className="bg-white dark:text-gray-800 absolute z-10 shadow-lg rounded text-sm opacity-0 whitespace-nowrap pointer-events-none transition-all duration-500 ease-in-out px-3 py-1.5 left-[calc(100%_+_15px)] -top-5 group-[.open]:hidden group-hover/nav-link:opacity-100 group-hover/nav-link:pointer-events-auto group-hover/nav-link:-translate-y-2/4 group-hover/nav-link:top-2/4">
                            Dasbor
                        </span>
                    </li>
                    <li className="group/nav-link relative mx-0 my-2">
                        <Link
                            href="/a/users"
                            className={`${
                                pathname.startsWith("/a/users")
                                    ? "bg-primary text-white "
                                    : ""
                            }flex h-full w-full items-center no-underline transition-all duration-500 ease-in-out rounded-lg group-hover/nav-link:bg-primary group-hover/nav-link:text-white`}
                        >
                            <i
                                className={`${
                                    pathname.startsWith("/a/users")
                                        ? "filled "
                                        : ""
                                }material-symbols-outlined h-[50px] min-w-[47px] !text-xl text-center !leading-[50px]`}
                            >
                                group
                            </i>
                            <span className="whitespace-nowrap opacity-0 pointer-events-none text-sm group-[.open]:opacity-100 group-[.open]:pointer-events-auto">
                                Daftar Akun
                            </span>
                        </Link>
                        <span className="bg-white dark:text-gray-800 absolute z-10 shadow-lg rounded text-sm opacity-0 whitespace-nowrap pointer-events-none transition-all duration-500 ease-in-out px-3 py-1.5 left-[calc(100%_+_15px)] -top-5 group-[.open]:hidden group-hover/nav-link:opacity-100 group-hover/nav-link:pointer-events-auto group-hover/nav-link:-translate-y-2/4 group-hover/nav-link:top-2/4">
                            Daftar Akun
                        </span>
                    </li>
                    <li className="group/nav-link relative mx-0 my-2">
                        <Link
                            href="/a/students"
                            className={`${
                                pathname.startsWith("/a/students")
                                    ? "bg-primary text-white "
                                    : ""
                            }flex h-full w-full items-center no-underline transition-all duration-500 ease-in-out rounded-lg group-hover/nav-link:bg-primary group-hover/nav-link:text-white`}
                        >
                            <i
                                className={`${
                                    pathname.startsWith("/a/students")
                                        ? "filled "
                                        : ""
                                }material-symbols-outlined h-[50px] min-w-[47px] !text-xl text-center !leading-[50px]`}
                            >
                                contacts
                            </i>
                            <span className="whitespace-nowrap opacity-0 pointer-events-none text-sm group-[.open]:opacity-100 group-[.open]:pointer-events-auto">
                                Daftar Murid
                            </span>
                        </Link>
                        <span className="bg-white dark:text-gray-800 absolute z-10 shadow-lg rounded text-sm opacity-0 whitespace-nowrap pointer-events-none transition-all duration-500 ease-in-out px-3 py-1.5 left-[calc(100%_+_15px)] -top-5 group-[.open]:hidden group-hover/nav-link:opacity-100 group-hover/nav-link:pointer-events-auto group-hover/nav-link:-translate-y-2/4 group-hover/nav-link:top-2/4">
                            Daftar Murid
                        </span>
                    </li>
                    <li className="group/nav-link relative mx-0 my-2">
                        <Link
                            href="/a/recommendations"
                            className={`${
                                pathname.startsWith("/a/recommendations")
                                    ? "bg-primary text-white "
                                    : ""
                            }flex h-full w-full items-center no-underline transition-all duration-500 ease-in-out rounded-lg group-hover/nav-link:bg-primary group-hover/nav-link:text-white`}
                        >
                            <i
                                className={`${
                                    pathname.startsWith("/a/recommendations")
                                        ? "filled "
                                        : ""
                                }material-symbols-outlined h-[50px] min-w-[47px] !text-xl text-center !leading-[50px]`}
                            >
                                fact_check
                            </i>
                            <span className="whitespace-nowrap opacity-0 pointer-events-none text-sm group-[.open]:opacity-100 group-[.open]:pointer-events-auto">
                                Daftar Rekomendasi
                            </span>
                        </Link>
                        <span className="bg-white dark:text-gray-800 absolute z-10 shadow-lg rounded text-sm opacity-0 whitespace-nowrap pointer-events-none transition-all duration-500 ease-in-out px-3 py-1.5 left-[calc(100%_+_15px)] -top-5 group-[.open]:hidden group-hover/nav-link:opacity-100 group-hover/nav-link:pointer-events-auto group-hover/nav-link:-translate-y-2/4 group-hover/nav-link:top-2/4">
                            Daftar Rekomendasi
                        </span>
                    </li>
                    <li className="group/nav-link relative mx-0 my-2">
                        <Link
                            href="/a/settings"
                            className={`${
                                pathname.startsWith("/a/settings")
                                    ? "bg-primary text-white "
                                    : ""
                            }flex h-full w-full items-center no-underline transition-all duration-500 ease-in-out rounded-lg group-hover/nav-link:bg-primary group-hover/nav-link:text-white`}
                        >
                            <i
                                className={`${
                                    pathname.startsWith("/a/settings")
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
                        <span className="bg-white dark:text-gray-800 absolute z-10 shadow-lg rounded text-sm opacity-0 whitespace-nowrap pointer-events-none transition-all duration-500 ease-in-out px-3 py-1.5 left-[calc(100%_+_15px)] -top-5 group-[.open]:hidden group-hover/nav-link:opacity-100 group-hover/nav-link:pointer-events-auto group-hover/nav-link:-translate-y-2/4 group-hover/nav-link:top-2/4">
                            Pengaturan
                        </span>
                    </li>
                    <li className="mx-0 my-2 fixed h-[60px] w-[78px] transition-all duration-[0.5s] ease-[ease] overflow-hidden px-3.5 py-2.5 left-0 -bottom-2 group-[.open]:w-[250px] group-[.open]:border-t group-[.open]:border-gray-300 dark:group-[.open]:border-neutral-600">
                        <div className="flex items-center flex-nowrap">
                            <div>
                                <div className="text-sm whitespace-nowrap">
                                    {profile?.name ?? "Admin Name"}
                                </div>
                                <div className="text-xs whitespace-nowrap">
                                    Admin
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
            <div className="fixed bottom-0 border-t border-gray-300 grid grid-cols-5 w-full h-16 bg-white z-20 sm:hidden dark:bg-neutral-800 dark:border-neutral-600">
                <Link
                    href="/a"
                    className={`${
                        pathname === "/" ? "text-primary " : ""
                    }flex flex-col justify-center items-center transition-colors duration-200 ease-in-out  hover:text-primary`}
                >
                    <span
                        className={`${
                            pathname === "/" ? "filled " : ""
                        }material-symbols-outlined`}
                    >
                        {" "}
                        home{" "}
                    </span>
                    <p className="text-xs">Home</p>
                </Link>
                <Link
                    href="/a/users"
                    className={`${
                        pathname.startsWith("/a/users") ? "text-primary " : ""
                    }flex flex-col justify-center items-center transition-colors duration-200 ease-in-out  hover:text-primary`}
                >
                    <span
                        className={`${
                            pathname.startsWith("/a/users") ? "filled " : ""
                        }material-symbols-outlined`}
                    >
                        {" "}
                        group{" "}
                    </span>
                    <p className="text-xs">Akun</p>
                </Link>
                <Link
                    href="/a/students"
                    className={`${
                        pathname.startsWith("/a/students")
                            ? "text-primary "
                            : ""
                    }flex flex-col justify-center items-center transition-colors duration-200 ease-in-out  hover:text-primary`}
                >
                    <span
                        className={`${
                            pathname.startsWith("/a/students") ? "filled " : ""
                        }material-symbols-outlined`}
                    >
                        {" "}
                        contacts{" "}
                    </span>
                    <p className="text-xs">Murid</p>
                </Link>
                <Link
                    href="/a/recommendations"
                    className={`${
                        pathname.startsWith("/a/recommendations")
                            ? "text-primary "
                            : ""
                    }flex flex-col justify-center items-center transition-colors duration-200 ease-in-out  hover:text-primary`}
                >
                    <span
                        className={`${
                            pathname.startsWith("/a/recommendations")
                                ? "filled "
                                : ""
                        }material-symbols-outlined`}
                    >
                        {" "}
                        fact_check{" "}
                    </span>
                    <p className="text-xs">Rekomendasi</p>
                </Link>
                <Link
                    href="/a/settings"
                    className={`${
                        pathname.startsWith("/a/settings")
                            ? "text-primary "
                            : ""
                    }flex flex-col justify-center items-center transition-colors duration-200 ease-in-out  hover:text-primary`}
                >
                    <span
                        className={`${
                            pathname.startsWith("/a/settings") ? "filled " : ""
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

export default SidebarAdmin;
