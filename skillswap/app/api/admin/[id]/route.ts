import { NextRequest, NextResponse } from "next/server";
import { validateAdminSession } from "@/utils/adminAuth";
import { AdminService } from "@/services/adminservice";

const adminService = new AdminService();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const validation = await validateAdminSession();
        if (!validation.isValid) {
            return validation.response;
        }
        
        const session = validation.session;

        const { id: adminId } = await params;

        if (session.user.id !== adminId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 403 }
            );
        }

        const result = await adminService.fetchAdminById(adminId);

        if (result.success && result.admin) {
            return NextResponse.json(
                {
                    success: true,
                    admin: result.admin
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to get admin profile"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Get admin profile API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
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

        const session = validation.session;
        const { id: adminId } = await params;

        if (session.user.id !== adminId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 403 }
            );
        }

        const body = await request.json();

        const result = await adminService.updateAdminProfile(adminId, {
            fullName: body.fullName,
            city: body.city,
            country: body.country,
            bio: body.bio
        });

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    admin: result.admin
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to update admin profile"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Update admin profile API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}


