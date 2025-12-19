import { UserRepository, type CreateUserData } from "@/data/userRepository";
import bcrypt from "bcryptjs";
import { validatePhoneNumberFormat } from "@/utils/phoneValidation";

const userRepository = new UserRepository();

export class UserDomain {

    validateSignupData(data: {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
        city: string;
        country: string;
        bio: string;
        availability: string;
        skillsOffered?: string[];
        skillsWanted?: string[];
        phoneNumbers?: string[];
    }): { isValid: boolean; error?: string; errors?: { [key: string]: string } } {
        const errors: { [key: string]: string } = {};

        if (!data.fullName?.trim()) {
            errors.fullName = "Please fill the Full Name field";
        }

        if (!data.email?.trim()) {
            errors.email = "Please fill the Email field";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                errors.email = "Invalid email format";
            }
        }

        if (!data.password?.trim()) {
            errors.password = "Please fill the Password field";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!data.confirmPassword?.trim()) {
            errors.confirmPassword = "Please fill the Confirm Password field";
        } else if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (!data.country?.trim()) {
            errors.country = "Please fill the Country field";
        }

        if (!data.city?.trim()) {
            errors.city = "Please fill the City field";
        }

        if (!data.availability?.trim()) {
            errors.availability = "Please select an Availability option";
        } else {
            const validAvailabilities = ["morning", "afternoon", "evening"];
            if (!validAvailabilities.includes(data.availability.toLowerCase())) {
                errors.availability = "Invalid availability selection";
            }
        }

        if (!data.bio?.trim()) {
            errors.bio = "Please fill the Bio field";
        }

        if (!data.phoneNumbers || data.phoneNumbers.length === 0) {
            errors.phoneNumbers = "Please add at least one phone number";
        } else {
            const phoneValidation = this.validatePhoneNumbers(data.phoneNumbers);
            if (!phoneValidation.isValid && phoneValidation.error) {
                errors.phoneNumbers = phoneValidation.error;
            }
        }

        if (!data.skillsOffered || data.skillsOffered.length === 0) {
            errors.skillsOffered = "Please add at least one skill you can offer";
        }

        if (!data.skillsWanted || data.skillsWanted.length === 0) {
            errors.skillsWanted = "Please add at least one skill you want to learn";
        }

        if (Object.keys(errors).length > 0) {
            return { isValid: false, errors };
        }

        return { isValid: true };
    }
    validatePhoneNumbers(phoneNumbers?: string[]): { isValid: boolean; error?: string } {
        if (!phoneNumbers || phoneNumbers.length === 0) {
            return { isValid: false, error: "Please add at least one phone number" };
        }

        if (phoneNumbers.length > 3) {
            return { isValid: false, error: "You can only have a maximum of 3 phone numbers" };
        }

        for (const phoneNumber of phoneNumbers) {
            const validationResult = validatePhoneNumberFormat(phoneNumber);
            if (!validationResult.isValid) {
                return validationResult;
            }
        }

        return { isValid: true };
    }

    validateSinglePhoneNumber(phoneNumber: string): { isValid: boolean; error?: string } {
        return validatePhoneNumberFormat(phoneNumber);
    }

    async validateAndAddPhoneNumber(userId: string, phoneNumber: string, currentCount: number): Promise<{ success: boolean; error?: string }> {
        if (!userId || !phoneNumber) {
            return { success: false, error: "User ID and phone number are required" };
        }

        const validation = this.validateSinglePhoneNumber(phoneNumber);
        if (!validation.isValid) {
            return { success: false, error: validation.error || "Invalid phone number format" };
        }

        if (currentCount >= 3) {
            return { success: false, error: "You can only have a maximum of 3 phone numbers" };
        }

        return { success: true };
    }

    async validateAndDeletePhoneNumber(userId: string, phoneNumber: string, currentCount: number): Promise<{ success: boolean; error?: string }> {
        if (!userId || !phoneNumber) {
            return { success: false, error: "User ID and phone number are required" };
        }

        if (currentCount <= 1) {
            return { success: false, error: "You must have at least one phone number" };
        }

        return { success: true };
    }

    async addPhoneNumberToUser(userId: string, phoneNumber: string): Promise<{ success: boolean; phoneNumber?: any; error?: string }> {
        try {
            const currentCount = await userRepository.countPhoneNumbersByUserId(userId);

            const validation = await this.validateAndAddPhoneNumber(userId, phoneNumber, currentCount);
            if (!validation.success) {
                return { success: false, error: validation.error };
            }

            const existing = await userRepository.findPhoneNumberByNumber(userId, phoneNumber);
            if (existing) {
                return { success: false, error: "This phone number already exists" };
            }

            const newPhoneNumber = await userRepository.createPhoneNumber(userId, phoneNumber);
            return {
                success: true,
                phoneNumber: {
                    id: newPhoneNumber.phone_ID,
                    number: newPhoneNumber.number
                }
            };
        } catch (error: any) {
            console.error("Error adding phone number:", error);
            return { success: false, error: error.message || "Failed to add phone number" };
        }
    }

    async deletePhoneNumberFromUser(userId: string, phoneNumber: string): Promise<{ success: boolean; error?: string }> {
        try {
            const currentCount = await userRepository.countPhoneNumbersByUserId(userId);

            const validation = await this.validateAndDeletePhoneNumber(userId, phoneNumber, currentCount);
            if (!validation.success) {
                return { success: false, error: validation.error };
            }

            const phoneNumberRecord = await userRepository.findPhoneNumberByNumber(userId, phoneNumber);
            if (!phoneNumberRecord) {
                return { success: false, error: "Phone number not found" };
            }

            await userRepository.deletePhoneNumber(phoneNumberRecord.phone_ID);
            return { success: true };
        } catch (error: any) {
            console.error("Error deleting phone number:", error);
            return { success: false, error: error.message || "Failed to delete phone number" };
        }
    }

    async getPhoneNumbersByUserId(userId: string): Promise<{ success: boolean; phoneNumbers?: any[]; error?: string }> {
        try {
            const phoneNumbers = await userRepository.findPhoneNumbersByUserId(userId);
            return {
                success: true,
                phoneNumbers: phoneNumbers.map(pn => ({
                    id: pn.phone_ID,
                    number: pn.number
                }))
            };
        } catch (error: any) {
            console.error("Error getting phone numbers:", error);
            return { success: false, error: error.message || "Failed to get phone numbers" };
        }
    }

    async emailExists(email: string): Promise<boolean> {
        const user = await userRepository.findByEmail(email);
        return user !== null;
    }


    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }


    async createUser(data: CreateUserData): Promise<{ success: boolean; user?: any; error?: string }> {
        try {

            const emailExists = await this.emailExists(data.email);
            if (emailExists) {
                return { success: false, error: "Email already exists" };
            }


            const hashedPassword = await this.hashPassword(data.password);


            const user = await userRepository.createUser({
                ...data,
                password: hashedPassword,
            });


            const { password, ...userWithoutPassword } = user;

            return { success: true, user: userWithoutPassword };
        } catch (error: any) {
            console.error("Error creating user:", error);
            return {
                success: false,
                error: error.message || "Failed to create user"
            };
        }
    }
}

