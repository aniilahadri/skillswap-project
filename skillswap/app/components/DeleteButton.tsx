'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
    id: string;
    type: 'user' | 'student' | 'skill' | 'request' | 'report' | 'favorite' | 'contact';
    onSuccess?: () => void;
}

export default function DeleteButton({ id, type, onSuccess }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete this ${type}?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const endpoint = type === 'favorite' ? 'favorites' : type === 'contact' ? 'contacts' : `${type}s`;
            const response = await fetch(`/api/admin/${endpoint}/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.refresh();
                }
            } else {
                alert(data.error || 'Failed to delete');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}

