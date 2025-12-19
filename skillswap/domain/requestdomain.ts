import { RequestRepository, type RequestData } from "@/data/requestRepository";
import { RequestStatus } from "@/lib/prisma/enums";

const requestRepository = new RequestRepository();

export class RequestDomain {
    async validateAndCreateRequest(
        senderId: string,
        receiverId: string,
        requestedSkillName: string,
        offeredSkillName: string
    ): Promise<{ success: boolean; request?: RequestData; error?: string }> {
        try {
            if (!senderId || !receiverId || !requestedSkillName || !offeredSkillName) {
                return { success: false, error: "All fields are required" };
            }

            if (senderId === receiverId) {
                return { success: false, error: "Cannot send request to yourself" };
            }

            const requestedSkillId = await requestRepository.findSkillOfferedIdByReceiver(receiverId, requestedSkillName);

            const offeredSkillId = await requestRepository.findSkillWantedIdByReceiver(receiverId, offeredSkillName);

            const senderHasSkill = await requestRepository.findSkillOfferedId(senderId, offeredSkillName);

            if (!requestedSkillId) {
                return { success: false, error: "Requested skill not found for this user" };
            }

            if (!offeredSkillId) {
                return { success: false, error: "The receiver doesn't want to learn this skill" };
            }

            if (!senderHasSkill) {
                return { success: false, error: "You don't have this skill to offer" };
            }

            const isDuplicate = await requestRepository.checkDuplicateRequest(
                senderId,
                receiverId,
                requestedSkillId,
                offeredSkillId
            );

            if (isDuplicate) {
                return { success: false, error: "You have already sent this request. Cannot send the same request again." };
            }

            const request = await requestRepository.createRequest(
                senderId,
                receiverId,
                requestedSkillId,
                offeredSkillId
            );

            return { success: true, request };
        } catch (error: any) {
            console.error("Error creating request:", error);
            return {
                success: false,
                error: error.message || "Failed to create request"
            };
        }
    }

    async validateAndGetSentRequests(studentId: string): Promise<{ success: boolean; requests?: RequestData[]; error?: string }> {
        try {
            if (!studentId) {
                return { success: false, error: "Student ID is required" };
            }

            const requests = await requestRepository.getSentRequests(studentId);

            return { success: true, requests };
        } catch (error: any) {
            console.error("Error getting sent requests:", error);
            return {
                success: false,
                error: error.message || "Failed to get sent requests"
            };
        }
    }

    async validateAndGetReceivedRequests(studentId: string): Promise<{ success: boolean; requests?: RequestData[]; error?: string }> {
        try {
            if (!studentId) {
                return { success: false, error: "Student ID is required" };
            }

            const requests = await requestRepository.getReceivedRequests(studentId);

            return { success: true, requests };
        } catch (error: any) {
            console.error("Error getting received requests:", error);
            return {
                success: false,
                error: error.message || "Failed to get received requests"
            };
        }
    }

    async validateAndDeleteRequest(requestId: string, studentId: string): Promise<{ success: boolean; error?: string }> {
        try {
            if (!requestId || !studentId) {
                return { success: false, error: "Request ID and Student ID are required" };
            }

            const request = await requestRepository.findRequestById(requestId);
            if (!request) {
                return { success: false, error: "Request not found" };
            }

            if (request.sender_ID !== studentId && request.receiver_ID !== studentId) {
                return { success: false, error: "Unauthorized" };
            }

            await requestRepository.deleteRequest(requestId);
            return { success: true };
        } catch (error: any) {
            console.error("Error deleting request:", error);
            return {
                success: false,
                error: error.message || "Failed to delete request"
            };
        }
    }

    async validateAndUpdateRequestStatus(
        requestId: string,
        status: RequestStatus,
        studentId: string
    ): Promise<{ success: boolean; request?: RequestData; error?: string }> {
        try {
            if (!requestId || !status || !studentId) {
                return { success: false, error: "Request ID, status, and Student ID are required" };
            }

            const request = await requestRepository.findRequestById(requestId);
            if (!request) {
                return { success: false, error: "Request not found" };
            }

            if (status === RequestStatus.ACCEPTED || status === RequestStatus.REJECTED) {
                if (request.receiver_ID !== studentId) {
                    return { success: false, error: "Only the receiver can accept or reject requests" };
                }
            }

            const updatedRequest = await requestRepository.updateRequestStatus(requestId, status);

            if (!updatedRequest) {
                return { success: false, error: "Failed to update request" };
            }
            if (status === RequestStatus.COMPLETED) {
                await requestRepository.incrementSkillsCompleted(request.sender_ID);
                await requestRepository.incrementSkillsCompleted(request.receiver_ID);
            }

            return { success: true, request: updatedRequest };
        } catch (error: any) {
            console.error("Error updating request status:", error);
            return {
                success: false,
                error: error.message || "Failed to update request status"
            };
        }
    }
}

