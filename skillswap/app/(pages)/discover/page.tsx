import BoxOffer from "../../components/BoxOffer";

export default function Discover() {
    return (
        <>
            <div className='bg-gray-100/30' >
                <section id="top-input" className="mt-20 px-12 py-6 md:px-20 mb-5">
                    <div id="discover-text" className="lg:pl-28">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-600">Discover Skill Partners</h1>
                        <p className="text-base lg:text-xl md:text-l mb-8 text-gray-500"><i>Find people to exchange skills with in our community</i></p>
                    </div>
                    <div>
                        <form className="flex flex-col gap-4 md:flex-row md:items-center justify-center lg:mb-4">
                            <label htmlFor="default-search" className="sr-only ">Search</label>
                            <div className="relative flex-1">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block py-3 px-10 w-full text-sm text-slate-900 bg-white 
                             rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all lg:text-base" placeholder="Search ..." required />

                                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 lg:text-base">Search</button>
                            </div>
                            <div id="availability-container">
                                <label htmlFor="availability" className="sr-only">Availability</label>
                                <select
                                    id="availability"
                                    className="w-full text-sm text-slate-900 bg-white pl-4 pr-10 py-3 rounded-md border
                                 border-slate-100 focus:border-blue-600 outline-none transition-all lg:text-base"
                                    required
                                >
                                    <option value="">Select Availability</option>
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="evening">Evening</option>
                                    <option value="weekends">Weekends</option>
                                </select>
                            </div>
                            <div id="location-container">
                                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700 sr-only">Location</label>
                                <select
                                    id="location"
                                    className="w-full text-sm text-slate-900 bg-white  pl-4 pr-10 py-3 rounded-md border
                                     border-slate-100 focus:border-blue-600 outline-none transition-all lg:text-base"
                                    required
                                >
                                    <option value="">Select Location</option>
                                    <option value="prishtina">Prishtina</option>
                                    <option value="ferizaj">Ferizaj</option>
                                    <option value="gjakova">Gjakova</option>
                                    <option value="mitrovica">Mitrovica</option>
                                </select>
                            </div>
                        </form>
                    </div >
                </section >
                <section id="main-content" className="px-12 pb-12 lg:pb-16 lg:px-20 flex flex-wrap items-center justify-center lg:justify-start gap-6 ">
                    <BoxOffer></BoxOffer>
                    <BoxOffer></BoxOffer>
                    <BoxOffer></BoxOffer>
                    <BoxOffer></BoxOffer>
                    <BoxOffer></BoxOffer>
                    <BoxOffer></BoxOffer>
                    <BoxOffer></BoxOffer>
                </section>
            </div>
        </>
    );
}