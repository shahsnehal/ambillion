import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProductRequest } from 'reduxSaga/modules/product-module/action/actions';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'reduxSaga/config/store';
import { ProductFormValues } from 'reduxSaga/modules/product-module/type/types';
import { productCategories, ROUTES } from 'constants/common';

type ProductFormModalProps = {
    initialValues?: ProductFormValues;
};

const ProductFormSchema = Yup.object().shape({
    productCategoryId: Yup.string().required('Category is required'),
    productDisplayName: Yup.string().required('Display Name is required'),
    customerProductDescription: Yup.string().required('Description is required'),
    originHsnCode: Yup.string()
        .required('HSN Code is required')
        .matches(
            /^\d{10,}$/,
            'HSN Code must be at least 10 digits long and can only include numbers'
        ),
    productFeature: Yup.string().required('Features are required'),
    productCustomFields: Yup.object().shape({})
});

export const ProductForm: React.FC<ProductFormModalProps> = ({
    initialValues = {
        productCategoryId: '',
        productDisplayName: '',
        customerProductDescription: '',
        originHsnCode: '',
        productFeature: '',
        productCustomFields: { FieldName: '', FieldValue: '' }
    }
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.productModule.isLoading);
    const [customFieldAdded, setCustomFieldAdded] = useState<boolean>(false);

    const handleSubmit = async (values: ProductFormValues) => {
        const selectedCategory = productCategories.find(
            (category) => category.name === values.productCategoryId
        );

        const payload = {
            ...values,
            productCategoryId: selectedCategory ? selectedCategory.id : ''
        };
        dispatch(addProductRequest(payload, navigate));
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="container my-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ProductFormSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props) => (
                            <Form>
                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="productDisplayName" className="form-label">
                                            Product Display Name{' '}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="productDisplayName"
                                            autoFocus
                                            className={`form-control ${props.touched.productDisplayName && props.errors.productDisplayName ? 'is-invalid' : ''}`}
                                            id="productDisplayName"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="productDisplayName"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="originHsnCode" className="form-label">
                                            Origin HSN Code <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="originHsnCode"
                                            className={`form-control ${props.touched.originHsnCode && props.errors.originHsnCode ? 'is-invalid' : ''}`}
                                            id="originHsnCode"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="originHsnCode"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-12">
                                        <label htmlFor="productCategoryId" className="form-label">
                                            Product Category <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as="select"
                                            name="productCategoryId"
                                            className={`form-control ${props.touched.productCategoryId && props.errors.productCategoryId ? 'is-invalid' : ''}`}
                                            id="productCategoryId"
                                        >
                                            <option value="" disabled>
                                                -- Select a Category --
                                            </option>
                                            {productCategories.map((category) => (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </Field>

                                        <ErrorMessage
                                            component="div"
                                            name="productCategoryId"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="customerProductDescription"
                                            className="form-label"
                                        >
                                            Customer Product Description{' '}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="customerProductDescription"
                                            className={`form-control ${props.touched.customerProductDescription && props.errors.customerProductDescription ? 'is-invalid' : ''}`}
                                            id="customerProductDescription"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="customerProductDescription"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-12">
                                        <label htmlFor="productFeature" className="form-label">
                                            Product Features <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="productFeature"
                                            className={`form-control ${props.touched.productFeature && props.errors.productFeature ? 'is-invalid' : ''}`}
                                            id="productFeature"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="productFeature"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    {!customFieldAdded && (
                                        <div className="col-sm-12">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => setCustomFieldAdded(true)}
                                            >
                                                Add Product Field
                                            </button>
                                        </div>
                                    )}

                                    {customFieldAdded && (
                                        <>
                                            <div className="col-sm-12 col-md-6">
                                                <label htmlFor="FieldName" className="form-label">
                                                    Property Name:
                                                </label>
                                                <Field
                                                    name="productCustomFields.FieldName"
                                                    className={`form-control ${props.errors.productCustomFields?.FieldName ? 'is-invalid' : ''}`}
                                                    placeholder="Enter field name"
                                                />
                                                <ErrorMessage
                                                    name="productCustomFields.FieldName"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>

                                            <div className="col-sm-12 col-md-6">
                                                <label htmlFor="FieldValue" className="form-label">
                                                    Property Value:
                                                </label>
                                                <Field
                                                    name="productCustomFields.FieldValue"
                                                    className={`form-control ${props.errors.productCustomFields?.FieldValue ? 'is-invalid' : ''}`}
                                                    placeholder="Enter field value"
                                                />
                                                <ErrorMessage
                                                    name="productCustomFields.FieldValue"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>

                                            <div className="col-sm-12 mt-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    disabled
                                                >
                                                    Add Product Field
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="d-flex justify-content-end gap-2 mt-2">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate(ROUTES.PRODUCTS)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!props.isValid || !props.dirty || isLoading}
                                    >
                                        {isLoading ? 'Adding...' : 'Add Product'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
