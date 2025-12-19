export function validatePhoneNumberFormat(phone: string): { isValid: boolean; error?: string } {
    if (!phone || typeof phone !== 'string') {
        return { isValid: false, error: "Phone number is required and must be a valid string" };
    }

    const trimmed = phone.trim();

    if (trimmed.length === 0) {
        return { isValid: false, error: "Phone number cannot be empty. Please enter a valid phone number (e.g., +1234567890 or (123) 456-7890)" };
    }

    const cleaned = trimmed.replace(/[\s\-\(\)\+]/g, '');

    if (!/^\d+$/.test(cleaned)) {
        return {
            isValid: false,
            error: `Invalid phone number format: "${phone}". Phone numbers should only contain digits, spaces, dashes, parentheses, or a plus sign. Example formats: +1234567890, (123) 456-7890, 123-456-7890`
        };
    }

    if (cleaned.length < 7) {
        return {
            isValid: false,
            error: `Invalid phone number: "${phone}". Phone number is too short. It should have at least 7 digits (e.g., +1234567890 or (123) 456-7890)`
        };
    }

    if (cleaned.length > 15) {
        return {
            isValid: false,
            error: `Invalid phone number: "${phone}". Phone number is too long. It should have at most 15 digits (e.g., +1234567890 or (123) 456-7890)`
        };
    }

    return { isValid: true };
}

