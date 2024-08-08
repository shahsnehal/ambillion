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

export const ProductDetails: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE) || {};
    const { role_name: userRole } = userProfile || null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedProductDetails, isLoading } = useSelector(
        (state: RootState) => state.productModule
    );
    useEffect(() => {
        if (productId) {
            dispatch(getProductDetailsRequest(productId));
        }
    }, []);

    const SendForVerification = (productId: string) => {
        dispatch(updateProductStatusRequest(productId, productStatus.UNDER_VERIFICATION, ''));
        navigate(ROUTES.PRODUCTS);
    };
    const SendForApproval = (productId: string) => {
        dispatch(updateProductStatusRequest(productId, productStatus.UNDER_EXPORT_APPROVAL, ''));
        navigate(ROUTES.PRODUCTS);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const getRoleBasedStatus = () => {
        if (userRole === userRoles.ADMIN) {
            return productStatus.INFO_NEEDED;
        } else if (userRole === userRoles.OFFICER) {
            return productStatus.EXPORT_INFO_NEEDED;
        } else {
            return selectedProductDetails?.status;
        }
    };
    const handleSendForMoreInfo = (productId: string, comments: string) => {
        const updatedStatus = getRoleBasedStatus() || '';
        dispatch(updateProductStatusRequest(productId, updatedStatus, comments));
        navigate(ROUTES.PRODUCTS);
    };

    const handleVerify = () => {
        const updatedStatus =
            userRole === userRoles.ADMIN ? productStatus.VERIFIED : productStatus.APPROVED;
        dispatch(
            updateProductStatusRequest(
                String(selectedProductDetails?.product_id),
                updatedStatus,
                ''
            )
        );
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
                                    <p className="mb-3">
                                        {selectedProductDetails?.customer_product_description}
                                    </p>
                                    <div className="d-flex align-items-center gap-8">
                                        <h6 className="mb-0 fs-4">Features:</h6>
                                        {selectedProductDetails?.product_feature}
                                    </div>
                                    {selectedProductDetails?.product_custom_fields &&
                                        selectedProductDetails?.product_custom_fields.FieldName &&
                                        selectedProductDetails?.product_custom_fields
                                            .FieldValue && (
                                            <div className="d-flex align-items-center gap-8 mt-2">
                                                <h6 className="mb-0 fs-4">
                                                    {
                                                        selectedProductDetails
                                                            ?.product_custom_fields.FieldName
                                                    }
                                                    :
                                                </h6>

                                                {
                                                    selectedProductDetails?.product_custom_fields
                                                        .FieldValue
                                                }
                                            </div>
                                        )}
                                </div>
                                <hr className="mt-4"></hr>
                                <div className="mt-1">
                                    <h6 className="fw-semibold mb-0 text-dark mb-3">Documents</h6>
                                    <ViewDocuments
                                        documents={selectedProductDetails?.productDocuments || null}
                                    />
                                </div>
                                <hr className="mt-4"></hr>
                                <div className="mt-1">
                                    <h6 className="fw-semibold mb-0 text-dark mb-3">
                                        Notes History
                                    </h6>
                                    <NoteList notesList={selectedProductDetails?.notes || null} />
                                </div>
                                <div className="d-flex justify-content-end  mt-3">
                                    {userRole === userRoles.OFFICER && (
                                        <>
                                            <button
                                                className="btn btn-rounded btn-info d-flex align-items-center ms-2"
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
                                            <button
                                                className="btn btn-rounded btn-success d-flex align-items-center ms-2"
                                                disabled={
                                                    selectedProductDetails?.status !==
                                                    productStatus.UNDER_EXPORT_APPROVAL
                                                }
                                                onClick={() => {
                                                    setIsConfirmModal(true);
                                                }}
                                            >
                                                <Icon
                                                    icon="pepicons-pop:checkmark-circle"
                                                    className="me-1"
                                                />
                                                Approved
                                            </button>
                                        </>
                                    )}
                                    {userRole === userRoles.ADMIN && (
                                        <>
                                            <button
                                                className="btn btn-rounded btn-info d-flex align-items-center ms-2"
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
                                            <button
                                                className="btn btn-rounded btn-success d-flex align-items-center ms-2"
                                                disabled={
                                                    selectedProductDetails?.status !==
                                                    productStatus.UNDER_VERIFICATION
                                                }
                                                onClick={() => {
                                                    setIsConfirmModal(true);
                                                }}
                                            >
                                                <Icon
                                                    icon="pepicons-pop:checkmark-circle"
                                                    className="me-1"
                                                />
                                                Verify
                                            </button>
                                        </>
                                    )}
                                    {userRole === userRoles.MANUFACTURER && (
                                        <>
                                            <button
                                                className="btn  btn-rounded btn-primary d-flex align-items-center"
                                                disabled={
                                                    selectedProductDetails?.status !==
                                                        productStatus.PENDING &&
                                                    selectedProductDetails?.status !==
                                                        productStatus.INFO_NEEDED
                                                }
                                                onClick={() =>
                                                    SendForVerification(
                                                        String(selectedProductDetails?.product_id)
                                                    )
                                                }
                                            >
                                                <Icon
                                                    icon="icon-park-outline:send"
                                                    className="me-1"
                                                />
                                                Send For Verification
                                            </button>
                                            <button
                                                className="btn  btn-rounded btn-primary d-flex align-items-center ms-2"
                                                disabled={
                                                    selectedProductDetails?.status !==
                                                        productStatus.VERIFIED &&
                                                    selectedProductDetails?.status !==
                                                        productStatus.EXPORT_INFO_NEEDED
                                                }
                                                onClick={() =>
                                                    SendForApproval(
                                                        String(selectedProductDetails?.product_id)
                                                    )
                                                }
                                            >
                                                <Icon
                                                    icon="icon-park-outline:send"
                                                    className="me-1"
                                                />
                                                Send For Approval
                                            </button>
                                        </>
                                    )}
                                    <button
                                        className="btn  btn-rounded btn-secondary d-flex align-items-center ms-2"
                                        onClick={() => navigate(ROUTES.PRODUCTS)}
                                    >
                                        <Icon icon="icon-park-outline:back" className="me-1" />
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ProductStatusModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                productId={String(selectedProductDetails?.product_id)}
                onConfirm={handleSendForMoreInfo}
            />
            <ConfirmationModal
                isOpen={isConfirmModal}
                onClose={() => {
                    setIsConfirmModal(false);
                }}
                onConfirm={handleVerify}
                title={
                    userRole === userRoles.ADMIN
                        ? 'Verification Confirmation'
                        : 'Approve Confirmation'
                }
                content={`Are you sure you want to ${userRole === userRoles.ADMIN ? 'Verify' : 'Approve'} ?`}
                confirmLabel={userRole === userRoles.ADMIN ? 'Verify' : 'Approve'}
                confirmBtnClassName="btn btn-rounded btn-success"
                isLoading={false}
                actionInProgressLabel="loading"
            />
        </>
    );
};
