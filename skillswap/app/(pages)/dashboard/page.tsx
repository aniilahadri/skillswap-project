import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/nextAuth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import DeleteButton from "@/app/components/DeleteButton";
import EditButton from "@/app/components/EditButton";
import CreateButton from "@/app/components/CreateButton";

async function getDashboardData() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        redirect('/signin');
    }

    if (session.user.role !== "ADMIN") {
        redirect('/');
    }

    const headersList = await headers();
    const cookie = headersList.get('cookie') || '';

    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/admin/dashboard`, {
        cache: "no-store",
        headers: {
            cookie
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return response.json();
}

function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getStatusBadgeColor(status: string): string {
    switch (status) {
        case 'PENDING':
            return 'bg-yellow-100 text-yellow-800';
        case 'ACCEPTED':
            return 'bg-green-100 text-green-800';
        case 'REJECTED':
            return 'bg-red-100 text-red-800';
        case 'COMPLETED':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

export default async function DashboardPage() {
    let dashboardData;
    try {
        dashboardData = await getDashboardData();
    } catch (error) {
        redirect('/');
    }

    const { statistics, users, students, skills, requests, reports, contacts } = dashboardData;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
                    {/* Users Card */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium opacity-90">Total Users</h3>
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold">{statistics.totalUsers}</p>
                    </div>

                    {/* Students Card */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium opacity-90">Students</h3>
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold">{statistics.totalStudents}</p>
                    </div>

                    {/* Admins Card */}
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium opacity-90">Admins</h3>
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold">{statistics.totalAdmins}</p>
                    </div>

                    {/* Skills Card */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium opacity-90">Skills</h3>
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold">{statistics.totalSkills}</p>
                    </div>

                    {/* Requests Card */}
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium opacity-90">Requests</h3>
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold">{statistics.totalRequests}</p>
                        <p className="text-xs mt-1 opacity-90">
                            {statistics.pendingRequests} pending, {statistics.completedRequests} completed
                        </p>
                    </div>

                    {/* Reports Card */}
                    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium opacity-90">Reports</h3>
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold">{statistics.totalReports}</p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <h2 className="text-lg font-semibold text-gray-700">User Management</h2>
                        </div>
                        <CreateButton type="user" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Photo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Created</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{user.id.slice(0, 8)}...</td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">{user.fullName.charAt(0)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center sm:hidden mr-3">
                                                    <span className="text-gray-600 font-medium text-sm">{user.fullName.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                                    <div className="text-sm text-gray-500 lg:hidden">{user.email}</div>
                                                    <div className="md:hidden mt-1">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{formatDate(user.createdAt)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <EditButton type="user" data={user} />
                                                <DeleteButton type="user" id={user.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h2 className="text-lg font-semibold text-gray-700">Students</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Experience</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Skills Completed</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.slice(0, 5).map((student: any) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                                            <div className="text-sm text-gray-500 lg:hidden">{student.city}, {student.country}</div>
                                            <div className="text-sm text-gray-500 md:hidden mt-1">Level: {student.experienceLevel}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{student.city}, {student.country}</td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {student.experienceLevel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell font-medium">{student.skillsCompleted}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <EditButton type="student" data={student} />
                                                <DeleteButton type="student" id={student.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {students.length > 5 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center">
                                            <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                View All {students.length} Students →
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h2 className="text-lg font-semibold text-gray-700">Recent Requests</h2>
                        </div>
                        <CreateButton type="request" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Receiver</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Skills</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {requests.slice(0, 5).map((request: any) => (
                                    <tr key={request.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{request.senderName}</div>
                                            <div className="text-sm text-gray-500 md:hidden">{request.receiverName}</div>
                                            <div className="text-sm text-gray-500 lg:hidden mt-1">
                                                {request.requestedSkillName} ↔ {request.offeredSkillName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{request.receiverName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                            <div className="text-xs">
                                                <span className="font-medium">Requested:</span> {request.requestedSkillName}
                                            </div>
                                            <div className="text-xs mt-1">
                                                <span className="font-medium">Offered:</span> {request.offeredSkillName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(request.status)}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <EditButton type="request" data={request} />
                                                <DeleteButton type="request" id={request.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {requests.length > 5 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center">
                                            <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                View All {requests.length} Requests →
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Skills Table */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <h2 className="text-lg font-semibold text-gray-700">Skills</h2>
                        </div>
                        <CreateButton type="skill" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {skills.slice(0, 5).map((skill: any) => (
                                    <tr key={skill.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{skill.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{skill.category || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <EditButton type="skill" data={skill} />
                                                <DeleteButton type="skill" id={skill.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {skills.length > 5 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center">
                                            <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                View All {skills.length} Skills →
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reports Table */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                        <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h2 className="text-lg font-semibold text-gray-700">Reports</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Reported User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Reason</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reports.slice(0, 5).map((report: any) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{report.reporterName}</div>
                                            <div className="text-sm text-gray-500 md:hidden">{report.reportedUserName}</div>
                                            <div className="text-sm text-gray-500 lg:hidden mt-1 truncate max-w-xs">{report.reason}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{report.reportedUserName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell max-w-xs truncate">{report.reason}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(report.createdAt)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <EditButton type="report" data={report} />
                                                <DeleteButton type="report" id={report.id.toString()} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {reports.length > 5 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center">
                                            <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                View All {reports.length} Reports →
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Contacts Table */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h2 className="text-lg font-semibold text-gray-700">Contact Forms</h2>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Message</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Created</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contacts && contacts.length > 0 ? contacts.map((contact: any) => (
                                    <tr key={contact.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                            <div className="text-sm text-gray-500 lg:hidden">{contact.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{contact.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                                            <div className="max-w-xs truncate">{contact.message}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{formatDate(contact.createdAt)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <DeleteButton type="contact" id={contact.id.toString()} />
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No contact forms found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

