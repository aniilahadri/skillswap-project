import { prisma } from "@/lib/prisma";
import type { UserModel } from "@/lib/prisma/models/User";
import { Availability, ExperienceLevel } from "@/lib/prisma/enums";
import { SkillRepository } from "./skillRepository";

export interface CreateUserData {
    fullName: string;
    email: string;
    password: string;
    city: string;
    country: string;
    bio: string;
    availability: string;
    skillsOffered: string[];
    skillsWanted: string[];
    phoneNumbers: string[];
}

export class UserRepository {
    async findByEmail(email: string): Promise<UserModel | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async createUser(data: CreateUserData): Promise<UserModel> {
        const user = await prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                city: data.city,
                country: data.country,
                bio: data.bio,
                role: "STUDENT",
                phoneNumber: data.phoneNumbers && data.phoneNumbers.length > 0
                    ? {
                        create: data.phoneNumbers.map(number => ({
                            number: number
                        }))
                    }
                    : undefined,
            },
        });

        const userId = user.user_ID;

        const skillRepository = new SkillRepository();

        const createSkillConnections = async (skills: string[]) => {
            return Promise.all(
                skills.map(async (name) => {
                    const skill = await skillRepository.findOrCreateSkill(name);
                    return { skill_ID: skill.skill_ID };
                })
            );
        };

        const studentData: any = {
            student_ID: userId,
            availability: data.availability as Availability,
            experienceLevel: ExperienceLevel.BEGINNER,
        };

        if (data.skillsOffered.length > 0) {
            studentData.skillOffered = { create: await createSkillConnections(data.skillsOffered) };
        }
        if (data.skillsWanted.length > 0) {
            studentData.skillWanted = { create: await createSkillConnections(data.skillsWanted) };
        }

        await prisma.student.create({ data: studentData });

        return prisma.user.findUnique({
            where: { user_ID: userId },
            include: { student: true },
        }) as Promise<UserModel>;
    }

    async findPhoneNumbersByUserId(userId: string) {
        return prisma.phoneNumber.findMany({
            where: { user_ID: userId },
            select: {
                phone_ID: true,
                number: true
            }
        });
    }

    async countPhoneNumbersByUserId(userId: string): Promise<number> {
        return prisma.phoneNumber.count({
            where: { user_ID: userId }
        });
    }

    async findPhoneNumberByNumber(userId: string, phoneNumber: string) {
        return prisma.phoneNumber.findFirst({
            where: {
                user_ID: userId,
                number: phoneNumber.trim()
            }
        });
    }

    async createPhoneNumber(userId: string, phoneNumber: string) {
        return prisma.phoneNumber.create({
            data: {
                user_ID: userId,
                number: phoneNumber.trim()
            },
            select: {
                phone_ID: true,
                number: true
            }
        });
    }

    async deletePhoneNumber(phoneId: number) {
        return prisma.phoneNumber.delete({
            where: { phone_ID: phoneId }
        });
    }
}