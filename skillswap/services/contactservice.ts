import { ContactDomain } from "@/domain/contactdomain";
import type { ContactData, CreateContactData } from "@/data/contactRepository";

const contactDomain = new ContactDomain();

export class ContactService {
    async submitContactForm(data: CreateContactData) {
        return await contactDomain.processContactSubmission(data);
    }

    async fetchAllContacts() {
        return await contactDomain.retrieveAllContactForms();
    }
}

