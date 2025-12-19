import { prisma } from "@/lib/prisma";

export class AdminRepository {
    async findFirstAdminId(): Promise<string | null> {
        const admin = await prisma.admin.findFirst({
            select: {
                admin_ID: true
            }
        });

        return admin?.admin_ID || null;
    }
}

