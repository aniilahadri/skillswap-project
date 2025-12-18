import { prisma } from "@/lib/prisma";
import type { UserModel } from "@/lib/prisma/models/User";
import { Availability, ExperienceLevel } from "@/lib/prisma/enums";

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
            },
        });

        const userId = user.user_ID;

        const createSkillConnections = async (skills: string[]) => {
            return Promise.all(
                skills.map(async (name) => {
                    let skill = await prisma.skill.findFirst({ where: { name } });
                    if (!skill) {
                        skill = await prisma.skill.create({ data: { name } });
                    }
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
}