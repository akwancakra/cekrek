"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { DatePicker } from "@/components/elements/inputs/datepicker";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CommandList } from "cmdk";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama tidak boleh kosong!"),
    gender: Yup.string().required("Jenis kelamin harus dipilih!"),
    date_time_birth: Yup.date().required("Tanggal lahir harus dipilih!"),
    count_of_siblings: Yup.number().required(
        "Jumlah saudara kandung wajib diisi!"
    ),
});

export default function AddStudentPage() {
    const [city, setCity] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const handleDateSelect = (day: Date | undefined) => {
        if (day) {
            formik.setFieldValue("date_time_birth", day);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            gender: "",
            date_time_birth: "",
            count_of_siblings: 0,
        },
        validationSchema,
        onSubmit: async (values: any) => {
            setIsLoading(true);
            try {
                console.log(values);
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <>
            <section className="mx-auto max-w-7xl">
                <p className="font-semibold tracking-tighter text-xl sm:text-2xl">
                    Tambah siswa
                </p>
                <div className="divider my-1"></div>
                <div className="sm:flex group-[.open]:block md;group-[.open]:flex">
                    <div className=" w-full sm:pe-3 sm:w-2/3 group-[.open]:pe-0 md:group-[.open]:pe-3 group-[.open]:w-full md:group-[.open]:w-2/3">
                        <form method="POST">
                            <div>
                                <p className="text-large font-medium tracking-tight">
                                    Biodata
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label ps-0">
                                                <span className="label-text">
                                                    Nama Panjang
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                name="full_name"
                                                placeholder="Anista Dwi..."
                                                className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </label>
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label ps-0">
                                                <span className="label-text">
                                                    Nama Panggilan
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                name="nickname"
                                                placeholder="Anit..."
                                                className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </label>
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        <div className="label ps-0">
                                            <span className="label-text">
                                                Jenis kelamin
                                            </span>
                                        </div>
                                        <Select name="gender">
                                            <SelectTrigger
                                                className="w-full"
                                                value={formik.values.gender}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <SelectValue placeholder="Pilih Jenis Kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="laki-laki">
                                                    Laki-laki
                                                </SelectItem>
                                                <SelectItem value="perempuan">
                                                    Perempuan
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        <div className="label ps-0">
                                            <span className="label-text">
                                                Agama
                                            </span>
                                        </div>
                                        <Select name="religion">
                                            <SelectTrigger
                                                className="w-full"
                                                value={formik.values.gender}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <SelectValue placeholder="Pilih Agama" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="islam">
                                                    Islam
                                                </SelectItem>
                                                <SelectItem value="kristen">
                                                    Kristen
                                                </SelectItem>
                                                <SelectItem value="katolik">
                                                    Katolik
                                                </SelectItem>
                                                <SelectItem value="hindu">
                                                    Hindu
                                                </SelectItem>
                                                <SelectItem value="buddha">
                                                    Buddha
                                                </SelectItem>
                                                <SelectItem value="konghucu">
                                                    Konghucu
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        <div className="label ps-0">
                                            <span className="label-text">
                                                Tanggal Lahir
                                            </span>
                                        </div>
                                        <DatePicker
                                            initialDate={new Date()}
                                            date={date}
                                            setDate={setDate}
                                        />
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        <div className="label ps-0">
                                            <span className="label-text">
                                                Tempat Lahir
                                            </span>
                                        </div>
                                        <CityPicker
                                            city={city}
                                            setCity={setCity}
                                        />
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        <div className="label ps-0">
                                            <span className="label-text">
                                                Pendengaran
                                            </span>
                                        </div>
                                        <Select name="hearing_test">
                                            <SelectTrigger
                                                className="w-full"
                                                value={formik.values.gender}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <SelectValue placeholder="Pilih Kualitas Pendengaran" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="normal">
                                                    Dalam batas normal
                                                </SelectItem>
                                                <SelectItem value="below_normal">
                                                    Di bawah normal
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        <label className="form-control">
                                            <div className="label ps-0">
                                                <span className="label-text">
                                                    Jumlah Saudara Kandung
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant={"outline"}
                                                    size={"icon"}
                                                    className="rounded-full w-12"
                                                    onClick={() =>
                                                        formik.values
                                                            .count_of_siblings !=
                                                        0
                                                            ? formik.setFieldValue(
                                                                  "count_of_siblings",
                                                                  formik.values
                                                                      .count_of_siblings -
                                                                      1
                                                              )
                                                            : null
                                                    }
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                                        remove
                                                    </span>
                                                </Button>
                                                <input
                                                    type="number"
                                                    name="count_of_siblings"
                                                    className="input input-bordered text-center rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full number-input-no-arrow placeholder:text-center"
                                                    value={
                                                        formik.values
                                                            .count_of_siblings
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                />
                                                <Button
                                                    variant={"outline"}
                                                    size={"icon"}
                                                    className="rounded-full w-12"
                                                    onClick={() =>
                                                        formik.setFieldValue(
                                                            "count_of_siblings",
                                                            formik.values
                                                                .count_of_siblings +
                                                                1
                                                        )
                                                    }
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                                        add
                                                    </span>
                                                </Button>
                                            </div>
                                        </label>
                                        {formik.touched.count_of_siblings &&
                                            formik.errors.count_of_siblings && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {
                                                        formik.errors
                                                            .count_of_siblings
                                                    }
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="divider mb-1 mt-4"></div>
                            <div>
                                <p className="text-large font-medium tracking-tight">
                                    Riwayat Lahir
                                </p>
                                <div>
                                    <div className="bg-gray-400 rounded-lg w-full">
                                        <AspectRatio ratio={16 / 9}>
                                            <Image
                                                src={
                                                    "/static/images/default.jpg"
                                                }
                                                alt="Recomendation Image"
                                                fill={true}
                                                className="rounded-lg object-cover"
                                                draggable={false}
                                            />
                                        </AspectRatio>
                                    </div>
                                    <div className="my-3">
                                        <p className="text-gray-700 text-center text-medium font-semibold">
                                            Expression when getting advice from
                                            parents or teachers
                                        </p>
                                        <p className="text-gray-500 text-center text-small">
                                            Expression when getting advice from
                                            parents or teachers
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <p className="font-medium text-small mb-1">
                                            Jawaban
                                        </p>
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <Button
                                                variant={"outline"}
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                                    check
                                                </span>{" "}
                                                Ya
                                            </Button>
                                            <Button
                                                variant={"outline"}
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                                    close
                                                </span>{" "}
                                                Tidak
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label ps-0">
                                                <span className="label-text">
                                                    Nama Panjang
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                name="full_name"
                                                placeholder="Anista Dwi..."
                                                className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </label>
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                </div> */}
                            </div>

                            <div className="divider mb-1 mt-4"></div>
                            <div>
                                <p className="text-large font-medium tracking-tight">
                                    Hasil Pemeriksaan Ahli
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {" "}
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label ps-0">
                                                <span className="label-text">
                                                    Nama Panjang
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                name="full_name"
                                                placeholder="Anista Dwi..."
                                                className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </label>
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="divider mb-1 mt-4"></div>
                            <div>
                                <p className="text-large font-medium tracking-tight">
                                    Status Kesehatan
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {" "}
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label ps-0">
                                                <span className="label-text">
                                                    Nama Panjang
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                name="full_name"
                                                placeholder="Anista Dwi..."
                                                className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </label>
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="text-red-500 text-xs sm:text-sm">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="sticky top-4 rounded-lg p-2 bg-gray-300 w-full h-fit sm:w-1/3 mt-3 sm:mt-0 group-[.open]:mt-3 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-1/3">
                        <p>Test</p>
                    </div>
                </div>
            </section>
        </>
    );
}

interface CityPickerProps {
    city: string;
    setCity: (city: string) => void;
}

const CityPicker = ({ city, setCity }: CityPickerProps) => {
    // const CityPicker = () => {
    // const [city, setCity] = useState("");
    const [open, setOpen] = useState(false);

    // const [cities, setCities] = useState();
    const cities = {
        Provinsi: [
            "Aceh",
            "Sumatera Utara",
            "Sumatera Barat",
            "Riau",
            "Kepulauan Riau",
            "Jambi",
            "Sumatera Selatan",
            "Bengkulu",
            "Lampung",
            "Bangka Belitung",
            "DKI Jakarta",
            "Jawa Barat",
            "Jawa Tengah",
            "DI Yogyakarta",
            "Jawa Timur",
            "Banten",
            "Bali",
            "Nusa Tenggara Barat",
            "Nusa Tenggara Timur",
            "Kalimantan Barat",
            "Kalimantan Tengah",
            "Kalimantan Selatan",
            "Kalimantan Timur",
            "Kalimantan Utara",
            "Sulawesi Utara",
            "Sulawesi Tengah",
            "Sulawesi Selatan",
            "Sulawesi Tenggara",
            "Gorontalo",
            "Sulawesi Barat",
            "Maluku",
            "Maluku Utara",
            "Papua",
            "Papua Barat",
            "Papua Barat Daya",
            "Papua Pegunungan",
            "Papua Selatan",
            "Papua Tengah",
        ],
        Kota: [
            "Banda Aceh",
            "Sabang",
            "Langsa",
            "Lhokseumawe",
            "Subulussalam",
            "Medan",
            "Binjai",
            "Tanjungbalai",
            "Pematangsiantar",
            "Tebing Tinggi",
            "Sibolga",
            "Padang Sidempuan",
            "Gunungsitoli",
            "Padang",
            "Bukittinggi",
            "Payakumbuh",
            "Padang Panjang",
            "Pariaman",
            "Sawahlunto",
            "Solok",
            "Pekanbaru",
            "Dumai",
            "Tanjungpinang",
            "Batam",
            "Jambi",
            "Sungai Penuh",
            "Palembang",
            "Pagar Alam",
            "Lubuklinggau",
            "Prabumulih",
            "Bengkulu",
            "Bandar Lampung",
            "Metro",
            "Pangkal Pinang",
            "Jakarta",
            "Bandung",
            "Cimahi",
            "Cirebon",
            "Bekasi",
            "Bogor",
            "Sukabumi",
            "Tasikmalaya",
            "Banjar",
            "Depok",
            "Semarang",
            "Surakarta",
            "Salatiga",
            "Pekalongan",
            "Magelang",
            "Tegal",
            "Yogyakarta",
            "Surabaya",
            "Malang",
            "Madiun",
            "Kediri",
            "Blitar",
            "Mojokerto",
            "Pasuruan",
            "Probolinggo",
            "Batu",
            "Serang",
            "Cilegon",
            "Tangerang",
            "Tangerang Selatan",
            "Denpasar",
            "Mataram",
            "Bima",
            "Kupang",
            "Pontianak",
            "Singkawang",
            "Palangka Raya",
            "Banjarmasin",
            "Banjarbaru",
            "Samarinda",
            "Balikpapan",
            "Bontang",
            "Tarakan",
            "Manado",
            "Bitung",
            "Tomohon",
            "Kotamobagu",
            "Palu",
            "Makassar",
            "Parepare",
            "Palopo",
            "Kendari",
            "Bau-Bau",
            "Gorontalo",
            "Ambon",
            "Tual",
            "Ternate",
            "Tidore Kepulauan",
            "Jayapura",
            "Sorong",
            "Manokwari",
        ],
    };

    const cityOptions = cities.Kota.map((city) => ({
        label: city,
        value: city,
    }));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-sm"
                >
                    {city
                        ? cityOptions.find((kota) => kota.value === city)?.label
                        : "Pilih kota..."}
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        unfold_more
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0" align="start">
                <Command>
                    <CommandInput placeholder="Cari kota..." />
                    <CommandList className="overflow-y-auto max-h-40 md:max-h-80">
                        <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                            {cityOptions.map((kota, index) => (
                                <CommandItem
                                    key={index}
                                    value={kota.value}
                                    onSelect={(currentValue) => {
                                        setCity(
                                            currentValue === city
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <span
                                        className={cn(
                                            "material-symbols-outlined cursor-pointer !text-lg !leading-none mr-2 h-4 w-4",
                                            {
                                                "opacity-100":
                                                    kota.value === city,
                                                "opacity-0":
                                                    kota.value !== city,
                                            }
                                        )}
                                    >
                                        check
                                    </span>
                                    {kota.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
