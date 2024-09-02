import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 text-base-content rounded">
            <nav className="grid grid-flow-col gap-4">
                <Link
                    href="#testimonials"
                    className="link link-hover dark:text-neutral-300"
                >
                    Tentang Kami
                </Link>
                <Link
                    href="https://wa.me/+6285960224084"
                    target="_blank"
                    className="link link-hover dark:text-neutral-300"
                >
                    Kontak
                </Link>
                {/* <Link
            href="/terms"
            className="link link-hover dark:text-neutral-300"
        >
            Syarat & Ketentuan
        </Link> */}
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link
                        href={"https://instagram.com/cekrek_assist"}
                        className="dark:text-neutral-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z" />
                            <circle cx="11.994" cy="11.979" r="3.003" />
                        </svg>
                    </Link>
                    <Link
                        href={"mailto:cekrek_assist@gmail.com"}
                        className="dark:text-neutral-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
                        </svg>
                    </Link>
                </div>
            </nav>
            <aside>
                <p className="dark:text-neutral-400">
                    Copyright © 2024 - All right reserved by Helov Team
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
