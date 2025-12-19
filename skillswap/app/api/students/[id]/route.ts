import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { StudentService } from "@/services/studentservice";
import { AdminService } from "@/services/adminservice";

const studentService = new StudentService();
const adminService = new AdminService();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: studentId } = await params;
        const session = await getServerSession(authOptions);

        // Check if the user is an admin
        if (session?.user?.role === "ADMIN" && session.user.id === studentId) {
            // For admin users, fetch admin data using admin service
            const result = await adminService.fetchAdminById(studentId);

            if (!result.success || !result.admin) {
                return NextResponse.json(
                    {
                        success: false,
                        error: result.error || "Admin not found"
                    },
                    { status: 404 }
                );
            }

            // Return admin user data in a format compatible with student profile
            return NextResponse.json(
                {
                    success: true,
                    student: {
                        student_ID: result.admin.user_ID,
                        fullName: result.admin.fullName,
                        email: result.admin.email,
                        city: result.admin.city,
                        country: result.admin.country,
                        bio: result.admin.bio,
                        createdAt: result.admin.createdAt,
                        availability: null,
                        experienceLevel: null,
                        skillsOffered: [],
                        skillsWanted: [],
                        isProfilePublic: true,
                        skillsCompleted: 0
                    }
                },
                { status: 200 }
            );
        }

        const result = await studentService.fetchStudentById(studentId);

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    student: result.student
                },
                { status: 200 }
            );
        } else {
            const statusCode = result.error === "Student not found" ? 404 : 500;
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Internal server error"
                },
                { status: statusCode }
            );
        }
    } catch (error: any) {
        console.error("Student API error:", error);
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
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id: studentId } = await params;
        if (session.user.id !== studentId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 403 }
            );
        }

        const body = await request.json();

        const result = await studentService.updateProfile(studentId, {
            fullName: body.fullName,
            city: body.city,
            country: body.country,
            bio: body.bio,
            availability: body.availability,
            experienceLevel: body.experienceLevel,
            isProfilePublic: body.isProfilePublic
        });

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    student: result.student
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to update profile"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Update profile API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

