import { StudentRepository, type StudentWithSkills } from "@/data/studentRepository";

const studentRepository = new StudentRepository();

export class StudentDomain {
    async validateAndGetPublicStudents(excludeStudentId?: string): Promise<{ success: boolean; students?: StudentWithSkills[]; error?: string }> {
        try {
            const students = await studentRepository.findManyPublic(excludeStudentId);
            return { success: true, students };
        } catch (error: any) {
            console.error("Error getting public students:", error);
            return {
                success: false,
                error: error.message || "Failed to get students"
            };
        }
    }

    async validateAndGetStudentById(studentId: string): Promise<{ success: boolean; student?: StudentWithSkills; error?: string }> {
        try {
            if (!studentId) {
                return { success: false, error: "Student ID is required" };
            }

            const student = await studentRepository.findById(studentId);

            if (!student) {
                return { success: false, error: "Student not found" };
            }

            return { success: true, student };
        } catch (error: any) {
            console.error("Error getting student by ID:", error);
            return {
                success: false,
                error: error.message || "Failed to get student"
            };
        }
    }

    async validateAndUpdateProfile(studentId: string, data: {
        fullName?: string;
        city?: string;
        country?: string;
        bio?: string;
        availability?: string;
        experienceLevel?: string;
        isProfilePublic?: boolean;
    }): Promise<{ success: boolean; student?: StudentWithSkills; error?: string }> {
        try {
            if (!studentId) {
                return { success: false, error: "Student ID is required" };
            }

            const updatedStudent = await studentRepository.updateStudent(studentId, data);

            if (!updatedStudent) {
                return { success: false, error: "Failed to update student" };
            }

            return { success: true, student: updatedStudent };
        } catch (error: any) {
            console.error("Error updating student:", error);
            return {
                success: false,
                error: error.message || "Failed to update student"
            };
        }
    }

    async validateAndRemoveSkill(studentId: string, skillName: string, skillType: 'offered' | 'wanted'): Promise<{ success: boolean; error?: string }> {
        try {
            if (!studentId || !skillName) {
                return { success: false, error: "Student ID and skill name are required" };
            }

            if (skillType === 'offered') {
                await studentRepository.deleteSkillOffered(studentId, skillName);
            } else {
                await studentRepository.deleteSkillWanted(studentId, skillName);
            }

            return { success: true };
        } catch (error: any) {
            console.error("Error deleting skill:", error);
            return {
                success: false,
                error: error.message || "Failed to delete skill"
            };
        }
    }

    async validateAndAddSkills(studentId: string, skillsOffered: string[], skillsWanted: string[]): Promise<{ success: boolean; error?: string }> {
        try {
            if (!studentId) {
                return { success: false, error: "Student ID is required" };
            }

            await studentRepository.addSkillsToStudent(studentId, skillsOffered, skillsWanted);

            return { success: true };
        } catch (error: any) {
            console.error("Error adding skills:", error);
            return {
                success: false,
                error: error.message || "Failed to add skills"
            };
        }
    }
}

