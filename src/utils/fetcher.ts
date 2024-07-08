import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const getChildrenImage = (url: string): string => {
    return `/uploads/children/${url}`;
};

const getDataFromLocalStorage = (key: string, initialValue: any) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
};

const saveDataToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const removeDataFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

const iconsRecommendation: string[] = [
    "berekspresi-sesuai-arahan.png",
    "bermain-bowling.png",
    "bermain-di-tempat-sempit.png",
    "bermain-keseimbangan-dengan-satu-kaki.png",
    "bermain-keseimbangan.png",
    "bermain-lompat-tali.png",
    "berpura-pura-bermain-dengan-boneka.png",
    "bertanya-tentang-mobil.png",
    "ban-bergerak.png",
    "memanggil-dan-gestur.png",
    "memberikan-pernyataan-jalan-ramai.png",
    "menangkap-bola.png",
    "menanyakan-ingin-pergi-atau-tetap.png",
    "menatap-mata-afirmasi.png",
    "menatap-mata.png",
    "menatap-tangan-orang-tua.png",
    "menunjuk-boneka.png",
    "menunjuk-untuk-melihat-barang.png",
    "menunjuk-untuk-melihat-sesuatu.png",
    "menyesuaikan-boneka-dengan-gambar.png",
    "menyesuaikan-mobil-dengan-gambar.png",
    "menyodorkan-mobil.png",
    "menyuruh-membuka-sepatu.png",
    "menyusun-kubus.png",
    "menyusun-lego.png",
    "menyusun-puzzle.png",
    "tidak-boleh-melakukan-suatu-hal.png",
];

const iconsOptions: { label: string; value: string }[] = [
    {
        label: "Berekspresi sesuai arahan",
        value: "berekspresi-sesuai-arahan.png",
    },
    {
        label: "Bermain bowling",
        value: "bermain-bowling.png",
    },
    {
        label: "Bermain di tempat sempit",
        value: "bermain-di-tempat-sempit.png",
    },
    {
        label: "Bermain keseimbangan dengan satu kaki",
        value: "bermain-keseimbangan-dengan-satu-kaki.png",
    },
    {
        label: "Bermain keseimbangan",
        value: "bermain-keseimbangan.png",
    },
    {
        label: "Bermain lompat tali",
        value: "bermain-lompat-tali.png",
    },
    {
        label: "Berpura pura bermain dengan boneka",
        value: "berpura-pura-bermain-dengan-boneka.png",
    },
    {
        label: "Bertanya tentang mobil",
        value: "bertanya-tentang-mobil.png",
    },
    {
        label: "Ban bergerak",
        value: "ban-bergerak.png",
    },
    {
        label: "Memanggil dan gestur",
        value: "memanggil-dan-gestur.png",
    },
    {
        label: "Memberikan pernyataan jalan ramai",
        value: "memberikan-pernyataan-jalan-ramai.png",
    },
    {
        label: "Menangkap bola",
        value: "menangkap-bola.png",
    },
    {
        label: "Menanyakan ingin pergi atau tetap",
        value: "menanyakan-ingin-pergi-atau-tetap.png",
    },
    {
        label: "Menatap mata afirmasi",
        value: "menatap-mata-afirmasi.png",
    },
    {
        label: "Menatap mata",
        value: "menatap-mata.png",
    },
    {
        label: "Menatap tangan orang tua",
        value: "menatap-tangan-orang-tua.png",
    },
    {
        label: "Menunjuk boneka",
        value: "menunjuk-boneka.png",
    },
    {
        label: "Menunjuk untuk melihat barang",
        value: "menunjuk-untuk-melihat-barang.png",
    },
    {
        label: "Menunjuk untuk melihat sesuatu",
        value: "menunjuk-untuk-melihat-sesuatu.png",
    },
    {
        label: "Menyesuaikan boneka dengan gambar",
        value: "menyesuaikan-boneka-dengan-gambar.png",
    },
    {
        label: "Menyesuaikan mobil dengan gambar",
        value: "menyesuaikan-mobil-dengan-gambar.png",
    },
    {
        label: "Menyodorkan mobil",
        value: "menyodorkan-mobil.png",
    },
    {
        label: "Menyuruh membuka sepatu",
        value: "menyuruh-membuka-sepatu.png",
    },
    {
        label: "Menyusun kubus",
        value: "menyusun-kubus.png",
    },
    {
        label: "Menyusun lego",
        value: "menyusun-lego.png",
    },
    {
        label: "Menyusun puzzle",
        value: "menyusun-puzzle.png",
    },
    {
        label: "Tidak boleh melakukan suatu hal",
        value: "tidak-boleh-melakukan-suatu-hal.png",
    },
];

export {
    fetcher,
    getChildrenImage,
    getDataFromLocalStorage,
    saveDataToLocalStorage,
    removeDataFromLocalStorage,
    iconsRecommendation,
    iconsOptions,
};
