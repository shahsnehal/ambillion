import { Icon } from '@iconify/react';
import React from 'react';

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
    confirmIcon?: string;
    closeIcon?: string;
};

/**
 * A confirmation modal component that prompts the user for confirmation
 * before performing an action. Displays a title, content, and buttons to confirm or cancel the action.
 *
 * @param {ConfirmationModalProps} props - The component props.
 * @returns {JSX.Element} The rendered ConfirmationModal component.
 *
 * @example
 * <ConfirmationModal
 *     isOpen={isOpen}
 *     onClose={handleClose}
 *     onConfirm={handleConfirm}
 *     title="Delete Item"
 *     content="Are you sure you want to delete this item?"
 *     closeLabel="Cancel"
 *     confirmLabel="Delete"
 * />
 */

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
    title = 'Confirmation',
    content = 'Are you sure?',
    closeLabel = 'Cancel',
    confirmLabel = 'Confirm',
    closeBtnClassName = 'btn btn-danger',
    confirmBtnClassName = 'btn btn-danger',
    actionInProgressLabel = 'Performing Action...',
    confirmIcon = 'solar:trash-bin-minimalistic-outline',
    closeIcon = 'carbon:close-outline'
}) => {
    /**
     * Handles the confirm button click by calling the onConfirm function
     * and then closing the modal.
     */
    const handleConfirmClick = () => {
        onConfirm();
        onClose();
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            >
                                <Icon icon={closeIcon} className="fs-5 me-1" />
                                {closeLabel}
                            </button>
                            <button
                                type="button"
                                className={confirmBtnClassName}
                                onClick={handleConfirmClick}
                                disabled={isLoading}
                            >
                                <Icon icon={confirmIcon} className="fs-5 me-1" />
                                {isLoading ? actionInProgressLabel : confirmLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};
