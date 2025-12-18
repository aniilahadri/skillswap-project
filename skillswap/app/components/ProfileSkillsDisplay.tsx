'use client'

interface ProfileSkillsDisplayProps {
    skills: string[];
    onDelete: (skill: string) => void;
    type: 'offered' | 'wanted';
}

export default function ProfileSkillsDisplay({ skills, onDelete, type }: ProfileSkillsDisplayProps) {
    if (skills.length === 0) {
        return (
            <div className="text-gray-500 text-sm mt-2">No {type === 'offered' ? 'offered' : 'wanted'} skills yet</div>
        );
    }

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {skills.map((skill, index) => (
                <div
                    key={index}
                    className="flex items-center gap-1 bg-sky-200 text-gray-700 px-3 rounded-full text-sm md:text-base"
                >
                    <span>{skill}</span>
                    <button
                        onClick={() => onDelete(skill)}
                        type="button"
                        className="text-gray-600 hover:text-red-500 font-bold"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}

