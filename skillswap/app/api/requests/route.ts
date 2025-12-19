import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { RequestService } from "@/services/requestservice";

const requestService = new RequestService();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { receiverId, requestedSkillName, offeredSkillName } = body;

        if (!receiverId || !requestedSkillName || !offeredSkillName) {
            return NextResponse.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        const result = await requestService.createRequest(
            session.user.id,
            receiverId,
            requestedSkillName,
            offeredSkillName
        );

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    request: result.request,
                    message: "Request sent successfully!"
                },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to create request"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Create request API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

