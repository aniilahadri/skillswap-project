'use client';

import type { ReactNode } from "react"
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import Image from "next/image";

interface BoxOfferProps {
    styles?: ReactNode;
}

export default function BoxOffer({ styles }: BoxOfferProps) {

    const { isOpen, toggle } = useModal();

    return (
        <>
            <div className={`p-5 border rounded-lg h-fit bg-gradient-to-tl w-96 lg:w-80 flex-shrink-0 from-primary to-sky-300 flex flex-col
                 items-start justify-center ${styles}`}>
                <div className="flex gap-4 items-center justify-center">
                    <span className="py-2 px-3 md:py-3 md:px-4 rounded-3xl bg-black/30 text-white">AJ</span>
                    <h3 className=" text-xl py-2 font-semibold text-white">Alice Johnson</h3>
                </div>
                <div className="pt-2">
                    <div className="flex gap-2 items-center justify-start p-1">
                        <Image src="/location.png" alt="pin location" width={16} height={16} />
                        <span className="text-sm">Location</span>
                    </div>
                    <div className="flex gap-2 items-center justify-start p-1">
                        <Image src="/clock.png" alt="" width={16} height={16} />
                        <span className="text-sm">Available</span>
                    </div>
                </div>
                <div className="text-start w-full my-2">
                    <p className="p-2 text-sm text-white/70 text-wrap font-semibold bg-gray-400/20 rounded-lg">
                        This is a bio...
                    </p>
                </div>
                <div className="flex flex-col gap-1 pb-2">
                    <h3 className="text-cyan-900 font-semibold text-base">Offers:</h3>
                    <div className="flex gap-2">
                        <span className="px-3 rounded-2xl bg-black/30 text-white text-sm font-medium">React</span>
                        <span className="px-3 rounded-2xl bg-black/30 text-white text-sm font-medium">React</span>
                        <span className="px-3 rounded-2xl bg-black/30 text-white text-sm font-medium">React</span>
                        <span className="px-3 rounded-2xl bg-black/50 text-white text-sm font-medium">+1 more</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 ">
                    <h3 className="text-sky-800 font-semibold text-base">Wants:</h3>
                    <div className="flex gap-2">
                        <span className="px-3 rounded-2xl bg-black/30 text-white text-sm font-medium">React</span>
                        <span className="px-3 rounded-2xl bg-black/30 text-white text-sm font-medium">React</span>
                        <span className="px-3 rounded-2xl bg-black/30 text-white text-sm font-medium">React</span>
                    </div>
                </div>
                {/* Maybe add a button for view profile */}
                <div className="w-full mt-5">

                    <button className="py-2 text-center w-full rounded-lg bg-black/50 text-white font-medium hover:bg-black/70 text-"
                        onClick={toggle}>
                        <span>Swap Request</span>
                    </button>
                    <Modal isOpen={isOpen} toggle={toggle}>

                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-700 md:text-xl">Send Swap Request to Alice Johnson</h3>
                            <p className="text-sm mt-1 text-gray-600">Choose what skill you want to offer and what you want to learn</p>
                        </div>

                        <form action="">
                            <div className="mb-2">
                                <label className="text-base font-bold" htmlFor="skillOffer">I want to offer:</label>
                                <select
                                    id="skillOffer"
                                    required
                                    className="w-full mt-1 text-sm text-slate-900 bg-slate-100 focus:bg-transparent py-2 rounded-lg border-2 border-slate-100 focus:border-primary outline-none transition-all"
                                >
                                    <option value="">Select a skill you offer</option>
                                    <option value="react">React</option>
                                    <option value="typescript">Typescript</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="text-base font-bold" htmlFor="skillLearn">I want to learn:</label>
                                <select
                                    id="skillLearn"
                                    required
                                    className="w-full mt-1 text-sm text-slate-900 bg-slate-100 focus:bg-transparent py-2 rounded-lg border-2 border-slate-100 focus:border-primary outline-none transition-all"
                                >
                                    <option value="">Select a skill you offer</option>
                                    <option value="typescript">Typescript</option>
                                    <option value="react">React</option>
                                    <option value="html">HTML</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <button
                                    type="button"
                                    data-overlay="#middle-center-modal"
                                    className="px-4 py-2 bg-gray-200 rounded-lg w-full"
                                    onClick={toggle}
                                >
                                    Close
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>

            </div >
        </>
    )
}