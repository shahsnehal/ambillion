import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProductRequest } from 'Modules/product-module/action/actions';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'config/store';
import { ProductFormValues } from 'Modules/product-module/type/types';

type ProductFormModalProps = {
    initialValues?: ProductFormValues;
    // title: string;
};

const dummyCategories = ['Furniture', 'Electronics', 'Apparel'];
const dummyProductTypes = ['Type1', 'Type2', 'Type3'];
const dummyUnitMeasures = ['kg', 'cm', 'in'];

const ProductFormSchema = Yup.object().shape({
    uploadImage: Yup.mixed().required('Image is required'),
    productCategory: Yup.string().required('Category is required'),
    productType: Yup.string().required('Type is required'),
    productDisplayName: Yup.string().required('Display Name is required'),
    customerProductDescription: Yup.string().required('Description is required'),
    brandName: Yup.string().required('Brand is required'),
    exWorkPrice: Yup.number().required('Price is required').typeError('Price must be a number'),
    byColor: Yup.string().required('Color is required'),
    bySize: Yup.array()
        .of(Yup.string())
        .min(1, 'Select at least one size')
        .required('Size is required'),
    originHsnCode: Yup.string()
        .required('HSN Code is required')
        .matches(/^\d{10}$/, 'HSN Code must be 10 digits'),
    unitMeasure: Yup.string().required('Unit Measure is required'),
    weight: Yup.string().required('Weight is required'),
    dimensions: Yup.string().required('Dimensions are required'),
    byGender: Yup.string().required('Gender is required'),
    material: Yup.string().required('Material is required'),
    productFeatures: Yup.string().required('Features are required')
});

