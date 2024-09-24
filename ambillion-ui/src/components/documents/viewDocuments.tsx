import { Icon } from '@iconify/react';
import { localStorageKey } from 'constants/common';
import { ProductDocumentsProps } from 'reduxSaga/modules/product-module/type/types';
import { getLocalStorage } from 'utils/localStorage';

type DocumentProps = {
    documents: ProductDocumentsProps[] | null;
};

/**
 * Component to display a list of documents with options to download or view them.
 *
 * @param {DocumentProps} props - The component props.
 * @returns {JSX.Element} The rendered ViewDocuments component.
 *
 * @example
 * <ViewDocuments
 *     documents={documents}
 * />
 */
const ViewDocuments: React.FC<DocumentProps> = ({ documents }) => {
    const hasDocuments = documents && documents.length > 0;

    /**
     * Function to download a file from contentpath data.
     *
     * @param {string} fileName - The name of the file to be downloaded.
     * @param {string} fileUrl - File Url to view doc.
     */
    const downloadFile = async (fileUrl: string, fileName: string) => {
        try {
            const accessToken = getLocalStorage(localStorageKey.JWT_TOKEN);
            const response = await fetch(fileUrl, {
                method: 'GET',
                credentials: 'include', // Include credentials (cookies) for authentication
                headers: {
                    Authorization: `Bearer ${accessToken}` // Assuming you're using a Bearer token for auth
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob(); // Get the file as a blob
            const url = window.URL.createObjectURL(blob); // Create a URL for the blob

            // Create a link element
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName; // Specify the filename for download
            document.body.appendChild(link);

            // Simulate a click to trigger the download
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Free up memory
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    /**
     * Function to open a file in a new tab from fileUrl data.
     *
     * @param {string} fileUrl - File Url to view doc.
     */
    const ViewFile = async (fileUrl: string) => {
        try {
            const accessToken = getLocalStorage(localStorageKey.JWT_TOKEN); // Get the JWT token
            const response = await fetch(fileUrl, {
                method: 'GET',
                credentials: 'include', // Include credentials (cookies) for authentication
                headers: {
                    Authorization: `Bearer ${accessToken}` // Assuming you're using a Bearer token for auth
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob(); // Get the file as a blob
            const url = window.URL.createObjectURL(blob); // Create a URL for the blob

            // Open the file in a new tab
            window.open(url, '_blank');

            // Optionally clean up the URL object after it's opened
            window.URL.revokeObjectURL(url); // Free up memory
        } catch (error) {
            console.error('View file failed:', error);
        }
    };

    return (
        <div className="row">
            {hasDocuments ? (
                documents.map((doc, index) => (
                    <div key={index + 1} className="col-md-6 col-lg-4 col-sm-12 mb-3">
                        <div className="alert border-success p-2">
                            <div className="d-flex flex-column flex-md-row justify-content-between">
                                {/* Left section with file info */}
                                <div className="d-flex align-items-center mb-3 mb-md-0">
                                    <Icon icon="bi:file-earmark-pdf-fill" className="fs-9 me-2" />
                                    <div>
                                        <h6 className="fw-semibold mb-1">{doc.document_name}</h6>
                                        <div className="d-flex align-items-center gap-2 fs-3 text-muted">
                                            <span>
                                                {new Date(doc.audit_timestamp).toLocaleDateString()}
                                            </span>
                                            <span>
                                                {new Date(doc.audit_timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right section with action buttons */}
                                <div className="d-flex flex-wrap justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center p-2 mx-1 mb-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Download"
                                        onClick={() =>
                                            downloadFile(doc.contentpath, doc.document_name)
                                        }
                                    >
                                        <Icon icon="solar:file-download-outline" className="fs-6" />
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-2 mx-1 mb-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="View"
                                        // onClick={() => ViewFile(doc.base64Data, doc.contentpath)}
                                        onClick={() => ViewFile(doc.contentpath)}
                                    >
                                        <Icon icon="carbon:document-view" className="fs-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No Document available</p>
            )}
        </div>
    );
};

export default ViewDocuments;
