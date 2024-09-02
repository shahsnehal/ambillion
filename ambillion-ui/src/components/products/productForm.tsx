/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-destructuring */
import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    addProductRequest,
    editProductRequest,
    getProductDetailsRequest
} from 'reduxSaga/modules/product-module/action/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from 'reduxSaga/config/store';
import {
    ProductFormValues,
    CustomFieldErrors,
    CustomFieldTouched,
    ProductCustomField,
    ProductDocument
} from 'reduxSaga/modules/product-module/type/types';
import { localStorageKey, ROUTES } from 'constants/common';
import { getLocalStorage } from 'utils/localStorage';
import {
    CategoryDocuments,
    ProductCategory
} from 'reduxSaga/modules/productCategories-module/type/types';
import Dropzone, { ExtendedFile } from 'common/FileUpload/uploadFile';
import { Icon } from '@iconify/react';
import { trimValues } from 'utils/common';

type ProductFormProps = {
    productFormData?: ProductFormValues | null;
};

// Define schema for individual document
const documentSchema = Yup.object({
    documentType: Yup.string().required('Document type is required'),
    documentName: Yup.string().required('Document name is required'),
    documentData: Yup.string().required('Document data is required')
});
const ProductFormSchema = Yup.object().shape({
    productCategoryId: Yup.string().required('Category is required !').trim(),
    productDisplayName: Yup.string().required('Display Name is required !').trim(),
    customerProductDescription: Yup.string().required('Description is required !').trim(),
    originHsnCode: Yup.string()
        .required('HSN Code is required !')
        .trim()
        .matches(
            /^\d{10,}$/,
            'HSN Code must be at least 10 digits long and can only include numbers !'
        ),
    productFeature: Yup.string().required('Features are required !').trim(),
    productCustomFields: Yup.array()
        .of(
            Yup.object({
                FieldName: Yup.string().required('Field Name is required !'),
                FieldValue: Yup.string().required('Field Value is required !')
            })
        )
        .optional(),
    productDocuments: Yup.array()
        .of(documentSchema)
        .required('At least one document is required !')
        .min(1, 'At least one document is required !')
});

