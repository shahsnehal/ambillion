import { CustomLoader } from 'common/loaders/loader';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from 'reduxSaga/config/store';
import {
    getProductDetailsRequest,
    updateProductStatusRequest
} from 'reduxSaga/modules/product-module/action/actions';
import { localStorageKey, productStatus, ROUTES, userRoles } from 'constants/common';
import { getProductStatusClass } from 'utils/table/columns';
import { Icon } from '@iconify/react';
import { ProductStatusModal } from './productStatusModal';
import { getLocalStorage } from 'utils/localStorage';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
import NoteList from 'common/notes/noteList';
import ViewDocuments from 'components/documents/viewDocuments';
import { ProductCustomField } from 'reduxSaga/modules/product-module/type/types';
import { getProductCustomeFields } from 'utils/common';

/**
 * Component for displaying and managing product details.
 *
 * @returns {JSX.Element} The rendered ProductDetails component.
 */
export const ProductDetails: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [modalConfig, setModalConfig] = useState<{
        title: string;
        content: string;
        confirmLabel: string;
    }>({
        title: '',
        content: '',
        confirmLabel: ''
    });
    const [actionType, setActionType] = useState<keyof typeof productStatus | null>(null);
    const [currentProductId, setCurrentProductId] = useState<string | null>(null);
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE) || {};
    const { role_name: userRole } = userProfile || null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedProductDetails, isLoading } = useSelector(
        (state: RootState) => state.productModule
    );

    /**
     * Extracts product custom fields from the selected product details.
     *
     * @type {ProductCustomField[]}
     */
    const productProperties: ProductCustomField[] = getProductCustomeFields(
        selectedProductDetails?.product_custom_fields
    );
    useEffect(() => {
        if (productId) {
            dispatch(getProductDetailsRequest(productId));
        }
    }, []);

    /**
     * Handles the action button click, setting up the modal configuration
     * based on the action type.
     *
     * @param {string} productId - The ID of the product.
     * @param {keyof typeof productStatus | null} action - The action type to be performed.
     */
    const handleAction = (productId: string, action: keyof typeof productStatus | null) => {
        const config = {
            [productStatus.VERIFIED]: {
                title: 'Verification Confirmation',
                content: 'Are you sure you want to verify this product?',
                confirmLabel: 'Verify'
            },
            [productStatus.APPROVED]: {
                title: 'Approve Confirmation',
                content: 'Are you sure you want to approve this product?',
                confirmLabel: 'Approve'
            },
            [productStatus.UNDER_EXPORT_APPROVAL]: {
                title: 'Confirm Sending for Approval',
                content: 'Are you sure you want to send for approval?',
                confirmLabel: 'Yes'
            }
        };

        if (action && action in config) {
            setModalConfig(config[action as keyof typeof config]);
            setActionType(action);
            setCurrentProductId(productId);
            setIsConfirmModalOpen(true);
        }
    };

    /**
     * Handles the confirmation of the action and dispatches the status update request.
     */
    const handleConfirmAction = () => {
        if (currentProductId && actionType) {
            dispatch(updateProductStatusRequest(currentProductId, actionType, '', ''));
            navigate(ROUTES.PRODUCTS);
            setIsConfirmModalOpen(false);
        }
    };

    /**
     * Closes the modal.
     */
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    /**
     * Determines the role-based status for the product based on the user's role
     * and the current product status.
     *
     * @returns {string} The status to be assigned based on the user's role.
     */
    const getRoleBasedStatus = () => {
        if (userRole === userRoles.ADMIN) {
            if (
                selectedProductDetails?.status === productStatus.VERIFIED ||
                selectedProductDetails?.status === productStatus.EXPORT_INFO_NEEDED
            ) {
                return productStatus.UNDER_EXPORT_APPROVAL;
            } else {
                return productStatus.INFO_NEEDED;
            }
        } else if (userRole === userRoles.OFFICER) {
            return productStatus.EXPORT_INFO_NEEDED;
        } else if (userRole === userRoles.MANUFACTURER) {
            return productStatus.UNDER_VERIFICATION;
        } else {
            return selectedProductDetails?.status;
        }
    };

    /**
     * Gets the comment for the product based on the updated status.
     *
     * @param {string} updatedStatus - The updated status of the product.
     * @returns {string} The role to be assigned comments.
     */
    const getCommentFor = (updatedStatus: string) => {
        if (
            updatedStatus === productStatus.UNDER_VERIFICATION ||
            updatedStatus === productStatus.INFO_NEEDED
        ) {
            return userRoles.MANUFACTURER;
        } else if (
            updatedStatus === productStatus.UNDER_EXPORT_APPROVAL ||
            updatedStatus === productStatus.EXPORT_INFO_NEEDED
        ) {
            return userRoles.OFFICER;
        } else {
            return '';
        }
    };

    /**
     * Sends the product for more information, dispatches the status update request,
     * and navigates back to the products list.
     *
     * @param {string} productId - The ID of the product.
     * @param {string} comments - Comments to be added for the status update.
     */
    const handleSendForMoreInfo = (productId: string, comments: string) => {
        const updatedStatus = getRoleBasedStatus() ?? '';
        const commentFor = getCommentFor(updatedStatus);
        dispatch(updateProductStatusRequest(productId, updatedStatus, comments, commentFor));
        navigate(ROUTES.PRODUCTS);
    };

    return (
        <>
            {isLoading ? (
                <div className="card">
                    <div className="card-body">
                        <div className="container my-4">
                            <CustomLoader />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <div className="container my-4">
                            <div className="row">
                                <div className="shop-content">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span
                                            className={`badge ${getProductStatusClass(selectedProductDetails?.status ?? '')} fs-2 fw-semibold`}
                                        >
                                            {selectedProductDetails?.status}
                                        </span>
                                        <span>
                                            <span>
                                                <Icon icon="bi:bookmark" className="text-primary" />
                                            </span>
                                            {selectedProductDetails?.category_name}
                                        </span>
                                    </div>
                                    <h4>{selectedProductDetails?.product_displayname}</h4>
                                    <div className="d-flex align-items-center gap-8 mb-3">
                                        <h6 className="mb-0 fs-4">HSN Code:</h6>
                                        {selectedProductDetails?.origin_hsn_code}
                                    </div>
                                    <div className="d-flex align-items-center gap-8 mb-3">
                                        <h6 className="mb-0 fs-4">Product Description:</h6>
                                        {selectedProductDetails?.customer_product_description}
                                    </div>
                                    <div className="d-flex align-items-center gap-8">
                                        <h6 className="mb-0 fs-4">Features:</h6>
                                        {selectedProductDetails?.product_feature}
                                    </div>
                                    {selectedProductDetails?.product_custom_fields && (
                                        <div className="d-flex flex-column gap-2 mt-2">
                                            {productProperties.length > 0 && (
                                                <div className="d-flex flex-column gap-2 mt-2">
                                                    {productProperties.map(
                                                        (productProperties, index) => (
                                                            <div
                                                                key={`${productProperties.FieldName}-${index}`}
                                                                className="d-flex align-items-center gap-8"
                                                            >
                                                                <h6 className="mb-0 fs-4">
                                                                    {productProperties.FieldName}:
                                                                </h6>
                                                                <span>
                                                                    {productProperties.FieldValue}
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <hr className="mt-4"></hr>
                                <div className="mt-1">
                                    <h6 className="fw-semibold mb-0 text-dark mb-3">Documents</h6>
                                    <ViewDocuments
                                        documents={
                                            selectedProductDetails?.product_documents || null
                                        }
                                    />
                                </div>
                                <hr className="mt-4"></hr>
                                <div className="mt-1">
                                    <h6 className="fw-semibold mb-0 text-dark mb-3">
                                        Notes History
                                    </h6>
                                    <NoteList notesList={selectedProductDetails?.notes || null} />
                                </div>
                                <div className="row justify-content-center justify-content-lg-end">
                                    <div className="col-12 col-md-4 col-lg-auto mb-2 mb-md-0">
                                        <button
                                            className="btn btn-rounded btn-secondary w-100 d-flex align-items-center justify-content-center"
                                            onClick={() => navigate(ROUTES.PRODUCTS)}
                                        >
                                            <Icon icon="icon-park-outline:back" className="me-1" />
                                            Back
                                        </button>
                                    </div>
                                    {/* For The Officer Role */}
                                    {userRole === userRoles.OFFICER && (
                                        <>
                                            <div className="col-12 col-md-4 col-lg-auto mb-2 mb-md-0">
                                                <button
                                                    className="btn btn-info w-100 d-flex align-items-center justify-content-center"
                                                    disabled={
                                                        selectedProductDetails?.status !==
                                                        productStatus.UNDER_EXPORT_APPROVAL
                                                    }
                                                    onClick={() => setIsModalOpen(true)}
                                                >
                                                    <Icon
                                                        icon="icon-park-outline:info"
                                                        className="me-1"
                                                    />
                                                    Ask For More Info
                                                </button>
                                            </div>
                                            <div className="col-12 col-md-4 col-lg-auto mb-2 mb-md-0">
                                                <button
                                                    className="btn btn-rounded btn-success w-100 d-flex align-items-center justify-content-center"
                                                    disabled={
                                                        selectedProductDetails?.status !==
                                                        productStatus.UNDER_EXPORT_APPROVAL
                                                    }
                                                    onClick={() =>
                                                        handleAction(
                                                            String(
                                                                selectedProductDetails?.product_id
                                                            ),
                                                            productStatus.APPROVED
                                                        )
                                                    }
                                                >
                                                    <Icon
                                                        icon="pepicons-pop:checkmark-circle"
                                                        className="me-1"
                                                    />
                                                    Mark Approve
                                                </button>
                                            </div>
                                        </>
                                    )}
                                    {/* For The Admin Role */}
                                    {userRole === userRoles.ADMIN && (
                                        <>
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-2 mb-md-0">
                                                <button
                                                    className="btn btn-rounded btn-info w-100 d-flex align-items-center justify-content-center"
                                                    disabled={
                                                        selectedProductDetails?.status !==
                                                        productStatus.UNDER_VERIFICATION
                                                    }
                                                    onClick={() => setIsModalOpen(true)}
                                                >
                                                    <Icon
                                                        icon="icon-park-outline:info"
                                                        className="me-1"
                                                    />
                                                    Ask For More Info
                                                </button>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-2 mb-md-0">
                                                <button
                                                    className="btn btn-rounded btn-success w-100 d-flex align-items-center justify-content-center"
                                                    disabled={
                                                        selectedProductDetails?.status !==
                                                        productStatus.UNDER_VERIFICATION
                                                    }
                                                    onClick={() =>
                                                        handleAction(
                                                            String(
                                                                selectedProductDetails?.product_id
                                                            ),
                                                            productStatus.VERIFIED
                                                        )
                                                    }
                                                >
                                                    <Icon
                                                        icon="pepicons-pop:checkmark-circle"
                                                        className="me-1"
                                                    />
                                                    Mark Verify
                                                </button>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-2 mt-md-3 mt-lg-0">
                                                <button
                                                    className="btn btn-rounded btn-primary w-100 d-flex align-items-center justify-content-center"
                                                    disabled={
                                                        selectedProductDetails?.status !==
                                                            productStatus.VERIFIED &&
                                                        selectedProductDetails?.status !==
                                                            productStatus.EXPORT_INFO_NEEDED
                                                    }
                                                    onClick={() => setIsModalOpen(true)}
                                                >
                                                    <Icon
                                                        icon="icon-park-outline:send"
                                                        className="me-1"
                                                    />
                                                    Send For Approval
                                                </button>
                                            </div>
                                        </>
                                    )}
                                    {/* For The Manufacture Role */}
                                    {userRole === userRoles.MANUFACTURER && (
                                        <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-2">
                                            <button
                                                className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                                                disabled={
                                                    selectedProductDetails?.status !==
                                                        productStatus.PENDING &&
                                                    selectedProductDetails?.status !==
                                                        productStatus.INFO_NEEDED
                                                }
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                <Icon
                                                    icon="icon-park-outline:send"
                                                    className="me-1"
                                                />
                                                Send For Verification
                                            </button>
                                        </div>
                                    )}
                                    {/* For The Admin & Manufacture Role */}
                                    {(userRole === userRoles.MANUFACTURER ||
                                        userRole === userRoles.ADMIN) && (
                                        <div
                                            className={`col-12 col-sm-6 col-md-4 col-lg-auto ${
                                                userRole === userRoles.MANUFACTURER
                                                    ? ''
                                                    : 'mt-md-3 mt-lg-0'
                                            }`}
                                        >
                                            <button
                                                disabled={
                                                    // Common disable conditions for both roles
                                                    (selectedProductDetails?.status !==
                                                        productStatus.PENDING &&
                                                        selectedProductDetails?.status !==
                                                            productStatus.INFO_NEEDED &&
                                                        selectedProductDetails?.status !==
                                                            productStatus.EXPORT_INFO_NEEDED &&
                                                        selectedProductDetails?.status !==
                                                            productStatus.VERIFIED) ||
                                                    // Specific disable conditions for the manufacturer
                                                    (userRole === userRoles.MANUFACTURER &&
                                                        selectedProductDetails?.status !==
                                                            productStatus.PENDING &&
                                                        selectedProductDetails?.status !==
                                                            productStatus.INFO_NEEDED) ||
                                                    // Specific disable conditions for the admin
                                                    (userRole === userRoles.ADMIN &&
                                                        selectedProductDetails?.status !==
                                                            productStatus.EXPORT_INFO_NEEDED &&
                                                        selectedProductDetails?.status !==
                                                            productStatus.VERIFIED)
                                                }
                                                className="btn btn-rounded btn-warning w-100 d-flex align-items-center justify-content-center"
                                                onClick={() =>
                                                    navigate(
                                                        `${ROUTES.PRODUCTS}/editProduct/${productId}`
                                                    )
                                                }
                                            >
                                                <Icon icon="mdi:pencil" className="me-1" />
                                                Edit Product
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <ProductStatusModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    productId={String(selectedProductDetails?.product_id)}
                    onConfirm={handleSendForMoreInfo}
                    title={
                        userRole === userRoles.MANUFACTURER
                            ? 'Additional Comments'
                            : 'Request Additional Information'
                    }
                />
            )}
            {isConfirmModalOpen && (
                <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={handleConfirmAction}
                    title={modalConfig.title}
                    content={modalConfig.content}
                    confirmLabel={modalConfig.confirmLabel}
                    confirmBtnClassName="btn btn-rounded btn-success ms-2"
                    isLoading={false}
                    actionInProgressLabel="loading"
                    confirmIcon="pepicons-pop:checkmark-circle"
                    closeBtnClassName="btn btn-rounded btn-secondary ms-2"
                />
            )}
        </>
    );
};