import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
    HSNDocumentTypePayloadErrors,
    HSNDocumentTypePayloadTouched,
    HSNCodeFormValues
} from 'reduxSaga/modules/hsnCodes-module/type/types';
import { Icon } from '@iconify/react';
import { trimValues } from 'utils/common';
import { RootState } from 'reduxSaga/config/store';
import { useSelector } from 'react-redux';

export type HsnCodeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    hsnCodeFormData: HSNCodeFormValues | null;
    onSubmit: (values: HSNCodeFormValues) => void;
};

/**
 * Validation schema for the HSN Code form using Yup.
 *
 * @type {Yup.ObjectSchema}
 */
const validationSchema = Yup.object({
    hsnCode: Yup.string()
        .required('HSN Code is required !')
        .trim()
        .matches(
            /^\d{1,10}$/,
            'HSN Code must be between 1 and 10 digits long and can only include numbers!'
        ),
    hsnDescription: Yup.string().required('Description is required !').trim(),
    documentTypes: Yup.array()
        .of(
            Yup.object({
                documentTypeId: Yup.string().required('Document Type is required !'),
                mandatory: Yup.boolean().notRequired()
            })
        )
        .optional()
});

/**
 * HSNCodeModal component for adding and editing product categories.
 *
 * @component
 * @param {HsnCodeModalProps} props - The props for the component.
 * @returns {JSX.Element | null} The modal component, or null if not open.
 */
