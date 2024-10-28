import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { trimValues } from 'utils/common';
import { localStorageKey } from 'constants/common';
import { getLocalStorage } from 'utils/localStorage';
import { CountryType } from 'reduxSaga/modules/country-module/type/types';

type ProductStatusModalProps = {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    onConfirm: (productId: string, comment: string, countryId?: string) => void;
    title: string;
    showCountryDropdown?: boolean;
};

/**
 * Modal component for confirming product status updates with comments.
 * It accepts the product ID and a comment, and allows the user to confirm or cancel the action.
 *
 * @param {ProductStatusModalProps} props - The properties for the modal component.
 * @returns {JSX.Element | null} - The rendered modal or null if the modal is not open.
 */
export const ProductStatusModal: React.FC<ProductStatusModalProps> = ({
    isOpen,
    onClose,
    productId,
    onConfirm,
    title,
    showCountryDropdown = false
}) => {
    const [comments, setComments] = useState<string>('');
    const [selectedCountryId, setSelectedCountryId] = useState<string>('');
    const countries = getLocalStorage(localStorageKey.COUNTRIES);

    /**
     * Handles confirmation by trimming comments and passing them to the onConfirm function,
     * then closes the modal.
     */
    const handleConfirm = () => {
        const trimmedComments = trimValues(comments);
        onConfirm(productId, trimmedComments, showCountryDropdown ? selectedCountryId : undefined);
        onClose();
    };

    // Early return if the modal is not open
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
                            <h5 className="modal-title">{title}</h5>
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

                            {showCountryDropdown && (
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">
                                        Select Country for Import Approval
                                    </label>
                                    <span className="text-danger"> * </span>
                                    <select
                                        id="country"
                                        className="form-control"
                                        value={selectedCountryId}
                                        onChange={(e) => setSelectedCountryId(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            -- Select a country --
                                        </option>
                                        {countries
                                            .filter(
                                                (country: CountryType) =>
                                                    country.country_name !== 'India'
                                            )
                                            ?.map((country: CountryType) => (
                                                <option
                                                    key={country.country_id}
                                                    value={country.country_id}
                                                >
                                                    {country.country_name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}
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
                                disabled={showCountryDropdown && !selectedCountryId}
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
