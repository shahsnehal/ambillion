/* eslint-disable prefer-destructuring */
import { Icon } from '@iconify/react';
import { CustomLoader } from 'common/loaders/loader';
import { localStorageKey, USER_DOCUMENT_TYPES, userRoles } from 'constants/common';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reduxSaga/config/store';
import {
    addUserDocumentRequest,
    fetchUserDocumentsRequest,
    updateUserDocumentRequest
} from 'reduxSaga/modules/userDocuments-module/action/actions';
import { UserDocument } from 'reduxSaga/modules/userDocuments-module/type/types';
import { UserDocumentsWrapper } from 'utils/common';
import { getLocalStorage } from 'utils/localStorage';

/**
 * UserProfile Component - Handles the user profile and document management.
 */
export const UserProfile = () => {
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE);
    const { userprofile_id: userId, role_name: userRole } = userProfile;

    const dispatch = useDispatch();
    const { isLoading, userDocuments } = useSelector(
        (state: RootState) => state.userDocumentsModule
    );

    // Initialize document state to hold file names
    const [documents, setDocuments] = useState<{ [key: string]: string | null }>({
        [USER_DOCUMENT_TYPES.PAN_CARD]: null,
        [USER_DOCUMENT_TYPES.GST_COPY]: null,
        [USER_DOCUMENT_TYPES.BANK_AD_CODE]: null,
        [USER_DOCUMENT_TYPES.IEC]: null,
        [USER_DOCUMENT_TYPES.KYC_DOCUMENTS]: null,
        [USER_DOCUMENT_TYPES.KYC_FORMAT]: null
    });

    /**
     * Fetches user documents when the component mounts.
     */
    useEffect(() => {
        if (userId && userRole === userRoles.MANUFACTURER) {
            dispatch(fetchUserDocumentsRequest(userId));
        }
    }, []);

    /**
     * Updates the document state when user documents are fetched.
     */
    useEffect(() => {
        if (userDocuments && userDocuments.length > 0) {
            // Map the userDocuments and set the document names
            const updatedDocuments = { ...documents };

            userDocuments.forEach((doc) => {
                if (doc.filetype in updatedDocuments) {
                    updatedDocuments[doc.filetype] = doc.document_name;
                }
            });

            setDocuments(updatedDocuments);
        }
    }, [userDocuments]);

    /**
     * Processes a file and converts it into Base64 format.
     * @param file - The file to be processed.
     * @param docType - The type of document being processed.
     * @returns A promise with the base64 string data.
     */
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const processFile = async (file: File, docType: string): Promise<{ base64Data: string }> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader(); // FileReader API to read files

            reader.onloadend = () => {
                const base64String = reader.result as string;

                const cleanedBase64Data = removeDataUriPrefix(base64String);

                resolve({ base64Data: cleanedBase64Data });
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    /**
     * Removes the Data URI prefix from Base64 string.
     * @param dataUri - The full Base64 data URI.
     * @returns The Base64 data without the URI prefix.
     */
    const removeDataUriPrefix = (dataUri: string): string => {
        const base64String = dataUri.split(',')[1]; // Split at the comma and get the second part
        return base64String || ''; // Return the Base64 data without the prefix
    };

    /**
     * Handles file uploads by reading and processing the file.
     * Dispatches an action to update the user document in the store.
     * @param e - The file input change event.
     * @param documentType - The type of document being uploaded.
     */
    const handleFileUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        documentType: string
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileName = file.name;

            // Update the state with the new file name
            setDocuments((prev) => {
                const updatedDocuments = { ...prev };
                updatedDocuments[documentType] = fileName;
                return updatedDocuments;
            });

            const existingDocument = userDocuments?.find((doc) => doc.filetype === documentType);

            try {
                // Process the uploaded file
                const processedFile = await processFile(file, documentType);

                const document: UserDocument = {
                    documentType: documentType,
                    documentName: file.name,
                    documentData: processedFile.base64Data
                };

                // Check if the document exists and update or add the document accordingly
                if (existingDocument) {
                    const updatedDocument = {
                        documentType: document.documentType,
                        documentName: document.documentName,
                        documentData: document.documentData
                    };
                    await dispatch(
                        updateUserDocumentRequest(existingDocument.userdocument_id, updatedDocument)
                    );
                } else {
                    await dispatch(addUserDocumentRequest(document));
                }
            } catch (error) {
                // Reset document state in case of an error
                setDocuments((prev) => {
                    const updatedDocuments = { ...prev };
                    updatedDocuments[documentType] = null;
                    return updatedDocuments;
                });
            }
        }
    };

    /**
     * Maps the userDocuments to match the UserDocument type format.
     */
    const mappedDocuments: UserDocument[] = userDocuments.map((doc) => ({
        documentType: doc.filetype,
        documentName: doc.document_name,
        documentData: doc.contentpath || '',
        auditTimestamp: doc.audit_timestamp || new Date().toISOString()
    }));

    return (
        <>
            <div className="container mt-5 mb-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="border rounded p-4 shadow-sm">
                            <div className="row">
                                <div className="col-md-6 text-center">
                                    <div className="mb-3">
                                        <img
                                            src={userProfile.profile_image}
                                            alt="Profile"
                                            className="rounded-circle"
                                            width="120"
                                        />
                                    </div>
                                    <h5>
                                        {userProfile.first_name} {userProfile.last_name}
                                    </h5>
                                </div>

                                <div className="col-md-6">
                                    <div className="user_detail mb-3 border-bottom pb-2">
                                        <strong className="user_detail_lable">Email :</strong>
                                        <span className="user_detail">{userProfile.email}</span>
                                    </div>
                                    <div className="user_detail mb-3 border-bottom pb-2">
                                        <strong className="user_detail_lable">Mobile :</strong>
                                        <span className="user_detail">
                                            {userProfile.mobile_number}
                                        </span>
                                    </div>
                                    <div className="user_detail mb-3 border-bottom pb-2">
                                        <strong className="user_detail_lable">
                                            Company Name :
                                        </strong>
                                        <span className="user_detail">
                                            {userProfile.company_name}
                                        </span>
                                    </div>
                                    <div className="user_detail mb-3 border-bottom pb-2">
                                        <strong className="user_detail_lable">Role :</strong>
                                        <span className="user_detail">{userProfile.role_name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* User Documents Section */}
            {userRole === userRoles.MANUFACTURER ? (
                isLoading ? (
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <CustomLoader />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container mt-5 mb-4">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="border rounded p-4 shadow-sm">
                                    <h4>Documents</h4>
                                    <div className="row">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Status</th>
                                                        <th>Document Name</th>
                                                        <th>Upload</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* PAN Card */}
                                                    <tr>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.PAN_CARD
                                                            ] ? (
                                                                <span className="text-success">
                                                                    <Icon
                                                                        icon="proicons:checkmark"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <span className="text-danger">
                                                                    <Icon
                                                                        icon="charm:cross"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>PAN Card</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <label
                                                                    className="btn btn-primary me-2"
                                                                    htmlFor={`${USER_DOCUMENT_TYPES.PAN_CARD}Input`}
                                                                >
                                                                    Choose File
                                                                </label>
                                                                <input
                                                                    id={`${USER_DOCUMENT_TYPES.PAN_CARD}Input`}
                                                                    type="file"
                                                                    onChange={(e) =>
                                                                        handleFileUpload(
                                                                            e,
                                                                            USER_DOCUMENT_TYPES.PAN_CARD
                                                                        )
                                                                    }
                                                                    className="form-control d-none"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.PAN_CARD
                                                            ] && (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12 mb-3"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            USER_DOCUMENT_TYPES.PAN_CARD
                                                                    )}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>

                                                    {/* GST Copy */}
                                                    <tr>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.GST_COPY
                                                            ] ? (
                                                                <span className="text-success">
                                                                    <Icon
                                                                        icon="proicons:checkmark"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <span className="text-danger">
                                                                    <Icon
                                                                        icon="charm:cross"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>GST Copy</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <label
                                                                    className="btn btn-primary me-2"
                                                                    htmlFor={`${USER_DOCUMENT_TYPES.GST_COPY}Input`}
                                                                >
                                                                    Choose File
                                                                </label>
                                                                <input
                                                                    id={`${USER_DOCUMENT_TYPES.GST_COPY}Input`}
                                                                    type="file"
                                                                    onChange={(e) =>
                                                                        handleFileUpload(
                                                                            e,
                                                                            USER_DOCUMENT_TYPES.GST_COPY
                                                                        )
                                                                    }
                                                                    className="form-control d-none"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.GST_COPY
                                                            ] && (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12 mb-3"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            USER_DOCUMENT_TYPES.GST_COPY
                                                                    )}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>

                                                    {/* Bank AD Code */}
                                                    <tr>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.BANK_AD_CODE
                                                            ] ? (
                                                                <span className="text-success">
                                                                    <Icon
                                                                        icon="proicons:checkmark"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <span className="text-danger">
                                                                    <Icon
                                                                        icon="charm:cross"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>Bank AD Code</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <label
                                                                    className="btn btn-primary me-2"
                                                                    htmlFor={`${USER_DOCUMENT_TYPES.BANK_AD_CODE}Input`}
                                                                >
                                                                    Choose File
                                                                </label>
                                                                <input
                                                                    id={`${USER_DOCUMENT_TYPES.BANK_AD_CODE}Input`}
                                                                    type="file"
                                                                    onChange={(e) =>
                                                                        handleFileUpload(
                                                                            e,
                                                                            USER_DOCUMENT_TYPES.BANK_AD_CODE
                                                                        )
                                                                    }
                                                                    className="form-control d-none"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.BANK_AD_CODE
                                                            ] && (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12 mb-3"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            USER_DOCUMENT_TYPES.BANK_AD_CODE
                                                                    )}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>

                                                    {/* IEC */}
                                                    <tr>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.IEC
                                                            ] ? (
                                                                <span className="text-success">
                                                                    <Icon
                                                                        icon="proicons:checkmark"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <span className="text-danger">
                                                                    <Icon
                                                                        icon="charm:cross"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>IEC</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <label
                                                                    className="btn btn-primary me-2"
                                                                    htmlFor={`${USER_DOCUMENT_TYPES.IEC}Input`}
                                                                >
                                                                    Choose File
                                                                </label>
                                                                <input
                                                                    id={'iecInput'}
                                                                    type="file"
                                                                    onChange={(e) =>
                                                                        handleFileUpload(
                                                                            e,
                                                                            USER_DOCUMENT_TYPES.IEC
                                                                        )
                                                                    }
                                                                    className="form-control d-none"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.IEC
                                                            ] && (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12 mb-3"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            USER_DOCUMENT_TYPES.IEC
                                                                    )}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>

                                                    {/* KYC Documents */}
                                                    <tr>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.KYC_DOCUMENTS
                                                            ] ? (
                                                                <span className="text-success">
                                                                    <Icon
                                                                        icon="proicons:checkmark"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <span className="text-danger">
                                                                    <Icon
                                                                        icon="charm:cross"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>KYC Documents</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <label
                                                                    className="btn btn-primary me-2"
                                                                    htmlFor={`${USER_DOCUMENT_TYPES.KYC_DOCUMENTS}Input`}
                                                                >
                                                                    Choose File
                                                                </label>
                                                                <input
                                                                    id={`${USER_DOCUMENT_TYPES.KYC_DOCUMENTS}Input`}
                                                                    type="file"
                                                                    onChange={(e) =>
                                                                        handleFileUpload(
                                                                            e,
                                                                            USER_DOCUMENT_TYPES.KYC_DOCUMENTS
                                                                        )
                                                                    }
                                                                    className="form-control d-none"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.KYC_DOCUMENTS
                                                            ] && (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12 mb-3"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            USER_DOCUMENT_TYPES.KYC_DOCUMENTS
                                                                    )}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>

                                                    {/* KYC Format */}
                                                    <tr>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.KYC_FORMAT
                                                            ] ? (
                                                                <span className="text-success">
                                                                    <Icon
                                                                        icon="proicons:checkmark"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <span className="text-danger">
                                                                    <Icon
                                                                        icon="charm:cross"
                                                                        className="fs-10"
                                                                    />
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>KYC Format</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <label
                                                                    className="btn btn-primary me-2"
                                                                    htmlFor={`${USER_DOCUMENT_TYPES.KYC_FORMAT}Input`}
                                                                >
                                                                    Choose File
                                                                </label>
                                                                <input
                                                                    id={`${USER_DOCUMENT_TYPES.KYC_FORMAT}Input`}
                                                                    type="file"
                                                                    onChange={(e) =>
                                                                        handleFileUpload(
                                                                            e,
                                                                            USER_DOCUMENT_TYPES.KYC_FORMAT
                                                                        )
                                                                    }
                                                                    className="form-control d-none"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {documents?.[
                                                                USER_DOCUMENT_TYPES.KYC_FORMAT
                                                            ] && (
                                                                <UserDocumentsWrapper
                                                                    className="col-md-12 mb-3"
                                                                    documents={mappedDocuments.filter(
                                                                        (doc) =>
                                                                            doc.documentType ===
                                                                            USER_DOCUMENT_TYPES.KYC_FORMAT
                                                                    )}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : null}
        </>
    );
};
