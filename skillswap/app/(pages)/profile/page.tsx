
import SkillsInput from "../../components/SkillsInput";

export default function Profile() {
    return (
        <>
            <div className="bg-gray-100/30 px-4 max-h-fit mt-20 py-12 lg:py-16">
                <div className="bg-gray-100 flex flex-col items-center justify-center md:w-10/12 lg:w-8/12 m-auto">
                    <div className="bg-white p-4 lg:p-5 rounded-md mb-8 flex gap-3 md:gap-8 h-19 w-full ">
                        <div>
                            <img
                                src="/avatar.png"
                                className="w-20"
                                alt="Avatar" />
                        </div>

                        <div className="space-y-1 md:space-y-2">
                            <h3 className="text-lg font-bold md:text-xl">John Doe</h3>
                            <div className="flex items-center justify-start gap-2">
                                <img src="/location.png" alt="" className="max-w-3 max-h-3 md:max-w-4 md:max-h-4" />
                                <span className="text-gray-500 text-sm md:text-base">Country, City</span>
                            </div>
                            <div className="flex items-center justify-start gap-3">
                                <div className="flex items-center justify-start gap-2">
                                    <img src="/clock.png" alt="" className="max-w-3 max-h-3 md:max-w-4 md:max-h-4" />
                                    <span className="text-gray-500 text-sm md:text-base">Available</span>
                                </div>
                                <div className="flex items-center justify-start gap-2">
                                    <img src="/calendar.png" alt="" className="max-w-3 max-h-3 md:max-w-4 md:max-h-4" />
                                    <span className="text-gray-500 text-sm md:text-base">Joined</span>
                                </div>
                            </div>
                        </div>
                        {/* MAKE A DIV IF PROFILE PRIVATE TO SHOW ANOTHER DIV */}
                        <div className="flex flex-col w-60  md:w-40 ml-auto">
                            <div className="flex items-center justify-center gap-2 bg-black/10 shadow-sm shadow-slate-500 px-1 py-1 rounded-md lg:px-3">
                                <img src="/eye-public.png" alt="" className="max-w-3 max-h-3 md:max-w-4 md:max-h-4" />
                                <span className="text-xs font-semibold md:text-sm">Profile is Public </span>
                            </div>
                            <button className="mt-auto ml-auto rounded-md bg-red-500 text-white px-3 py-1 hover:bg-red-600 text-xs md:text-sm">Make Private</button>
                        </div>
                    </div>

                    <div className="w-full bg-white [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] p-4 lg:p-5 rounded-md">

                        <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-8">

                            <form className="mx-auto w-full p-2 md:p-4 space-y-4">
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
                                                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 
                                                    pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
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
                                                    required
                                                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border
                                                     border-slate-100 focus:border-blue-600 outline-none transition-all"
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
                                                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border
                                                     border-slate-100 focus:border-blue-600 outline-none transition-all"
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
                                                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border
                                                     border-slate-100 focus:border-blue-600 outline-none transition-all"
                                                    placeholder="City"
                                                />
                                                <img src="/location.png" alt="location-photo" className="w-[18px] h-[18px] absolute right-4" />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">Availability</label>
                                            <select
                                                id="availability"
                                                className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border
                                                 border-slate-100 focus:border-blue-600 outline-none transition-all"
                                            >
                                                <option value="">Select Availability</option>
                                                <option value="morning">Morning</option>
                                                <option value="afternoon">Afternoon</option>
                                                <option value="evening">Evening</option>
                                                <option value="weekends">Weekends</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor="userBio">Bio</label>
                                        <textarea className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border
                                         border-slate-100 focus:border-blue-600 outline-none transition-all min-h-20 resize-none" id="userBio" placeholder="Hello!!!" required></textarea>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-5 pt-2">
                                    <div className="bg-gray-300/50 p-4 rounded-lg w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor="skillsOffer">Skills | Offer</label>
                                        <SkillsInput id="skillsOffer" styleInput="px-2 text-xs" stylebutton=" px-3 py-2"></SkillsInput>
                                    </div>

                                    <div className="bg-gray-300/50 p-4 rounded-lg w-full">
                                        <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor="skillsLearn">Skills | Learn</label>
                                        <SkillsInput id="skillsLearn" styleInput="px-2 text-xs" stylebutton=" px-3 py-2"></SkillsInput>
                                    </div>
                                </div>

                                <div className="pt-3 flex items-center justify-start gap-5">
                                    <button
                                        type="submit"
                                        className="w-32 shadow-xl py-2 text-sm font-medium rounded-md text-white bg-sky-500
                                     hover:bg-sky-600 focus:outline-none cursor-pointer md:text-[15px] md:w-40 "
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        className="w-20 text-sm shadow-xl py-2 font-medium rounded-md text-white bg-gray-400
                                     hover:bg-gray-500 focus:outline-none cursor-pointer md:w-30 md:text-[15px]"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div >
                </div>
            </div>
        </>
    );
}