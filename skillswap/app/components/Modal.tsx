import type { ReactNode } from "react";


interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
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
                    <div className="w-80 md:w-full max-w-md rounded-lg bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
                        {props.children}
                    </div>
                </div >
            )
            }
        </>
    );
}


