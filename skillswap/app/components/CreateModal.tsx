'use client';

import { useState } from 'react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'user' | 'skill' | 'request';
}

export default function CreateModal({ isOpen, onClose, type }: CreateModalProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            let endpoint = '';

            if (type === 'user') {
                endpoint = `/api/admin/users`;
            } else if (type === 'skill') {
                endpoint = `/api/admin/skills`;
            } else if (type === 'request') {
                endpoint = `/api/admin/requests`;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                router.refresh();
                onClose();
                setFormData({});
            } else {
                alert(result.error || 'Failed to create');
            }
        } catch (error) {
            console.error('Create error:', error);
            alert('Failed to create');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} size="medium">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Create {type.charAt(0).toUpperCase() + type.slice(1)}</h2>

                {type === 'user' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input
                                type="text"
                                value={formData.fullName || ''}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                value={formData.email || ''}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                            <input
                                type="password"
                                value={formData.password || ''}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                            <input
                                type="text"
                                value={formData.city || ''}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                            <input
                                type="text"
                                value={formData.country || ''}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio *</label>
                            <textarea
                                value={formData.bio || ''}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                            <select
                                value={formData.role || 'STUDENT'}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="STUDENT">Student</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        {formData.role === 'STUDENT' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
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
                            </>
                        )}
                    </div>
                )}

                {type === 'skill' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name *</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input
                                type="text"
                                value={formData.category || ''}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Optional"
                            />
                        </div>
                    </div>
                )}

                {type === 'request' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sender ID (Student ID) *</label>
                            <input
                                type="text"
                                value={formData.senderId || ''}
                                onChange={(e) => setFormData({ ...formData, senderId: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Student ID who is sending"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Receiver ID (Student ID) *</label>
                            <input
                                type="text"
                                value={formData.receiverId || ''}
                                onChange={(e) => setFormData({ ...formData, receiverId: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Student ID who is receiving"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Requested Skill Name *</label>
                            <input
                                type="text"
                                value={formData.requestedSkillName || ''}
                                onChange={(e) => setFormData({ ...formData, requestedSkillName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Offered Skill Name *</label>
                            <input
                                type="text"
                                value={formData.offeredSkillName || ''}
                                onChange={(e) => setFormData({ ...formData, offeredSkillName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        {isSaving ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

