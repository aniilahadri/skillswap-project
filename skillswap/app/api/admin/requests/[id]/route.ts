import { NextRequest, NextResponse } from "next/server";
import { AdminService } from "@/services/adminservice";
import { validateAdminSession } from "@/utils/adminAuth";

const adminService = new AdminService();

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const validation = await validateAdminSession();
        if (!validation.isValid) {
            return validation.response;
        }

        const { id: requestId } = await params;
        await adminService.deleteRequest(requestId);

        return NextResponse.json(
            { success: true, message: "Request deleted successfully" },
            { status: 200 }
        );
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
        const validation = await validateAdminSession();
        if (!validation.isValid) {
            return validation.response;
        }

        const { id: requestId } = await params;
        const body = await request.json();

        const result = await adminService.updateRequest(requestId, body);

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Update request API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

