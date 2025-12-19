import { prisma } from "@/lib/prisma";
import { RequestStatus } from "@/lib/prisma/enums";

export interface RequestData {
    request_ID: string;
    sender_ID: string;
    receiver_ID: string;
    requestedSkill_ID: string;
    offeredSkill_ID: string;
    status: string;
    createdAt: Date;
    completedAt?: Date | null;
    senderName: string;
    receiverName: string;
    requestedSkillName: string;
    offeredSkillName: string;
    senderEmail?: string;
    receiverEmail?: string;
}

export class RequestRepository {
    async createRequest(
        senderId: string,
        receiverId: string,
        requestedSkillId: string,
        offeredSkillId: string
    ): Promise<RequestData> {
        const request = await prisma.request.create({
            data: {
                sender_ID: senderId,
                receiver_ID: receiverId,
                requestedSkill_ID: requestedSkillId,
                offeredSkill_ID: offeredSkillId,
                status: RequestStatus.PENDING
            },
            include: {
                sender: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                email: true
                            }
                        }
                    }
                },
                receiver: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                email: true
                            }
                        }
                    }
                },
                requestedSkill: {
                    include: {
                        skill: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                offeredSkill: {
                    include: {
                        skill: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return {
            request_ID: request.request_ID,
            sender_ID: request.sender_ID,
            receiver_ID: request.receiver_ID,
            requestedSkill_ID: request.requestedSkill_ID,
            offeredSkill_ID: request.offeredSkill_ID,
            status: request.status,
            createdAt: request.createdAt,
            senderName: request.sender.user.fullName,
            receiverName: request.receiver.user.fullName,
            requestedSkillName: request.requestedSkill.skill.name,
            offeredSkillName: request.offeredSkill.skill.name,
            senderEmail: request.sender.user.email,
            receiverEmail: request.receiver.user.email
        };
    }

    async checkDuplicateRequest(
        senderId: string,
        receiverId: string,
        requestedSkillId: string,
        offeredSkillId: string
    ): Promise<boolean> {
        const existing = await prisma.request.findFirst({
            where: {
                sender_ID: senderId,
                receiver_ID: receiverId,
                requestedSkill_ID: requestedSkillId,
                offeredSkill_ID: offeredSkillId
            }
        });

        return existing !== null;
    }

    async getSentRequests(studentId: string): Promise<RequestData[]> {
        try {
            const requests = await prisma.request.findMany({
                where: {
                    sender_ID: studentId
                },
                include: {
                    sender: {
                        include: {
                            user: {
                                select: {
                                    fullName: true,
                                    email: true
                                }
                            }
                        }
                    },
                    receiver: {
                        include: {
                            user: {
                                select: {
                                    fullName: true,
                                    email: true
                                }
                            }
                        }
                    },
                    requestedSkill: {
                        include: {
                            skill: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    offeredSkill: {
                        include: {
                            skill: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return requests
                .filter(request => request.requestedSkill && request.offeredSkill && request.sender?.user && request.receiver?.user)
                .map(request => ({
                    request_ID: request.request_ID,
                    sender_ID: request.sender_ID,
                    receiver_ID: request.receiver_ID,
                    requestedSkill_ID: request.requestedSkill_ID,
                    offeredSkill_ID: request.offeredSkill_ID,
                    status: request.status as string,
                    createdAt: request.createdAt,
                    completedAt: request.completedAt || null,
                    senderName: request.sender!.user!.fullName,
                    receiverName: request.receiver!.user!.fullName,
                    requestedSkillName: request.requestedSkill!.skill.name,
                    offeredSkillName: request.offeredSkill!.skill.name,
                    senderEmail: request.sender!.user!.email,
                    receiverEmail: request.receiver!.user!.email
                }));
        } catch (error: any) {
            console.error("Error in getSentRequests:", error);
            throw error;
        }
    }

    async getReceivedRequests(studentId: string): Promise<RequestData[]> {
        try {
            const requests = await prisma.request.findMany({
                where: {
                    receiver_ID: studentId
                },
                include: {
                    sender: {
                        include: {
                            user: {
                                select: {
                                    fullName: true,
                                    email: true
                                }
                            }
                        }
                    },
                    receiver: {
                        include: {
                            user: {
                                select: {
                                    fullName: true,
                                    email: true
                                }
                            }
                        }
                    },
                    requestedSkill: {
                        include: {
                            skill: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    offeredSkill: {
                        include: {
                            skill: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return requests
                .filter(request => request.requestedSkill && request.offeredSkill && request.sender?.user && request.receiver?.user)
                .map(request => ({
                    request_ID: request.request_ID,
                    sender_ID: request.sender_ID,
                    receiver_ID: request.receiver_ID,
                    requestedSkill_ID: request.requestedSkill_ID,
                    offeredSkill_ID: request.offeredSkill_ID,
                    status: request.status as string,
                    createdAt: request.createdAt,
                    completedAt: request.completedAt || null,
                    senderName: request.sender!.user!.fullName,
                    receiverName: request.receiver!.user!.fullName,
                    requestedSkillName: request.requestedSkill!.skill.name,
                    offeredSkillName: request.offeredSkill!.skill.name,
                    senderEmail: request.sender!.user!.email,
                    receiverEmail: request.receiver!.user!.email
                }));
        } catch (error: any) {
            console.error("Error in getReceivedRequests:", error);
            throw error;
        }
    }

    async findSkillOfferedId(studentId: string, skillName: string): Promise<string | null> {
        const normalizedName = skillName.trim();

        const allSkills = await prisma.skill.findMany();
        const skill = allSkills.find(s => s.name.trim().toLowerCase() === normalizedName.toLowerCase());

        if (!skill) return null;

        const skillOffered = await prisma.skillOffered.findFirst({
            where: {
                student_ID: studentId,
                skill_ID: skill.skill_ID
            }
        });

        return skillOffered?.skillOffered_ID || null;
    }

    async findSkillWantedId(studentId: string, skillName: string): Promise<string | null> {
        const normalizedName = skillName.trim();

        const allSkills = await prisma.skill.findMany();
        const skill = allSkills.find(s => s.name.trim().toLowerCase() === normalizedName.toLowerCase());

        if (!skill) return null;

        const skillWanted = await prisma.skillWanted.findFirst({
            where: {
                student_ID: studentId,
                skill_ID: skill.skill_ID
            }
        });

        return skillWanted?.skillWanted_ID || null;
    }

    async findSkillOfferedIdByReceiver(receiverId: string, skillName: string): Promise<string | null> {
        return this.findSkillOfferedId(receiverId, skillName);
    }

    async findSkillWantedIdByReceiver(receiverId: string, skillName: string): Promise<string | null> {
        return this.findSkillWantedId(receiverId, skillName);
    }

    async deleteRequest(requestId: string): Promise<void> {
        await prisma.request.delete({
            where: { request_ID: requestId }
        });
    }

    async findRequestsBySkillOfferedId(skillOfferedId: string): Promise<Array<{ request_ID: string; status: string }>> {
        const requests = await prisma.request.findMany({
            where: {
                requestedSkill_ID: skillOfferedId
            },
            select: {
                request_ID: true,
                status: true
            }
        });
        return requests;
    }

    async findRequestsBySkillWantedId(skillWantedId: string): Promise<Array<{ request_ID: string; status: string }>> {
        const requests = await prisma.request.findMany({
            where: {
                offeredSkill_ID: skillWantedId
            },
            select: {
                request_ID: true,
                status: true
            }
        });
        return requests;
    }

    async deletePendingRequests(requestIds: string[]): Promise<void> {
        if (requestIds.length === 0) return;
        await prisma.request.deleteMany({
            where: {
                request_ID: { in: requestIds },
                status: RequestStatus.PENDING
            }
        });
    }

    async deleteNonAcceptedRequests(requestIds: string[]): Promise<void> {
        if (requestIds.length === 0) return;
        await prisma.request.deleteMany({
            where: {
                request_ID: { in: requestIds },
                status: { not: RequestStatus.ACCEPTED }
            }
        });
    }

    async updateRequestStatus(requestId: string, status: RequestStatus): Promise<RequestData | null> {
        const request = await prisma.request.update({
            where: { request_ID: requestId },
            data: {
                status,
                completedAt: status === RequestStatus.COMPLETED ? new Date() : undefined
            },
            include: {
                sender: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                email: true
                            }
                        }
                    }
                },
                receiver: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                email: true
                            }
                        }
                    }
                },
                requestedSkill: {
                    include: {
                        skill: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                offeredSkill: {
                    include: {
                        skill: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!request.requestedSkill || !request.offeredSkill || !request.sender?.user || !request.receiver?.user) {
            return null;
        }

        return {
            request_ID: request.request_ID,
            sender_ID: request.sender_ID,
            receiver_ID: request.receiver_ID,
            requestedSkill_ID: request.requestedSkill_ID,
            offeredSkill_ID: request.offeredSkill_ID,
            status: request.status as string,
            createdAt: request.createdAt,
            completedAt: request.completedAt || null,
            senderName: request.sender.user.fullName,
            receiverName: request.receiver.user.fullName,
            requestedSkillName: request.requestedSkill.skill.name,
            offeredSkillName: request.offeredSkill.skill.name,
            senderEmail: request.sender.user.email,
            receiverEmail: request.receiver.user.email
        };
    }

    async incrementSkillsCompleted(studentId: string): Promise<void> {
        await prisma.student.update({
            where: { student_ID: studentId },
            data: {
                skillsCompleted: {
                    increment: 1
                }
            }
        });
    }

    async findRequestById(requestId: string): Promise<RequestData | null> {
        const request = await prisma.request.findUnique({
            where: { request_ID: requestId },
            include: {
                sender: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                email: true
                            }
                        }
                    }
                },
                receiver: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                email: true
                            }
                        }
                    }
                },
                requestedSkill: {
                    include: {
                        skill: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                offeredSkill: {
                    include: {
                        skill: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!request || !request.requestedSkill || !request.offeredSkill || !request.sender?.user || !request.receiver?.user) {
            return null;
        }

        return {
            request_ID: request.request_ID,
            sender_ID: request.sender_ID,
            receiver_ID: request.receiver_ID,
            requestedSkill_ID: request.requestedSkill_ID,
            offeredSkill_ID: request.offeredSkill_ID,
            status: request.status as string,
            createdAt: request.createdAt,
            completedAt: request.completedAt || null,
            senderName: request.sender.user.fullName,
            receiverName: request.receiver.user.fullName,
            requestedSkillName: request.requestedSkill.skill.name,
            offeredSkillName: request.offeredSkill.skill.name,
            senderEmail: request.sender.user.email,
            receiverEmail: request.receiver.user.email
        };
    }
}

