'use client'

import { useState, useEffect, type ReactNode } from "react";
import { validatePhoneNumberFormat } from "@/utils/phoneValidation";

interface PhoneNumberInputProps {
    id: string
    styleInput?: ReactNode
    stylebutton?: ReactNode
    onPhoneNumbersChange?: (phoneNumbers: string[]) => void
    initialPhoneNumbers?: string[]
    existingPhoneNumbers?: string[]
    onDeleteExisting?: (phoneNumber: string) => void
    allowDeleteLast?: boolean
}

export default function PhoneNumberInput({
    id,
    styleInput,
    stylebutton,
    onPhoneNumbersChange,
    initialPhoneNumbers = [],
    existingPhoneNumbers = [],
    onDeleteExisting,
    allowDeleteLast = false
}: PhoneNumberInputProps) {
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>(initialPhoneNumbers);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        onPhoneNumbersChange?.(phoneNumbers);
    }, [phoneNumbers, onPhoneNumbersChange]);

    const canDelete = (countAfterRemoval: number): boolean => {
        return allowDeleteLast || countAfterRemoval >= 1;
    };

    const addPhoneNumber = () => {
        const trimmed = inputValue.trim();
        setError(null);

        if (!trimmed) {
            setError("Please enter a phone number");
            return;
        }

        const validation = validatePhoneNumberFormat(trimmed);
        if (!validation.isValid) {
            setError(validation.error || "Invalid phone number format");
            return;
        }

        if (phoneNumbers.includes(trimmed)) {
            setError("This phone number is already added");
            return;
        }

        if (existingPhoneNumbers.includes(trimmed)) {
            setError("This phone number already exists");
            return;
        }

        const totalCount = phoneNumbers.length + existingPhoneNumbers.length;
        if (totalCount >= 3) {
            setError("You can only have a maximum of 3 phone numbers");
            return;
        }

        setPhoneNumbers(prev => [...prev, trimmed]);
        setInputValue("");
        setError(null);
    };

    const removePhoneNumber = (index: number) => {
        const totalAfterRemoval = phoneNumbers.length - 1 + existingPhoneNumbers.length;
        if (!canDelete(totalAfterRemoval)) {
            setError("You must have at least one phone number");
            return;
        }
        setPhoneNumbers(prev => prev.filter((_, i) => i !== index));
        setError(null);
    };

    const handleDeleteExisting = (phoneNumber: string) => {
        const totalAfterRemoval = phoneNumbers.length + existingPhoneNumbers.length - 1;
        if (!canDelete(totalAfterRemoval)) {
            setError("You must have at least one phone number");
            return;
        }
        onDeleteExisting?.(phoneNumber);
        setError(null);
    };

    const totalPhoneCount = phoneNumbers.length + existingPhoneNumbers.length;

    return (
        <div id={id}>
            <div className="flex items-center gap-2">
                <input
                    type="tel"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        if (error) setError(null);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPhoneNumber())}
                    placeholder="e.g., +1234567890 or (123) 456-7890"
                    className={`w-full text-slate-900 bg-slate-100 focus:bg-transparent py-3 rounded-md border ${error ? 'border-red-300' : 'border-slate-100'} focus:border-blue-600 outline-none transition-all ${styleInput || "pl-4 pr-10 text-sm"}`}
                    maxLength={20}
                />
                <button
                    onClick={addPhoneNumber}
                    type="button"
                    disabled={totalPhoneCount >= 3}
                    className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${stylebutton || "px-4 py-3"}`}
                >
                    +
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mt-2">
                    {error}
                </div>
            )}

            {existingPhoneNumbers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-sm text-gray-600 w-full">Saved phone numbers:</span>
                    {existingPhoneNumbers.map((phoneNumber, index) => (
                        <div
                            key={`existing-${index}`}
                            className="flex items-center gap-1 bg-green-200 text-gray-700 px-3 rounded-full text-sm md:text-base"
                        >
                            <span>{phoneNumber}</span>
                            <button
                                onClick={() => handleDeleteExisting(phoneNumber)}
                                type="button"
                                disabled={!allowDeleteLast && totalPhoneCount <= 1}
                                className="text-gray-600 hover:text-red-500 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {phoneNumbers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {existingPhoneNumbers.length > 0 && (
                        <span className="text-sm text-gray-600 w-full">New phone numbers:</span>
                    )}
                    {phoneNumbers.map((phoneNumber, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 bg-sky-200 text-gray-700 px-3 rounded-full text-sm md:text-base"
                        >
                            <span>{phoneNumber}</span>
                            <button
                                onClick={() => removePhoneNumber(index)}
                                type="button"
                                disabled={!allowDeleteLast && totalPhoneCount <= 1}
                                className="text-gray-600 hover:text-red-500 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <p className="text-xs text-gray-500 mt-2">
                You can add up to 3 phone numbers.
            </p>
        </div>
    );
}

