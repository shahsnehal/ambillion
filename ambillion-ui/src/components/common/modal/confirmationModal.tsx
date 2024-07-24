import React, { useState, useEffect } from 'react';

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
    title?: string;
    content?: React.ReactNode;
    closeLabel?: string;
    confirmLabel?: string;
    closeBtnClassName?: string;
    confirmBtnClassName?: string;
    actionInProgressLabel?: string;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
    title = 'Confirmation',
    content = 'Are you sure?',
    closeLabel = 'Close',
    confirmLabel = 'Confirm',
    closeBtnClassName = 'btn btn-muted',
    confirmBtnClassName = 'btn btn-danger',
    actionInProgressLabel = 'Performing Action...'
}) => {
    const [isPerformingAction, setIsPerformingAction] = useState<boolean>(false);

    useEffect(() => {
        if (isPerformingAction) {
            setTimeout(() => {
                onConfirm();
                onClose();
                setIsPerformingAction(false);
            }, 1000);
        }
    }, [isPerformingAction]);

    const handleConfirmClick = () => {
        setIsPerformingAction(true);
    };

    return (
        <>
            <div
                className={`modal fade ${isOpen ? 'show' : ''}`}
                tabIndex={-1}
                aria-hidden={!isOpen}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmationModalLabel">
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose}
                                disabled={isPerformingAction}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {typeof content === 'string' ? <p>{content}</p> : content}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className={closeBtnClassName}
                                data-bs-dismiss="modal"
                                onClick={onClose}
                                disabled={isPerformingAction}
                            >
                                {closeLabel}
                            </button>
                            <button
                                type="button"
                                className={confirmBtnClassName}
                                onClick={handleConfirmClick}
                                disabled={isLoading || isPerformingAction}
                            >
                                {isPerformingAction ? actionInProgressLabel : confirmLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};
