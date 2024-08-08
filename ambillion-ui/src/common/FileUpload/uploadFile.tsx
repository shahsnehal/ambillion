import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { csv, doc, docx, gif, jpeg, pdf, png, txt, xls, xlsx, zip } from 'constants/fileType';
import { Icon } from '@iconify/react';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

type DropzoneProps = {
    name: string;
    onFileChange: (uploadedFiles: File[]) => any;
    label?: string;
    allowedFileTypes?: { [mimeType: string]: string[] };
    maxFileSize?: number;
    maxFileCount?: number;
    onFileChangeTest?: (uploadedFiles: File[], name: string) => any;
    initialFiles?: File[];
};

const Dropzone: React.FC<DropzoneProps> = ({
    name,
    onFileChange,
    onFileChangeTest,
    label,
    allowedFileTypes,
    maxFileSize,
    maxFileCount,
    initialFiles
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isFileDropped, setIsFileDropped] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);
    const [fileRejections, setFileRejections] = useState<any[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>(initialFiles || []);

    const updateFilesInState = (newFiles: File[]) => {
        setUploadedFiles(newFiles);
    };

    const isFileSizeValid = (file: File) => {
        if (!maxFileSize) return true;
        return file.size <= maxFileSize;
    };

    const onDragEnter = () => {
        setIsFileDropped(false);
    };

    const onDragOver = () => {
        setIsFileDropped(false);
    };

    const onDragLeave = () => {
        setIsFileDropped(false);
    };

    const onDrop = async (acceptedFiles: File[], fileRejections: any) => {
        try {
            setIsDragActive(false);
            setIsFileDropped(true);
            const validFiles = acceptedFiles.filter(isFileSizeValid);
            const spaceAvailable = maxFileCount
                ? maxFileCount - uploadedFiles.length
                : validFiles.length;
            const filesToAdd = validFiles.slice(0, spaceAvailable);

            setUploadedFiles((prevFiles) => {
                const newFiles = [...prevFiles, ...filesToAdd];
                onFileChange([...uploadedFiles, ...filesToAdd]);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                onFileChangeTest && onFileChangeTest(newFiles, name);
                return newFiles;
            });

            if (fileRejections.length > 0) {
                const rejectedFile = fileRejections[0].file;
                const fileName = rejectedFile.name;
                // const fileExtension = fileName
                //     .toLowerCase()
                //     .substring(fileName.lastIndexOf('.') + 1);

                // console.log(
                //     'Rejected files:',
                //     fileRejections.map((f: any) => f.file.name)
                // );
                // console.log(fileExtension);
                const newFiles = [...uploadedFiles, ...acceptedFiles];
                updateFilesInState(newFiles);
            }
        } catch (error) {
            console.error('Error handling the file drop:', error);
            setIsDragActive(false);
            setIsFileDropped(false);
        }
    };
    const deleteFile = (index: number) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        updateFilesInState(newFiles);
        onFileChange(newFiles);
        if (onFileChangeTest) onFileChangeTest(newFiles, name);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
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
            ...zip,
            ...csv,
            ...txt,
            ...jpeg,
            ...png,
            ...gif
        },
        maxSize: maxFileSize,
        onDragEnter,
        onDragOver,
        onDragLeave,
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
                    <label htmlFor="productFeature" className="form-label">
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
                            <input {...getInputProps()} />
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
        </>
    );
};

export default Dropzone;
