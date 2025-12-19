import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { RequestService } from "@/services/requestservice";
import { RequestStatus } from "@/lib/prisma/enums";

const requestService = new RequestService();

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id: requestId } = await params;
        const result = await requestService.deleteRequest(requestId, session.user.id);

        if (result.success) {
            return NextResponse.json(
                { success: true, message: "Request deleted successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, error: result.error || "Failed to delete request" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Delete request API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id: requestId } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status || !Object.values(RequestStatus).includes(status)) {
            return NextResponse.json(
                { success: false, error: "Valid status is required" },
                { status: 400 }
            );
        }

        const result = await requestService.updateRequestStatus(
            requestId,
            status as RequestStatus,
            session.user.id
        );

        if (result.success) {
            return NextResponse.json(
                { success: true, request: result.request, message: "Request status updated successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, error: result.error || "Failed to update request status" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Update request status API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}



