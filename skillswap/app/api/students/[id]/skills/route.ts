import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { StudentService } from "@/services/studentservice";

const studentService = new StudentService();

export async function DELETE(
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

        const { searchParams } = new URL(request.url);
        const skillName = searchParams.get('skillName');
        const skillType = searchParams.get('skillType') as 'offered' | 'wanted';

        if (!skillName || !skillType) {
            return NextResponse.json(
                { success: false, error: "skillName and skillType are required" },
                { status: 400 }
            );
        }

        const result = await studentService.removeSkill(studentId, skillName, skillType);

        if (result.success) {
            return NextResponse.json(
                { success: true },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to delete skill"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Delete skill API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

export async function POST(
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
        const { skillsOffered = [], skillsWanted = [] } = body;

        const result = await studentService.addSkills(studentId, skillsOffered, skillsWanted);

        if (result.success) {
            return NextResponse.json(
                { success: true },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to add skills"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Add skills API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

