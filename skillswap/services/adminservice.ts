import { AdminDomain } from "@/domain/admindomain";

const adminDomain = new AdminDomain();

export class AdminService {
    async fetchAdminById(adminId: string) {
        return await adminDomain.validateAndGetAdminById(adminId);
    }

    async updateAdminProfile(adminId: string, data: {
        fullName?: string;
        city?: string;
        country?: string;
        bio?: string;
    }) {
        return await adminDomain.validateAndUpdateAdmin(adminId, data);
    }
}

