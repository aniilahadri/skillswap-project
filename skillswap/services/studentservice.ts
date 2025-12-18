import { StudentDomain } from "@/domain/studentdomain";

const studentDomain = new StudentDomain();

export class StudentService {
    async fetchPublicStudents(excludeStudentId?: string) {
        return await studentDomain.validateAndGetPublicStudents(excludeStudentId);
    }

    async fetchStudentById(studentId: string) {
        return await studentDomain.validateAndGetStudentById(studentId);
    }

    async updateProfile(studentId: string, data: {
        fullName?: string;
        city?: string;
        country?: string;
        bio?: string;
        availability?: string;
        experienceLevel?: string;
        isProfilePublic?: boolean;
    }) {
        return await studentDomain.validateAndUpdateProfile(studentId, data);
    }

    async removeSkill(studentId: string, skillName: string, skillType: 'offered' | 'wanted') {
        return await studentDomain.validateAndRemoveSkill(studentId, skillName, skillType);
    }

    async addSkills(studentId: string, skillsOffered: string[], skillsWanted: string[]) {
        return await studentDomain.validateAndAddSkills(studentId, skillsOffered, skillsWanted);
    }
}