export const ProductForm: React.FC<ProductFormProps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>();
    const [categoryDocuments, setCategoryDocuments] = useState<CategoryDocuments[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [customFieldAdded, setCustomFieldAdded] = useState<boolean>(false);
    const productCategories = getLocalStorage(localStorageKey.PRODUCT_CATEGORIES);
    const [productDocumentFiles, setProductDocumentFiles] = useState<ExtendedFile[]>([]);
    const isAddMode = !productId;
    const { selectedProductDetails, isLoading } = useSelector(
        (state: RootState) => state.productModule
    );

    const initialValues: ProductFormValues = {
        productId: isAddMode ? '' : selectedProductDetails?.product_id ?? '',
        productDisplayName: isAddMode ? '' : selectedProductDetails?.product_displayname ?? '',
        productCategoryId: isAddMode ? '' : selectedProductDetails?.category_id ?? '',
        originHsnCode: isAddMode ? '' : selectedProductDetails?.origin_hsn_code ?? '',
        customerProductDescription: isAddMode
            ? ''
            : selectedProductDetails?.customer_product_description ?? '',
        productFeature: isAddMode ? '' : selectedProductDetails?.product_feature ?? '',
        productCustomFields: isAddMode
            ? []
            : selectedProductDetails?.product_custom_fields
              ? selectedProductDetails.product_custom_fields
                  ? (JSON.parse(
                        selectedProductDetails.product_custom_fields
                    ) as ProductCustomField[])
                  : []
              : [],
        productDocuments: isAddMode
            ? []
            : selectedProductDetails?.product_documents
              ? selectedProductDetails.product_documents.map((doc) => ({
                    documentType: doc.filetype,
                    documentName: doc.document_name,
                    documentData: doc.base64Data
                }))
              : []
    };

    const convertBase64ToBlob = (base64Data: string, contentType: string): Blob => {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };

    const convertDocumentContentToExtendedFile = (
        documentData: ProductDocument,
        docId: string
    ): ExtendedFile => {
        const blob = convertBase64ToBlob(documentData.documentData, documentData.documentType);

        const extendedFile: ExtendedFile = new File([blob], documentData.documentName, {
            type: documentData.documentType
        });
        extendedFile.documentId = docId;

        return extendedFile;
    };

    console.log('productDocumentFiles', productDocumentFiles);
    useEffect(() => {
        if (initialValues?.productDocuments) {
            const convertedFiles = initialValues.productDocuments.map((doc, index) => {
                return convertDocumentContentToExtendedFile(doc, index.toString());
            });
            setProductDocumentFiles(convertedFiles);
        }
    }, []);

    useEffect(() => {
        if (productId) {
            dispatch(getProductDetailsRequest(productId));
        }
    }, []);

    useEffect(() => {
        if (initialValues.productCategoryId) {
            setSelectedCategoryId(initialValues.productCategoryId.toString());
        }
    }, [initialValues.productCategoryId]);

    useEffect(() => {
        if (selectedCategoryId) {
            const selectedCategory = productCategories.find(
                (category: ProductCategory) =>
                    category.category_id.toString() === selectedCategoryId
            );
            if (selectedCategory) {
                setCategoryDocuments(selectedCategory.categoryDocuments || []);
            }
        } else {
            setCategoryDocuments([]);
        }
    }, [selectedCategoryId]);

    const handleCategoryChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>, formik: FormikProps<ProductFormValues>) => {
            const newCategoryId = event.target.value;
            if (newCategoryId !== selectedCategoryId) {
                setSelectedCategoryId(newCategoryId);
                formik.setFieldValue('productCategoryId', newCategoryId);
            }
        },
        [selectedCategoryId]
    );

    const handleSubmit = async (values: ProductFormValues) => {
        const trimmedValues = trimValues(values);
        let categoryId = trimmedValues.productCategoryId;
        if (categoryId) {
            categoryId = categoryId.toString();
        } else {
            const selectedCategory = productCategories.find(
                (category: ProductCategory) =>
                    category.category_name === trimmedValues.productCategoryId
            );
            categoryId = selectedCategory ? selectedCategory.category_id.toString() : '';
        }

        const payload = {
            ...trimmedValues,
            productCategoryId: categoryId
        };

        if (productId) {
            dispatch(editProductRequest(productId, payload, navigate));
        } else {
            dispatch(addProductRequest(payload, navigate));
        }
    };
    const convertBase64 = (file: any) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        });
    };
    const removeDataUriPrefix = (dataUri: string): string => {
        const base64String = dataUri.split(',')[1];
        return base64String || '';
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="container my-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ProductFormSchema}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm();
                        }}
                    >
                        {(props) => {
                            const customFieldErrors = props.errors
                                .productCustomFields as CustomFieldErrors[];
                            const customFieldTouched = props.touched
                                .productCustomFields as CustomFieldTouched[];

                            return (
                                <Form>
                                    <div className="row mb-3">
                                        <div className="col-sm-12 col-md-6">
                                            <label
                                                htmlFor="productDisplayName"
                                                className="form-label"
                                            >
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
                                                Origin HSN Code{' '}
                                                <span className="text-danger">*</span>
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
                                            <label
                                                htmlFor="productCategoryId"
                                                className="form-label"
                                            >
                                                Product Category{' '}
                                                <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                as="select"
                                                name="productCategoryId"
                                                className={`form-control ${props.touched.productCategoryId && props.errors.productCategoryId ? 'is-invalid' : ''}`}
                                                id="productCategoryId"
                                                onChange={(
                                                    event: React.ChangeEvent<HTMLSelectElement>
                                                ) => {
                                                    handleCategoryChange(event, props);
                                                }}
                                                value={props.values.productCategoryId}
                                            >
                                                <option value="" disabled>
                                                    -- Select a Category --
                                                </option>
                                                {productCategories.map(
                                                    (category: ProductCategory) => (
                                                        <option
                                                            key={category.category_id}
                                                            value={category.category_id}
                                                            title={category.category_description}
                                                        >
                                                            {category.category_name}
                                                        </option>
                                                    )
                                                )}
                                            </Field>

                                            <ErrorMessage
                                                component="div"
                                                name="productCategoryId"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </div>

                                    {props.values.productCategoryId && (
                                        <div className="col-sm-12 mt-3">
                                            <label
                                                htmlFor="categoryDocuments"
                                                className="form-label"
                                            >
                                                Required To Attach Documents for Selected Category :
                                            </label>
                                            {categoryDocuments.length > 0 ? (
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Description</th>
                                                            <th>Format</th>
                                                            <th>Mandatory</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {categoryDocuments.map((doc) => (
                                                            <tr key={doc.document_type_id}>
                                                                <td>{doc.document_type_name}</td>
                                                                <td>
                                                                    {doc.document_type_description}
                                                                </td>
                                                                <td>{doc.document_type_format}</td>
                                                                <td>
                                                                    {doc.mandatory ? 'Yes' : 'No'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p>
                                                    No Documents required for the selected category.
                                                </p>
                                            )}
                                        </div>
                                    )}

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
                                                Product Features{' '}
                                                <span className="text-danger">*</span>
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
                                    <Dropzone
                                        name="Attachment"
                                        initialFiles={productDocumentFiles}
                                        onFileChange={async (uploadedFiles) => {
                                            // Process each file
                                            let base64File = '';
                                            const fileData =
                                                uploadedFiles[uploadedFiles.length - 1];
                                            if (fileData) {
                                                base64File = removeDataUriPrefix(
                                                    String(await convertBase64(fileData))
                                                );
                                                props.setFieldValue('productDocuments', [
                                                    ...props.values.productDocuments,
                                                    {
                                                        documentType: fileData.type,
                                                        documentName: fileData.name,
                                                        documentData: base64File
                                                    }
                                                ]);
                                            }
                                        }}
                                        formikField="productDocuments"
                                        label="Attachment"
                                    />

                                    {customFieldAdded ||
                                    props.values.productCustomFields.length > 0 ? (
                                        <div className="row mb-3">
                                            {props.values.productCustomFields.map(
                                                (field, index) => (
                                                    <React.Fragment key={index}>
                                                        <div className="col-sm-12 col-md-5">
                                                            <label
                                                                htmlFor={`productCustomFields[${index}].FieldName`}
                                                                className="form-label mt-2"
                                                            >
                                                                Field Name{' '}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                name={`productCustomFields[${index}].FieldName`}
                                                                className={`form-control ${customFieldTouched?.[index]?.FieldName && customFieldErrors?.[index]?.FieldName ? 'is-invalid' : ''}`}
                                                                value={field.FieldName}
                                                            />
                                                            <ErrorMessage
                                                                component="div"
                                                                name={`productCustomFields[${index}].FieldName`}
                                                                className="invalid-feedback"
                                                            />
                                                        </div>
                                                        <div className="col-sm-12 col-md-6">
                                                            <label
                                                                htmlFor={`productCustomFields[${index}].FieldValue`}
                                                                className="form-label mt-2"
                                                            >
                                                                Field Value{' '}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                name={`productCustomFields[${index}].FieldValue`}
                                                                className={`form-control ${customFieldTouched?.[index]?.FieldValue && customFieldErrors?.[index]?.FieldValue ? 'is-invalid' : ''}`}
                                                                value={field.FieldValue}
                                                            />
                                                            <ErrorMessage
                                                                component="div"
                                                                name={`productCustomFields[${index}].FieldValue`}
                                                                className="invalid-feedback"
                                                            />
                                                        </div>
                                                        <div className="col-sm-12 col-md-1 customField-delete-icon">
                                                            <button
                                                                type="button"
                                                                className="btn btn-rounded btn-secondary w-100"
                                                                onClick={() => {
                                                                    const updatedFields = [
                                                                        ...props.values
                                                                            .productCustomFields
                                                                    ];
                                                                    updatedFields.splice(index, 1);
                                                                    props.setFieldValue(
                                                                        'productCustomFields',
                                                                        updatedFields
                                                                    );
                                                                }}
                                                            >
                                                                <Icon icon="mdi:trash-can-outline" />
                                                            </button>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            )}
                                        </div>
                                    ) : null}

                                    <div className="d-flex justify-content-end gap-2 mt-2">
                                        <button
                                            className="btn btn-rounded btn-secondary d-flex align-items-center ms-2"
                                            onClick={() => navigate(ROUTES.PRODUCTS)}
                                        >
                                            <Icon icon="icon-park-outline:back" className="me-1" />
                                            Cancel
                                        </button>
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    props.setFieldValue('productCustomFields', [
                                                        ...props.values.productCustomFields,
                                                        { FieldName: '', FieldValue: '' }
                                                    ]);
                                                    const newIndex =
                                                        props.values.productCustomFields.length;
                                                    props.setFieldTouched(
                                                        `productCustomFields[${newIndex}].FieldName`,
                                                        false,
                                                        false
                                                    );
                                                    props.setFieldTouched(
                                                        `productCustomFields[${newIndex}].FieldValue`,
                                                        false,
                                                        false
                                                    );
                                                    setCustomFieldAdded(true);
                                                }}
                                            >
                                                Add Product Property
                                            </button>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-rounded btn-primary d-flex align-items-center ms-2"
                                            disabled={
                                                !props.isValid ||
                                                !props.dirty ||
                                                isLoading ||
                                                (customFieldAdded &&
                                                    props.values.productCustomFields?.length > 0 &&
                                                    props.values.productCustomFields.some(
                                                        (field) =>
                                                            !field.FieldName || !field.FieldValue
                                                    ))
                                            }
                                        >
                                            <Icon
                                                icon={productId ? 'tabler:edit' : 'tabler:plus'}
                                                className="me-1"
                                            />
                                            {isLoading
                                                ? productId
                                                    ? 'Updating...'
                                                    : 'Adding...'
                                                : productId
                                                  ? 'Save Changes'
                                                  : 'Add Product'}
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
