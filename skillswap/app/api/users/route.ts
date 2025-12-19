import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/userservice";

const userService = new UserService();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const signupData = {
            fullName: body.fullName,
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword,
            city: body.city,
            country: body.country,
            bio: body.bio,
            availability: body.availability,
            skillsOffered: body.skillsOffered || [],
            skillsWanted: body.skillsWanted || [],
            phoneNumbers: body.phoneNumbers || [],
        };

        const result = await userService.signup(signupData);

        if (result.success && 'user' in result) {
            return NextResponse.json(
                {
                    success: true,
                    message: "User created successfully",
                    user: result.user
                },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    errors: 'errors' in result ? result.errors : undefined
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Signup API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}


