import { ReportDomain } from "@/domain/reportdomain";

const reportDomain = new ReportDomain();

export class ReportService {
    async createReport(reporterId: string, reportedUserId: string, reason: string) {
        return await reportDomain.validateAndCreateReport(reporterId, reportedUserId, reason);
    }
}



