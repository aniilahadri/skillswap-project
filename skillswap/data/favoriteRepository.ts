import { prisma } from "@/lib/prisma";

export class FavoriteRepository {
    async addFavorite(studentId: string, favStudentId: string): Promise<void> {
        const existing = await prisma.favorite.findFirst({
            where: {
                student_ID: studentId,
                favStudent_ID: favStudentId
            }
        });

        if (existing) {
            throw new Error("Student is already in favorites");
        }

        if (studentId === favStudentId) {
            throw new Error("Cannot favorite yourself");
        }

        await prisma.favorite.create({
            data: {
                student_ID: studentId,
                favStudent_ID: favStudentId
            }
        });
    }

    async removeFavorite(studentId: string, favStudentId: string): Promise<void> {
        await prisma.favorite.deleteMany({
            where: {
                student_ID: studentId,
                favStudent_ID: favStudentId
            }
        });
    }

    async isFavorite(studentId: string, favStudentId: string): Promise<boolean> {
        const favorite = await prisma.favorite.findFirst({
            where: {
                student_ID: studentId,
                favStudent_ID: favStudentId
            }
        });

        return favorite !== null;
    }

    async getFavoriteIds(studentId: string): Promise<string[]> {
        const favorites = await prisma.favorite.findMany({
            where: {
                student_ID: studentId
            },
            select: {
                favStudent_ID: true
            }
        });

        return favorites.map(f => f.favStudent_ID);
    }
}

