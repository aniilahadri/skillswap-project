export default function Loading() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-100 z-[9999]">
            <div className="flex space-x-2" role="status">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}