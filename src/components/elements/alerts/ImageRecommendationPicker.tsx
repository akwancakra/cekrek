"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
    getImageUrl,
    getRecommendationImageUrl,
    truncateString,
} from "@/utils/converters";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

interface Props {
    images: { label: string; value: string }[];
    image: string;
    setImage: (image: string) => void;
}

export default function ImageRecommendationPicker({
    images,
    image,
    setImage,
}: Props) {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<"upload" | "choose" | "">("");
    const isDesktop = useMediaQuery("(min-width: 768px)");
    // const [image, setImage] = useState<string>("");
    // const totalImage = 27;

    const handleImageChange = async (event: any) => {
        const selectedFile = event.target.files[0];
        const allowedExtensions = ["jpg", "png", "jpeg"];
        const extension = selectedFile.name.split(".").pop().toLowerCase();
        const fileSize = selectedFile.size;

        if (fileSize > 1024000) {
            setImage(null);
            toast.error("Ukuran maksimal gambar 1MB");
        } else if (!allowedExtensions.includes(extension)) {
            setImage(null);
            toast.error("Hanya gambar dengan tipe jpg, jpeg, atau png");
        } else {
            const base64String: any = await getBase64(selectedFile);
            localStorage.setItem("image", base64String);
            setImage(base64String);
        }
    };

    // const handleImageChange = async (
    //     event: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         if (file.size > 1024000) {
    //             toast.error("Ukuran maksimal gambar 1MB");
    //             return;
    //         }

    //         const allowedExtensions = ["jpg", "jpeg", "png"];
    //         const fileExtension = file.name.split(".").pop()?.toLowerCase();
    //         if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    //             toast.error(
    //                 "Hanya gambar dengan tipe jpg, jpeg, atau png yang diizinkan"
    //             );
    //             return;
    //         }

    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const base64String = e.target?.result as string;
    //             setImage(base64String);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const resetIcon = () => {
        setType("");
        setImage("");
    };

    if (isDesktop) {
        return (
            <AlertDialog>
                <AlertDialogTrigger className="block" asChild>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={"outline"}
                            className="gap-1 text-small hidden sm:inline-flex group-[.open]:hidden md:group-[.open]:inline-flex"
                            type="button"
                        >
                            <span>Pilih gambar</span>
                            <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                add_a_photo
                            </span>
                        </Button>
                        {image && <p>{truncateString(image, 20)}</p>}
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="p-0">
                    <ScrollArea className="max-h-[80vh] p-3">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {type === "upload"
                                    ? "Unggah Gambar"
                                    : "Pilih Gambar"}
                            </AlertDialogTitle>
                            {type === "upload" && (
                                <>
                                    <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                                    <label className="form-control w-full mb-3">
                                        <div className="label">
                                            <span className="label-text">
                                                Unggah sebuah gambar
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            className="file-input file-input-bordered w-full rounded-lg h-9 text-sm min-h-fit"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                    {image && (
                                        <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-64 dark:bg-neutral-800">
                                            <AspectRatio
                                                ratio={1 / 1}
                                                className="rounded-lg overflow-hidden"
                                            >
                                                <Image
                                                    src={getImageUrl(image)}
                                                    alt="Recomendation Image"
                                                    fill={true}
                                                    className="object-cover"
                                                />
                                            </AspectRatio>
                                        </div>
                                    )}
                                </>
                            )}
                            {type === "choose" && (
                                <>
                                    <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                                    <ImagePicker
                                        images={images}
                                        image={image}
                                        setImage={setImage}
                                    />
                                    {image && (
                                        <div className="relative rounded-lg bg-gray-200 max-w-xs w-full lg:max-w-64 mt-4">
                                            <AspectRatio
                                                ratio={1 / 1}
                                                className="rounded-lg overflow-hidden"
                                            >
                                                <Image
                                                    src={getRecommendationImageUrl(
                                                        {
                                                            image,
                                                            localImages: images,
                                                        }
                                                    )}
                                                    alt="Recomendation Image"
                                                    fill={true}
                                                    className="object-cover"
                                                />
                                            </AspectRatio>
                                        </div>
                                    )}
                                </>
                            )}
                            {!type && (
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-col h-fit gap-1"
                                        onClick={() => setType("upload")}
                                    >
                                        <AspectRatio
                                            ratio={1 / 1}
                                            className="rounded-lg overflow-hidden mt-1"
                                        >
                                            <Image
                                                src="/static/images/default.jpg"
                                                alt="Recomendation Image"
                                                fill={true}
                                            />
                                        </AspectRatio>{" "}
                                        <span>Unggah Gambar</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-col h-fit gap-1"
                                        onClick={() => setType("choose")}
                                    >
                                        <AspectRatio
                                            ratio={1 / 1}
                                            className="rounded-lg overflow-hidden mt-1"
                                        >
                                            <Image
                                                src="/static/images/default.jpg"
                                                alt="Recomendation Image"
                                                fill={true}
                                            />
                                        </AspectRatio>{" "}
                                        <span>Pilih Gambar</span>
                                    </Button>
                                </div>
                            )}
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                onClick={resetIcon}
                                type="button"
                            >
                                Batal
                            </AlertDialogCancel>
                            {image && (
                                <AlertDialogAction>Simpan</AlertDialogAction>
                            )}
                        </AlertDialogFooter>
                    </ScrollArea>
                </AlertDialogContent>
            </AlertDialog>
        );
    }

    // Debugging log
    // console.log("Mobile view rendering");

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <div className="flex items-center gap-2">
                    <Button
                        variant={"outline"}
                        className="gap-1 text-small sm:inline-flex group-[.open]:hidden md:group-[.open]:inline-flex"
                        type="button"
                    >
                        <span>Pilih gambar</span>
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                            add_a_photo
                        </span>
                    </Button>
                    {image && <p>{truncateString(image, 20)}</p>}
                </div>
            </DrawerTrigger>
            <DrawerContent className="p-0">
                {/* <ScrollArea className="max-h-[70vh] p-0"> */}
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        {type === "upload" ? "Unggah Gambar" : "Pilih Gambar"}
                    </DrawerTitle>
                    {type === "upload" && (
                        <>
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                            <label className="form-control w-full mb-3">
                                <div className="label">
                                    <span className="label-text">
                                        Unggah sebuah gambar
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full rounded-lg h-9 text-sm min-h-fit"
                                    onChange={handleImageChange}
                                />
                            </label>
                            {image && (
                                <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-64 dark:bg-neutral-800">
                                    <AspectRatio
                                        ratio={1 / 1}
                                        className="rounded-lg overflow-hidden"
                                    >
                                        <Image
                                            src={getImageUrl(image)}
                                            alt="Recomendation Image"
                                            fill={true}
                                            className="object-cover"
                                        />
                                    </AspectRatio>
                                </div>
                            )}
                        </>
                    )}
                    {type === "choose" && (
                        <>
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                            <ImagePicker
                                images={images}
                                image={image}
                                setImage={setImage}
                            />
                            {image && (
                                <div className="relative rounded-lg bg-gray-200 max-w-xs w-full lg:max-w-64 mt-4">
                                    <AspectRatio
                                        ratio={1 / 1}
                                        className="rounded-lg overflow-hidden"
                                    >
                                        <Image
                                            src={getRecommendationImageUrl({
                                                image,
                                                localImages: images,
                                            })}
                                            alt="Recomendation Image"
                                            fill={true}
                                            className="object-cover"
                                        />
                                    </AspectRatio>
                                </div>
                            )}
                        </>
                    )}
                    {!type && (
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                className="flex-col h-fit gap-1"
                                onClick={() => setType("upload")}
                            >
                                <AspectRatio
                                    ratio={1 / 1}
                                    className="rounded-lg overflow-hidden mt-1"
                                >
                                    <Image
                                        src="/static/images/default.jpg"
                                        alt="Recomendation Image"
                                        fill={true}
                                    />
                                </AspectRatio>{" "}
                                <span>Unggah Gambar</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-col h-fit gap-1"
                                onClick={() => setType("choose")}
                            >
                                <AspectRatio
                                    ratio={1 / 1}
                                    className="rounded-lg overflow-hidden mt-1"
                                >
                                    <Image
                                        src="/static/images/default.jpg"
                                        alt="Recomendation Image"
                                        fill={true}
                                    />
                                </AspectRatio>{" "}
                                <span>Pilih Gambar</span>
                            </Button>
                        </div>
                    )}
                    <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                </DrawerHeader>
                <DrawerFooter>
                    {image && (
                        <DrawerClose asChild>
                            <Button
                                variant="default"
                                className="text-white bg-primary"
                                type="button"
                            >
                                Simpan
                            </Button>
                        </DrawerClose>
                    )}
                    <DrawerClose asChild>
                        <Button
                            variant="ghost"
                            onClick={resetIcon}
                            type="button"
                        >
                            Batal
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
                {/* </ScrollArea> */}
            </DrawerContent>
        </Drawer>
    );
}

