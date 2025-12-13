"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionRefresher() {
    const { data: session, update } = useSession();

    useEffect(() => {
        if (session?.error) {
            signOut({ callbackUrl: "/" });
        }
        const interval = setInterval(() => {
            update();
        }, 3 * 60 * 1000);
        return () => clearInterval(interval);
    }, [update, session]);

    return null;
}
