import { AdminRepository } from "@/data/adminRepository";
import { prisma } from "@/lib/prisma";
import { SkillRepository } from "@/data/skillRepository";
import { Availability, ExperienceLevel, Role } from "@/lib/prisma/enums";
import bcrypt from "bcryptjs";

const adminRepository = new AdminRepository();

export class AdminService {
    async fetchAdminById(adminId: string) {
        return await adminRepository.findById(adminId);
    }

    async updateAdminProfile(adminId: string, data: {
        fullName?: string;
        city?: string;
        country?: string;
        bio?: string;
    }) {
        return await adminRepository.updateAdmin(adminId, data);
    }

    async createUser(data: {
        fullName: string;
        email: string;
        password: string;
        city: string;
        country: string;
        bio: string;
        role: string;
        availability?: string;
        experienceLevel?: string;
        skillsOffered?: string[];
        skillsWanted?: string[];
        phoneNumbers?: string[];
    }) {
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            return { success: false, error: "Email already exists" };
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        const user = await prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: hashedPassword,
                city: data.city,
                country: data.country,
                bio: data.bio,
                role: data.role as Role,
                phoneNumber: data.phoneNumbers && data.phoneNumbers.length > 0 ? {
                    create: data.phoneNumbers.map((number: string) => ({ number }))
                } : undefined
            }
        });

        if (data.role === "STUDENT") {
            const skillRepository = new SkillRepository();
            const createSkillConnections = async (skills: string[]) => {
                return Promise.all(skills.map(async (name: string) => {
                    const skill = await skillRepository.findOrCreateSkill(name);
                    return { skill_ID: skill.skill_ID };
                }));
            };

            const studentData: any = {
                student_ID: user.user_ID,
                availability: (data.availability || "Morning") as Availability,
                experienceLevel: (data.experienceLevel || ExperienceLevel.BEGINNER) as ExperienceLevel,
            };

            if (data.skillsOffered && data.skillsOffered.length > 0) {
                studentData.skillOffered = { create: await createSkillConnections(data.skillsOffered) };
            }
            if (data.skillsWanted && data.skillsWanted.length > 0) {
                studentData.skillWanted = { create: await createSkillConnections(data.skillsWanted) };
            }

            await prisma.student.create({ data: studentData });
        } else if (data.role === "ADMIN") {
            await prisma.admin.create({ data: { admin_ID: user.user_ID } });
        }

        const { password, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
    }

    async updateUser(userId: string, data: {
        fullName?: string;
        email?: string;
        city?: string;
        country?: string;
        bio?: string;
        role?: string;
    }) {
        const user = await prisma.user.update({
            where: { user_ID: userId },
            data: {
                ...(data.fullName && { fullName: data.fullName }),
                ...(data.email && { email: data.email }),
                ...(data.city && { city: data.city }),
                ...(data.country && { country: data.country }),
                ...(data.bio && { bio: data.bio }),
                ...(data.role && { role: data.role as Role })
            }
        });

        const { password, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
    }

    async deleteUser(userId: string) {
        await prisma.user.delete({ where: { user_ID: userId } });
        return { success: true };
    }

    async createSkill(data: { name: string; category?: string }) {
        const skill = await prisma.skill.create({
            data: {
                name: data.name,
                category: data.category || null
            }
        });
        return { success: true, skill };
    }

    async updateSkill(skillId: string, data: { name?: string; category?: string }) {
        const skill = await prisma.skill.update({
            where: { skill_ID: skillId },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.category !== undefined && { category: data.category || null })
            }
        });
        return { success: true, skill };
    }

    async deleteSkill(skillId: string) {
        await prisma.skill.delete({ where: { skill_ID: skillId } });
        return { success: true };
    }

    async updateRequest(requestId: string, data: { status?: string }) {
        const updateData: any = {};
        if (data.status) {
            updateData.status = data.status;
            if (data.status === 'COMPLETED') {
                updateData.completedAt = new Date();
            }
        }

        const request = await prisma.request.update({
            where: { request_ID: requestId },
            data: updateData
        });
        return { success: true, request };
    }

    async deleteRequest(requestId: string) {
        await prisma.request.delete({ where: { request_ID: requestId } });
        return { success: true };
    }

    async updateReport(reportId: number, data: { reason?: string; adminNotes?: string }) {
        const report = await prisma.report.update({
            where: { report_ID: reportId },
            data: {
                ...(data.reason && { reason: data.reason }),
                ...(data.adminNotes !== undefined && { adminNotes: data.adminNotes })
            }
        });
        return { success: true, report };
    }

    async deleteReport(reportId: number) {
        await prisma.report.delete({ where: { report_ID: reportId } });
        return { success: true };
    }

    async updateStudent(studentId: string, data: {
        fullName?: string;
        city?: string;
        country?: string;
        bio?: string;
        experienceLevel?: string;
        availability?: string;
        isProfilePublic?: boolean;
        skillsCompleted?: number;
    }) {
        const studentUpdateData: any = {};
        if (data.experienceLevel) studentUpdateData.experienceLevel = data.experienceLevel;
        if (data.availability) studentUpdateData.availability = data.availability;
        if (data.isProfilePublic !== undefined) studentUpdateData.isProfilePublic = data.isProfilePublic;
        if (data.skillsCompleted !== undefined) studentUpdateData.skillsCompleted = data.skillsCompleted;

        const userUpdateData: any = {};
        if (data.fullName) userUpdateData.fullName = data.fullName;
        if (data.city) userUpdateData.city = data.city;
        if (data.country) userUpdateData.country = data.country;
        if (data.bio) userUpdateData.bio = data.bio;

        if (Object.keys(userUpdateData).length > 0) {
            studentUpdateData.user = { update: userUpdateData };
        }

        const student = await prisma.student.update({
            where: { student_ID: studentId },
            data: studentUpdateData,
            include: { user: true }
        });

        return { success: true, student };
    }

    async deleteStudent(studentId: string) {
        await prisma.student.delete({ where: { student_ID: studentId } });
        return { success: true };
    }
}
