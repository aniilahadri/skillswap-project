'use client';

import type { ReactNode } from "react"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import ProfileViewModal from "./ProfileViewModal";
import Image from "next/image";

interface BoxOfferProps {
    styles?: ReactNode;
    student_ID?: string;
    fullName?: string;
    city?: string;
    country?: string;
    bio?: string;
    availability?: string;
    skillsOffered?: string[];
    skillsWanted?: string[];
    isFavorite?: boolean;
    onFavoriteToggle?: (studentId: string, isFavorite: boolean) => void;
}

export default function BoxOffer({
    styles,
    student_ID,
    fullName = "Alice Johnson",
    city = "Location",
    availability = "Available",
    bio = "This is a bio...",
    skillsOffered = [],
    skillsWanted = [],
    isFavorite = false,
    onFavoriteToggle
}: BoxOfferProps) {

    const { data: session } = useSession();
    const router = useRouter();
    const { isOpen, toggle } = useModal();
    const { isOpen: isProfileOpen, toggle: toggleProfile } = useModal();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [favorite, setFavorite] = useState(isFavorite);
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

    useEffect(() => {
        setFavorite(isFavorite);
    }, [isFavorite]);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (session?.user && student_ID) {
                try {
                    const response = await fetch(`/api/favorites?favStudentId=${student_ID}`);
                    const result = await response.json();
                    if (result.success) {
                        setFavorite(result.isFavorite);
                    }
                } catch (error) {
                    console.error('Error checking favorite status:', error);
                }
            }
        };
        checkFavoriteStatus();
    }, [session, student_ID]);

    const handleSwapRequestClick = () => {
        if (!session?.user) {
            alert('Please log in first');
            router.push('/signin');
            return;
        }
        setSuccessMessage(null);
        setErrorMessage(null);
        toggle();
    };

    const handleFavoriteToggle = async () => {
        if (!session?.user) {
            alert('Please log in first');
            router.push('/signin');
            return;
        }

        if (!student_ID) return;

        setIsTogglingFavorite(true);
        try {
            if (favorite) {
                const response = await fetch(`/api/favorites?favStudentId=${student_ID}`, {
                    method: 'DELETE'
                });
                const result = await response.json();
                if (result.success) {
                    setFavorite(false);
                    if (onFavoriteToggle) {
                        onFavoriteToggle(student_ID, false);
                    }
                } else {
                    alert(result.error || 'Failed to remove from favorites');
                }
            } else {
                const response = await fetch('/api/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ favStudentId: student_ID })
                });
                const result = await response.json();
                if (result.success) {
                    setFavorite(true);
                    if (onFavoriteToggle) {
                        onFavoriteToggle(student_ID, true);
                    }
                } else {
                    alert(result.error || 'Failed to add to favorites');
                }
            }
        } catch (error: any) {
            console.error('Error toggling favorite:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsTogglingFavorite(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session?.user || !student_ID) return;

        setIsSubmitting(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const formData = new FormData(e.currentTarget);
        const offeredSkillName = formData.get('skillOffer') as string;
        const requestedSkillName = formData.get('skillLearn') as string;

        try {
            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiverId: student_ID,
                    requestedSkillName: requestedSkillName,
                    offeredSkillName: offeredSkillName
                })
            });

            const result = await response.json();

            if (result.success) {
                setSuccessMessage(result.message || 'Request sent successfully!');
            } else {
                setErrorMessage(result.error || 'Failed to send request');
            }
        } catch (error: any) {
            console.error('Error sending request:', error);
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const displayedOffered = skillsOffered.slice(0, 4);
    const remainingOffered = skillsOffered.length - 4;
    const displayedWanted = skillsWanted.slice(0, 4);
    const remainingWanted = skillsWanted.length - 4;

    return (
        <>
            <div className={`p-5 border rounded-lg h-fit bg-gradient-to-tl w-96 lg:w-80 flex-shrink-0 from-primary to-sky-300 flex flex-col
                 items-start justify-center ${styles}`}>
                <div className="flex gap-4 items-center justify-between w-full">
                    <div className="flex gap-4 items-center justify-center">
                        <span className="py-2 px-3 md:py-3 md:px-4 rounded-3xl bg-black/30 text-white">{getInitials(fullName)}</span>
                        <h3 className=" text-xl py-2 font-semibold text-white">{fullName}</h3>
                    </div>
                    <button
                        onClick={handleFavoriteToggle}
                        disabled={isTogglingFavorite || !session?.user}
                        className="flex-shrink-0 hover:opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Image
                            src="/favorite.png"
                            alt="favorite"
                            width={favorite ? 28 : 24}
                            height={favorite ? 28 : 24}
                            className={
                                favorite
                                    ? "opacity-100 drop-shadow-lg brightness-110 scale-110 transition-all"
                                    : "opacity-50 transition-all"
                            }
                        />
                    </button>
                </div>
                <div className="pt-2">
                    <div className="flex gap-2 items-center justify-start p-1">
                        <Image src="/location.png" alt="pin location" width={16} height={16} />
                        <span className="text-sm">{city}</span>
                    </div>
                    <div className="flex gap-2 items-center justify-start p-1">
                        <Image src="/clock.png" alt="" width={16} height={16} />
                        <span className="text-sm">{availability}</span>
                    </div>
                </div>
                <div className="text-start w-full my-2">
                    <p className="p-2 text-sm text-white/70 text-wrap font-semibold bg-gray-400/20 rounded-lg">
                        {bio}
                    </p>
                </div>
                <div className="flex flex-col gap-1 pb-2">
                    <h3 className="text-cyan-900 font-semibold text-base">Offers:</h3>
                    <div className="flex gap-2 flex-wrap">
                        {displayedOffered.map((skill, index) => (
                            <span key={index} className="px-3 rounded-2xl bg-black/30 text-white text-sm font-medium">{skill}</span>
                        ))}
                        {remainingOffered > 0 && (
                            <span className="px-3 rounded-2xl bg-black/50 text-white text-sm font-medium">+{remainingOffered} more</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1 ">
                    <h3 className="text-sky-800 font-semibold text-base">Wants:</h3>
                    <div className="flex gap-2 flex-wrap">
                        {displayedWanted.map((skill, index) => (
                            <span key={index} className="px-3 rounded-2xl bg-black/30 text-white text-sm font-medium">{skill}</span>
                        ))}
                        {remainingWanted > 0 && (
                            <span className="px-3 rounded-2xl bg-black/50 text-white text-sm font-medium">+{remainingWanted} more</span>
                        )}
                    </div>
                </div>
                <div className="w-full mt-5 space-y-2">
                    <button
                        className="py-2 text-center w-full rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
                        onClick={toggleProfile}
                    >
                        <span>View Profile</span>
                    </button>
                    <button
                        className="py-2 text-center w-full rounded-lg bg-black/50 text-white font-medium hover:bg-black/70 transition-colors"
                        onClick={handleSwapRequestClick}
                    >
                        <span>Swap Request</span>
                    </button>
                    <Modal isOpen={isOpen} toggle={toggle}>
                        {!session?.user ? (
                            <div className="text-center py-4">
                                <p className="text-lg font-semibold text-gray-700 mb-4">Please log in first</p>
                                <button
                                    onClick={() => {
                                        toggle();
                                        router.push('/signin');
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Go to Sign In
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-700 md:text-xl">Send Swap Request to {fullName}</h3>
                                    <p className="text-sm mt-1 text-gray-600">Choose what skill you want to offer and what you want to learn</p>
                                </div>

                                {successMessage ? (
                                    <div className="text-center py-4">
                                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                                            <p className="font-semibold">{successMessage}</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
                                            onClick={() => {
                                                setSuccessMessage(null);
                                                setErrorMessage(null);
                                                toggle();
                                            }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        {errorMessage && (
                                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                                                {errorMessage}
                                            </div>
                                        )}
                                        <div className="mb-2">
                                            <label className="text-base font-bold" htmlFor="skillOffer">I want to offer:</label>
                                            <select
                                                id="skillOffer"
                                                name="skillOffer"
                                                required
                                                className="w-full mt-1 text-sm text-slate-900 bg-slate-100 focus:bg-transparent py-2 rounded-lg border-2 border-slate-100 focus:border-primary outline-none transition-all"
                                            >
                                                <option value="">Select a skill they want to learn</option>
                                                {skillsWanted.map((skill, index) => (
                                                    <option key={index} value={skill}>{skill}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="text-base font-bold" htmlFor="skillLearn">I want to learn:</label>
                                            <select
                                                id="skillLearn"
                                                name="skillLearn"
                                                required
                                                className="w-full mt-1 text-sm text-slate-900 bg-slate-100 focus:bg-transparent py-2 rounded-lg border-2 border-slate-100 focus:border-primary outline-none transition-all"
                                            >
                                                <option value="">Select a skill they offer</option>
                                                {skillsOffered.map((skill, index) => (
                                                    <option key={index} value={skill}>{skill}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                data-overlay="#middle-center-modal"
                                                className="px-4 py-2 bg-gray-200 rounded-lg w-full"
                                                onClick={() => {
                                                    setErrorMessage(null);
                                                    toggle();
                                                }}
                                                disabled={isSubmitting}
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Request'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                    </Modal>
                    <ProfileViewModal
                        isOpen={isProfileOpen}
                        toggle={toggleProfile}
                        studentId={student_ID || ''}
                    />
                </div>

            </div >
        </>
    )
}