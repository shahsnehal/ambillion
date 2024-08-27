import { Icon } from '@iconify/react';
import { ProductDocumentsProps } from 'reduxSaga/modules/product-module/type/types';

type DocumentProps = {
    documents: ProductDocumentsProps[] | null;
};

const ViewDocuments: React.FC<DocumentProps> = ({ documents }) => {
    const hasDocuments = documents && documents.length > 0;
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
                    <div key={index + 1} className="col-md-4">
                        <div className="alert border-success p-2">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <Icon icon="bi:file-earmark-pdf-fill" className="fs-9" />
                                    <div>
                                        <div className="d-flex">
                                            <h6 className="fw-semibold">{doc.document_name}</h6>{' '}
                                            {/* <h6 className="mx-1"> (2 MB)</h6> */}
                                        </div>
                                        <div className="d-flex align-items-center gap-2 fs-2 text-muted">
                                            <span>
                                                {new Date(doc.audit_timestamp).toLocaleDateString()}
                                            </span>
                                            <span>
                                                {new Date(doc.audit_timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center p-2 mx-1"
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
                                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-2 mx-1"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="View"
                                        onClick={() => ViewFile(doc.base64Data, doc.filetype)}
                                    >
                                        <Icon icon="carbon:document-view" className="fs-6"></Icon>
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
