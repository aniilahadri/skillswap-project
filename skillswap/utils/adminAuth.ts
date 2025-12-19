import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { NextResponse } from "next/server";

export async function validateAdminSession() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id || session.user.role !== "ADMIN") {
        return {
            isValid: false,
            response: NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            )
        };
    }
    return { isValid: true, session };
}

