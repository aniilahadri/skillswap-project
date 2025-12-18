import { prisma } from "@/lib/prisma";

export interface StudentWithSkills {
    student_ID: string;
    fullName: string;
    city: string;
    country: string;
    bio: string;
    availability: string;
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
            skillsWanted: student.skillWanted.map(sw => sw.skill.name)
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
            skillsOffered: student.skillOffered.map(so => so.skill.name),
            skillsWanted: student.skillWanted.map(sw => sw.skill.name)
        };
    }
}

