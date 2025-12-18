import { StudentDomain } from "@/domain/studentdomain";

const studentDomain = new StudentDomain();

export class StudentService {
    async fetchPublicStudents(excludeStudentId?: string) {
        return await studentDomain.validateAndGetPublicStudents(excludeStudentId);
    }

    async fetchStudentById(studentId: string) {
        return await studentDomain.validateAndGetStudentById(studentId);
    }
}

