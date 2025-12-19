import { prisma } from "@/lib/prisma";
import { AdminRepository } from "./adminRepository";

export class ReportRepository {
    private adminRepository = new AdminRepository();

    async createReport(
        reporterId: string,
        reportedUserId: string,
        reason: string,
        adminId: string
    ): Promise<void> {
        await prisma.report.create({
            data: {
                reporter_ID: reporterId,
                reportedUser_ID: reportedUserId,
                reason,
                admin_ID: adminId
            }
        });
    }

    async getAdminId(): Promise<string> {
        const adminId = await this.adminRepository.findFirstAdminId();
        if (!adminId) {
            throw new Error("No admin found. Please ensure at least one admin exists.");
        }
        return adminId;
    }
}

