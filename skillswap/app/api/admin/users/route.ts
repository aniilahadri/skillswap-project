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
        const { fullName, email, password, city, country, bio, role, availability, experienceLevel, skillsOffered, skillsWanted, phoneNumbers } = body;

        if (!fullName || !email || !password || !city || !country || !bio || !role) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const result = await adminService.createUser({
            fullName,
            email,
            password,
            city,
            country,
            bio,
            role,
            availability,
            experienceLevel,
            skillsOffered,
            skillsWanted,
            phoneNumbers
        });

        if (result.success) {
            return NextResponse.json(result, { status: 201 });
        } else {
            return NextResponse.json(result, { status: 400 });
        }
    } catch (error: any) {
        console.error("Create user API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

