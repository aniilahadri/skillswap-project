import { UserRepository, type CreateUserData } from "@/data/userRepository";
import bcrypt from "bcryptjs";

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
    }): { isValid: boolean; error?: string } {

        if (!data.fullName || !data.email || !data.password || !data.confirmPassword) {
            return { isValid: false, error: "All fields are required" };
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return { isValid: false, error: "Invalid email format" };
        }


        if (data.password !== data.confirmPassword) {
            return { isValid: false, error: "Passwords do not match" };
        }


        if (data.password.length < 6) {
            return { isValid: false, error: "Password must be at least 6 characters" };
        }


        const validAvailabilities = ["morning", "afternoon", "evening"];
        if (!validAvailabilities.includes(data.availability.toLowerCase())) {
            return { isValid: false, error: "Invalid availability selection" };
        }


        if (!data.skillsOffered || data.skillsOffered.length === 0) {
            return { isValid: false, error: "Please add at least one skill you can offer" };
        }


        if (!data.skillsWanted || data.skillsWanted.length === 0) {
            return { isValid: false, error: "Please add at least one skill you want to learn" };
        }

        return { isValid: true };
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

