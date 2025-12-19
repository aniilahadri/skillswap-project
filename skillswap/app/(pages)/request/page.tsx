'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface RequestData {
    request_ID: string;
    sender_ID: string;
    receiver_ID: string;
    requestedSkill_ID: string;
    offeredSkill_ID: string;
    status: string;
    createdAt: Date;
    completedAt?: Date | null;
    senderName: string;
    receiverName: string;
    requestedSkillName: string;
    offeredSkillName: string;
    senderEmail?: string;
    receiverEmail?: string;
}


export default function Request() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeButton, setActiveButton] = useState("received");
    const [sentRequests, setSentRequests] = useState<RequestData[]>([]);
    const [receivedRequests, setReceivedRequests] = useState<RequestData[]>([]);
    const [completedRequests, setCompletedRequests] = useState<RequestData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAuthMessage, setShowAuthMessage] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            setShowAuthMessage(true);
            setTimeout(() => {
                router.push("/signin");
            }, 3000);
            return;
        }

        if (status === "authenticated" && session?.user?.id) {
            loadRequests();
        }
    }, [status, session]);

    const loadRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const [sentResponse, receivedResponse] = await Promise.all([
                fetch('/api/requests/sent'),
                fetch('/api/requests/received')
            ]);

            const sentResult = await sentResponse.json();
            const receivedResult = await receivedResponse.json();

            if (sentResult.success) {
                const allSent = sentResult.requests || [];
                setSentRequests(allSent.filter((r: RequestData) => r.status !== 'COMPLETED'));
                setCompletedRequests([...allSent.filter((r: RequestData) => r.status === 'COMPLETED'), ...(receivedResult.requests || []).filter((r: RequestData) => r.status === 'COMPLETED')]);
            } else {
                setError(sentResult.error || "Failed to load sent requests");
            }

            if (receivedResult.success) {
                const allReceived = receivedResult.requests || [];
                setReceivedRequests(allReceived.filter((r: RequestData) => r.status !== 'COMPLETED'));
                const sentCompleted = (sentResult.requests || []).filter((r: RequestData) => r.status === 'COMPLETED');
                const receivedCompleted = allReceived.filter((r: RequestData) => r.status === 'COMPLETED');
                setCompletedRequests([...sentCompleted, ...receivedCompleted]);
            } else {
                setError(receivedResult.error || "Failed to load received requests");
            }
        } catch (err: any) {
            console.error("Error loading requests:", err);
            setError("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRequest = async (requestId: string) => {
        if (!confirm("Are you sure you want to delete this request?")) {
            return;
        }

        try {
            const response = await fetch(`/api/requests/${requestId}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.success) {
                await loadRequests();
            } else {
                setError(result.error || "Failed to delete request");
            }
        } catch (err: any) {
            console.error("Error deleting request:", err);
            setError("Failed to delete request");
        }
    };

    const handleUpdateStatus = async (requestId: string, status: string) => {
        try {
            const response = await fetch(`/api/requests/${requestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            const result = await response.json();

            if (result.success) {
                await loadRequests();
            } else {
                setError(result.error || "Failed to update request status");
            }
        } catch (err: any) {
            console.error("Error updating request status:", err);
            setError("Failed to update request status");
        }
    };

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-700';
            case 'ACCEPTED': return 'bg-green-100 text-green-700';
            case 'REJECTED': return 'bg-red-100 text-red-700';
            case 'COMPLETED': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (showAuthMessage || status === "unauthenticated") {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100/30">
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-md mx-4">
                    <div className="text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Access Restricted</h2>
                        <p className="text-gray-600 mb-2">You're not authorized to access this feature.</p>
                        <p className="text-gray-600 mb-6">If you want to use this feature, please sign in for a better experience!</p>
                        <p className="text-sm text-indigo-600 font-medium">Redirecting to sign in page...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === "loading" || loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className={`w-screen ${sentRequests || receivedRequests ? "h-fit" : "h-screen"} bg-gray-100/30 lg:pb-16`}>
                <div className=" m-auto w-11/12 mt-20 p-4 py-10 space-y-5 md:w-8/12 lg:w-7/12">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-600">Swap Requests</h2>
                        <p className="text-sm md:text-base text-gray-600/70 font-medium">Manage your incoming and outgoing skill exchange requests.</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <button id="received" className={`p-2 text-sm rounded-lg rounded-l-lg rounded-r-none w-full font-semibold md:p-3 md:text-base
                    ${activeButton === 'received' ? 'bg-sky-400 text-white' : 'bg-gray-600/70 text-gray-300'}`}
                            onClick={() => setActiveButton("received")}>
                            Received {`(${receivedRequests.length})`}
                        </button>
                        <button id="sent" className={`p-2 text-sm rounded-none w-full font-semibold md:p-3 md:text-base
                    ${activeButton === 'sent' ? 'bg-sky-400 text-white' : 'bg-gray-600/70 text-gray-300'}`}
                            onClick={() => setActiveButton("sent")}>
                            Sent {`(${sentRequests.length})`}
                        </button>
                        <button id="completed" className={`p-2 text-sm rounded-lg rounded-r-lg rounded-l-none w-full font-semibold md:p-3 md:text-base
                    ${activeButton === 'completed' ? 'bg-sky-400 text-white' : 'bg-gray-600/70 text-gray-300'}`}
                            onClick={() => setActiveButton("completed")}>
                            Completed {`(${completedRequests.length})`}
                        </button>
                    </div>
                    {activeButton === 'received' ? (
                        <div className="flex flex-col items-center justify-center gap-3">
                            {error && (
                                <div className="w-full p-3 bg-red-100 text-red-700 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                            {receivedRequests.length === 0 ? (
                                <div className="w-full text-center py-8">
                                    <p className="text-gray-600">No received requests</p>
                                </div>
                            ) : (
                                receivedRequests.map((request) => (
                                    <div key={request.request_ID} className="w-96 h-auto md:h-auto md:w-full bg-gradient-to-br from-gray-50/80 to-sky-100/40 backdrop-blur-sm border
                                         border-sky-200/50 shadow p-4 rounded-lg flex items-start gap-3 
                                         hover:border-sky-300 hover:from-gray-100/90 hover:to-sky-100/70 transition-all duration-200">
                                        <div className="w-fit mt-1">
                                            <img src="/avatar.png" alt="" className="max-h-8 max-w-8 md:max-w-10 md:max-h-10" />
                                        </div>
                                        <div className="w-fit flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-lg md:text-xl text-gray-800 font-semibold">{request.senderName}</h4>
                                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                                                    {request.status}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center justify-start mb-3 md:mb-4">
                                                <img src="/clock.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                                <span className="text-xs md:text-sm text-gray-800/70">Sent: {formatDate(request.createdAt)}</span>
                                            </div>
                                            <div className="flex gap-3 items-center justify-start py-1">
                                                <span className="text-[13px] text-gray-600 font-semibold md:text-sm">They offer: </span>
                                                <span className="text-xs rounded-xl bg-red-100 text-red-600 px-3 md:text-sm">{request.offeredSkillName}</span>
                                            </div>
                                            <div className="flex gap-3 items-center justify-start md:py-1">
                                                <span className="text-[13px] text-gray-600 font-semibold md:text-sm">They want: </span>
                                                <span className="text-xs rounded-xl bg-blue-100 text-blue-600 px-3 md:text-sm">{request.requestedSkillName}</span>
                                            </div>
                                            {request.status === 'PENDING' && (
                                                <div className="flex gap-2 mt-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateStatus(request.request_ID, 'ACCEPTED')}
                                                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateStatus(request.request_ID, 'REJECTED')}
                                                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            {request.status === 'ACCEPTED' && (
                                                <>
                                                    <div className="flex gap-2 items-center justify-start mt-3 mb-3">
                                                        <img src="/mail.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                                        <span className="text-xs md:text-sm text-gray-800/70">Email: {request.senderEmail}</span>
                                                    </div>
                                                    <div className="flex gap-2 mt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleUpdateStatus(request.request_ID, 'COMPLETED')}
                                                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                                        >
                                                            Mark as Completed
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : activeButton === 'sent' ? (
                        <div className="flex flex-col items-center justify-center gap-4">
                            {error && (
                                <div className="w-full p-3 bg-red-100 text-red-700 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                            {sentRequests.length === 0 ? (
                                <div className="w-full text-center py-8">
                                    <p className="text-gray-600">No sent requests</p>
                                </div>
                            ) : (
                                sentRequests.map((request) => (
                                    <div key={request.request_ID} className="w-96 h-auto md:h-auto md:w-full bg-gradient-to-br from-gray-50/80 to-sky-100/40 backdrop-blur-sm border
                                         border-sky-200/50 shadow p-4 rounded-lg flex items-start gap-3 
                                         hover:border-sky-300 hover:from-gray-100/90 hover:to-sky-100/70 transition-all duration-200">
                                        <div className="w-fit mt-1">
                                            <img src="/avatar.png" alt="" className="max-h-8 max-w-8 md:max-w-10 md:max-h-10" />
                                        </div>
                                        <div className="w-fit flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-lg md:text-xl text-gray-800 font-semibold">{request.receiverName}</h4>
                                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                                                    {request.status}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center justify-start mb-3">
                                                <img src="/clock.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                                <span className="text-xs md:text-sm text-gray-800/70">Sent: {formatDate(request.createdAt)}</span>
                                            </div>
                                            <div className="flex gap-3 items-center justify-start py-1">
                                                <span className="text-[13px] text-gray-600 font-semibold md:text-sm">You offered: </span>
                                                <span className="text-xs rounded-xl bg-red-100 text-red-600 px-3 md:text-sm">{request.offeredSkillName}</span>
                                            </div>
                                            <div className="flex gap-3 items-center justify-start md:py-1">
                                                <span className="text-[13px] text-gray-600 font-semibold md:text-sm">You wanted: </span>
                                                <span className="text-xs rounded-xl bg-blue-100 text-blue-600 px-3 md:text-sm">{request.requestedSkillName}</span>
                                            </div>
                                            {request.status === 'PENDING' && (
                                                <div className="mt-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteRequest(request.request_ID)}
                                                        className="rounded px-3 py-1 bg-red-600 text-white text-sm hover:bg-red-700 hover:shadow-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                            {request.status === 'ACCEPTED' && (
                                                <>
                                                    <div className="flex gap-2 items-center justify-start mt-3 mb-3">
                                                        <img src="/mail.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                                        <span className="text-xs md:text-sm text-gray-800/70">Email: {request.receiverEmail}</span>
                                                    </div>
                                                    <div className="mt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleUpdateStatus(request.request_ID, 'COMPLETED')}
                                                            className="rounded px-3 py-1 bg-blue-600 text-white text-sm hover:bg-blue-700 hover:shadow-sm"
                                                        >
                                                            Mark as Completed
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-4">
                            {error && (
                                <div className="w-full p-3 bg-red-100 text-red-700 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                            {completedRequests.length === 0 ? (
                                <div className="w-full text-center py-8">
                                    <p className="text-gray-600">No completed requests</p>
                                </div>
                            ) : (
                                completedRequests.map((request) => {
                                    const isSender = request.sender_ID === session?.user?.id;
                                    return (
                                        <div key={request.request_ID} className="w-96 h-auto md:h-auto md:w-full bg-gradient-to-br from-gray-50/80 to-sky-100/40 backdrop-blur-sm border
                                             border-sky-200/50 shadow p-4 rounded-lg flex items-start gap-3 
                                             hover:border-sky-300 hover:from-gray-100/90 hover:to-sky-100/70 transition-all duration-200">
                                            <div className="w-fit mt-1">
                                                <img src="/avatar.png" alt="" className="max-h-8 max-w-8 md:max-w-10 md:max-h-10" />
                                            </div>
                                            <div className="w-fit flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="text-lg md:text-xl text-gray-800 font-semibold">
                                                        {isSender ? request.receiverName : request.senderName}
                                                    </h4>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                                                        {request.status}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2 items-center justify-start mb-3">
                                                    <img src="/clock.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                                    <span className="text-xs md:text-sm text-gray-800/70">
                                                        Completed: {request.completedAt ? formatDate(request.completedAt) : formatDate(request.createdAt)}
                                                    </span>
                                                </div>
                                                <div className="flex gap-3 items-center justify-start py-1">
                                                    <span className="text-[13px] text-gray-600 font-semibold md:text-sm">
                                                        {isSender ? "You offered: " : "They offered: "}
                                                    </span>
                                                    <span className="text-xs rounded-xl bg-red-100 text-red-600 px-3 md:text-sm">{request.offeredSkillName}</span>
                                                </div>
                                                <div className="flex gap-3 items-center justify-start md:py-1">
                                                    <span className="text-[13px] text-gray-600 font-semibold md:text-sm">
                                                        {isSender ? "You wanted: " : "They wanted: "}
                                                    </span>
                                                    <span className="text-xs rounded-xl bg-blue-100 text-blue-600 px-3 md:text-sm">{request.requestedSkillName}</span>
                                                </div>
                                                <div className="flex gap-2 items-center justify-start mt-3">
                                                    <img src="/mail.png" alt="" className="max-w-3 max-h-3 md:max-w-5 md:max-h-5" />
                                                    <span className="text-xs md:text-sm text-gray-800/70">
                                                        Email: {isSender ? request.receiverEmail : request.senderEmail}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}

                </div>
            </section>


        </>
    );
}