'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'user' | 'student' | 'skill' | 'request' | 'report';
    data: any;
}

export default function EditModal({ isOpen, onClose, type, data }: EditModalProps) {
    const router = useRouter();
    const [formData, setFormData] = useState(data || {});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen && data) {
            setFormData(data);
        }
    }, [isOpen, data]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const id = data.id || data.request_ID || data.report_ID;
            const endpoint = `/api/admin/${type}s/${id}`;
            const method = type === 'request' ? 'PATCH' : 'PUT';

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                router.refresh();
                onClose();
            } else {
                alert(result.error || 'Failed to update');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} size="medium">
            <div className="p-4 text-left">
                <h2 className="text-xl font-bold mb-4 text-left">Edit {type.charAt(0).toUpperCase() + type.slice(1)}</h2>

                {type === 'user' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Full Name</label>
                            <input
                                type="text"
                                value={formData.fullName || ''}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Email</label>
                            <input
                                type="email"
                                value={formData.email || ''}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">City</label>
                            <input
                                type="text"
                                value={formData.city || ''}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Country</label>
                            <input
                                type="text"
                                value={formData.country || ''}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Role</label>
                            <select
                                value={formData.role || 'STUDENT'}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="STUDENT">Student</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                    </div>
                )}

                {type === 'student' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Full Name</label>
                            <input
                                type="text"
                                value={formData.fullName || ''}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">City</label>
                            <input
                                type="text"
                                value={formData.city || ''}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Country</label>
                            <input
                                type="text"
                                value={formData.country || ''}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Experience Level</label>
                            <select
                                value={formData.experienceLevel || 'BEGINNER'}
                                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="BEGINNER">Beginner</option>
                                <option value="INTERMEDIATE">Intermediate</option>
                                <option value="ADVANCED">Advanced</option>
                                <option value="EXPERT">Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Availability</label>
                            <select
                                value={formData.availability || 'Morning'}
                                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Skills Completed</label>
                            <input
                                type="number"
                                value={formData.skillsCompleted || 0}
                                onChange={(e) => setFormData({ ...formData, skillsCompleted: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                )}

                {type === 'skill' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Skill Name</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Category</label>
                            <input
                                type="text"
                                value={formData.category || ''}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter category (optional)"
                            />
                        </div>
                    </div>
                )}

                {type === 'request' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Status</label>
                            <select
                                value={formData.status || 'PENDING'}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="PENDING">Pending</option>
                                <option value="ACCEPTED">Accepted</option>
                                <option value="REJECTED">Rejected</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>
                    </div>
                )}

                {type === 'report' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Reason</label>
                            <input
                                type="text"
                                value={formData.reason || ''}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Admin Notes</label>
                            <textarea
                                value={formData.adminNotes || ''}
                                onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                placeholder="Add admin notes here..."
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

