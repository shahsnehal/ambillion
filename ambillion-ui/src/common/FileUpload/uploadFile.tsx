/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { csv, doc, docx, jpeg, pdf, png, txt, xls, xlsx } from 'constants/fileType';
import { Icon } from '@iconify/react';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
import { ErrorMessage, useFormikContext } from 'formik';
import { toast } from 'react-toastify';
/* eslint-disable @typescript-eslint/no-explicit-any */

type FileSizeLimit = {
    size: number;
    unit: 'KB' | 'MB' | 'GB';
};
export type ExtendedFile = File & {
    documentId?: string;
};

type DropzoneProps = {
    name: string;
    onFileChange: (uploadedFiles: ExtendedFile[]) => any;
    label?: string;
    allowedFileTypes?: { [mimeType: string]: string[] };
    maxFileSize?: number;
    maxFileCount?: number;
    onFileChangeTest?: (uploadedFiles: ExtendedFile[], name: string) => any;
    initialFiles?: ExtendedFile[];
    holdOnChange?: boolean;
    formikField: string;
};

const Dropzone: React.FC<DropzoneProps> = ({
    name,
    onFileChange,
    onFileChangeTest,
    label,
    formikField,
    allowedFileTypes,
    maxFileSize,
    maxFileCount,
    initialFiles,
    holdOnChange = false
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [fileRejections] = useState<any[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<ExtendedFile[]>(initialFiles || []);
    const [confirmationMessage, setConfirmationMessage] = useState<string>('');
    const [confirmedAction, setConfirmedAction] = useState<(() => void) | null>(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
    const DEFAULT_MAX_SIZE = Infinity;
    const { setFieldTouched, errors, touched } = useFormikContext<any>();

    /**
     * Initializes uploaded files from the initialFiles prop if provided.
     */
    useEffect(() => {
        if (initialFiles) {
            setUploadedFiles(initialFiles);
        }
    }, [initialFiles]);

    /**
     * Converts a file size limit to bytes based on the unit (KB, MB, GB).
     *
     * @param {number | FileSizeLimit} fileSizeLimit - The size limit in the given unit.
     * @returns {number} - The size limit in bytes.
     */
    function convertFileSizeToBytes(fileSizeLimit?: number | FileSizeLimit): number {
        if (typeof fileSizeLimit === 'number') {
            return fileSizeLimit;
        } else if (fileSizeLimit) {
            const { size, unit } = fileSizeLimit;
            const unitConversions = {
                KB: 1024,
                MB: 1024 * 1024,
                GB: 1024 * 1024 * 1024
            };
            return size * unitConversions[unit];
        } else {
            return DEFAULT_MAX_SIZE;
        }
    }

    /**
     * Validates whether the file size is within the maximum limit.
     *
     * @param {ExtendedFile} file - The file being checked.
     * @returns {boolean} - True if the file size is valid, otherwise false.
     */
    const isFileSizeValid = (file: ExtendedFile) => {
        if (!maxFileSize) return true;
        const maxFileSizeInBytes = convertFileSizeToBytes(maxFileSize);
        return file.size <= maxFileSizeInBytes;
    };

    /**
     * Resets the state for the confirmation modal.
     */
    const resetConfirmationState = () => {
        setIsConfirmationOpen(false);
        setConfirmationMessage('');
        setConfirmedAction(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    /**
     * Handles renaming of a file if a file with the same name already exists in the uploaded files list.
     *
     * @param {ExtendedFile} file - The file being renamed.
     * @param {string} fileName - The base name of the file.
     * @param {string} fileExtension - The file's extension (e.g., .jpg, .pdf).
     */
    const handleRenameUpload = (file: ExtendedFile, fileName: string, fileExtension: string) => {
        let newFile = file;
        let counter = 1;
        while (uploadedFiles.some((uploadedFile) => uploadedFile.name === newFile.name)) {
            newFile = new File([file], `${fileName}(${counter})${fileExtension}`, {
                type: file.type
            }) as ExtendedFile;
            counter++;
        }

        setUploadedFiles((prevFiles) => {
            const newFiles = [...prevFiles, newFile];
            onFileChange(newFiles);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            onFileChangeTest?.(newFiles, name);
            return newFiles;
        });

        setIsConfirmationOpen(false);
    };

    /**
     * Handles the drop event and manages file uploads, checks for file conflicts, and validates file size.
     *
     * @param {ExtendedFile[]} acceptedFiles - Array of files that have been accepted.
     * @param {any[]} fileRejections - Array of files that were rejected.
     */
    const onDrop = async (acceptedFiles: ExtendedFile[], fileRejections: any) => {
        try {
            setIsDragActive(false);
            setFieldTouched(formikField, true);

            // Handle rejected files (only invalid types)
            if (fileRejections.length > 0) {
                fileRejections.forEach((rejection: any) => {
                    // Check if the rejection was due to invalid file format
                    const isInvalidFormat = rejection.errors.some(
                        (error: any) => error.code === 'file-invalid-type'
                    );

                    // Show custom message only for invalid file format
                    if (isInvalidFormat) {
                        toast.error('Invalid file format. Please upload a valid file.');
                    }
                });
            }

            const validFiles = acceptedFiles.filter(isFileSizeValid);
            const spaceAvailable = maxFileCount
                ? maxFileCount - uploadedFiles.length
                : validFiles.length;
            const filesToAdd = validFiles.slice(0, spaceAvailable);

            const renamedFiles: any = [];

            for (const file of filesToAdd) {
                const newFile = file;
                let fileName = file.name;
                let fileExtension = '';
                const dotIndex = fileName.lastIndexOf('.');

                if (dotIndex !== -1) {
                    fileExtension = fileName.slice(dotIndex);
                    fileName = fileName.slice(0, dotIndex);
                }

                if (uploadedFiles.some((uploadedFile) => uploadedFile.name === newFile.name)) {
                    setConfirmationMessage(
                        `File "${newFile.name}" already exists. Do you want to rename and upload?`
                    );
                    setConfirmedAction(() => () => {
                        handleRenameUpload(file, fileName, fileExtension);
                    });
                    setIsConfirmationOpen(true);
                    return;
                }
                renamedFiles.push(newFile);
            }

            if (renamedFiles.length > 0) {
                setUploadedFiles((prevFiles) => {
                    const newFiles = [...prevFiles, ...renamedFiles];
                    onFileChange(newFiles);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                    onFileChangeTest?.(newFiles, name);
                    return newFiles;
                });
            }
        } catch (error) {
            console.error('Error handling the file drop:', error);
            setIsDragActive(false);
        }
    };

    /**
     * Deletes a file from the uploaded files list.
     *
     * @param {number} index - The index of the file to delete.
     */
    const deleteFile = (index: number) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        if (newFiles.length === 0) {
            setFieldTouched(formikField, true);
        } else {
            setFieldTouched(formikField, false);
        }
        if (onFileChangeTest) onFileChangeTest(newFiles, name);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (!holdOnChange) {
            onFileChange(newFiles);
        }
    };

    // Configures the dropzone using react-dropzone
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles, fileRejections) => {
            onDrop(acceptedFiles, fileRejections);
        },
        accept: allowedFileTypes || {
            ...pdf,
            ...doc,
            ...docx,
            ...xls,
            ...xlsx,
            ...csv,
            ...txt,
            ...jpeg,
            ...png
        },
        maxSize: maxFileSize,
        // onDragEnter,
        // onDragOver,
        // onDragLeave,
        noClick: false
    });

    /**
     * Renders the list of uploaded files with options to view, download, or delete.
     *
     * @returns {JSX.Element[]} - JSX elements rendering the uploaded files.
     */
    const renderUploadedFiles = () => {
        return uploadedFiles.map((file, index) => {
            const trimmedFileName =
                file.name.length > 30 ? file.name.substring(0, 27) + '...' : file.name;
            const fileSizeDisplay =
                file.size < 1024 * 1024
                    ? `${(file.size / 1024).toFixed(2)} KB`
                    : `${(file.size / 1024 / 1024).toFixed(2)} MB`;
            const fileUrl = URL.createObjectURL(file);

            /**
             * Handles file download by creating a temporary anchor element and triggering the download.
             *
             * @param {string} fileUrl - The URL of the file to download (can be created using URL.createObjectURL).
             * @param {File} file - The file object to be downloaded, used to specify the download file name.
             */
            const downloadFile = () => {
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = file.name; // Here you can also customize the file name for download
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };

            return (
                <div key={index} className="col-md-6 col-lg-4 col-sm-12 mb-3">
                    <div className="alert border-success p-2">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                            {/* Left section for file name and size */}
                            <div className="d-flex align-items-center text-dark mb-2 mb-md-0">
                                {trimmedFileName} - {fileSizeDisplay}
                            </div>

                            {/* Right section for buttons */}
                            <div className="d-flex flex-wrap justify-content-end">
                                <button
                                    className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center p-2 mx-1 mb-2"
                                    data-toggle="tooltip"
                                    type="button"
                                    data-placement="bottom"
                                    title="Download"
                                    onClick={downloadFile}
                                >
                                    <Icon icon="solar:file-download-outline" className="fs-5" />
                                </button>
                                <button
                                    className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-2 mx-1 mb-2"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    type="button"
                                    title="View"
                                    onClick={() => window.open(fileUrl, '_blank')}
                                >
                                    <Icon icon="carbon:document-view" className="fs-5"></Icon>
                                </button>
                                <button
                                    className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center p-2 mx-1 mb-2"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Delete"
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        URL.revokeObjectURL(fileUrl);
                                        deleteFile(index);
                                    }}
                                >
                                    <Icon
                                        icon="mdi:file-document-delete-outline"
                                        className="fs-5"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    useEffect(() => {
        console.log(fileRejections);
    }, [isDragActive, fileRejections]);

    return (
        <>
            <div className="mb-3">
                <label htmlFor={formikField} className="form-label">
                    {label} <span className="text-danger">*</span>
                </label>
                <div
                    {...getRootProps()}
                    className={`border p-3 rounded dropzone ${touched[formikField] && errors[formikField] ? 'border-danger' : 'border-secondary'}`}
                >
                    <input
                        name={formikField}
                        className="d-none"
                        id={formikField}
                        {...getInputProps()}
                    />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p className="m-2">Drag & drop a file here, or click to select file(s)</p>
                    )}
                </div>
                {touched[formikField] && errors[formikField] ? (
                    <div className="invalid-feedback d-block">
                        <ErrorMessage name={formikField} component="div" />
                    </div>
                ) : null}
            </div>

            <div className="row mb-3">{uploadedFiles.length > 0 && renderUploadedFiles()}</div>
            {isConfirmationOpen && (
                <ConfirmationModal
                    isOpen={isConfirmationOpen}
                    onClose={() => resetConfirmationState()}
                    onConfirm={() => confirmedAction && confirmedAction()}
                    title={'Document upload'}
                    content={confirmationMessage}
                    confirmLabel={'Confirm'}
                    confirmBtnClassName={
                        'btn btn-rounded btn-success d-flex align-items-center ms-2'
                    }
                    confirmIcon={'mdi:check-circle-outline'}
                    closeBtnClassName={'btn btn-rounded btn-secondary ms-2'}
                    isLoading={false}
                />
            )}
        </>
    );
};

export default Dropzone;
