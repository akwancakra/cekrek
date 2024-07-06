import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserSession } from "@/types/userSession.type";

const useProfile = () => {
    const [profile, setProfile] = useState<UserSession["user"] | null>(null);
    const [isReady, setIsReady] = useState(false);
    const { data } = useSession();

    useEffect(() => {
        if (data?.user) {
            setProfile(data.user as UserSession["user"]);
            setIsReady(true);
        } else if (data && !data.user) {
            setIsReady(true); // Set isReady even if there is no user data
        }
    }, [data]);

    return { profile, isReady };
};

export default useProfile;

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { UserSession } from "@/types/userSession.type";

// const useProfile = () => {
//     const [profile, setProfile] = useState<UserSession["user"] | null>(null);
//     const { data } = useSession();

//     useEffect(() => {
//         if (data?.user) {
//             setProfile(data.user as UserSession["user"]);
//         }
//     }, [data]);

//     return profile;
// };

// export default useProfile;
