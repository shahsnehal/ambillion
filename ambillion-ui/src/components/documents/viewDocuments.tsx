import { Icon } from '@iconify/react';
import { ProductDocumentsProps } from 'reduxSaga/modules/product-module/type/types';

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
     * Function to download a file from base64 data.
     *
     * @param {string} base64Data - The base64 encoded file data.
     * @param {string} fileName - The name of the file to be downloaded.
     * @param {string} fileType - The MIME type of the file.
     */
    const downloadFile = (base64Data: string, fileName: string, fileType: string) => {
        // Convert Base64 string to a binary string
        const binaryString = window.atob(base64Data);
        // Create a Uint8Array from the binary string
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([bytes], { type: fileType });
        const url = window.URL.createObjectURL(blob);

        // Create a link element and simulate a click to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    /**
     * Function to open a file in a new tab from base64 data.
     *
     * @param {string} base64Data - The base64 encoded file data.
     * @param {string} fileType - The MIME type of the file.
     */
    const ViewFile = (base64Data: string, fileType: string) => {
        // Convert Base64 string to a binary string
        const binaryString = window.atob(base64Data);
        // Create a Uint8Array from the binary string
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([bytes], { type: fileType });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
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
                                            downloadFile(
                                                doc.base64Data,
                                                doc.document_name,
                                                doc.filetype
                                            )
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
                                        onClick={() => ViewFile(doc.base64Data, doc.filetype)}
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