interface ImagePickerProps {
    images: { label: string; value: string }[];
    image: string;
    setImage: (image: string) => void;
}

const ImagePicker = ({ images, image, setImage }: ImagePickerProps) => {
    const [open, setOpen] = useState(false);
    // const totalImage = 27;
    // const imageOptions = images.map((image, index) => ({
    //     label: image,
    //     value: image,
    // }));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-sm"
                >
                    {image
                        ? images.find((img) => img.value === image)?.label
                        : `Pilih gambar...`}
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        unfold_more
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0" align="start">
                <Command>
                    <CommandInput placeholder={`Cari gambar...`} />
                    <CommandList className="overflow-y-auto max-h-40 md:max-h-80">
                        <CommandEmpty>Tidak ada gambar</CommandEmpty>
                        <CommandGroup>
                            {images.map((img, index) => (
                                <CommandItem
                                    key={index}
                                    value={img.value}
                                    onSelect={(currentValue) => {
                                        setImage(
                                            currentValue === image
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
                                                    img.value === image,
                                                "opacity-0":
                                                    img.value !== image,
                                            }
                                        )}
                                    >
                                        check
                                    </span>
                                    {img.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

// {Array.from({ length: totalImage }).map(
//     (_, index) => (
//         <div
//             key={index}
//             className="relative rounded-lg"
//         >
//             <input
//                 type="radio"
//                 id={`rec${index}`}
//                 name="hosting"
//                 value={`rec${index}`}
//                 className="hidden peer"
//                 required
//                 title={`rec${index}`}
//             />
//             <label
//                 htmlFor={`rec${index}`}
//                 className="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer bg-gray-100 border-gray-300 dark:border-neutral-600 hover:bg-purple-50 peer-checked:border-primary dark:peer-checked:border-purple-400 dark:peer-checked:bg-purple-100"
//             >
//                 <AspectRatio
//                     ratio={1 / 1}
//                     className="rounded-lg overflow-hidden"
//                 >
//                     <Image
//                         src={getRecommendationImageUrl(
//                             `icon-cekrek (${
//                                 index +
//                                 1
//                             }).png`
//                         )}
//                         alt="Recomendation Image"
//                         fill={true}
//                         className="rounded-lg object-cover"
//                     />
//                 </AspectRatio>
//             </label>
//         </div>
//     )
// )}
