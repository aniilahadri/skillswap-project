import { RequestDomain } from "@/domain/requestdomain";
import { RequestStatus } from "@/lib/prisma/enums";

const requestDomain = new RequestDomain();

export class RequestService {
    async createRequest(
        senderId: string,
        receiverId: string,
        requestedSkillName: string,
        offeredSkillName: string
    ) {
        return await requestDomain.validateAndCreateRequest(
            senderId,
            receiverId,
            requestedSkillName,
            offeredSkillName
        );
    }

    async getSentRequests(studentId: string) {
        return await requestDomain.validateAndGetSentRequests(studentId);
    }

    async getReceivedRequests(studentId: string) {
        return await requestDomain.validateAndGetReceivedRequests(studentId);
    }

    async deleteRequest(requestId: string, studentId: string) {
        return await requestDomain.validateAndDeleteRequest(requestId, studentId);
    }

    async updateRequestStatus(requestId: string, status: RequestStatus, studentId: string) {
        return await requestDomain.validateAndUpdateRequestStatus(requestId, status, studentId);
    }
}

