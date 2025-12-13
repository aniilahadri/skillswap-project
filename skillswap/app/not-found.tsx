import Link from "next/link"

export default function NotFound() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 px-4 z-50">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <p className="text-2xl font-semibold mt-4 text-gray-800">
                    Oops! Page not found
                </p>
                <p className="mt-4 mb-6 text-gray-700 font-medium">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-gray-800 text-white font-semibold px-6 py-2 rounded-full hover:bg-gray-700 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}
