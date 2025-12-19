import { prisma } from "@/lib/prisma";
import type { ContactModel } from "@/lib/prisma/models/Contact";

export interface ContactData {
    contact_ID: number;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

export interface CreateContactData {
    name: string;
    email: string;
    message: string;
}

export class ContactRepository {

    async saveContact(data: CreateContactData): Promise<ContactData> {
        const contact = await prisma.contact.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message,
            },
        });

        return {
            contact_ID: contact.contact_ID,
            name: contact.name,
            email: contact.email,
            message: contact.message,
            createdAt: contact.createdAt,
        };
    }

    async findAllContacts(): Promise<ContactData[]> {
        const contacts = await prisma.contact.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return contacts.map(contact => ({
            contact_ID: contact.contact_ID,
            name: contact.name,
            email: contact.email,
            message: contact.message,
            createdAt: contact.createdAt,
        }));
    }

    async findContactById(contactId: number): Promise<ContactData | null> {
        const contact = await prisma.contact.findUnique({
            where: { contact_ID: contactId },
        });

        if (!contact) {
            return null;
        }

        return {
            contact_ID: contact.contact_ID,
            name: contact.name,
            email: contact.email,
            message: contact.message,
            createdAt: contact.createdAt,
        };
    }
}

