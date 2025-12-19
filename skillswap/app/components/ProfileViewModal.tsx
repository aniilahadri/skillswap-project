'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "./Modal";
import Image from "next/image";

interface ProfileViewModalProps {
    isOpen: boolean;
    toggle: () => void;
    studentId: string;
}

interface StudentProfile {
    student_ID: string;
    fullName: string;
    city: string;
    country: string;
    bio: string;
    availability: string;
    experienceLevel?: string;
    skillsCompleted?: number;
    skillsOffered: string[];
    skillsWanted: string[];
    createdAt?: Date;
}

export default function ProfileViewModal({ isOpen, toggle, studentId }: ProfileViewModalProps) {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<StudentProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showReportForm, setShowReportForm] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);
    const [reportSuccess, setReportSuccess] = useState(false);
    const [reportError, setReportError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && studentId) {
            loadProfile();
        }
    }, [isOpen, studentId]);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/students/${studentId}`);
            const result = await response.json();

            if (result.success && result.student) {
                setProfile(result.student);
            } else {
                setError(result.error || 'Failed to load profile');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleReportSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user || !studentId) return;

        setIsSubmittingReport(true);
        setReportError(null);

        try {
            const response = await fetch('/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reportedUserId: studentId,
                    reason: reportReason
                })
            });

            const result = await response.json();

            if (result.success) {
                setReportSuccess(true);
                setReportReason("");
                setTimeout(() => {
                    setShowReportForm(false);
                    setReportSuccess(false);
                }, 2000);
            } else {
                setReportError(result.error || 'Failed to submit report');
            }
        } catch (err: any) {
            setReportError('An error occurred. Please try again.');
        } finally {
            setIsSubmittingReport(false);
        }
    };

    const formatDate = (date: Date | string | undefined) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="large">
            <div className="max-h-[90vh] overflow-y-auto">
                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Loading profile...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={toggle}
                            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                ) : profile ? (
                    <>
                        <div className="mb-4 md:mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{profile.fullName}</h2>
                            <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
                                <Image src="/location.png" alt="location" width={16} height={16} />
                                <span>{profile.city}, {profile.country}</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-2 text-sm md:text-base">Bio</h3>
                                <p className="text-gray-600 text-sm md:text-base">{profile.bio}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-700 mb-1 text-xs md:text-sm">Experience Level</h3>
                                    <p className="text-gray-600 text-sm md:text-base">{profile.experienceLevel || 'Not specified'}</p>
                                </div>

                                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-700 mb-1 text-xs md:text-sm">Skills Completed</h3>
                                    <p className="text-gray-600 text-sm md:text-base">{profile.skillsCompleted || 0}</p>
                                </div>

                                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-700 mb-1 text-xs md:text-sm">Availability</h3>
                                    <p className="text-gray-600 text-sm md:text-base">{profile.availability}</p>
                                </div>

                                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-700 mb-1 text-xs md:text-sm">Member Since</h3>
                                    <p className="text-gray-600 text-sm md:text-base">{formatDate(profile.createdAt)}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-2 text-sm md:text-base">Skills Offered</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skillsOffered.length > 0 ? (
                                        profile.skillsOffered.map((skill, index) => (
                                            <span key={index} className="px-2 py-1 md:px-3 md:py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-xs md:text-sm">No skills offered</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-2 text-sm md:text-base">Skills Wanted</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skillsWanted.length > 0 ? (
                                        profile.skillsWanted.map((skill, index) => (
                                            <span key={index} className="px-2 py-1 md:px-3 md:py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-xs md:text-sm">No skills wanted</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {session?.user && session.user.id !== studentId && (
                            <div className="border-t pt-4">
                                {!showReportForm ? (
                                    <button
                                        onClick={() => setShowReportForm(true)}
                                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Report User
                                    </button>
                                ) : (
                                    <div>
                                        {reportSuccess ? (
                                            <div className="p-4 bg-green-100 text-green-700 rounded-lg mb-4">
                                                <p className="font-semibold">Report submitted successfully!</p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleReportSubmit} className="space-y-4">
                                                <div>
                                                    <label htmlFor="reportReason" className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Reason for Report
                                                    </label>
                                                    <textarea
                                                        id="reportReason"
                                                        value={reportReason}
                                                        onChange={(e) => setReportReason(e.target.value)}
                                                        required
                                                        minLength={10}
                                                        rows={4}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        placeholder="Please provide a detailed reason for reporting this user (minimum 10 characters)..."
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">Minimum 10 characters required</p>
                                                </div>

                                                {reportError && (
                                                    <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                                                        {reportError}
                                                    </div>
                                                )}

                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setShowReportForm(false);
                                                            setReportReason("");
                                                            setReportError(null);
                                                        }}
                                                        className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmittingReport || reportReason.trim().length < 10}
                                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isSubmittingReport ? 'Submitting...' : 'Submit Report'}
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={toggle}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </Modal>
    );
}