export const ProductForm: React.FC<ProductFormModalProps> = ({
    initialValues = {
        uploadImage: null,
        productCategory: '',
        productType: '',
        productDisplayName: '',
        customerProductDescription: '',
        brandName: '',
        exWorkPrice: '',
        byColor: '',
        bySize: [],
        originHsnCode: '',
        unitMeasure: '',
        weight: '',
        dimensions: '',
        byGender: '',
        material: '',
        productFeatures: ''
    }
    // title
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { id } = useParams<{ id: string }>();
    const isLoading = useSelector((state: RootState) => state.productModule.isLoading);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: string | null | ArrayBuffer) => void
    ) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFieldValue('uploadImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (
        values: ProductFormValues,
        { setSubmitting, resetForm }: FormikHelpers<ProductFormValues>
    ) => {
        dispatch(addProductRequest(values, navigate));
        setSubmitting(false);
        resetForm();
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
                                        <label htmlFor="uploadImage" className="form-label">
                                            Upload Image <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            name="uploadImage"
                                            className={`form-control ${props.touched.uploadImage && props.errors.uploadImage ? 'is-invalid' : ''}`}
                                            id="uploadImage"
                                            onChange={(event) =>
                                                handleFileChange(event, props.setFieldValue)
                                            }
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="uploadImage"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="productCategory" className="form-label">
                                            Product Category <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as="select"
                                            name="productCategory"
                                            className={`form-control ${props.touched.productCategory && props.errors.productCategory ? 'is-invalid' : ''}`}
                                            id="productCategory"
                                        >
                                            <option value="">Please Select</option>
                                            {dummyCategories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            component="div"
                                            name="productCategory"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="productType" className="form-label">
                                            Product Type <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as="select"
                                            name="productType"
                                            className={`form-control ${props.touched.productType && props.errors.productType ? 'is-invalid' : ''}`}
                                            id="productType"
                                        >
                                            <option value="">Please Select</option>
                                            {dummyProductTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            component="div"
                                            name="productType"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="productDisplayName" className="form-label">
                                            Product Display Name{' '}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="productDisplayName"
                                            className={`form-control ${props.touched.productDisplayName && props.errors.productDisplayName ? 'is-invalid' : ''}`}
                                            id="productDisplayName"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="productDisplayName"
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
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="brandName" className="form-label">
                                            Brand Name <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="brandName"
                                            className={`form-control ${props.touched.brandName && props.errors.brandName ? 'is-invalid' : ''}`}
                                            id="brandName"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="brandName"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="exWorkPrice" className="form-label">
                                            Ex-Work Price (in USD){' '}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="exWorkPrice"
                                            className={`form-control ${props.touched.exWorkPrice && props.errors.exWorkPrice ? 'is-invalid' : ''}`}
                                            id="exWorkPrice"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="exWorkPrice"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="byColor" className="form-label">
                                            Color <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="byColor"
                                            className={`form-control ${props.touched.byColor && props.errors.byColor ? 'is-invalid' : ''}`}
                                            id="byColor"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="byColor"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="bySize" className="form-label">
                                            Size <span className="text-danger">*</span>
                                        </label>
                                        <div>
                                            <label className="form-check-label me-2">
                                                <Field
                                                    type="checkbox"
                                                    name="bySize"
                                                    value="L"
                                                    className="form-check-input"
                                                />
                                                Large
                                            </label>
                                            <label className="form-check-label me-2">
                                                <Field
                                                    type="checkbox"
                                                    name="bySize"
                                                    value="XL"
                                                    className="form-check-input"
                                                />
                                                Extra Large
                                            </label>
                                            <label className="form-check-label me-2">
                                                <Field
                                                    type="checkbox"
                                                    name="bySize"
                                                    value="M"
                                                    className="form-check-input"
                                                />
                                                Medium
                                            </label>
                                            <label className="form-check-label me-2">
                                                <Field
                                                    type="checkbox"
                                                    name="bySize"
                                                    value="S"
                                                    className="form-check-input"
                                                />
                                                Small
                                            </label>
                                            <label className="form-check-label me-2">
                                                <Field
                                                    type="checkbox"
                                                    name="bySize"
                                                    value="XS"
                                                    className="form-check-input"
                                                />
                                                Extra Small
                                            </label>
                                        </div>
                                        <ErrorMessage
                                            component="div"
                                            name="bySize"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
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
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="unitMeasure" className="form-label">
                                            Unit Measure <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as="select"
                                            name="unitMeasure"
                                            className={`form-control ${props.touched.unitMeasure && props.errors.unitMeasure ? 'is-invalid' : ''}`}
                                            id="unitMeasure"
                                        >
                                            <option value="">Please Select</option>
                                            {dummyUnitMeasures.map((measure) => (
                                                <option key={measure} value={measure}>
                                                    {measure}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            component="div"
                                            name="unitMeasure"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="weight" className="form-label">
                                            Weight <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="weight"
                                            className={`form-control ${props.touched.weight && props.errors.weight ? 'is-invalid' : ''}`}
                                            id="weight"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="weight"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="dimensions" className="form-label">
                                            Dimensions <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="dimensions"
                                            className={`form-control ${props.touched.dimensions && props.errors.dimensions ? 'is-invalid' : ''}`}
                                            id="dimensions"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="dimensions"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="byGender" className="form-label">
                                            Gender <span className="text-danger">*</span>
                                        </label>
                                        <div>
                                            <label className="form-check-label me-2">
                                                <Field
                                                    type="radio"
                                                    name="byGender"
                                                    value="All"
                                                    className="form-check-input"
                                                />
                                                All
                                            </label>
                                            <label className="form-check-label me-2">
                                                <Field
                                                    type="radio"
                                                    name="byGender"
                                                    value="Male"
                                                    className="form-check-input"
                                                />
                                                Male
                                            </label>
                                            <label className="form-check-label me-2">
                                                <Field
                                                    type="radio"
                                                    name="byGender"
                                                    value="Female"
                                                    className="form-check-input"
                                                />
                                                Female
                                            </label>
                                            <label className="form-check-label me-2">
                                                <Field
                                                    type="radio"
                                                    name="byGender"
                                                    value="Kids"
                                                    className="form-check-input"
                                                />
                                                Kids
                                            </label>
                                        </div>
                                        <ErrorMessage
                                            component="div"
                                            name="byGender"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="material" className="form-label">
                                            Material <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            name="material"
                                            className={`form-control ${props.touched.material && props.errors.material ? 'is-invalid' : ''}`}
                                            id="material"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="material"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-12">
                                        <label htmlFor="productFeatures" className="form-label">
                                            Product Features <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="productFeatures"
                                            className={`form-control ${props.touched.productFeatures && props.errors.productFeatures ? 'is-invalid' : ''}`}
                                            id="productFeatures"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="productFeatures"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 py-8 mb-4 rounded-2"
                                            disabled={!props.isValid || !props.dirty || isLoading}
                                        >
                                            {isLoading ? 'Adding...' : 'Add'}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
