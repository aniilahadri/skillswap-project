import { NextRequest, NextResponse } from "next/server";
import { AdminService } from "@/services/adminservice";
import { validateAdminSession } from "@/utils/adminAuth";

const adminService = new AdminService();

export async function POST(request: NextRequest) {
    try {
        const validation = await validateAdminSession();
        if (!validation.isValid) {
            return validation.response;
        }

        const body = await request.json();
        const { name, category } = body;

        if (!name) {
            return NextResponse.json(
                { success: false, error: "Skill name is required" },
                { status: 400 }
            );
        }

        const result = await adminService.createSkill({ name, category });

        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        console.error("Create skill API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

