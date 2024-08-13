import { Icon } from '@iconify/react';
import React, { useState } from 'react';
type ProductStatusModalProps = {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    onConfirm: (productId: string, comment: string) => void;
};

export const ProductStatusModal: React.FC<ProductStatusModalProps> = ({
    isOpen,
    onClose,
    productId,
    onConfirm
}) => {
    const [comments, setComments] = useState<string>('');
    const isSendDisabled = comments.trim().length === 0;
    const handleConfirm = () => {
        onConfirm(productId, comments);
        onClose();
    };

    if (!isOpen) return null;

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
                            <h5 className="modal-title">Request Additional Information</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="comment" className="form-label">
                                    Comments
                                </label>
                                <textarea
                                    id="comment"
                                    className="form-control"
                                    rows={3}
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary btn-rounded ms-2"
                                onClick={onClose}
                            >
                                <Icon icon="carbon:close-outline" className="fs-5 me-1" />
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary btn-rounded ms-2"
                                onClick={handleConfirm}
                                disabled={isSendDisabled}
                            >
                                <Icon icon="icon-park-outline:send" className="fs-5 me-1" />
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};
