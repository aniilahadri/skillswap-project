
import Image from "next/image";
import Link from "next/link";
export default function SignIn() {
    return (
        <>
            
            <div className="bg-gray-100/30 flex items-center justify-center px-4 max-h-fit mt-20 py-12 lg:py-16">
                <div className="max-w-6xl bg-white [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] p-4 lg:p-5 rounded-md">

                    <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-8">
                        <form className="max-w-xl mx-auto w-full p-4 md:p-6">
                            <div className="mb-8">
                                <div className="flex gap-4 items-center">
                                    <Image src="/icon.png" alt="logo" width={16} height={16} />
                                    <span className="text-2xl text-indigo-600 font-bold">SkillSwap</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                                        <div className="relative flex items-center">
                                            <input
                                                name="email"
                                                type="text"
                                                required
                                                className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border
                                                 border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                placeholder="Enter email"
                                            />
                                            <Image src="/mail.png" alt="email-photo" className=" absolute right-4"width={18} height={18}  />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-center flex-col">
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
                                            <Image src="/lock.png" alt="password-photo" className=" absolute right-4"width={18} height={18} />
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
                                            <Image src="/lock.png" alt="password-photo" className=" absolute right-4"width={18} height={18} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full shadow-xl py-2 px-4 text-[15px] tracking-wide font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                                >
                                    Sign In
                                </button>

                                <p className="text-sm mt-6 text-center text-slate-600">
                                    Don't have an account?
                                    <Link href="/signup" className="text-blue-600 font-medium tracking-wide hover:underline ml-1">
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </form>

                        <div className="w-full h-full">
                            <div className="aspect-square bg-gray-50 relative before:absolute before:inset-0 before:bg-indigo-600/70 rounded-md overflow-hidden w-full h-full">
                                <img
                                    src="/study.jpg"
                                    className="w-full h-full object-cover"
                                    alt="signin img"
                                    
                                />
                                <div className="absolute inset-0 m-auto max-w-sm p-6 flex items-center justify-center">
                                    <div>
                                        <h1 className="text-white text-4xl font-semibold">Sign In</h1>
                                        <p className="text-slate-100 text-[15px] font-medium mt-6 leading-relaxed">
                                            Sign In to your account and connect with others.
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
