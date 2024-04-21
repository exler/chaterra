import { useRef } from "react";

interface ModalProps {
    modalTitle?: string;
    actionButtonLabel?: string;
    onActionButtonClick?: () => void;
    triggerContent: React.ReactNode; // This is the content of the button that triggers the modal
    children: React.ReactNode;
}

export default function Modal({
    modalTitle,
    actionButtonLabel,
    onActionButtonClick,
    triggerContent,
    children
}: ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        modalRef.current?.showModal();
    };

    const closeModal = () => {
        modalRef.current?.close();
    };

    const handleActionButton = () => {
        if (onActionButtonClick) {
            onActionButtonClick();
        }
        closeModal();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            closeModal();
        }
    };

    return (
        <>
            <button type="button" onClick={openModal}>
                {triggerContent}
            </button>

            <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
                <div className="modal-box">
                    {modalTitle && <h3 className="font-bold text-lg mb-2">{modalTitle}</h3>}
                    {children}
                    <div className="modal-action">
                        <button className="btn" onClick={closeModal}>
                            Close
                        </button>
                        {actionButtonLabel && (
                            <button className="btn btn-primary" onClick={handleActionButton}>
                                {actionButtonLabel}
                            </button>
                        )}
                    </div>
                </div>
            </dialog>
        </>
    );
}
