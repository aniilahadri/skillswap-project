import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { UserService } from "@/services/userservice";

const userService = new UserService();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: userId } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (session.user.id !== userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 403 }
            );
        }

        const result = await userService.getPhoneNumbers(userId);

        if (result.success && result.phoneNumbers) {
            return NextResponse.json(
                {
                    success: true,
                    phoneNumbers: result.phoneNumbers
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to get phone numbers"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Get phone numbers API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: userId } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (session.user.id !== userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { phoneNumber } = body;

        if (!phoneNumber || typeof phoneNumber !== 'string') {
            return NextResponse.json(
                { success: false, error: "Phone number is required" },
                { status: 400 }
            );
        }

        const result = await userService.addPhoneNumber(userId, phoneNumber);

        if (result.success && result.phoneNumber) {
            return NextResponse.json(
                {
                    success: true,
                    phoneNumber: result.phoneNumber
                },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to add phone number"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Add phone number API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: userId } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (session.user.id !== userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const phoneNumber = searchParams.get('phoneNumber');

        if (!phoneNumber) {
            return NextResponse.json(
                { success: false, error: "Phone number is required" },
                { status: 400 }
            );
        }

        const result = await userService.deletePhoneNumber(userId, phoneNumber);

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Phone number deleted successfully"
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to delete phone number"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Delete phone number API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

