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

/**
 * Validation schema for the product document type form.
 *
 * @type {Yup.ObjectSchema<ProductDocumentTypeFormValues>}
 */
const validationSchema = Yup.object({
    documentTypeName: Yup.string()
        .required('DocumentType Name is required!')
        .trim()
        .max(100, 'DocumentType Name must be at most 100 characters long!'),
    documentTypeDescription: Yup.string().required('DocumentType Description is required!').trim(),
    documentTypeFormat: Yup.string().required('DocumentType Format is required!').trim()
});

/**
 * Modal component for adding or editing a product document type.
 *
 * @param {ProductDocumentTypeModalProps} props - Component props.
 * @param {boolean} props.isOpen - Boolean indicating if the modal is open.
 * @param {() => void} props.onClose - Callback function to handle closing the modal.
 * @param {ProductDocumentTypeFormValues | null} props.documentTypeFormData - Form data for the product document type being edited, or null if adding a new one.
 * @param {(values: ProductDocumentTypeFormValues) => void} props.onSubmit - Callback function to handle form submission with the provided values.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if the modal is not open.
 */
export const ProductDocumentTypeModal: React.FC<ProductDocumentTypeModalProps> = ({
    isOpen,
    onClose,
    documentTypeFormData,
    onSubmit
}) => {
    // Early return if the modal is not open
    if (!isOpen) return null;
    /**
     * Initial values for the form, derived from the provided form data or default to empty strings.
     *
     * @type {ProductDocumentTypeFormValues}
     */
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
                                    <div className="modal-footer flex-column flex-md-row justify-content-between">
                                        <div className="d-flex flex-column flex-md-row w-100 justify-content-md-start">
                                            <button
                                                type="button"
                                                className="btn btn-rounded btn-secondary w-100 w-md-auto mb-2 mb-md-0 me-md-2"
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
                                                className="btn btn-rounded btn-primary w-100 w-md-auto mb-2 mb-md-0"
                                                disabled={
                                                    !formikProps.isValid || !formikProps.dirty
                                                }
                                            >
                                                <Icon icon="tabler:plus" className="fs-5 me-1" />
                                                {documentTypeFormData?.documentTypeId
                                                    ? 'Save Changes'
                                                    : 'Add DocumentType'}
                                            </button>
                                        </div>
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
