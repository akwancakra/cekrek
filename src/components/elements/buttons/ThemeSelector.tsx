import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { useIsClient } from "usehooks-ts";

const ThemeSelector = () => {
    const { setTheme, theme } = useTheme();
    const isClient = useIsClient();

    if (!isClient) {
        return <div className="skeleton h-9 w-28 rounded-lg"></div>;
    }

    return (
        <Select
            value={theme}
            defaultValue={theme}
            onValueChange={(theme) => setTheme(theme)}
        >
            <SelectTrigger className="w-fit min-w-24">
                <SelectValue placeholder="Tema Terang" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Tema Terang</SelectItem>
                <SelectItem value="dark">Tema Gelap</SelectItem>
                <SelectItem value="system">Tema Sistem</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default ThemeSelector;
