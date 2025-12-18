import { prisma } from "@/lib/prisma";
import { Availability, ExperienceLevel } from "@/lib/prisma/enums";
import { SkillRepository } from "./skillRepository";

export interface StudentWithSkills {
    student_ID: string;
    fullName: string;
    city: string;
    country: string;
    bio: string;
    availability: string;
    experienceLevel?: string;
    isProfilePublic?: boolean;
    email?: string;
    createdAt?: Date;
    skillsOffered: string[];
    skillsWanted: string[];
}

export class StudentRepository {
    async findManyPublic(excludeStudentId?: string): Promise<StudentWithSkills[]> {
        const students = await prisma.student.findMany({
            where: {
                isProfilePublic: true,
                ...(excludeStudentId && { student_ID: { not: excludeStudentId } })
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        city: true,
                        country: true,
                        bio: true
                    }
                },
                skillOffered: {
                    include: {
                        skill: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                skillWanted: {
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

        return students.map(student => ({
            student_ID: student.student_ID,
            fullName: student.user.fullName,
            city: student.user.city,
            country: student.user.country,
            bio: student.user.bio,
            availability: student.availability,
            skillsOffered: student.skillOffered.map(so => so.skill.name),
            skillsWanted: student.skillWanted.map(sw => sw.skill.name),
            experienceLevel: student.experienceLevel,
            isProfilePublic: student.isProfilePublic
        }));
    }

    async findById(studentId: string): Promise<StudentWithSkills | null> {
        const student = await prisma.student.findUnique({
            where: {
                student_ID: studentId
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        city: true,
                        country: true,
                        bio: true,
                        email: true,
                        createdAt: true
                    }
                },
                skillOffered: {
                    include: {
                        skill: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                skillWanted: {
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

        if (!student) {
            return null;
        }

        return {
            student_ID: student.student_ID,
            fullName: student.user.fullName,
            city: student.user.city,
            country: student.user.country,
            bio: student.user.bio,
            availability: student.availability,
            experienceLevel: student.experienceLevel,
            isProfilePublic: student.isProfilePublic,
            email: student.user.email,
            createdAt: student.user.createdAt,
            skillsOffered: student.skillOffered.map(so => so.skill.name),
            skillsWanted: student.skillWanted.map(sw => sw.skill.name)
        };
    }

    async updateStudent(studentId: string, data: {
        fullName?: string;
        city?: string;
        country?: string;
        bio?: string;
        availability?: string;
        experienceLevel?: string;
        isProfilePublic?: boolean;
    }): Promise<StudentWithSkills | null> {
        const updateData: any = {};
        const userUpdateData: any = {};

        if (data.fullName !== undefined) userUpdateData.fullName = data.fullName;
        if (data.city !== undefined) userUpdateData.city = data.city;
        if (data.country !== undefined) userUpdateData.country = data.country;
        if (data.bio !== undefined) userUpdateData.bio = data.bio;
        if (data.availability !== undefined) updateData.availability = data.availability as Availability;
        if (data.experienceLevel !== undefined) updateData.experienceLevel = data.experienceLevel as ExperienceLevel;
        if (data.isProfilePublic !== undefined) updateData.isProfilePublic = data.isProfilePublic;

        await prisma.student.update({
            where: { student_ID: studentId },
            data: {
                ...updateData,
                user: Object.keys(userUpdateData).length > 0 ? {
                    update: userUpdateData
                } : undefined
            }
        });

        return this.findById(studentId);
    }

    async deleteSkillOffered(studentId: string, skillName: string): Promise<void> {
        const skill = await prisma.skill.findFirst({ where: { name: skillName } });
        if (!skill) return;

        await prisma.skillOffered.deleteMany({
            where: {
                student_ID: studentId,
                skill_ID: skill.skill_ID
            }
        });
    }

    async deleteSkillWanted(studentId: string, skillName: string): Promise<void> {
        const skill = await prisma.skill.findFirst({ where: { name: skillName } });
        if (!skill) return;

        await prisma.skillWanted.deleteMany({
            where: {
                student_ID: studentId,
                skill_ID: skill.skill_ID
            }
        });
    }

    async addSkillsToStudent(studentId: string, skillsOffered: string[], skillsWanted: string[]): Promise<void> {
        const skillRepository = new SkillRepository();

        if (skillsOffered.length > 0) {
            const skillConnections = await Promise.all(
                skillsOffered.map(async (name) => {
                    const skill = await skillRepository.findOrCreateSkill(name);
                    return { skill_ID: skill.skill_ID };
                })
            );

            await prisma.skillOffered.createMany({
                data: skillConnections.map(sc => ({
                    student_ID: studentId,
                    skill_ID: sc.skill_ID
                })),
                skipDuplicates: true
            });
        }

        if (skillsWanted.length > 0) {
            const skillConnections = await Promise.all(
                skillsWanted.map(async (name) => {
                    const skill = await skillRepository.findOrCreateSkill(name);
                    return { skill_ID: skill.skill_ID };
                })
            );

            await prisma.skillWanted.createMany({
                data: skillConnections.map(sc => ({
                    student_ID: studentId,
                    skill_ID: sc.skill_ID
                })),
                skipDuplicates: true
            });
        }
    }
}

