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

        const { id: reportId } = await params;
        await adminService.deleteReport(parseInt(reportId));

        return NextResponse.json(
            { success: true, message: "Report deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Delete report API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const validation = await validateAdminSession();
        if (!validation.isValid) {
            return validation.response;
        }

        const { id: reportId } = await params;
        const body = await request.json();

        const result = await adminService.updateReport(parseInt(reportId), body);

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Update report API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

