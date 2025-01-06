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
import { ProductCustomField, ImportStatus } from 'reduxSaga/modules/product-module/type/types';
import { getProductCustomeFields } from 'utils/common';

/**
 * Component for displaying and managing product details.
 *
 * @returns {JSX.Element} The rendered ProductDetails component.
 */
export const ProductDetails: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
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
     * Parses the `importStatus` string into an array of `ImportStatus` objects.
     * The `importStatus` string is expected to be a JSON-encoded string representing
     * an array of import status objects.
     *
     * @param {string} importStatus - A JSON-encoded string representing the import status.
     *
     * @returns {ImportStatus[]} An array of `ImportStatus` objects.
     *
     * @throws {SyntaxError} If the `importStatus` string cannot be parsed, an empty array is returned.
     */
    const parseImportStatus = (importStatus: string): ImportStatus[] => {
        if (!importStatus) return [];

        try {
            const statusArray: ImportStatus[] = JSON.parse(`[${importStatus}]`);
            return statusArray;
        } catch (error) {
            return [];
        }
    };

    /**
     * Maps the parsed import status data to a more readable format for the UI.
     * Each item in the array is transformed into an object containing the `country`
     * name and the `productStatus` for that import status.
     *
     * @type {Array<{ country: string, productStatus: string }>}
     */
    const mappedImportStatusArray = parseImportStatus(
        selectedProductDetails?.import_status || ''
    ).map((statusItem: ImportStatus) => ({
        country: statusItem.country_name,
        productStatus: statusItem.import_status
    }));

    /**
     * Navigates to the product import status page for a specific product and country.
     * This function is called when the user clicks to view the import status for a product
     * in a specific country.
     *
     * @param {string | number} productId - The ID of the product to view the import status for.
     * @param {string | number} countryId - The ID of the country to view the import status in.
     */
    const handleView = (productId: number | string, countryId: number | string) => {
        navigate(`/products/${productId}/import-status/${countryId}`);
    };

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
            [productStatus.EXPORT_APPROVED]: {
                title: 'Approve Confirmation',
                content: 'Are you sure you want to approve this product?',
                confirmLabel: 'Approve'
            },
            [productStatus.UNDER_EXPORT_APPROVAL]: {
                title: 'Confirm Sending for Approval',
                content: 'Are you sure you want to send for approval?',
                confirmLabel: 'Yes'
            },
            [productStatus.IMPORT_APPROVED]: {
                title: 'Import Approve Confirmation',
                content: 'Are you sure you want to approve this product For Import?',
                confirmLabel: 'Import Approve'
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

    const handleOpenModal = (action: string) => {
        if (action === 'sendForImportApproval') {
            setShowCountryDropdown(true); // Show dropdown for "Send For Import Approval" action
        } else {
            setShowCountryDropdown(false); // Do not show dropdown for other actions
        }
        setIsModalOpen(true);
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
            } else if (
                selectedProductDetails?.status === productStatus.EXPORT_APPROVED ||
                selectedProductDetails?.import_status === productStatus.IMPORT_INFO_NEEDED
            ) {
                return productStatus.UNDER_IMPORT_APPROVAL;
            } else {
                return productStatus.INFO_NEEDED;
            }
        } else if (userRole === userRoles.EXPORT_OFFICER) {
            return productStatus.EXPORT_INFO_NEEDED;
        } else if (userRole === userRoles.MANUFACTURER) {
            if (
                selectedProductDetails?.status === productStatus.EXPORT_APPROVED ||
                selectedProductDetails?.import_status === productStatus.IMPORT_INFO_NEEDED
            ) {
                return productStatus.UNDER_IMPORT_APPROVAL;
            } else {
                return productStatus.UNDER_VERIFICATION;
            }
        } else if (userRole === userRoles.IMPORT_OFFICER) {
            return productStatus.IMPORT_INFO_NEEDED;
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
            return userRoles.EXPORT_OFFICER;
        } else if (
            updatedStatus === productStatus.UNDER_IMPORT_APPROVAL ||
            updatedStatus === productStatus.IMPORT_INFO_NEEDED
        ) {
            return userRoles.IMPORT_OFFICER;
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
    const handleSendForMoreInfo = (productId: string, comments: string, countryId?: string) => {
        const updatedStatus = getRoleBasedStatus() ?? '';
        const commentFor = getCommentFor(updatedStatus);
        dispatch(
            updateProductStatusRequest(productId, updatedStatus, comments, commentFor, countryId)
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
            ) : selectedProductDetails ? (
                <div className="card">
                    <div className="card-body">
                        <div className="container my-4">
                            <div className="row">
                                <div className="shop-content">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        {userRole === userRoles.IMPORT_OFFICER ? (
                                            <span
                                                className={`badge ${getProductStatusClass(selectedProductDetails?.import_status ?? '')} fs-2 fw-semibold`}
                                            >
                                                {selectedProductDetails?.import_status}
                                            </span>
                                        ) : (
                                            <span
                                                className={`badge ${getProductStatusClass(selectedProductDetails?.status ?? '')} fs-2 fw-semibold`}
                                            >
                                                {selectedProductDetails?.status}
                                            </span>
                                        )}

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
                                {(userRole === userRoles.ADMIN ||
                                    userRole === userRoles.MANUFACTURER) &&
                                    selectedProductDetails?.import_status &&
                                    (() => {
                                        const importStatusArray = parseImportStatus(
                                            selectedProductDetails.import_status
                                        );

                                        return (
                                            importStatusArray.length > 0 && (
                                                <div className="mt-2">
                                                    <hr />
                                                    <h6 className="fs-4">Import Status:</h6>
                                                    <div className="table-responsive">
                                                        {' '}
                                                        {/* Added responsive wrapper */}
                                                        <table className="table table-bordered mt-3">
                                                            <thead>
                                                                <tr>
                                                                    <th>Country Name</th>
                                                                    <th>Product Import Status</th>
                                                                    {userRole ===
                                                                        userRoles.ADMIN && (
                                                                        <th>View</th>
                                                                    )}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {importStatusArray.map(
                                                                    (
                                                                        statusItem: ImportStatus,
                                                                        index: number
                                                                    ) => (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                {
                                                                                    statusItem.country_name
                                                                                }
                                                                            </td>
                                                                            <td
                                                                                className={`badge ${getProductStatusClass(statusItem.import_status ?? '')} fs-2 fw-semibold p-2 m-3`}
                                                                            >
                                                                                {
                                                                                    statusItem.import_status
                                                                                }
                                                                            </td>
                                                                            {userRole ===
                                                                                userRoles.ADMIN && (
                                                                                <td className="d-sm-table-cell">
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            handleView(
                                                                                                selectedProductDetails?.product_id ??
                                                                                                    '',
                                                                                                statusItem.country_id
                                                                                            )
                                                                                        }
                                                                                        className="btn btn-warning btn-rounded d-flex align-items-center ms-2 justify-content-center p-2"
                                                                                        data-toggle="tooltip"
                                                                                        data-placement="left"
                                                                                        title="View"
                                                                                    >
                                                                                        <Icon
                                                                                            icon="solar:eye-outline"
                                                                                            className="fs-5"
                                                                                        />
                                                                                    </button>
                                                                                </td>
                                                                            )}
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )
                                        );
                                    })()}

                                <hr className="mt-4"></hr>
                                <div className="mt-1">
                                    <h6 className="fw-semibold mb-0 text-dark mb-3">
                                        Notes History
                                    </h6>
                                    <NoteList notesList={selectedProductDetails?.notes || null} />
                                </div>
                                <div className="row justify-content-center justify-content-md-end">
                                    <div
                                        className={`col-12 ${userRole === userRoles.ADMIN ? (selectedProductDetails?.status === productStatus.INFO_NEEDED || selectedProductDetails?.status === productStatus.UNDER_EXPORT_APPROVAL ? 'col-12 col-md-auto' : 'col-12 col-md-4 col-lg-4') : 'col-md-3 col-lg-auto'}  mb-2`}
                                    >
                                        <button
                                            className="btn btn-rounded btn-secondary w-100 d-flex align-items-center justify-content-center"
                                            onClick={() => navigate(ROUTES.PRODUCTS)}
                                        >
                                            <Icon icon="icon-park-outline:back" className="me-1" />
                                            Back
                                        </button>
                                    </div>

                                    {/* For The EXPORT_Officer Role */}
                                    {userRole === userRoles.EXPORT_OFFICER &&
                                        selectedProductDetails?.status ===
                                            productStatus.UNDER_EXPORT_APPROVAL && (
                                            <>
                                                <div className="col-12 col-md-4 col-lg-auto mb-2 mb-md-0">
                                                    <button
                                                        className="btn btn-info w-100 d-flex align-items-center justify-content-center"
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
                                                        onClick={() =>
                                                            handleAction(
                                                                String(
                                                                    selectedProductDetails?.product_id
                                                                ),
                                                                productStatus.EXPORT_APPROVED
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
                                    {/* For The IMPORT_Officer Role */}
                                    {userRole === userRoles.IMPORT_OFFICER &&
                                        selectedProductDetails?.import_status ===
                                            productStatus.UNDER_IMPORT_APPROVAL && (
                                            <>
                                                <div className="col-12 col-md-4 col-lg-auto mb-2 mb-md-0">
                                                    <button
                                                        className="btn btn-info w-100 d-flex align-items-center justify-content-center"
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
                                                        onClick={() =>
                                                            handleAction(
                                                                String(
                                                                    selectedProductDetails?.product_id
                                                                ),
                                                                productStatus.IMPORT_APPROVED
                                                            )
                                                        }
                                                    >
                                                        <Icon
                                                            icon="pepicons-pop:checkmark-circle"
                                                            className="me-1"
                                                        />
                                                        Mark Import Approve
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    {/* For The Admin Role */}
                                    {userRole === userRoles.ADMIN && (
                                        <>
                                            {selectedProductDetails?.status ===
                                                productStatus.UNDER_VERIFICATION && (
                                                <>
                                                    {/* Ask For More Info Button */}
                                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-2">
                                                        <button
                                                            className="btn btn-rounded btn-info w-100 d-flex align-items-center justify-content-center"
                                                            onClick={() => setIsModalOpen(true)}
                                                        >
                                                            <Icon
                                                                icon="icon-park-outline:info"
                                                                className="me-1"
                                                            />
                                                            Ask For More Info
                                                        </button>
                                                    </div>
                                                    {/* Mark Verify Button */}
                                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-2">
                                                        <button
                                                            className="btn btn-rounded btn-success w-100 d-flex align-items-center justify-content-center"
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
                                                </>
                                            )}
                                            {/* Send For Export Approval Button */}
                                            {(selectedProductDetails?.status ===
                                                productStatus.VERIFIED ||
                                                selectedProductDetails?.status ===
                                                    productStatus.EXPORT_INFO_NEEDED) && (
                                                <div className="col-12 col-sm-6 col-md-5 col-lg-4 mb-2">
                                                    <button
                                                        className="btn btn-rounded btn-primary w-100 d-flex align-items-center justify-content-center"
                                                        onClick={() => setIsModalOpen(true)}
                                                    >
                                                        <Icon
                                                            icon="icon-park-outline:send"
                                                            className="me-1"
                                                        />
                                                        Send For Export Approval
                                                    </button>
                                                </div>
                                            )}
                                            {/* Send For Import Approval Button */}
                                            {!(
                                                selectedProductDetails?.status ===
                                                    productStatus.PENDING ||
                                                selectedProductDetails?.status ===
                                                    productStatus.UNDER_VERIFICATION ||
                                                selectedProductDetails?.status ===
                                                    productStatus.VERIFIED ||
                                                selectedProductDetails?.status ===
                                                    productStatus.INFO_NEEDED ||
                                                selectedProductDetails?.status ===
                                                    productStatus.SENT_FOR_EXPORT_APPROVAL ||
                                                selectedProductDetails?.status ===
                                                    productStatus.UNDER_EXPORT_APPROVAL ||
                                                selectedProductDetails?.status ===
                                                    productStatus.EXPORT_INFO_NEEDED
                                            ) && (
                                                <div
                                                    className={
                                                        'col-12 col-sm-6 col-md-5 col-lg-4 mb-2 '
                                                    }
                                                >
                                                    <button
                                                        className="btn btn-rounded btn-primary w-100 d-flex align-items-center justify-content-center"
                                                        onClick={() =>
                                                            handleOpenModal('sendForImportApproval')
                                                        }
                                                    >
                                                        <Icon
                                                            icon="icon-park-outline:send"
                                                            className="me-1"
                                                        />
                                                        Send For Import Approval
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {/* For The Manufacture Role */}
                                    {userRole === userRoles.MANUFACTURER &&
                                        (selectedProductDetails?.status === productStatus.PENDING ||
                                        selectedProductDetails?.status ===
                                            productStatus.INFO_NEEDED ? (
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-2">
                                                <button
                                                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                                                    onClick={() => setIsModalOpen(true)}
                                                >
                                                    <Icon
                                                        icon="icon-park-outline:send"
                                                        className="me-1"
                                                    />
                                                    Send For Verification
                                                </button>
                                            </div>
                                        ) : null)}
                                    {/* For The Admin & Manufacture Role */}
                                    {(userRole === userRoles.MANUFACTURER ||
                                        userRole === userRoles.ADMIN) && (
                                        <>
                                            <div
                                                className={`
                                                        ${
                                                            userRole === userRoles.MANUFACTURER
                                                                ? selectedProductDetails?.status ===
                                                                      productStatus.PENDING ||
                                                                  selectedProductDetails?.status ===
                                                                      productStatus.INFO_NEEDED
                                                                    ? 'col-12 col-sm-6 col-md-3 col-lg-auto mb-2'
                                                                    : ''
                                                                : selectedProductDetails?.status ===
                                                                        productStatus.INFO_NEEDED ||
                                                                    selectedProductDetails?.status ===
                                                                        productStatus.UNDER_EXPORT_APPROVAL
                                                                  ? ''
                                                                  : 'col-12 col-sm-6 col-md-3 col-lg-4'
                                                        }
                                                    `}
                                            >
                                                {/* Conditional rendering based on user role and status */}
                                                {userRole === userRoles.MANUFACTURER
                                                    ? // Manufacturer's condition for rendering the button
                                                      (selectedProductDetails?.status ===
                                                          productStatus.PENDING ||
                                                          selectedProductDetails?.status ===
                                                              productStatus.INFO_NEEDED) && (
                                                          <button
                                                              className="btn btn-rounded btn-warning w-100 d-flex align-items-center justify-content-center"
                                                              onClick={() =>
                                                                  navigate(
                                                                      `${ROUTES.PRODUCTS}/editProduct/${productId}`
                                                                  )
                                                              }
                                                          >
                                                              <Icon
                                                                  icon="mdi:pencil"
                                                                  className="me-1"
                                                              />
                                                              Edit Product
                                                          </button>
                                                      )
                                                    : // Admin's condition for rendering the button
                                                      (selectedProductDetails?.status ===
                                                          productStatus.EXPORT_INFO_NEEDED ||
                                                          selectedProductDetails?.status ===
                                                              productStatus.VERIFIED ||
                                                          selectedProductDetails?.status ===
                                                              productStatus.EXPORT_APPROVED) && (
                                                          <button
                                                              className="btn btn-rounded btn-warning w-100 d-flex align-items-center justify-content-center"
                                                              onClick={() =>
                                                                  navigate(
                                                                      `${ROUTES.PRODUCTS}/editProduct/${productId}`
                                                                  )
                                                              }
                                                          >
                                                              <Icon
                                                                  icon="mdi:pencil"
                                                                  className="me-1"
                                                              />
                                                              Edit Product
                                                          </button>
                                                      )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <div className="container my-4">
                            <h5>Product Details Not Available.</h5>
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
                    showCountryDropdown={showCountryDropdown}
                    importStatusArray={mappedImportStatusArray}
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
