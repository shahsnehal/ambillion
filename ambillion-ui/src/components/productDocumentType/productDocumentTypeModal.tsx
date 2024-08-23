import React from 'react';
import { Formik, Field, ErrorMessage, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ProductDocumentTypeFormValues } from 'reduxSaga/modules/productDocumentType-module/type/types';
import { Icon } from '@iconify/react';
import { fileFormats } from 'constants/fileType';
import { trimValues } from 'utils/common';

export type ProductDocumentTypeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    documentTypeFormData: ProductDocumentTypeFormValues | null;
    onSubmit: (values: ProductDocumentTypeFormValues) => void;
};

const validationSchema = Yup.object({
    documentTypeName: Yup.string()
        .required('DocumentType Name is required!')
        .trim()
        .max(100, 'DocumentType Name must be at most 100 characters long!'),
    documentTypeDescription: Yup.string().required('DocumentType is required!').trim(),
    documentTypeFormat: Yup.string().required('DocumentType is required!').trim()
});

export const ProductDocumentTypeModal: React.FC<ProductDocumentTypeModalProps> = ({
    isOpen,
    onClose,
    documentTypeFormData,
    onSubmit
}) => {
    if (!isOpen) return null;

    const initialValues: ProductDocumentTypeFormValues = {
        documentTypeId: documentTypeFormData?.documentTypeId ?? '',
        documentTypeName: documentTypeFormData?.documentTypeName ?? '',
        documentTypeDescription: documentTypeFormData?.documentTypeDescription ?? '',
        documentTypeFormat: documentTypeFormData?.documentTypeFormat ?? ''
    };

    return (
        <>
            <div
                className={`modal fade ${isOpen ? 'show' : ''}`}
                tabIndex={-1}
                aria-hidden={!isOpen}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                const trimmedValues = trimValues(values);
                                onSubmit(trimmedValues);
                                resetForm();
                            }}
                        >
                            {(formikProps: FormikProps<ProductDocumentTypeFormValues>) => (
                                <Form>
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {documentTypeFormData?.documentTypeId
                                                ? 'Edit DocumentType'
                                                : 'Add DocumentType'}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={onClose}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="documentTypeName"
                                                className="form-label"
                                            >
                                                DocumentType Name{' '}
                                                <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                id="documentTypeName"
                                                name="documentTypeName"
                                                type="text"
                                                autoFocus
                                                className={`form-control ${formikProps.touched.documentTypeName && formikProps.errors.documentTypeName ? 'is-invalid' : ''}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="documentTypeName"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="documentTypeDescription"
                                                className="form-label"
                                            >
                                                DocumentType Description{' '}
                                                <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                id="documentTypeDescription"
                                                name="documentTypeDescription"
                                                as="textarea"
                                                rows={3}
                                                className={`form-control ${formikProps.touched.documentTypeDescription && formikProps.errors.documentTypeDescription ? 'is-invalid' : ''}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="documentTypeDescription"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="documentTypeFormat"
                                                className="form-label"
                                            >
                                                DocumentType Format{' '}
                                                <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                as="select"
                                                id="documentTypeFormat"
                                                name="documentTypeFormat"
                                                className={`form-control ${formikProps.touched.documentTypeFormat && formikProps.errors.documentTypeFormat ? 'is-invalid' : ''}`}
                                            >
                                                <option value="" disabled>
                                                    -- Select Format --
                                                </option>
                                                {fileFormats.map((format) => (
                                                    <option key={format.value} value={format.value}>
                                                        {format.label}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                component="div"
                                                name="documentTypeFormat"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-rounded btn-secondary ms-2"
                                            onClick={onClose}
                                        >
                                            <Icon
                                                icon="carbon:close-outline"
                                                className="fs-5 me-1"
                                            />
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-rounded btn-primary ms-2"
                                            disabled={!formikProps.isValid || !formikProps.dirty}
                                        >
                                            <Icon icon="tabler:plus" className="fs-5 me-1" />
                                            {documentTypeFormData?.documentTypeId
                                                ? 'Save Changes'
                                                : 'Add DocumentType'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};
