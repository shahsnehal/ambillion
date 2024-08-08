import React from 'react';
import { Formik, Field, ErrorMessage, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ProductCategoryFormValues } from 'reduxSaga/modules/productCategories-module/type/types';
import { Icon } from '@iconify/react';

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
    categoryDescription: Yup.string()
        .required('Description is required !')
        .trim()
        .max(500, 'Description must be at most 500 characters long !')
});

export const ProductCategoryModal: React.FC<ProductCategoryModalProps> = ({
    isOpen,
    onClose,
    productCategoryFormData,
    onSubmit
}) => {
    if (!isOpen) return null;

    const initialValues: ProductCategoryFormValues = {
        categoryId: productCategoryFormData?.categoryId ?? '',
        categoryName: productCategoryFormData?.categoryName ?? '',
        categoryDescription: productCategoryFormData?.categoryDescription ?? ''
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
                                onSubmit(values);
                                resetForm();
                            }}
                        >
                            {(formikProps: FormikProps<ProductCategoryFormValues>) => (
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
                                            <label htmlFor="categoryName" className="form-label">
                                                Category Name <span className="text-danger">*</span>
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
                                                Description <span className="text-danger">*</span>
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
                                            {productCategoryFormData?.categoryId
                                                ? 'Save Changes'
                                                : 'Add Category'}
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
