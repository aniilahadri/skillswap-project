'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SkillInput from "../../components/SkillsInput";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
    const [skillsWanted, setSkillsWanted] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData(e.currentTarget);


            const signupData = {
                fullName: formData.get('name') as string,
                email: formData.get('email') as string,
                password: formData.get('confirm-pass') as string,
                confirmPassword: formData.get('password') as string,
                city: formData.get('city') as string,
                country: formData.get('country') as string,
                bio: formData.get('userBio') as string,
                availability: (document.getElementById('availability') as HTMLSelectElement)?.value || '',
                skillsOffered,
                skillsWanted,
            };


            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            const result = await response.json();

            if (result.success) {
                setSuccess(true);


                const signInResult = await signIn("credentials", {
                    email: signupData.email,
                    password: signupData.password,
                    redirect: false,
                });

                if (signInResult?.ok) {

                    router.push('/');
                } else {

                    setError("Account created but automatic login failed. Please sign in manually.");
                    setTimeout(() => {
                        router.push('/signin');
                    }, 3000);
                }
            } else {
                setError(result.error || 'Failed to create account');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>

            <div className="bg-gray-100/30 flex items-center justify-center px-4 max-h-fit mt-20 py-12 lg:py-16">
                <div className="max-w-6xl bg-white [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] p-4 lg:p-5 rounded-md">

                    <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-8">
                        <form onSubmit={handleSubmit} className="max-w-xl mx-auto w-full p-4 md:p-6">
                            <div className="mb-8">
                                <div className="flex gap-4 items-center">
                                    <Image src="/icon.png" alt="logo" width={16} height={16} />
                                    <span className="text-2xl text-indigo-600 font-bold">SkillSwap</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4 justify-center">
                                    <div className="w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block">Full Name</label>
                                        <div className="relative flex items-center">
                                            <input
                                                name="name"
                                                type="text"
                                                required
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
                                                type="email"
                                                required
                                                className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                placeholder="Enter email"
                                            />
                                            <Image src="/mail.png" alt="email-photo" className="absolute right-4" width={18} height={18} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <div className="w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                                        <div className="relative flex items-center">
                                            <input
                                                name="confirm-pass"
                                                type="password"
                                                required
                                                className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                placeholder="Enter password"
                                            />
                                            <Image src="/lock.png" alt="password-photo" className=" absolute right-4" width={18} height={18} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block">Confirm Password</label>
                                        <div className="relative flex items-center">
                                            <input
                                                name="password"
                                                type="password"
                                                required
                                                className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                placeholder="Confirm passoword"
                                            />
                                            <Image src="/lock.png" alt="password-photo" className="absolute right-4" width={18} height={18} />
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
                                                className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                placeholder="Country"
                                            />
                                            <Image src="/location.png" alt="location-photo" className="absolute right-4" width={18} height={18} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block">City</label>
                                        <div className="relative flex items-center">
                                            <input
                                                name="city"
                                                type="text"
                                                required
                                                className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                placeholder="City"
                                            />
                                            <Image src="/location.png" alt="location-photo" className="absolute right-4" width={18} height={18} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block">Availability</label>
                                        <select
                                            id="availability"
                                            name="availability"
                                            required
                                            className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                                        >
                                            <option value="">Select</option>
                                            <option value="morning">Morning</option>
                                            <option value="afternoon">Afternoon</option>
                                            <option value="evening">Evening</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="w-full">
                                    <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor="userBio">Bio</label>
                                    <textarea name="userBio" className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all min-h-20 resize-none" id="userBio" placeholder="Hello!!!" required></textarea>
                                </div>
                                <hr />

                                <div className="w-full">
                                    <label className="text-slate-900 text-lg font-medium mb-2 block" htmlFor="skillsOffer">Skills You Can Offer</label>
                                    <SkillInput
                                        id="skillsOffer"
                                        onSkillsChange={setSkillsOffered}
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="text-slate-900 text-lg font-medium mb-2 block" htmlFor="skillsLearn">Skills You Want to Learn</label>
                                    <SkillInput
                                        id="skillsLearn"
                                        onSkillsChange={setSkillsWanted}
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                                        Account created successfully! Redirecting to sign in...
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full shadow-xl py-2 px-4 text-[15px] tracking-wide font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                                </button>

                                <p className="text-sm mt-6 text-center text-slate-600">
                                    Already have an account?
                                    <a href="/signin" className="text-blue-600 font-medium tracking-wide hover:underline ml-1">
                                        Sign In here
                                    </a>
                                </p>
                            </div>
                        </form>

                        <div className="w-full h-full pt-4">
                            <div className="bg-gray-50 relative before:absolute before:inset-0 before:bg-indigo-600/70 rounded-md overflow-hidden w-full h-full aspect-square md:aspect-auto">
                                <img
                                    src="/work.jpg"
                                    className="w-full h-full object-cover"
                                    alt="signup img"

                                />
                                <div className="absolute inset-0 m-auto max-w-sm p-6 flex items-center justify-center">
                                    <div>
                                        <h1 className="text-white text-4xl font-semibold">Sign Up</h1>
                                        <p className="text-slate-100 text-[15px] font-medium mt-6 leading-relaxed">
                                            Create your account and connect with others.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div >
            </div>

        </>
    );
}
