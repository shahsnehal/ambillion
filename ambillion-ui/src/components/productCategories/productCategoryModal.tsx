import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
    CategoryDocumentTypePayloadErrors,
    CategoryDocumentTypePayloadTouched,
    ProductCategoryFormValues
} from 'reduxSaga/modules/productCategories-module/type/types';
import { Icon } from '@iconify/react';
import { trimValues } from 'utils/common';
import { RootState } from 'reduxSaga/config/store';
import { useSelector } from 'react-redux';

export type ProductCategoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    productCategoryFormData: ProductCategoryFormValues | null;
    onSubmit: (values: ProductCategoryFormValues) => void;
};

const validationSchema = Yup.object({
    categoryName: Yup.string()
        .required('Category Name is required !')
        .trim()
        .max(100, 'Category Name must be at most 100 characters long !'),
    categoryDescription: Yup.string().required('Description is required !').trim(),
    documentTypes: Yup.array()
        .of(
            Yup.object({
                documentTypeId: Yup.string().required('Document Type is required !'),
                mandatory: Yup.boolean().notRequired()
            })
        )
        .optional()
});

export const ProductCategoryModal: React.FC<ProductCategoryModalProps> = ({
    isOpen,
    onClose,
    productCategoryFormData,
    onSubmit
}) => {
    const initialValues: ProductCategoryFormValues = {
        categoryId: productCategoryFormData?.categoryId ?? '',
        categoryName: productCategoryFormData?.categoryName ?? '',
        categoryDescription: productCategoryFormData?.categoryDescription ?? '',
        documentTypes: productCategoryFormData?.documentTypes ?? []
    };
    const { categoryDocumentTypes } = useSelector(
        (state: RootState) => state.productCategoryModule
    );
    const [documentTypeAdded, setDocumentTypeAdded] = useState<boolean>(false);
    const [documentTypes, setDocumentTypes] = useState(initialValues.documentTypes || []);

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
                            {(formikProps: FormikProps<ProductCategoryFormValues>) => {
                                return (
                                    <Form>
                                        <div className="modal-header">
                                            <h5 className="modal-title">
                                                {productCategoryFormData?.categoryId
                                                    ? 'Edit Category'
                                                    : 'Add Category'}
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
                                                    htmlFor="categoryName"
                                                    className="form-label"
                                                >
                                                    Category Name{' '}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field
                                                    id="categoryName"
                                                    name="categoryName"
                                                    type="text"
                                                    autoFocus
                                                    className={`form-control ${formikProps.touched.categoryName && formikProps.errors.categoryName ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="categoryName"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="categoryDescription"
                                                    className="form-label"
                                                >
                                                    Description{' '}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field
                                                    id="categoryDescription"
                                                    name="categoryDescription"
                                                    as="textarea"
                                                    rows={3}
                                                    className={`form-control ${formikProps.touched.categoryDescription && formikProps.errors.categoryDescription ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="categoryDescription"
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
                                                                        ] as CategoryDocumentTypePayloadErrors
                                                                    )?.documentTypeId &&
                                                                    (
                                                                        formikProps.errors
                                                                            .documentTypes?.[
                                                                            index
                                                                        ] as CategoryDocumentTypePayloadTouched
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
                                                                {categoryDocumentTypes.map(
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
                                                {productCategoryFormData?.categoryId
                                                    ? 'Save Changes'
                                                    : 'Add Category'}
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
