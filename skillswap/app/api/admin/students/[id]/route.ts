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

        const { id: studentId } = await params;
        await adminService.deleteStudent(studentId);

        return NextResponse.json(
            { success: true, message: "Student deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Delete student API error:", error);
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

        const { id: studentId } = await params;
        const body = await request.json();

        const result = await adminService.updateStudent(studentId, body);

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Update student API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

