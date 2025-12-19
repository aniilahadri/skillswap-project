import { NextRequest, NextResponse } from "next/server";
import { validateAdminSession } from "@/utils/adminAuth";
import { prisma } from "@/lib/prisma";
import { Role } from "@/lib/prisma/enums";

export async function GET(request: NextRequest) {
    try {
        const validation = await validateAdminSession();
        if (!validation.isValid) {
            return validation.response;
        }

        const [users, students, skills, requests, reports, contacts] = await Promise.all([
            prisma.user.findMany({
                select: {
                    user_ID: true,
                    fullName: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    city: true,
                    country: true
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.student.findMany({
                include: {
                    user: {
                        select: {
                            user_ID: true,
                            fullName: true,
                            email: true,
                            city: true,
                            country: true,
                            createdAt: true
                        }
                    }
                },
                orderBy: { user: { createdAt: 'desc' } }
            }),
            prisma.skill.findMany({
                select: {
                    skill_ID: true,
                    name: true,
                    category: true
                },
                orderBy: { name: 'asc' }
            }),
            prisma.request.findMany({
                include: {
                    sender: {
                        include: { user: { select: { fullName: true } } }
                    },
                    receiver: {
                        include: { user: { select: { fullName: true } } }
                    },
                    requestedSkill: {
                        include: { skill: { select: { name: true } } }
                    },
                    offeredSkill: {
                        include: { skill: { select: { name: true } } }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.report.findMany({
                include: {
                    reporter: {
                        include: { user: { select: { fullName: true } } }
                    },
                    reportedUser: {
                        include: { user: { select: { fullName: true } } }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.contact.findMany({
                orderBy: { createdAt: 'desc' }
            })
        ]);

        const formattedUsers = users.map(user => ({
            id: user.user_ID,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            city: user.city,
            country: user.country,
            createdAt: user.createdAt
        }));

        const formattedStudents = students.map(student => ({
            id: student.student_ID,
            fullName: student.user.fullName,
            email: student.user.email,
            city: student.user.city,
            country: student.user.country,
            experienceLevel: student.experienceLevel,
            availability: student.availability,
            skillsCompleted: student.skillsCompleted,
            createdAt: student.user.createdAt
        }));

        const formattedSkills = skills.map(skill => ({
            id: skill.skill_ID,
            name: skill.name,
            category: skill.category
        }));

        const formattedRequests = requests.map(request => ({
            id: request.request_ID,
            senderName: request.sender.user.fullName,
            receiverName: request.receiver.user.fullName,
            requestedSkillName: request.requestedSkill.skill.name,
            offeredSkillName: request.offeredSkill.skill.name,
            status: request.status,
            createdAt: request.createdAt
        }));

        const formattedReports = reports.map(report => ({
            id: report.report_ID,
            reporterName: report.reporter.user.fullName,
            reportedUserName: report.reportedUser.user.fullName,
            reason: report.reason,
            adminNotes: report.adminNotes,
            createdAt: report.createdAt
        }));

        const formattedContacts = contacts.map(contact => ({
            id: contact.contact_ID,
            name: contact.name,
            email: contact.email,
            message: contact.message,
            createdAt: contact.createdAt
        }));

        return NextResponse.json({
            success: true,
            statistics: {
                totalUsers: users.length,
                totalStudents: students.length,
                totalAdmins: users.filter(u => u.role === Role.ADMIN).length,
                totalSkills: skills.length,
                totalRequests: requests.length,
                pendingRequests: requests.filter(r => r.status === 'PENDING').length,
                completedRequests: requests.filter(r => r.status === 'COMPLETED').length,
                totalReports: reports.length,
                totalContacts: contacts.length
            },
            users: formattedUsers,
            students: formattedStudents,
            skills: formattedSkills,
            requests: formattedRequests,
            reports: formattedReports,
            contacts: formattedContacts
        }, { status: 200 });

    } catch (error: any) {
        console.error("Dashboard API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}
