"use client";

import { useState } from "react";
import SidebarTeacher from "../elements/sidebars/SidebarTeacher";

const DashboardTeacher = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section>
            <SidebarTeacher isOpen={isOpen} toggleSidebar={toggleSidebar} />

            <div className={`${isOpen ? "open " : ""} group`}>
                <main className="relative min-h-screen left-0 w-full transition-all duration-500 ease-in-out z-0 top-0 p-4 sm:group-[.open]:w-[calc(100%_-_250px)] sm:group-[.open]:left-[250px] sm:left-[78px] sm:w-[calc(100%_-_78px)]">
                    {children}
                </main>

                {/* MARGIN FOR BOTTOM NAVIGATION */}
                <div className="h-10 w-full sm:hidden"></div>
            </div>
        </section>
    );
};

export default DashboardTeacher;
