import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextAuthDomain } from "@/domain/nextauthDomain";
import { RefreshTokenRepository } from "@/data/refreshTokenRepository";
import crypto from "crypto";

const nextAuthService = new NextAuthDomain();
const refreshTokenRepo = new RefreshTokenRepository();

export const nextAuthHandler = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "Email",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "Password",
                },
            },
            authorize: async (credentials) => {
                console.log("Authorize called with:", credentials);

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                return await nextAuthService.logInUser(credentials?.email, credentials?.password);
                // if (credentials?.email === "student@test.com" && credentials?.password === "password123") {
                //     console.log("Authorize success");
                //     return { id: "test-id", role: "student", name: "Test User", email: credentials.email };
                // }
                // console.log("Authorize failed");
                // return null;
            }
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
        updateAge: 3 * 60
    },

    jwt: {
        maxAge: 15 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                try {
                    const refreshToken = crypto.randomBytes(40).toString("hex");

                    await refreshTokenRepo.createToken(
                        refreshToken, user.id, new Date(Date.now() + 60 * 60 * 1000)
                    );

                    return {
                        ...token,
                        id: user.id,
                        role: user.role,
                        refresh_token: refreshToken,
                        exp: Math.floor(Date.now() / 1000) + 15 * 60,
                    };
                } catch (error) {
                    console.error("Error creating a refresh token:", error);
                    return token;
                }
            }
            try {

                if (typeof token.id !== "string" || typeof token.refresh_token !== "string") {
                    return token;
                }

                const dbToken = await refreshTokenRepo.findFirstToken(token.refresh_token, token.id);

                if (!dbToken || dbToken.expiresAt < new Date()) {
                    return { ...token, error: "RefreshTokenExpired" };
                }

                const now = Math.floor(Date.now() / 1000);
                if (typeof token.exp === "number" && now > token.exp - 3 * 60) {
                    return {
                        ...token,
                        exp: now + 15 * 60,
                        refresh_token: dbToken.token,
                    };
                }
            } catch (error) {
                console.error("Error validating the refreshing token:", error);
                return token;
            }
            return token;
        },

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                },
                error: token.error || undefined,
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})