export const HsnCodeModal: React.FC<HsnCodeModalProps> = ({
    isOpen,
    onClose,
    hsnCodeFormData,
    onSubmit
}) => {
    /**
     * Initial values for the form, derived from the provided form data or default to empty strings.
     *
     * @type {HSNCodeFormValues}
     */
    const initialValues: HSNCodeFormValues = {
        hsnId: hsnCodeFormData?.hsnId ?? '',
        hsnCode: hsnCodeFormData?.hsnCode ?? '',
        hsnDescription: hsnCodeFormData?.hsnDescription ?? '',
        documentTypes: hsnCodeFormData?.documentTypes ?? []
    };
    const { hsnDocumentTypes } = useSelector((state: RootState) => state.hsnCodeModule);
    const [documentTypeAdded, setDocumentTypeAdded] = useState<boolean>(false);
    const [documentTypes, setDocumentTypes] = useState(initialValues.documentTypes || []);

    // Early return if the modal is not open
    if (!isOpen) return null;

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
                            {(formikProps: FormikProps<HSNCodeFormValues>) => {
                                return (
                                    <Form>
                                        <div className="modal-header">
                                            <h5 className="modal-title">
                                                {hsnCodeFormData?.hsnId
                                                    ? 'Edit HSN Code'
                                                    : 'Add HSN Code'}
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={onClose}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="hsnCode" className="form-label">
                                                    HSN Code <span className="text-danger">*</span>
                                                </label>
                                                <Field
                                                    id="hsnCode"
                                                    name="hsnCode"
                                                    type="text"
                                                    autoFocus
                                                    className={`form-control ${formikProps.touched.hsnCode && formikProps.errors.hsnCode ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="hsnCode"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="hsnDescription"
                                                    className="form-label"
                                                >
                                                    Description{' '}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field
                                                    id="hsnDescription"
                                                    name="hsnDescription"
                                                    as="textarea"
                                                    rows={3}
                                                    className={`form-control ${formikProps.touched.hsnDescription && formikProps.errors.hsnDescription ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="hsnDescription"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </div>
                                        {documentTypes.length > 0 || documentTypeAdded ? (
                                            <div className="row ms-2 mb-3">
                                                {documentTypes.map((field, index) => (
                                                    <React.Fragment
                                                        key={
                                                            field.documentTypeId ||
                                                            `documentType-${index}`
                                                        }
                                                    >
                                                        <div className="col-sm-12 col-md-5 mb-2">
                                                            {index === 0 && (
                                                                <label
                                                                    htmlFor={`documentTypes[${index}].documentTypeId`}
                                                                    className="form-label mt-2"
                                                                >
                                                                    Document Type{' '}
                                                                    <span className="text-danger">
                                                                        *
                                                                    </span>
                                                                </label>
                                                            )}
                                                            <Field
                                                                as="select"
                                                                name={`documentTypes[${index}].documentTypeId`}
                                                                className={`form-control mt-3 ${
                                                                    formikProps.touched
                                                                        .documentTypes &&
                                                                    (
                                                                        formikProps.touched
                                                                            .documentTypes?.[
                                                                            index
                                                                        ] as HSNDocumentTypePayloadErrors
                                                                    )?.documentTypeId &&
                                                                    (
                                                                        formikProps.errors
                                                                            .documentTypes?.[
                                                                            index
                                                                        ] as HSNDocumentTypePayloadTouched
                                                                    )?.documentTypeId
                                                                        ? 'is-invalid'
                                                                        : ''
                                                                }`}
                                                                value={field.documentTypeId}
                                                                onChange={(
                                                                    e: React.ChangeEvent<HTMLInputElement>
                                                                ) => {
                                                                    const updatedFields = [
                                                                        ...documentTypes
                                                                    ];
                                                                    updatedFields[index] = {
                                                                        ...updatedFields[index],
                                                                        documentTypeId:
                                                                            e.target.value
                                                                    };
                                                                    setDocumentTypes(updatedFields);
                                                                    formikProps.setFieldValue(
                                                                        'documentTypes',
                                                                        updatedFields
                                                                    );
                                                                }}
                                                            >
                                                                <option value="" disabled>
                                                                    -- Select DocumentType --
                                                                </option>
                                                                {hsnDocumentTypes.map(
                                                                    (documentType) => (
                                                                        <option
                                                                            key={
                                                                                documentType.document_type_id
                                                                            }
                                                                            value={
                                                                                documentType.document_type_id
                                                                            }
                                                                            title={
                                                                                documentType.document_type_description
                                                                            }
                                                                        >
                                                                            {
                                                                                documentType.document_type_name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Field>
                                                            <ErrorMessage
                                                                component="div"
                                                                name={`documentTypes[${index}].documentTypeId`}
                                                                className="invalid-feedback"
                                                            />
                                                        </div>

                                                        <div className="col-sm-6 col-md-5 mt-2">
                                                            {index === 0 && (
                                                                <label className="form-label mb-3">
                                                                    Mandatory{' '}
                                                                </label>
                                                            )}
                                                            <div className="form-check">
                                                                <Field
                                                                    type="checkbox"
                                                                    name={`documentTypes[${index}].mandatory`}
                                                                    className="form-check-input mt-3"
                                                                    checked={field.mandatory}
                                                                    onChange={(
                                                                        e: React.ChangeEvent<HTMLInputElement>
                                                                    ) => {
                                                                        const updatedFields = [
                                                                            ...documentTypes
                                                                        ];
                                                                        updatedFields[index] = {
                                                                            ...updatedFields[index],
                                                                            mandatory:
                                                                                e.target.checked
                                                                        };
                                                                        setDocumentTypes(
                                                                            updatedFields
                                                                        );
                                                                        formikProps.setFieldValue(
                                                                            'documentTypes',
                                                                            updatedFields
                                                                        );
                                                                    }}
                                                                />
                                                                <label
                                                                    className="form-check-label mt-3"
                                                                    htmlFor={`mandatory_${index}`}
                                                                >
                                                                    Is mandatory?
                                                                </label>
                                                            </div>
                                                            <ErrorMessage
                                                                component="div"
                                                                name={`documentTypes[${index}].mandatory`}
                                                                className="invalid-feedback"
                                                            />
                                                        </div>
                                                        <div
                                                            className={`col-sm-6 col-md-1 d-flex justify-content-center align-items-center ${
                                                                index === 0
                                                                    ? 'documentType-delete-icon'
                                                                    : 'mt-1'
                                                            }`}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-rounded btn-secondary"
                                                                onClick={() => {
                                                                    const updatedFields = [
                                                                        ...documentTypes
                                                                    ];
                                                                    formikProps.setFieldTouched(
                                                                        'documentTypes',
                                                                        true
                                                                    );
                                                                    updatedFields.splice(index, 1);
                                                                    setDocumentTypes(updatedFields);
                                                                    formikProps.setFieldValue(
                                                                        'documentTypes',
                                                                        updatedFields
                                                                    );
                                                                    if (
                                                                        updatedFields.length === 0
                                                                    ) {
                                                                        setDocumentTypeAdded(false);
                                                                    } else {
                                                                        setDocumentTypeAdded(true);
                                                                    }
                                                                }}
                                                            >
                                                                <Icon icon="mdi:trash-can-outline" />
                                                            </button>
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        ) : null}

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
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    setDocumentTypes([
                                                        ...documentTypes,
                                                        { documentTypeId: '', mandatory: false }
                                                    ]);
                                                    setDocumentTypeAdded(true);
                                                    formikProps.setFieldValue('documentTypes', [
                                                        ...documentTypes,
                                                        { documentTypeId: '', mandatory: false }
                                                    ]);
                                                }}
                                            >
                                                <Icon icon="tabler:plus" className="me-1" />
                                                Add Document Type
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-rounded btn-primary ms-2"
                                                disabled={
                                                    !formikProps.isValid ||
                                                    !formikProps.dirty ||
                                                    (documentTypeAdded &&
                                                        formikProps.values.documentTypes.length >
                                                            0 &&
                                                        formikProps.values.documentTypes.some(
                                                            (field) => !field.documentTypeId
                                                        ))
                                                }
                                            >
                                                <Icon icon="tabler:plus" className="fs-5 me-1" />
                                                {hsnCodeFormData?.hsnId
                                                    ? 'Save Changes'
                                                    : 'Add HSN Code'}
                                            </button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};
