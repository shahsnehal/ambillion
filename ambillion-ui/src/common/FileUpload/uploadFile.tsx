import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { csv, doc, docx, jpeg, pdf, png, txt, xls, xlsx } from 'constants/fileType';
import { Icon } from '@iconify/react';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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
    const [fileRejections, setFileRejections] = useState<any[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<ExtendedFile[]>(initialFiles || []);
    const [confirmationMessage, setConfirmationMessage] = useState<string>('');
    const [confirmedAction, setConfirmedAction] = useState<(() => void) | null>(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
    const DEFAULT_MAX_SIZE = Infinity;

    useEffect(() => {
        if (initialFiles) {
            setUploadedFiles(initialFiles);
        }
    }, [initialFiles]);

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

    const isFileSizeValid = (file: ExtendedFile) => {
        if (!maxFileSize) return true;
        const maxFileSizeInBytes = convertFileSizeToBytes(maxFileSize);
        return file.size <= maxFileSizeInBytes;
    };
    const resetConfirmationState = () => {
        setIsConfirmationOpen(false);
        setConfirmationMessage('');
        setConfirmedAction(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
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
            onFileChangeTest && onFileChangeTest(newFiles, name);
            return newFiles;
        });

        setIsConfirmationOpen(false);
    };

    const onDrop = async (acceptedFiles: ExtendedFile[], fileRejections: any) => {
        try {
            setIsDragActive(false);

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

                while (uploadedFiles.some((uploadedFile) => uploadedFile.name === newFile.name)) {
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
                    onFileChangeTest && onFileChangeTest(newFiles, name);
                    return newFiles;
                });
            }

            // if (fileRejections.length > 0) {
            //     fileRejections.forEach((rejection: any) => {
            //         const file = rejection.file;
            //         const fileName = file.name;
            //         const fileExtension = fileName
            //             .slice(fileName.lastIndexOf('.') + 1)
            //             .toLowerCase();
            //         let errorObj: SingleAlertInfo = {
            //             message: '',
            //             alertType: 'error'
            //         };
            //         if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
            //             errorObj.message = `Invalid file size. Maximum size allowed is ${
            //                 convertFileSizeToBytes(maxFileSize) / (1024 * 1024)
            //             } MB.`;
            //         } else if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
            //             if (allowedFileTypes) {
            //                 errorObj.message = `Invalid file type "${fileExtension}". Allowed types are ${Object.keys(
            //                     allowedFileTypes
            //                 )
            //                     .map((key) => allowedFileTypes[key].map((ext) => ext))
            //                     .flat()
            //                     .join(', ')}.`;
            //             } else {
            //                 errorObj.message = `Invalid file type "${fileExtension}".`;
            //             }
            //         } else {
            //             errorObj.message = 'File could not be uploaded due to restrictions.';
            //         }
            //         // dispatch(setSingleAlertObj(errorObj));
            //     });
            // }
        } catch (error) {
            console.error('Error handling the file drop:', error);
            setIsDragActive(false);
        }
    };
    const deleteFile = (index: number) => {
        console.log('indexDelete', index);
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        if (onFileChangeTest) onFileChangeTest(newFiles, name);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (!holdOnChange) {
            onFileChange(newFiles);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles, fileRejections) => onDrop(acceptedFiles, fileRejections),
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

    const renderUploadedFiles = () => {
        return uploadedFiles.map((file, index) => {
            const trimmedFileName =
                file.name.length > 30 ? file.name.substring(0, 27) + '...' : file.name;
            const fileSizeDisplay =
                file.size < 1024 * 1024
                    ? `${(file.size / 1024).toFixed(2)} KB`
                    : `${(file.size / 1024 / 1024).toFixed(2)} MB`;
            const fileUrl = URL.createObjectURL(file);

            const downloadFile = () => {
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = file.name; // Here you can also customize the file name for download
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };

            return (
                <div key={index} className="col-md-4">
                    <div className="alert border-success p-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center text-dark">
                                {trimmedFileName} - {fileSizeDisplay}
                            </div>
                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center p-2 mx-1"
                                    data-toggle="tooltip"
                                    type="button"
                                    data-placement="bottom"
                                    title="Download"
                                    onClick={downloadFile}
                                >
                                    <Icon icon="solar:file-download-outline" className="fs-5" />
                                </button>
                                <button
                                    className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-2 mx-1"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    type="button"
                                    title="View"
                                    onClick={() => window.open(fileUrl, '_blank')}
                                >
                                    <Icon icon="carbon:document-view" className="fs-5"></Icon>
                                </button>
                                <button
                                    className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center p-2 mx-1"
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
            <div className="row mb-2">
                <div className="col-sm-12">
                    <label htmlFor={formikField} className="form-label">
                        {label} <span className="text-danger">*</span>
                    </label>
                    <div {...getRootProps()}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}
                            className="p-3 dropzone"
                        >
                            <input
                                name={formikField}
                                className="form-control is-invalid"
                                id={formikField}
                                {...getInputProps()}
                            />
                            {isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                <p className="m-2">
                                    Drag & drop a file here , or click to select file(s)
                                </p>
                            )}
                        </div>
                    </div>
                </div>
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
