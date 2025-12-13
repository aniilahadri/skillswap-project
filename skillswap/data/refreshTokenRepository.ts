import { prisma } from "@/lib/prisma";

export class RefreshTokenRepository {

    async createToken(token: string, userId: string, expiresAt: Date) {
        return await prisma.refreshToken.create({
            data: {
                token,
                userId,
                expiresAt,
            },
        })
    }

    async findFirstToken(token: string, userId: string) {
        return await prisma.refreshToken.findFirst({
            where: { token, userId }
        })
    }

    // async delete(token: string) {
    //     return await prisma.refreshToken.deleteMany({ where: { token } });
    // }
}