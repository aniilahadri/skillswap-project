'use client';

import { useState } from 'react';
import CreateModal from './CreateModal';

interface CreateButtonProps {
    type: 'user' | 'skill' | 'request';
}

export default function CreateButton({ type }: CreateButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
                + Create {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
            <CreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={type}
            />
        </>
    );
}

