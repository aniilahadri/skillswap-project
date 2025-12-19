import { NextRequest, NextResponse } from "next/server";
import { RequestService } from "@/services/requestservice";
import { validateAdminSession } from "@/utils/adminAuth";

const requestService = new RequestService();

export async function POST(request: NextRequest) {
    try {
        const validation = await validateAdminSession();
        if (!validation.isValid) {
            return validation.response;
        }

        const body = await request.json();
        const { senderId, receiverId, requestedSkillName, offeredSkillName } = body;

        if (!senderId || !receiverId || !requestedSkillName || !offeredSkillName) {
            return NextResponse.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        const result = await requestService.createRequest(
            senderId,
            receiverId,
            requestedSkillName,
            offeredSkillName
        );

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    request: result.request,
                    message: "Request created successfully"
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

