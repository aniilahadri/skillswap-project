import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { AdminService } from "@/services/adminservice";

const adminService = new AdminService();

export async function PUT(
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

        const { id: adminId } = await params;
        
        // Only allow admins to update their own profile
        if (session.user.id !== adminId || session.user.role !== "ADMIN") {
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

