import { NextRequest, NextResponse } from "next/server";
import { validateAdminSession } from "@/utils/adminAuth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const validation = await validateAdminSession();
        if (!validation.isValid) {
            return validation.response;
        }

        const { id: favoriteId } = await params;
        await prisma.favorite.delete({ where: { favorite_ID: favoriteId } });

        return NextResponse.json(
            { success: true, message: "Favorite deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Delete favorite API error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

