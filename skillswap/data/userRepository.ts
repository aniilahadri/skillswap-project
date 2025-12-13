import { prisma } from "@/lib/prisma";

export class UserRepository {

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    // async createUser(email: string, password: string, role: string) {
    //     return await prisma.user.create({

    //     })
    // }
}