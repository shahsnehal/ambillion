import React from 'react';

type AddProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <div
                className={`modal fade ${isOpen ? 'show' : ''}`}
                tabIndex={-1}
                aria-hidden={!isOpen}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-lg">
                    {' '}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductModalLabel">
                                Add Product
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Form will go here...</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-muted"
                                data-bs-dismiss="modal"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};
