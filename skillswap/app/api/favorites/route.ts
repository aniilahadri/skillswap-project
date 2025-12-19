import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { FavoriteRepository } from "@/data/favoriteRepository";

const favoriteRepository = new FavoriteRepository();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { favStudentId } = body;

        if (!favStudentId) {
            return NextResponse.json(
                { success: false, error: "Student ID is required" },
                { status: 400 }
            );
        }

        await favoriteRepository.addFavorite(session.user.id, favStudentId);

        return NextResponse.json(
            { success: true, message: "Added to favorites" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Add favorite API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to add favorite"
            },
            { status: 400 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const favStudentId = searchParams.get("favStudentId");

        if (!favStudentId) {
            return NextResponse.json(
                { success: false, error: "Student ID is required" },
                { status: 400 }
            );
        }

        await favoriteRepository.removeFavorite(session.user.id, favStudentId);

        return NextResponse.json(
            { success: true, message: "Removed from favorites" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Remove favorite API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to remove favorite"
            },
            { status: 400 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const favStudentId = searchParams.get("favStudentId");

        if (favStudentId) {
            const isFavorite = await favoriteRepository.isFavorite(session.user.id, favStudentId);
            return NextResponse.json(
                { success: true, isFavorite },
                { status: 200 }
            );
        } else {
            const favoriteIds = await favoriteRepository.getFavoriteIds(session.user.id);
            return NextResponse.json(
                { success: true, favoriteIds },
                { status: 200 }
            );
        }
    } catch (error: any) {
        console.error("Get favorites API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to get favorites"
            },
            { status: 500 }
        );
    }
}

