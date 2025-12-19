import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { RequestService } from "@/services/requestservice";

const requestService = new RequestService();

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const result = await requestService.getReceivedRequests(session.user.id);

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    requests: result.requests
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to get received requests"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Get received requests API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

