'use client'

import { useState, useEffect, type ReactNode } from "react";

interface SkillInputProps {
    id: string
    styleInput?: ReactNode
    stylebutton?: ReactNode
    onSkillsChange?: (skills: string[]) => void
}

export default function SkillsInput({ id, styleInput, stylebutton, onSkillsChange }: SkillInputProps) {
    const [skills, setSkills] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

   
    useEffect(() => {
        onSkillsChange?.(skills);
    }, [skills, onSkillsChange]);

    const addSkill = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setSkills(prev => [...prev, trimmed]);
        setInputValue("");
    };

    const removeSkill = (index: number) => {
        setSkills(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div id={id}>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Add a skill"
                    className={`w-full text-slate-900 bg-slate-100 focus:bg-transparent py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all ${styleInput || "pl-4 pr-10 text-sm"}`}
                />
                <button
                    onClick={addSkill}
                    type="button"
                    className={`${id === 'skillsLearn' ? 'bg-violet-600 hover:bg-violet-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-lg ${stylebutton || "px-4 py-3"}`}
                >
                    +
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-1 bg-sky-200 text-gray-700 px-3 rounded-full text-sm md:text-base"
                    >
                        <span>{skill}</span>
                        <button
                            onClick={() => removeSkill(index)}
                            type="button"
                            className="text-gray-600 hover:text-red-500 font-bold"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
