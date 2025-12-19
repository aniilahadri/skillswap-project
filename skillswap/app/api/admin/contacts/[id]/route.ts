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

        const { id: contactId } = await params;
        await adminService.deleteContact(parseInt(contactId));

        return NextResponse.json(
            { success: true, message: "Contact deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Delete contact API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

