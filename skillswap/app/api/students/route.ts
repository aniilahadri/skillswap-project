import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/services/auth/nextAuth";
import { StudentService } from "@/services/studentservice";

const studentService = new StudentService();

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const loggedInUserId = (session as any)?.user?.id;

        const result = await studentService.fetchPublicStudents(loggedInUserId, loggedInUserId);

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    students: result.students
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to get students"
                },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error("Students API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

