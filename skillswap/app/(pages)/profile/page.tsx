'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SkillsInput from "../../components/SkillsInput";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import ProfileSkillsDisplay from "../../components/ProfileSkillsDisplay";
import { ExperienceLevel, Availability } from "@/lib/prisma/enums";

interface StudentData {
    student_ID: string;
    fullName: string;
    city: string;
    country: string;
    bio: string;
    availability: string;
    experienceLevel?: string;
    isProfilePublic?: boolean;
    email?: string;
    createdAt?: Date;
    skillsOffered: string[];
    skillsWanted: string[];
    phoneNumbers?: string[];
}

export default function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [showAuthMessage, setShowAuthMessage] = useState(false);
    const isAdmin = session?.user?.role === "ADMIN";

    const [formData, setFormData] = useState({
        fullName: '',
        city: '',
        country: '',
        bio: '',
        availability: '',
        experienceLevel: '',
        isProfilePublic: true
    });

    const [newSkillsOffered, setNewSkillsOffered] = useState<string[]>([]);
    const [newSkillsWanted, setNewSkillsWanted] = useState<string[]>([]);
    const [newPhoneNumbers, setNewPhoneNumbers] = useState<string[]>([]);

    useEffect(() => {
        if (status === "unauthenticated") {
            setShowAuthMessage(true);
            setTimeout(() => {
                router.push("/signin");
            }, 3000);
            return;
        }

        if (status === "authenticated" && session?.user?.id) {
            if (session.user.role === "ADMIN" || session.user.role === "STUDENT") {
                loadProfileData();
            }
        }
    }, [status, session]);

    const loadProfileData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/students/${session?.user?.id}`);
            const result = await response.json();

            if (result.success && result.student && !isAdmin) {
                const student = result.student;
                setStudentData(student);
                setFormData({
                    fullName: student.fullName || '',
                    city: student.city || '',
                    country: student.country || '',
                    bio: student.bio || '',
                    availability: student.availability || '',
                    experienceLevel: student.experienceLevel || ExperienceLevel.BEGINNER,
                    isProfilePublic: student.isProfilePublic ?? true
                });
            } else if (isAdmin) {
                try {
                    const adminResponse = await fetch(`/api/admin/${session.user.id}`);
                    const adminResult = await adminResponse.json();
                    const admin = adminResult.success ? adminResult.admin : null;

                    const phoneResponse = await fetch(`/api/users/${session.user.id}/phone-numbers`);
                    const phoneResult = await phoneResponse.json();
                    const phoneNumbers = phoneResult.success && phoneResult.phoneNumbers
                        ? phoneResult.phoneNumbers.map((pn: any) => pn.number)
                        : [];

                    setError(null);
                    setStudentData({
                        student_ID: session.user.id,
                        fullName: admin?.fullName || session.user.fullname || '',
                        email: admin?.email || session.user.email || '',
                        city: admin?.city || '',
                        country: admin?.country || '',
                        bio: admin?.bio || '',
                        availability: '',
                        skillsOffered: [],
                        skillsWanted: [],
                        phoneNumbers: phoneNumbers
                    });

                    if (admin) {
                        setFormData({
                            fullName: admin.fullName || '',
                            city: admin.city || '',
                            country: admin.country || '',
                            bio: admin.bio || '',
                            availability: '',
                            experienceLevel: ExperienceLevel.BEGINNER,
                            isProfilePublic: true
                        });
                    }
                } catch (phoneErr: any) {
                    setError(null);
                    setStudentData({
                        student_ID: session.user.id,
                        fullName: session.user.fullname || '',
                        email: session.user.email || '',
                        city: '',
                        country: '',
                        bio: '',
                        availability: '',
                        skillsOffered: [],
                        skillsWanted: [],
                        phoneNumbers: []
                    });
                }
            } else {
                setError("Failed to load profile data");
            }
        } catch (err: any) {
            console.error("Error loading profile:", err);
            if (session?.user?.role === "ADMIN") {
                try {
                    const adminResponse = await fetch(`/api/admin/${session.user.id}`);
                    const adminResult = await adminResponse.json();
                    const admin = adminResult.success ? adminResult.admin : null;

                    const phoneResponse = await fetch(`/api/users/${session.user.id}/phone-numbers`);
                    const phoneResult = await phoneResponse.json();
                    const phoneNumbers = phoneResult.success && phoneResult.phoneNumbers
                        ? phoneResult.phoneNumbers.map((pn: any) => pn.number)
                        : [];

                    setError(null);
                    setStudentData({
                        student_ID: session.user.id,
                        fullName: admin?.fullName || session.user.fullname || '',
                        email: admin?.email || session.user.email || '',
                        city: admin?.city || '',
                        country: admin?.country || '',
                        bio: admin?.bio || '',
                        availability: '',
                        skillsOffered: [],
                        skillsWanted: [],
                        phoneNumbers: phoneNumbers
                    });

                    if (admin) {
                        setFormData({
                            fullName: admin.fullName || '',
                            city: admin.city || '',
                            country: admin.country || '',
                            bio: admin.bio || '',
                            availability: '',
                            experienceLevel: ExperienceLevel.BEGINNER,
                            isProfilePublic: true
                        });
                    }
                } catch (phoneErr: any) {
                    setError(null);
                    setStudentData({
                        student_ID: session.user.id,
                        fullName: session.user.fullname || '',
                        email: session.user.email || '',
                        city: '',
                        country: '',
                        bio: '',
                        availability: '',
                        skillsOffered: [],
                        skillsWanted: [],
                        phoneNumbers: []
                    });
                }
            } else {
                setError("Failed to load profile");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSkill = async (skillName: string, type: 'offered' | 'wanted') => {
        if (!studentData || isAdmin) return;

        try {
            const response = await fetch(
                `/api/students/${studentData.student_ID}/skills?skillName=${encodeURIComponent(skillName)}&skillType=${type}`,
                { method: 'DELETE' }
            );

            const result = await response.json();

            if (result.success) {
                if (type === 'offered') {
                    setStudentData({
                        ...studentData,
                        skillsOffered: studentData.skillsOffered.filter(s => s !== skillName)
                    });
                } else {
                    setStudentData({
                        ...studentData,
                        skillsWanted: studentData.skillsWanted.filter(s => s !== skillName)
                    });
                }
            } else {
                setError(result.error || "Failed to delete skill");
            }
        } catch (err: any) {
            console.error("Error deleting skill:", err);
            setError("Failed to delete skill");
        }
    };

    const handleDeletePhoneNumber = async (phoneNumber: string) => {
        if (!studentData) return;

        try {
            const response = await fetch(
                `/api/users/${session?.user?.id}/phone-numbers?phoneNumber=${encodeURIComponent(phoneNumber)}`,
                { method: 'DELETE' }
            );

            const result = await response.json();

            if (result.success) {
                setStudentData({
                    ...studentData,
                    phoneNumbers: (studentData.phoneNumbers || []).filter(pn => pn !== phoneNumber)
                });
            } else {
                setError(result.error || "Failed to delete phone number");
            }
        } catch (err: any) {
            console.error("Error deleting phone number:", err);
            setError("Failed to delete phone number");
        }
    };

    const handleAddPhoneNumbers = async (phoneNumbers: string[]): Promise<boolean> => {
        if (phoneNumbers.length === 0) return true;

        try {
            for (const phoneNumber of phoneNumbers) {
                const response = await fetch(
                    `/api/users/${session?.user?.id}/phone-numbers`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ phoneNumber })
                    }
                );

                const result = await response.json();
                if (!result.success) {
                    setError(result.error || "Failed to add phone number");
                    return false;
                }
            }

            await loadProfileData();
            setNewPhoneNumbers([]);
            return true;
        } catch (err: any) {
            console.error("Error adding phone numbers:", err);
            setError("Failed to add phone numbers");
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!displayData) return;

        try {
            setSaving(true);
            setError(null);
            setSuccess(false);

            if (isAdmin) {
                const response = await fetch(`/api/admin/${session?.user?.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fullName: formData.fullName,
                        city: formData.city,
                        country: formData.country,
                        bio: formData.bio
                    })
                });

                const result = await response.json();

                if (result.success) {
                    if (newPhoneNumbers.length > 0) {
                        const phoneNumbersAdded = await handleAddPhoneNumbers(newPhoneNumbers);
                        if (!phoneNumbersAdded) {
                            setError("Profile updated but failed to add new phone numbers");
                            return;
                        }
                    }

                    setSuccess(true);
                    await loadProfileData();
                    setTimeout(() => setSuccess(false), 3000);
                } else {
                    setError(result.error || "Failed to update profile");
                }
                return;
            }

            if (!studentData) return;

            const response = await fetch(`/api/students/${studentData.student_ID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    city: formData.city,
                    country: formData.country,
                    bio: formData.bio,
                    availability: formData.availability,
                    experienceLevel: formData.experienceLevel,
                    isProfilePublic: formData.isProfilePublic
                })
            });

            const result = await response.json();

            if (result.success) {
                if (newSkillsOffered.length > 0 || newSkillsWanted.length > 0) {
                    const addSkillsResponse = await fetch(`/api/students/${studentData.student_ID}/skills`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            skillsOffered: newSkillsOffered,
                            skillsWanted: newSkillsWanted
                        })
                    });

                    const addSkillsResult = await addSkillsResponse.json();
                    if (!addSkillsResult.success) {
                        setError("Profile updated but failed to add new skills");
                        return;
                    }
                }

                if (newPhoneNumbers.length > 0) {
                    const phoneNumbersAdded = await handleAddPhoneNumbers(newPhoneNumbers);
                    if (!phoneNumbersAdded) {
                        setError("Profile updated but failed to add new phone numbers");
                        return;
                    }
                }

                setSuccess(true);
                setNewSkillsOffered([]);
                setNewSkillsWanted([]);
                await loadProfileData();
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(result.error || "Failed to update profile");
            }
        } catch (err: any) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const toggleProfileVisibility = async () => {
        if (!studentData || isAdmin) return;

        const newVisibility = !formData.isProfilePublic;
        setFormData({ ...formData, isProfilePublic: newVisibility });

        try {
            const response = await fetch(`/api/students/${studentData.student_ID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isProfilePublic: newVisibility })
            });

            const result = await response.json();
            if (!result.success) {
                setFormData({ ...formData, isProfilePublic: !newVisibility });
                setError(result.error || "Failed to update profile visibility");
            } else {
                setStudentData({ ...studentData, isProfilePublic: newVisibility });
            }
        } catch (err: any) {
            console.error("Error toggling visibility:", err);
            setFormData({ ...formData, isProfilePublic: !newVisibility });
            setError("Failed to update profile visibility");
        }
    };

    const formatDate = (date: Date | string | undefined) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (showAuthMessage || status === "unauthenticated") {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100/30">
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-md mx-4">
                    <div className="text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Access Restricted</h2>
                        <p className="text-gray-600 mb-2">You're not authorized to access this feature.</p>
                        <p className="text-gray-600 mb-6">If you want to use this feature, please sign in for a better experience!</p>
                        <p className="text-sm text-indigo-600 font-medium">Redirecting to sign in page...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!studentData && !isAdmin) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Failed to load profile data</div>
            </div>
        );
    }

    if (status === "loading" || loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
            </div>
        );
    }

    const displayData = studentData || (isAdmin ? {
        student_ID: session?.user?.id || '',
        fullName: session?.user?.fullname || '',
        city: '',
        country: '',
        bio: '',
        availability: '',
        skillsOffered: [],
        skillsWanted: [],
        phoneNumbers: [],
        email: '',
        createdAt: undefined,
        experienceLevel: undefined,
        isProfilePublic: true
    } : null);

    if (!displayData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Failed to load profile data</div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-gray-100/30 px-4 max-h-fit mt-20 py-12 lg:py-16">
                <div className="bg-gray-100 flex flex-col items-center justify-center md:w-10/12 lg:w-8/12 m-auto">
                    {error && (
                        <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="w-full mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                            Profile updated successfully!
                        </div>
                    )}

                    <div className="bg-white p-4 lg:p-5 rounded-md mb-8 flex gap-3 md:gap-8 h-19 w-full">
                        <div>
                            <img
                                src="/avatar.png"
                                className="w-20"
                                alt="Avatar"
                            />
                        </div>

                        <div className="space-y-1 md:space-y-2">
                            <h3 className="text-lg font-bold md:text-xl">{displayData.fullName}</h3>
                            {(displayData.country || displayData.city) && (
                                <div className="flex items-center justify-start gap-2">
                                    <img src="/location.png" alt="" className="max-w-3 max-h-3 md:max-w-4 md:max-h-4" />
                                    <span className="text-gray-500 text-sm md:text-base">{displayData.country || ''}{displayData.country && displayData.city ? ', ' : ''}{displayData.city || ''}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-start gap-3">
                                {displayData.availability && (
                                    <div className="flex items-center justify-start gap-2">
                                        <img src="/clock.png" alt="" className="max-w-3 max-h-3 md:max-w-4 md:max-h-4" />
                                        <span className="text-gray-500 text-sm md:text-base">{displayData.availability}</span>
                                    </div>
                                )}
                                {displayData.createdAt && (
                                    <div className="flex items-center justify-start gap-2">
                                        <img src="/calendar.png" alt="" className="max-w-3 max-h-3 md:max-w-4 md:max-h-4" />
                                        <span className="text-gray-500 text-sm md:text-base">Joined {formatDate(displayData.createdAt)}</span>
                                    </div>
                                )}
                                {displayData.experienceLevel && (
                                    <div className="flex items-center justify-start gap-2">
                                        <span className="text-gray-500 text-sm md:text-base">Level: {displayData.experienceLevel}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!isAdmin && (
                            <div className="flex flex-col w-60 md:w-40 ml-auto">
                                <div className={`flex items-center justify-center gap-2 shadow-sm shadow-slate-500 px-1 py-1 rounded-md lg:px-3 ${formData.isProfilePublic ? 'bg-green-100' : 'bg-gray-200'}`}>
                                    <img src="/eye-public.png" alt="" className="max-w-3 max-h-3 md:max-w-4 md:max-h-4" />
                                    <span className="text-xs font-semibold md:text-sm">
                                        Profile is {formData.isProfilePublic ? 'Public' : 'Private'}
                                    </span>
                                </div>
                                <button
                                    onClick={toggleProfileVisibility}
                                    className="mt-auto ml-auto rounded-md bg-red-500 text-white px-3 py-1 hover:bg-red-600 text-xs md:text-sm"
                                >
                                    {formData.isProfilePublic ? 'Make Private' : 'Make Public'}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="w-full bg-white [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] p-4 lg:p-5 rounded-md">
                        <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-8">
                            <form onSubmit={handleSubmit} className="mx-auto w-full p-2 md:p-4 space-y-4">
                                <h3 className="text-lg md:text-xl text-indigo-500 font-bold">Profile Settings</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4 justify-center">
                                        <div className="w-full">
                                            <label className="text-slate-900 font-medium mb-2 block text-sm">Full Name</label>
                                            <div className="relative flex items-center">
                                                <input
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                    placeholder="Enter full name.."
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                                            <div className="relative flex items-center">
                                                <input
                                                    name="email"
                                                    type="text"
                                                    value={displayData.email || ''}
                                                    disabled
                                                    className="w-full text-sm text-slate-500 bg-slate-200 pl-4 pr-10 py-3 rounded-md border border-slate-100 cursor-not-allowed"
                                                    placeholder="Enter email"
                                                />
                                                <img src="/mail.png" alt="email-photo" className="w-[18px] h-[18px] absolute right-4" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 justify-center">
                                        <div className="w-full">
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">Country</label>
                                            <div className="relative flex items-center">
                                                <input
                                                    name="country"
                                                    type="text"
                                                    required
                                                    value={formData.country}
                                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                    placeholder="Country"
                                                />
                                                <img src="/location.png" alt="location-photo" className="w-[18px] h-[18px] absolute right-4" />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">City</label>
                                            <div className="relative flex items-center">
                                                <input
                                                    name="city"
                                                    type="text"
                                                    required
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                    placeholder="City"
                                                />
                                                <img src="/location.png" alt="location-photo" className="w-[18px] h-[18px] absolute right-4" />
                                            </div>
                                        </div>
                                        {!isAdmin && (
                                            <div className="w-full">
                                                <label className="text-slate-900 text-sm font-medium mb-2 block">Availability</label>
                                                <select
                                                    id="availability"
                                                    value={formData.availability}
                                                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                                                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                >
                                                    <option value="">Select Availability</option>
                                                    <option value={Availability.Morning}>Morning</option>
                                                    <option value={Availability.Afternoon}>Afternoon</option>
                                                    <option value={Availability.Evening}>Evening</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    {!isAdmin && (
                                        <div className="w-full">
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">Experience Level</label>
                                            <div className="flex flex-wrap gap-4">
                                                <label className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="experienceLevel"
                                                        value={ExperienceLevel.BEGINNER}
                                                        checked={formData.experienceLevel === ExperienceLevel.BEGINNER}
                                                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                                                        className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <span className="ml-2 text-sm text-slate-900">Beginner</span>
                                                </label>
                                                <label className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="experienceLevel"
                                                        value={ExperienceLevel.INTERMEDIATE}
                                                        checked={formData.experienceLevel === ExperienceLevel.INTERMEDIATE}
                                                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                                                        className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <span className="ml-2 text-sm text-slate-900">Intermediate</span>
                                                </label>
                                                <label className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="experienceLevel"
                                                        value={ExperienceLevel.ADVANCED}
                                                        checked={formData.experienceLevel === ExperienceLevel.ADVANCED}
                                                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                                                        className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <span className="ml-2 text-sm text-slate-900">Advanced</span>
                                                </label>
                                                <label className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="experienceLevel"
                                                        value={ExperienceLevel.EXPERT}
                                                        checked={formData.experienceLevel === ExperienceLevel.EXPERT}
                                                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                                                        className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <span className="ml-2 text-sm text-slate-900">Expert</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    <div className="w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor="userBio">Bio</label>
                                        <textarea
                                            id="userBio"
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all min-h-20 resize-none"
                                            placeholder="Hello!!!"
                                            required
                                        />
                                    </div>

                                    {/* Phone Numbers Section */}
                                    <div className="w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor="phoneNumbers">Phone Numbers</label>
                                        <PhoneNumberInput
                                            id="phoneNumbers"
                                            styleInput="px-2 text-xs"
                                            stylebutton="px-3 py-2"
                                            onPhoneNumbersChange={setNewPhoneNumbers}
                                            existingPhoneNumbers={displayData.phoneNumbers || []}
                                            onDeleteExisting={handleDeletePhoneNumber}
                                        />
                                    </div>
                                </div>

                                {!isAdmin && (
                                    <div className="flex items-center justify-center gap-5 pt-2">
                                        <div className="bg-gray-300/50 p-4 rounded-lg w-full">
                                            <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor="skillsOffer">Skills | Offer</label>
                                            <SkillsInput
                                                id="skillsOffer"
                                                styleInput="px-2 text-xs"
                                                stylebutton="px-3 py-2"
                                                onSkillsChange={setNewSkillsOffered}
                                            />
                                            <ProfileSkillsDisplay
                                                skills={displayData.skillsOffered}
                                                onDelete={(skill) => handleDeleteSkill(skill, 'offered')}
                                                type="offered"
                                            />
                                        </div>

                                        <div className="bg-gray-300/50 p-4 rounded-lg w-full">
                                            <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor="skillsLearn">Skills | Learn</label>
                                            <SkillsInput
                                                id="skillsLearn"
                                                styleInput="px-2 text-xs"
                                                stylebutton="px-3 py-2"
                                                onSkillsChange={setNewSkillsWanted}
                                            />
                                            <ProfileSkillsDisplay
                                                skills={displayData.skillsWanted}
                                                onDelete={(skill) => handleDeleteSkill(skill, 'wanted')}
                                                type="wanted"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="pt-3 flex items-center justify-start gap-5">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="w-32 shadow-xl py-2 text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none cursor-pointer md:text-[15px] md:w-40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => window.location.reload()}
                                        className="w-20 text-sm shadow-xl py-2 font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none cursor-pointer md:w-30 md:text-[15px]"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
