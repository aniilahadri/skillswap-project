import { ReportRepository } from "@/data/reportRepository";

const reportRepository = new ReportRepository();

export class ReportDomain {
    async validateAndCreateReport(
        reporterId: string,
        reportedUserId: string,
        reason: string
    ): Promise<{ success: boolean; error?: string }> {
        try {
            if (!reporterId || !reportedUserId || !reason) {
                return { success: false, error: "All fields are required" };
            }

            if (reporterId === reportedUserId) {
                return { success: false, error: "Cannot report yourself" };
            }

            if (reason.trim().length < 10) {
                return { success: false, error: "Reason must be at least 10 characters" };
            }

            const adminId = await reportRepository.getAdminId();
            await reportRepository.createReport(reporterId, reportedUserId, reason, adminId);

            return { success: true };
        } catch (error: any) {
            console.error("Error creating report:", error);
            return {
                success: false,
                error: error.message || "Failed to create report"
            };
        }
    }
}

