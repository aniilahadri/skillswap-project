import Link from "next/link";


export default function Footer() {
    return (
        <footer className="px-10 py-8 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.05)]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-10 text-gray-700">

                    <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-3">About Us</h4>
                        <p className="text-sm text-gray-600">
                            We help students exchange skills and knowledge through a simple and collaborative platform.
                            Learn, teach, and grow together — for free.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:underline">How it Works</Link></li>
                            <li><Link href="#" className="hover:underline">FAQs</Link></li>
                            <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:underline">Support</Link></li>
                        </ul>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-3">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Email: <a href="#" className="hover:underline">support@myskillsswap.com</a></li>
                            <li>Phone: +123 456 789</li>
                            <li>Location: Kosovo, Prishtina</li>
                        </ul>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                        <ul className="flex space-x-4 text-xl">
                            <li><Link href="#" >🌐</Link></li>
                            <li><Link href="#" >🐦</Link></li>
                            <li><Link href="#" >📸</Link></li>
                            <li><Link href="#" >▶️</Link></li>
                        </ul>
                    </div>

                </div>

                <hr className="my-8 border-gray-300" />

                <div className="text-center text-sm text-gray-600">
                    <p>© 2025 <Link href="#" className="hover:underline font-medium">SkillSwap™</Link>. All Rights Reserved.</p>
                </div>
            </div>
        </footer>

    );
}
