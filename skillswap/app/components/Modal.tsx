import type { ReactNode } from "react";


interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    size?: 'small' | 'medium' | 'large';
}

export default function Modal(props: ModalType) {
    return (
        <>
            {props.isOpen && (
                <div
                    id="middle-center-modal"
                    className="fixed inset-0 z-50 flex justify-center items-center h-screen bg-black/70 p-4"
                    role="dialog"
                    onClick={props.toggle}
                >
                    <div className={`rounded-lg bg-white p-4 md:p-6 shadow-lg ${props.size === 'large'
                            ? 'w-full max-w-[95vw] md:max-w-3xl'
                            : props.size === 'medium'
                                ? 'w-full max-w-[90vw] md:max-w-xl'
                                : 'w-[90vw] md:w-full max-w-md'
                        }`} onClick={(e) => e.stopPropagation()}>
                        {props.children}
                    </div>
                </div >
            )
            }
        </>
    );
}


