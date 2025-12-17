'use client'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import menuData from "./menuData";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [openIndex, setOpenIndex] = useState(-1);

    const navbarToggleHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    const handleStickyNavbar = () => {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
    });

    const handleSubmenu = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(-1);
        } else {
            setOpenIndex(index);
        }
    };

    // Show loading spinner while session is loading
    if (status === "loading") {
        return (
            <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-100 z-[9999]">
                <div className="flex space-x-2" role="status">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <header
                className={`left-0 top-0 z-40 flex w-full items-center ${sticky
                    ? "fixed z-[9999] bg-white !bg-opacity-80 backdrop-blur-sm transition shadow-sticky"
                    : "absolute bg-transparent shadow-[0_2px_5px_rgba(0,0,0,0.05)] "
                    }`}
            >
                <div className="container">
                    <div className="relative -mx-4 flex items-center justify-between">
                        <div className="w-60 max-w-full px-4 xl:mr-12">
                            <Link
                                href="/"
                                className="py-6 block w-full "
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <img src="/icon.png" alt="" />
                                    <span className="text-xl font-bold text-indigo-600 lg:text-2xl">SkillSwap</span>
                                </div>
                            </Link>
                        </div>
                        <div className="flex w-full items-center justify-between px-4">
                            <div>
                                <button
                                    onClick={navbarToggleHandler}
                                    id="navbarToggler"
                                    aria-label="Mobile Menu"
                                    className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg
                                     px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                                >
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all 
                                            duration-300 ${navbarOpen ? " top-[7px] rotate-45" : " "
                                            }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all 
                                            duration-300 ${navbarOpen ? "opacity-0 " : " "
                                            }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all 
                                            duration-300 ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                                            }`}
                                    />
                                </button>
                                <nav
                                    id="navbarCollapse"
                                    className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] 
                                        border-body-color/50 bg-white px-6 py-4 duration-300 lg:visible lg:static lg:w-auto 
                                        lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen
                                            ? "visibility top-full opacity-100"
                                            : "invisible top-[120%] opacity-0"
                                        }`}
                                >
                                    <ul className="block lg:flex lg:space-x-12">
                                        {menuData.map((menuItem, index) => (
                                            <li key={index} className="group relative">
                                                {menuItem.path ? (
                                                    <Link href={menuItem.path}
                                                        className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6
                                                             ${pathname === menuItem.path ?
                                                                "text-primary" :
                                                                "text-dark hover:text-primary"
                                                            }`}
                                                    >
                                                        {menuItem.title}
                                                    </Link>
                                                ) : (
                                                    <>
                                                        <p
                                                            onClick={() => handleSubmenu(index)}
                                                            className="flex cursor-pointer items-center justify-between
                                                             py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                                                        >
                                                            {menuItem.title}
                                                            <span className="pl-3 text-lg" aria-hidden="true"><img src="/down-arrow.png" alt="" /></span>
                                                        </p>
                                                        <div
                                                            className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 
                                                                group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 
                                                                lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full
                                                                 ${openIndex === index ? "block" : "hidden"
                                                                }`}
                                                        >
                                                            {menuItem.submenu?.map((submenuItem, index) => (
                                                                <a
                                                                    href={submenuItem.path}
                                                                    key={index}
                                                                    className="block rounded py-2.5 text-sm text-dark hover:text-primary lg:px-3"
                                                                >
                                                                    {submenuItem.title}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                            {!session?.user ? (
                                <div className="flex items-center justify-end pr-16 lg:pr-0 gap-2">
                                    <Link
                                        href="/signin"
                                        className=" px-2 py-3 text-sm font-medium text-dark hover:opacity-70 block md:text-base "
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="ease-in-up shadow-btn hover:shadow-btn-hover rounded-2xl bg-primary px-4 py-2 text-sm font-medium 
                                    text-white transition duration-300 hover:bg-opacity-90 block md:px-9 lg:px-6 xl:px-9 md:text-base"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            ) : (
                                <li className="relative group">
                                    <button
                                        className="flex items-center px-4 py-2 text-sm font-medium text-dark hover:text-primary"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <img className="mr-2" src="/avatar.png"></img>
                                        {session?.user.fullname || "Account"}
                                    </button>

                                    <ul className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 ${isOpen ? 'block' : 'hidden'}`}>
                                        <li>
                                            <Link
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                href="/profile"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                        </li>

                                        {session?.user?.role === "STUDENT" && (
                                            <li>
                                                <Link
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    href="/resume"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Request
                                                </Link>
                                            </li>
                                        )}

                                        {session?.user?.role === "ADMIN" && (
                                            <li>
                                                <Link
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    href="/dashboard"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <i className="lni lni-dashboard mr-2"></i> Admin Panel
                                                </Link>
                                            </li>
                                        )}

                                        <li>
                                            <button
                                                onClick={async () => {
                                                    await fetch('api/token', { method: 'DELETE' });
                                                    await signOut({ callbackUrl: "/" });
                                                }}
                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                <i className="lni lni-exit mr-2 -ml-0.5"></i> Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}