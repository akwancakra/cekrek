"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState("00:00:00");
    const [timeAP, setTimeAP] = useState("AM");

    const getClock = () => {
        const date = new Date();
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const ampm = hours < 12 ? "AM" : "PM";

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedHours = String(hours).padStart(2, "0");

        setTime(`${formattedHours}:${minutes}:${seconds}`);
        setTimeAP(ampm);
    };

    const getDayOrNight = () => {
        const date = new Date();
        const hours = date.getHours();
        return hours >= 6 && hours <= 18 ? "classroom-day" : "classroom-night";
    };

    useEffect(() => {
        // getClock(); // Initialize clock immediately
        const interval = setInterval(getClock, 1000);
        return () => clearInterval(interval);
    }, [time]);

    return (
        <div className="h-64 relative bg-purple-100 overflow-hidden rounded-lg dark:bg-purple-900">
            <div className="w-full h-full bg-cover bg-center" />
            <Image
                src={`/static/images/${getDayOrNight()}.jpg`}
                alt="Clock"
                fill
                style={{ objectFit: "cover" }}
            />
            <div className="absolute z-10 bottom-0 flex justify-center items-end h-full w-full">
                <div
                    className={`w-3/4 h-2/3 border-8 border-primary p-2 flex justify-center items-center rounded-xl ${
                        getDayOrNight() === "classroom-day"
                            ? "bg-purple-100 dark:bg-purple-600/60"
                            : "bg-purple-100/30"
                    }`}
                >
                    <div
                        className={`flex items-end gap-1 ${
                            getDayOrNight() === "classroom-day"
                                ? "text-primary dark:text-purple-200"
                                : "text-purple-100"
                        }`}
                    >
                        <p
                            className="font-semibold tracking-tighter text-2xl md:text-3xl lg:text-5xl"
                            id="MyClock"
                        >
                            {time}
                        </p>
                        <span
                            className="font-normal tracking-normal text-xs sm:text-sm"
                            id="MyClockAP"
                        >
                            {timeAP}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clock;
