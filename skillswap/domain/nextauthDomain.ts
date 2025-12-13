import { UserRepository } from "@/data/userRepository";
import bcrypt from "bcryptjs";

const userRepository = new UserRepository();

export class NextAuthDomain {
    async logInUser(email: string, passwordCdn: string) {

        if (!email || !passwordCdn) {
            return null;
        }

        const user = await userRepository.findByEmail(email);

        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(
            passwordCdn,
            user.password
        );

        if (!isValid) {
            return null;
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}