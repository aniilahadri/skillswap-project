import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { ContactService } from "@/services/contactservice";

const contactService = new ContactService();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        const result = await contactService.submitContactForm({
            name,
            email,
            message,
        });

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    contact: result.contact,
                    message: "Contact form submitted successfully!"
                },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to submit contact form"
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Create contact API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
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

        if (session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, error: "Forbidden: Admin access required" },
                { status: 403 }
            );
        }

        const result = await contactService.fetchAllContacts();

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    contacts: result.contacts,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to get contact forms"
                },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error("Get contacts API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

