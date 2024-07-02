"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { removeLeadingZeros } from "@/utils/converters";
import Image from "next/image";
import { useState } from "react";

export default function HealthStatusFour() {
    const [monthLength, setMonthLength] = useState("");
    const [weekLength, setWeekLength] = useState("");
    const [dayLength, setDayLength] = useState("");

    const handleInputChange = (setter: (value: string) => void) => (e: any) => {
        const value = removeLeadingZeros(e.target.value);
        if (value === "" || parseInt(value) === 0) {
            setter("");
        } else {
            setter(value);
        }
    };

    return (
        <>
            <div className="bg-gray-400 rounded-lg w-full">
                <AspectRatio ratio={16 / 9}>
                    <Image
                        src={"/static/images/default.jpg"}
                        alt="Recomendation Image"
                        fill={true}
                        className="rounded-lg object-cover"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <div className="my-3">
                <p className="text-gray-700 text-center text-medium font-semibold">
                    Lama dirawat
                </p>
                <p className="text-gray-500 text-center text-small">
                    Expression when getting advice from parents or teachers
                </p>
            </div>
            <div className="w-full">
                <p className="font-medium text-small mb-1">Jawaban</p>
                <div className="flex gap-2 justify-center items-center text-center">
                    <div>
                        <label className="form-control w-full">
                            <input
                                type="number"
                                min={0}
                                placeholder={"00"}
                                className="placeholder:text-center text-center font-semibold tracking-tighter input input-bordered w-24 h-24 text-3xl pl-0 number-input-no-arrow"
                                value={monthLength}
                                onChange={handleInputChange(setMonthLength)}
                            />
                        </label>
                        <p>Bulan</p>
                        <p className="invisible text-xs italic text-gray-400 -mt-1">
                            *0-4 minggu
                        </p>
                    </div>
                    <div>
                        <label className="form-control w-full">
                            <input
                                type="number"
                                min={0}
                                max={4}
                                placeholder={"0"}
                                className="placeholder:text-center text-center font-semibold tracking-tighter input input-bordered w-24 h-24 text-3xl pl-0 number-input-no-arrow"
                                value={weekLength}
                                onChange={handleInputChange(setWeekLength)}
                            />
                        </label>
                        <p>Minggu</p>
                        <p className="text-xs italic text-gray-400 -mt-1">
                            *0-4 minggu
                        </p>
                    </div>
                    <div>
                        <label className="form-control w-full">
                            <input
                                type="number"
                                min={0}
                                max={6}
                                placeholder={"00"}
                                className="placeholder:text-center text-center font-semibold tracking-tighter input input-bordered w-24 h-24 text-3xl pl-0 number-input-no-arrow"
                                value={dayLength}
                                onChange={handleInputChange(setDayLength)}
                            />
                        </label>
                        <p>Hari</p>
                        <p className="text-xs italic text-gray-400 -mt-1">
                            *0-6 hari
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
