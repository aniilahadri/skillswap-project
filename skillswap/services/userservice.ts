import { UserDomain } from "@/domain/userdomain";

const userDomain = new UserDomain();

export class UserService {

    async signup(data: {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
        city: string;
        country: string;
        bio: string;
        availability: string;
        skillsOffered: string[];
        skillsWanted: string[];
        phoneNumbers: string[];
    }) {
        const validation = userDomain.validateSignupData(data);
        if (!validation.isValid) {
            return {
                success: false,
                errors: validation.errors
            };
        }

        const availability = data.availability.charAt(0).toUpperCase() + data.availability.slice(1);

        const result = await userDomain.createUser({
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            city: data.city,
            country: data.country,
            bio: data.bio,
            availability: availability,
            skillsOffered: data.skillsOffered || [],
            skillsWanted: data.skillsWanted || [],
            phoneNumbers: data.phoneNumbers || [],
        });

        return result;
    }

    async getPhoneNumbers(userId: string) {
        return await userDomain.getPhoneNumbersByUserId(userId);
    }

    async addPhoneNumber(userId: string, phoneNumber: string) {
        return await userDomain.addPhoneNumberToUser(userId, phoneNumber);
    }

    async deletePhoneNumber(userId: string, phoneNumber: string) {
        return await userDomain.deletePhoneNumberFromUser(userId, phoneNumber);
    }
}


