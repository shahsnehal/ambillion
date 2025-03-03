import { Icon } from '@iconify/react';
import { CustomLoader } from 'common/loaders/loader';
import { ROUTES, userDocumentTypes } from 'constants/common';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from 'reduxSaga/config/store';
import { fetchUserDetailsRequest } from 'reduxSaga/modules/user-module/action/actions';
import { UserDocument } from 'reduxSaga/modules/userDocuments-module/type/types';
import { UserDocumentsWrapper } from 'utils/common';
import { getUserStatusClass } from 'utils/table/columns';

export const UserDetails: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, selectedUserDetails } = useSelector((state: RootState) => state.userModule);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserDetailsRequest(userId));
        }
    }, []);

    const mappedDocuments: UserDocument[] =
        selectedUserDetails?.documents?.map((doc) => ({
            documentType: doc.filetype,
            documentName: doc.document_name,
            documentData: doc.contentpath || '',
            auditTimestamp: doc.audit_timestamp || new Date().toISOString()
        })) || [];

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
            ) : selectedUserDetails ? (
                <div className="container mt-5 mb-4">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            {selectedUserDetails && (
                                <>
                                    <div className="border rounded p-4 shadow-sm">
                                        <div className="row">
                                            <div className="col-md-6 text-center">
                                                <div className="mb-3">
                                                    <img
                                                        src={
                                                            selectedUserDetails?.user?.profile_image
                                                        }
                                                        alt="Profile"
                                                        className="rounded-circle"
                                                        width="120"
                                                    />
                                                </div>
                                                <h5>
                                                    {selectedUserDetails?.user?.first_name}{' '}
                                                    {selectedUserDetails?.user?.last_name}
                                                </h5>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="user_detail mb-3 border-bottom pb-2">
                                                    <strong className="user_detail_lable">
                                                        Company Name :
                                                    </strong>
                                                    <span className="user_detail">
                                                        {selectedUserDetails?.user?.company_name}
                                                    </span>
                                                </div>
                                                <div className="user_detail mb-3 border-bottom pb-2">
                                                    <strong className="user_detail_lable">
                                                        Email :
                                                    </strong>
                                                    <span className="user_detail">
                                                        {selectedUserDetails?.user?.email}
                                                    </span>
                                                </div>
                                                <div className="user_detail mb-3 border-bottom pb-2">
                                                    <strong className="user_detail_lable">
                                                        Mobile :
                                                    </strong>
                                                    <span className="user_detail">
                                                        {selectedUserDetails?.user?.mobile_number}
                                                    </span>
                                                </div>
                                                <div className="user_detail mb-3 border-bottom pb-2">
                                                    <strong className="user_detail_lable">
                                                        Status :
                                                    </strong>
                                                    <span
                                                        className={`badge ${getUserStatusClass(selectedUserDetails?.user?.status)} rounded fw-semibold p-2`}
                                                    >
                                                        {selectedUserDetails?.user?.status}
                                                    </span>
                                                </div>
                                                <div className="user_detail mb-3 border-bottom pb-2">
                                                    <strong className="user_detail_lable">
                                                        Role :
                                                    </strong>
                                                    <span className="user_detail">
                                                        {selectedUserDetails?.user?.role_name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container mt-3">
                                        <div className="row">
                                            <div className="border rounded p-4 shadow-sm">
                                                <h4>Documents :-</h4>
                                                <div className="row mt-4 border-bottom border-3">
                                                    <div className="col-md-6">
                                                        <strong>
                                                            {userDocumentTypes.PAN_CARD} :
                                                        </strong>
                                                        <div className="mt-2">
                                                            {mappedDocuments?.length > 0 &&
                                                            mappedDocuments.some(
                                                                (doc) =>
                                                                    doc.documentType ===
                                                                    userDocumentTypes.PAN_CARD
                                                            ) ? (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            userDocumentTypes.PAN_CARD
                                                                    )}
                                                                />
                                                            ) : (
                                                                <div className="text-danger">
                                                                    <p>
                                                                        {
                                                                            userDocumentTypes.DOCUMENT_NOT_AVAILABLE
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>
                                                            {userDocumentTypes.GST_COPY} :
                                                        </strong>
                                                        <div className="mt-2">
                                                            {mappedDocuments?.length > 0 &&
                                                            mappedDocuments.some(
                                                                (doc) =>
                                                                    doc.documentType ===
                                                                    userDocumentTypes.GST_COPY
                                                            ) ? (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            userDocumentTypes.GST_COPY
                                                                    )}
                                                                />
                                                            ) : (
                                                                <div className="text-danger">
                                                                    <p>
                                                                        {
                                                                            userDocumentTypes.DOCUMENT_NOT_AVAILABLE
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4 border-bottom border-3">
                                                    <div className="col-md-6">
                                                        <strong>
                                                            {userDocumentTypes.BANK_AD_CODE} :
                                                        </strong>
                                                        <div className="mt-2">
                                                            {mappedDocuments?.length > 0 &&
                                                            mappedDocuments.some(
                                                                (doc) =>
                                                                    doc.documentType ===
                                                                    userDocumentTypes.BANK_AD_CODE
                                                            ) ? (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            userDocumentTypes.BANK_AD_CODE
                                                                    )}
                                                                />
                                                            ) : (
                                                                <div className="text-danger">
                                                                    <p>
                                                                        {
                                                                            userDocumentTypes.DOCUMENT_NOT_AVAILABLE
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>{userDocumentTypes.IEC} :</strong>
                                                        <div className="mt-2">
                                                            {mappedDocuments?.length > 0 &&
                                                            mappedDocuments.some(
                                                                (doc) =>
                                                                    doc.documentType ===
                                                                    userDocumentTypes.IEC
                                                            ) ? (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            userDocumentTypes.IEC
                                                                    )}
                                                                />
                                                            ) : (
                                                                <div className="text-danger">
                                                                    <p>
                                                                        {
                                                                            userDocumentTypes.DOCUMENT_NOT_AVAILABLE
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4 border-bottom border-3">
                                                    <div className="col-md-6">
                                                        <strong>
                                                            {userDocumentTypes.KYC_DOCUMENTS} :
                                                        </strong>
                                                        <div className="mt-2">
                                                            {mappedDocuments?.length > 0 &&
                                                            mappedDocuments.some(
                                                                (doc) =>
                                                                    doc.documentType ===
                                                                    userDocumentTypes.KYC_DOCUMENTS
                                                            ) ? (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            userDocumentTypes.KYC_DOCUMENTS
                                                                    )}
                                                                />
                                                            ) : (
                                                                <div className="text-danger">
                                                                    <p>
                                                                        {
                                                                            userDocumentTypes.DOCUMENT_NOT_AVAILABLE
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>
                                                            {userDocumentTypes.KYC_FORMAT} :
                                                        </strong>
                                                        <div className="mt-2">
                                                            {mappedDocuments?.length > 0 &&
                                                            mappedDocuments.some(
                                                                (doc) =>
                                                                    doc.documentType ===
                                                                    userDocumentTypes.KYC_FORMAT
                                                            ) ? (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            userDocumentTypes.KYC_FORMAT
                                                                    )}
                                                                />
                                                            ) : (
                                                                <div className="text-danger">
                                                                    <p>
                                                                        {
                                                                            userDocumentTypes.DOCUMENT_NOT_AVAILABLE
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container mt-3 mb-4">
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-rounded btn-secondary w-auto"
                                                onClick={() => navigate(ROUTES.USERS)}
                                            >
                                                <Icon
                                                    icon="icon-park-outline:back"
                                                    className="me-1"
                                                />
                                                Back
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <div className="container my-4">
                            <h5>User Details Not Available.</h5>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
