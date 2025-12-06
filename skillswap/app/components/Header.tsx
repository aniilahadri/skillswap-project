'use client'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import menuData from "./menuData";
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();

    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarToggleHandler = () => {
        setNavbarOpen(!navbarOpen);
    };


    const [sticky, setSticky] = useState(false);
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

    const [openIndex, setOpenIndex] = useState(-1);
    const handleSubmenu = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(-1);
        } else {
            setOpenIndex(index);
        }
    };

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
                            {/* FIX WHEN USER LOGS IN TO SHOW PROFILE UP */}
                            <div className="flex items-center justify-end pr-16 lg:pr-0 gap-2">

                                {/* {<Link href="/profile" >
                                    <img src="/avatar.png" alt="" className="max-w-12 max-h-12 m-3" />
                                </Link>} */}

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
                        </div>
                    </div>
                </div>
            </header >
        </>
    );
};

