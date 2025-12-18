import { NextRequest, NextResponse } from "next/server";
import { StudentService } from "@/services/studentservice";

const studentService = new StudentService();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const studentId = params.id;

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

