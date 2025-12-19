import { AdminRepository, type AdminUserData } from "@/data/adminRepository";

const adminRepository = new AdminRepository();

export class AdminDomain {
    async validateAndGetAdminById(adminId: string): Promise<{ success: boolean; admin?: AdminUserData; error?: string }> {
        try {
            if (!adminId) {
                return { success: false, error: "Admin ID is required" };
            }

            const admin = await adminRepository.findById(adminId);

            if (!admin) {
                return { success: false, error: "Admin not found" };
            }

            return { success: true, admin };
        } catch (error: any) {
            console.error("Error getting admin by ID:", error);
            return {
                success: false,
                error: error.message || "Failed to get admin"
            };
        }
    }

    async validateAndUpdateAdmin(adminId: string, data: {
        fullName?: string;
        city?: string;
        country?: string;
        bio?: string;
    }): Promise<{ success: boolean; admin?: AdminUserData; error?: string }> {
        try {
            if (!adminId) {
                return { success: false, error: "Admin ID is required" };
            }

            const updatedAdmin = await adminRepository.updateAdmin(adminId, data);

            if (!updatedAdmin) {
                return { success: false, error: "Failed to update admin profile" };
            }

            return { success: true, admin: updatedAdmin };
        } catch (error: any) {
            console.error("Error updating admin:", error);
            return {
                success: false,
                error: error.message || "Failed to update admin profile"
            };
        }
    }
}

