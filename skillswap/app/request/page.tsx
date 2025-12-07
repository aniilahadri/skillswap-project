'use client'
import { useState } from "react";
import Image from "next/image";


// make the request page be a dropdown when profile gets clicked
export default function Request() {

    let [activeButton, setActiveButton] = useState("received");

    // function activerequestButtons(button: string) {
    //     setActiveButton(button);
    // }

    return (
        <>
           
            {/* make if no message make h-screen if message h-fit */}
            <section className={`w-screen h-screen bg-gray-100/30 lg:pb-16`}>
                <div className=" m-auto w-11/12 mt-20 p-4 py-10 space-y-5 md:w-8/12 lg:w-7/12">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-600">Swap Requests</h2>
                        <p className="text-sm md:text-base text-gray-600/70 font-medium">Manage your incoming and outgoing skill exchange requests.</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <button id="received" className={`p-2 text-sm rounded-lg rounded-r-none w-full font-semibold md:p-3 md:text-base
                    ${activeButton === 'received' ? 'bg-sky-400 text-white' : 'bg-gray-600/70 text-gray-300'}`}
                            onClick={() => setActiveButton("received")}>
                            Received {`(3)`}
                        </button>
                        <button id="sent" className={`p-2 text-sm rounded-lg rounded-l-none w-full font-semibold md:p-3 md:text-base
                    ${activeButton === 'sent' ? 'bg-sky-400 text-white' : 'bg-gray-600/70 text-gray-300'}`}
                            onClick={() => setActiveButton("sent")}>
                            Sent {`(1)`}
                        </button>
                    </div>
                    {activeButton === 'received' ? (
                        <div className="flex flex-col items-center justify-center gap-3">
                            {/* 1  MAKE STATUS PENDING ACCEPT REJECTED  AND A BUTTON TO REJECT OR ACCEPT*/}
                            <div className="w-96 h-32 md:h-36 md:w-full bg-gradient-to-br from-gray-50/80 to-sky-100/40 backdrop-blur-sm border
                                 border-sky-200/50 shadow p-4 rounded-lg flex items-start gap-3 
                                 hover:border-sky-300 hover:from-gray-100/90 hover:to-sky-100/70 transition-all duration-200 ">
                                <div className="w-fit mt-1">
                                    <img src="/avatar.png" alt="" className="max-h-8 max-w-8 md:max-w-10 md:max-h-10"  />
                                </div>
                                <div className="w-fit">
                                    <h4 className="text-lg md:text-xl text-gray-800 font-semibold">Marcus Johnson</h4>
                                    <div className="flex gap-2 items-center justify-start mb-3 md:mb-4">
                                        <img src="/clock.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                        <span className="text-xs md:text-sm text-gray-800/70">Last active: </span>
                                    </div>
                                    <div className="flex gap-3 items-center justify-start py-1">
                                        <span className="text-[13px] text-gray-600 font-semibold md:text-sm">They offer: </span>
                                        <span className="text-xs rounded-xl bg-red-100 text-red-600 px-3 md:text-sm">React</span>
                                    </div>
                                    <div className="flex gap-3 items-center justify-start md:py-1">
                                        <span className="text-[13px] text-gray-600 font-semibold md:text-sm">They want: </span>
                                        <span className="text-xs rounded-xl bg-blue-100 text-blue-600 px-3 md:text-sm">Nodejs</span>
                                    </div>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="w-96 h-32 md:h-36 md:w-full bg-gradient-to-br from-gray-50/80 to-sky-100/40 backdrop-blur-sm border
                     border-sky-200/50 shadow p-4 rounded-lg flex items-start gap-3 
                     hover:border-sky-300 hover:from-gray-100/90 hover:to-sky-100/70 transition-all duration-200 ">
                                <div className="w-fit mt-1">
                                    <img src="/avatar.png" alt="" className="max-h-8 max-w-8 md:max-w-10 md:max-h-10" />
                                </div>
                                <div className="w-fit">
                                    <h4 className="text-lg md:text-xl text-gray-800 font-semibold">Marcus Johnson</h4>
                                    <div className="flex gap-2 items-center justify-start mb-3 md:mb-4">
                                        <img src="/clock.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                        <span className="text-xs md:text-sm text-gray-800/70">Last active: </span>
                                    </div>
                                    <div className="flex gap-3 items-center justify-start py-1">
                                        <span className="text-[13px] text-gray-600 font-semibold md:text-sm">They offer: </span>
                                        <span className="text-xs rounded-xl bg-red-100 text-red-600 px-3 md:text-sm">React</span>
                                    </div>
                                    <div className="flex gap-3 items-center justify-start md:py-1">
                                        <span className="text-[13px] text-gray-600 font-semibold md:text-sm">They want: </span>
                                        <span className="text-xs rounded-xl bg-blue-100 text-blue-600 px-3 md:text-sm">Nodejs</span>
                                    </div>
                                </div>
                            </div>
                            {/* 3 */}
                            <div className="w-96 h-32 md:h-36 md:w-full bg-gradient-to-br from-gray-50/80 to-sky-100/40 backdrop-blur-sm border
                     border-sky-200/50 shadow p-4 rounded-lg flex items-start gap-3 
                     hover:border-sky-300 hover:from-gray-100/90 hover:to-sky-100/70 transition-all duration-200 ">
                                <div className="w-fit mt-1">
                                    <img src="/avatar.png" alt="" className="max-h-8 max-w-8 md:max-w-10 md:max-h-10" />
                                </div>
                                <div className="w-fit">
                                    <h4 className="text-lg md:text-xl text-gray-800 font-semibold">Marcus Johnson</h4>
                                    <div className="flex gap-2 items-center justify-start mb-3 md:mb-4">
                                        <img src="/clock.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                        <span className="text-xs md:text-sm text-gray-800/70">Last active: </span>
                                    </div>
                                    <div className="flex gap-3 items-center justify-start py-1">
                                        <span className="text-[13px] text-gray-600 font-semibold md:text-sm">They offer: </span>
                                        <span className="text-xs rounded-xl bg-red-100 text-red-600 px-3 md:text-sm">React</span>
                                    </div>
                                    <div className="flex gap-3 items-center justify-start md:py-1">
                                        <span className="text-[13px] text-gray-600 font-semibold md:text-sm">They want: </span>
                                        <span className="text-xs rounded-xl bg-blue-100 text-blue-600 px-3 md:text-sm">Nodejs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-4">
                            {/* mAKE A STATUS FOR PENDIGN REJECTED ACCEPTED */}
                            <div className="w-96 h-40 md:h-44 md:w-full bg-gradient-to-br from-gray-50/80 to-sky-100/40 backdrop-blur-sm border
                                 border-sky-200/50 shadow p-4 rounded-lg flex items-start gap-3 
                                 hover:border-sky-300 hover:from-gray-100/90 hover:to-sky-100/70 transition-all duration-200 ">
                                <div className="w-fit mt-1">
                                    <img src="/avatar.png" alt="" className="max-h-8 max-w-8 md:max-w-10 md:max-h-10" />
                                </div>
                                <div className="w-fit">
                                    <h4 className="text-lg md:text-xl text-gray-800 font-semibold">Marcus Johnson</h4>
                                    <div className="flex gap-2 items-center justify-start mb-3">
                                        <img src="/clock.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                        <span className="text-xs md:text-sm text-gray-800/70">Last active: </span>
                                    </div>
                                    <div className="flex gap-3 items-center justify-start py-1">
                                        <span className="text-[13px] text-gray-600 font-semibold md:text-sm">You offered: </span>
                                        <span className="text-xs rounded-xl bg-red-100 text-red-600 px-3 md:text-sm">React</span>
                                    </div>
                                    <div className="flex gap-3 items-center justify-start md:py-1">
                                        <span className="text-[13px] text-gray-600 font-semibold md:text-sm">You wanted: </span>
                                        <span className="text-xs rounded-xl bg-blue-100 text-blue-600 px-3 md:text-sm">Nodejs</span>
                                    </div>
                                    <div>
                                        <button type="button" className="rounded px-3 py-1 bg-red-600 text-white text-sm mt-2 hover:bg-red-700 hover:shadow-sm">
                                            Cancel 💣
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section>

          
        </>
    );
}