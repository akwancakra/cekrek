import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

const prisma = new PrismaClient();

interface CustomUser extends NextAuthUser {
    id: any;
    email: string;
    name: string;
    role: string;
    type?: string;
    isGoogle?: boolean; // Add isGoogle to CustomUser
}

interface CustomJWT extends JWT {
    id: any;
    email: string;
    name: string;
    role: string;
    type?: string;
    isGoogle?: boolean; // Add isGoogle to CustomUser
}

interface CustomSession extends Session {
    user: {
        id: any;
        email: string;
        name: string;
        role: string;
        type?: string;
        isGoogle?: boolean; // Add isGoogle to CustomUser
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req): Promise<CustomUser | null> {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.users.findFirst({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) return null;

                if (user.is_google) {
                    // Disallow credential login if isGoogle is true
                    throw new Error("Please use Google sign-in.");
                }

                const decode = await bcrypt.compare(
                    credentials.password,
                    user.password || ""
                );

                if (!decode) return null;

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    type: user?.type || null,
                    isGoogle: user?.is_google || false,
                } as CustomUser;
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const customUser = user as CustomUser;

            const existingUser = await prisma.users.findFirst({
                where: { email: { equals: customUser.email ?? "" } },
            });

            if (
                existingUser &&
                existingUser.is_google &&
                account?.provider !== "google"
            ) {
                // Disallow Google login if isGoogle is false
                throw new Error("Please use credentials to sign in.");
            }

            // console.log("Existing User: ", existingUser);
            if (!existingUser) {
                // const newUser = await prisma.users.create({
                //     data: {
                //         email: customUser.email ?? "",
                //         is_google: true,
                //     },
                // });
                // customUser.id =
                //     newUser.id.toString() ?? undefined;
                // customUser.name= newUser?.name;
            } else {
                customUser.name = existingUser.name;
                customUser.id = existingUser.id.toString() ?? undefined;
            }

            return true;
        },
        async jwt(params) {
            const { token, user } = params;
            // console.log(token);
            if (user) {
                const customUser = user as CustomUser;
                (token as CustomJWT).id = customUser.id;
                (token as CustomJWT).email = customUser.email ?? undefined;
                (token as CustomJWT).name = customUser.name;
                (token as CustomJWT).role = customUser.role;
                (token as CustomJWT).type = customUser.type;
                (token as CustomJWT).isGoogle = customUser.isGoogle;
            }
            return token as CustomJWT;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    id: (token as CustomJWT).id,
                    email: (token as CustomJWT).email,
                    name: (token as CustomJWT).name,
                    role: (token as CustomJWT).role,
                    type: (token as CustomJWT).type,
                    isGoogle: (token as CustomJWT).isGoogle,
                },
            } as CustomSession;
        },
    },
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        maxAge: 60 * 60 * 24 * 30,
    },
    pages: {
        signIn: "/login",
    },
};
