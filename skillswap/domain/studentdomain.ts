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
}

