import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { ReportService } from "@/services/reportservice";

const reportService = new ReportService();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { reportedUserId, reason } = body;

        if (!reportedUserId || !reason) {
            return NextResponse.json(
                { success: false, error: "Reported user ID and reason are required" },
                { status: 400 }
            );
        }

        const result = await reportService.createReport(
            session.user.id,
            reportedUserId,
            reason
        );

        if (result.success) {
            return NextResponse.json(
                { success: true, message: "Report submitted successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, error: result.error || "Failed to submit report" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Report API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

