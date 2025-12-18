import { UserRepository } from "@/data/userRepository";
import bcrypt from "bcryptjs";

const userRepository = new UserRepository();

export class NextAuthDomain {
    async logInUser(email: string, passwordCdn: string) {

        if (!email || !passwordCdn) {
            throw new Error("Email and password are required");
        }

        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(
            passwordCdn,
            user.password
        );

        if (!isValid) {
            throw new Error("Invalid email or password");
        }

        const { password, ...userWithoutPassword } = user;


        return {
            ...userWithoutPassword,
            id: user.user_ID,
            fullname: user.fullName
        };
    }
}