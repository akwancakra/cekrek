import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserSession } from "@/types/userSession.type";

const useProfile = () => {
    const [profile, setProfile] = useState<UserSession["user"] | null>(null);
    const { data } = useSession();

    useEffect(() => {
        if (data?.user) {
            setProfile(data.user as UserSession["user"]);
        }
    }, [data]);

    return profile;
};

export default useProfile;
