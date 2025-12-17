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

// UserRepository class for data layer operations
export class UserRepository {
    async findByEmail(email: string): Promise<UserModel | null> {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async createUser(data: CreateUserData): Promise<UserModel> {
        // Helper function to find or create a skill
        const findOrCreateSkill = async (skillName: string) => {
            let skill = await prisma.skill.findFirst({
                where: { name: skillName }
            });

            if (!skill) {
                skill = await prisma.skill.create({
                    data: { name: skillName }
                });
            }

            return skill;
        };

        // Find or create all unique skills (deduplicate in case a skill appears in both arrays)
        const allUniqueSkillNames = [...new Set([...data.skillsOffered, ...data.skillsWanted])];
        const skillsMap = new Map<string, any>();
        
        for (const skillName of allUniqueSkillNames) {
            const skill = await findOrCreateSkill(skillName);
            skillsMap.set(skillName, skill);
        }

        // Create User first
        const user = await prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                city: data.city,
                country: data.country,
                bio: data.bio,
                role: "STUDENT",
            }
        });

        // Get user ID - Prisma client uses 'user_ID' matching the schema
        const userId = user.user_ID;

        // Create SkillOffered connections using the ORIGINAL skillsOffered array
        // The map is just a lookup - we use data.skillsOffered to know WHICH skills are offered
        // In nested create, Prisma automatically sets student_ID from the parent Student
        const skillOfferedConnections = data.skillsOffered.map(skillName => {
            const skill = skillsMap.get(skillName); // Look up the skill object from map
            return {
                skill_ID: skill.skill_ID // Only skill_ID needed - student_ID is auto-set by Prisma
            };
        });

        // Create SkillWanted connections using the ORIGINAL skillsWanted array
        // The map is just a lookup - we use data.skillsWanted to know WHICH skills are wanted
        // In nested create, Prisma automatically sets student_ID from the parent Student
        const skillWantedConnections = data.skillsWanted.map(skillName => {
            const skill = skillsMap.get(skillName); // Look up the skill object from map
            return {
                skill_ID: skill.skill_ID // Only skill_ID needed - student_ID is auto-set by Prisma
            };
        });

        // Create Student with nested SkillOffered and SkillWanted
        // Service layer already capitalizes availability, but ensure it matches enum
        // Use enum values directly for type safety
        const availabilityEnum: Availability = data.availability as Availability;
        
        const studentData: any = {
            student_ID: userId,
            availability: availabilityEnum,
            experienceLevel: ExperienceLevel.BEGINNER,
        };

        // Only add nested creates if there are skills
        if (skillOfferedConnections.length > 0) {
            studentData.skillOffered = { create: skillOfferedConnections };
        }
        if (skillWantedConnections.length > 0) {
            studentData.skillWanted = { create: skillWantedConnections };
        }

        await prisma.student.create({
            data: studentData
        });

        // Return user with student included
        // Prisma client uses 'user_ID' matching the schema
        return await prisma.user.findUnique({
            where: { user_ID: userId },
            include: { student: true }
        }) as UserModel;
    }
}