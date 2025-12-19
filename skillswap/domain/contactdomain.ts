import { ContactRepository, type ContactData, type CreateContactData } from "@/data/contactRepository";

const contactRepository = new ContactRepository();

export class ContactDomain {
    async processContactSubmission(data: CreateContactData): Promise<{ success: boolean; contact?: ContactData; error?: string }> {
        try {
            if (!data.name || !data.email || !data.message) {
                return { success: false, error: "All fields are required" };
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                return { success: false, error: "Invalid email format" };
            }

            if (data.name.trim().length < 2) {
                return { success: false, error: "Name must be at least 2 characters long" };
            }

            if (data.message.trim().length < 10) {
                return { success: false, error: "Message must be at least 10 characters long" };
            }

            if (data.message.trim().length > 5000) {
                return { success: false, error: "Message must be less than 5000 characters" };
            }

            const contact = await contactRepository.saveContact({
                name: data.name.trim(),
                email: data.email.trim().toLowerCase(),
                message: data.message.trim(),
            });

            return { success: true, contact };
        } catch (error: any) {
            console.error("Error processing contact submission:", error);
            return {
                success: false,
                error: error.message || "Failed to process contact form"
            };
        }
    }

    async retrieveAllContactForms(): Promise<{ success: boolean; contacts?: ContactData[]; error?: string }> {
        try {
            const contacts = await contactRepository.findAllContacts();
            return { success: true, contacts };
        } catch (error: any) {
            console.error("Error retrieving contact forms:", error);
            return {
                success: false,
                error: error.message || "Failed to retrieve contact forms"
            };
        }
    }
}

