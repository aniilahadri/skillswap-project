import { prisma } from "@/lib/prisma";

export interface AdminUserData {
    user_ID: string;
    fullName: string;
    email: string;
    city: string;
    country: string;
    bio: string;
    createdAt: Date;
    role: string;
}

export class AdminRepository {
    async findFirstAdminId(): Promise<string | null> {
        const admin = await prisma.admin.findFirst({
            select: {
                admin_ID: true
            }
        });

        return admin?.admin_ID || null;
    }

    async findById(adminId: string): Promise<AdminUserData | null> {
        const user = await prisma.user.findUnique({
            where: { user_ID: adminId },
            select: {
                user_ID: true,
                fullName: true,
                email: true,
                city: true,
                country: true,
                bio: true,
                createdAt: true,
                role: true
            }
        });

        if (!user) {
            return null;
        }

        // Verify this user is actually an admin
        // This double-check ensures security: even if someone has role="ADMIN" in User table,
        // they must also exist in the Admin table to be considered a real admin
        const admin = await prisma.admin.findUnique({
            where: { admin_ID: adminId }
        });

        if (!admin) {
            return null;
        }

        return {
            user_ID: user.user_ID,
            fullName: user.fullName,
            email: user.email,
            city: user.city,
            country: user.country,
            bio: user.bio,
            createdAt: user.createdAt,
            role: user.role
        };
    }

    async updateAdmin(adminId: string, data: {
        fullName?: string;
        city?: string;
        country?: string;
        bio?: string;
    }): Promise<AdminUserData | null> {
        // Verify admin exists first
        const admin = await prisma.admin.findUnique({
            where: { admin_ID: adminId }
        });

        if (!admin) {
            return null;
        }

        // Update user data (admin data is stored in User table)
        await prisma.user.update({
            where: { user_ID: adminId },
            data: {
                ...(data.fullName && { fullName: data.fullName }),
                ...(data.city && { city: data.city }),
                ...(data.country && { country: data.country }),
                ...(data.bio && { bio: data.bio })
            }
        });

        // Return updated admin data
        return this.findById(adminId);
    }
}

