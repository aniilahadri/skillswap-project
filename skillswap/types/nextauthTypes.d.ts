import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            fullname: string;
        } & DefaultSession["user"];
        error?: string
    }
    interface User extends DefaultUser { role: string; fullName: string }

}
