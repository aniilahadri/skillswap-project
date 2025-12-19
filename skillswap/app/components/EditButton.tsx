'use client';

import { useState } from 'react';
import EditModal from './EditModal';

interface EditButtonProps {
    type: 'user' | 'student' | 'skill' | 'request' | 'report';
    data: any;
}

export default function EditButton({ type, data }: EditButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
            >
                Edit
            </button>
            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={type}
                data={data}
            />
        </>
    );
}

