import React, { useState, useEffect } from 'react';
import { productStatus } from 'constants/common';

type ProductStatusModalProps = {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    currentStatus: string;
    onConfirm: (productId: number, newStatus: string, comments: string) => void;
};

type ProductStatusKeys = keyof typeof productStatus;

export const ProductStatusModal: React.FC<ProductStatusModalProps> = ({
    isOpen,
    onClose,
    productId,
    currentStatus,
    onConfirm
}) => {
    const [newStatus, setNewStatus] = useState<string>(currentStatus);
    const [comments, setComments] = useState<string>('');

    useEffect(() => {
        setNewStatus(currentStatus);
    }, [currentStatus]);

    const handleConfirm = () => {
        onConfirm(productId, newStatus, comments);
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
                            <h5 className="modal-title">Change Product Status</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    className="form-select"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                >
                                    {Object.keys(productStatus).map((status) => (
                                        <option
                                            key={status}
                                            value={productStatus[status as ProductStatusKeys]}
                                        >
                                            {status.charAt(0) + status.slice(1).toLowerCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="comments" className="form-label">
                                    Comments
                                </label>
                                <textarea
                                    id="comments"
                                    className="form-control"
                                    rows={3}
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};
