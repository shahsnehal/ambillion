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
    CategoryDocumentType,
    ProductCategory
} from 'reduxSaga/modules/productCategories-module/type/types';
import Dropzone, { ExtendedFile } from 'common/FileUpload/uploadFile';
import { Icon } from '@iconify/react';
import { getBase64FromFileUrl, getProductCustomeFields, trimValues } from 'utils/common';
import { CustomLoader } from 'common/loaders/loader';

type ProductFormProps = {
    productFormData?: ProductFormValues | null;
};

/**
 * Schema for validating individual documents.
 */
const documentSchema = Yup.object({
    documentType: Yup.string().required('Document type is required'),
    documentName: Yup.string().required('Document name is required'),
    documentData: Yup.string().required('Document data is required')
});

/**
 * Schema for validating the product form.
 */
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

/**
 * Default values for the product form.
 */
const defaultProductFormValues: ProductFormValues = {
    productId: '',
    productDisplayName: '',
    productCategoryId: '',
    originHsnCode: '',
    customerProductDescription: '',
    productFeature: '',
    productCustomFields: [],
    productDocuments: []
};

/**
 * Component for adding or editing a product.
 * @param {ProductFormProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export const ProductForm: React.FC<ProductFormProps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>();
    const [categoryDocuments, setCategoryDocuments] = useState<CategoryDocumentType[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [initialValues, setInitialValues] = useState<ProductFormValues>(defaultProductFormValues);
    const [customFieldAdded, setCustomFieldAdded] = useState<boolean>(false);
    const productCategories = getLocalStorage(localStorageKey.PRODUCT_CATEGORIES);
    const [productDocumentFiles, setProductDocumentFiles] = useState<ExtendedFile[]>([]);
    const isAddMode = !productId;
    const { selectedProductDetails, isLoading } = useSelector(
        (state: RootState) => state.productModule
    );
    const [productCustomFields, setProductCustomFields] = useState<ProductCustomField[]>([]);

    /**
     * Converts base64 data to a Blob object.
     * @param {string} base64Data - The base64 encoded data.
     * @param {string} contentType - The content type of the data.
     * @returns {Blob} The Blob object.
     */
    const convertBase64ToBlob = (base64Data: string, contentType: string): Blob => {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };

    /**
     * Converts a document to an ExtendedFile object.
     * @param {ProductDocument} documentData - The document data.
     * @param {string} docId - The document ID.
     * @returns {ExtendedFile} The ExtendedFile object.
     */
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

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (selectedProductDetails && !isAddMode) {
                const productProperties: ProductCustomField[] = getProductCustomeFields(
                    selectedProductDetails?.product_custom_fields
                );
                setProductCustomFields(productProperties);

                // Handle the asynchronous base64 fetching here
                const updatedDetails = {
                    productId: selectedProductDetails?.product_id ?? '',
                    productDisplayName: selectedProductDetails?.product_displayname ?? '',
                    productCategoryId: selectedProductDetails?.category_id ?? '',
                    originHsnCode: selectedProductDetails?.origin_hsn_code ?? '',
                    customerProductDescription:
                        selectedProductDetails?.customer_product_description ?? '',
                    productFeature: selectedProductDetails?.product_feature ?? '',
                    productCustomFields: productProperties,
                    productDocuments: selectedProductDetails?.product_documents
                        ? await Promise.all(
                              selectedProductDetails.product_documents.map(async (doc) => ({
                                  documentType: doc.filetype,
                                  documentName: doc.document_name,
                                  documentData: await getBase64FromFileUrl(doc.contentpath) // Await the base64 data
                              }))
                          )
                        : []
                };

                // Set the updated details in state
                setInitialValues(updatedDetails);
            }
        };

        // Call the async function
        fetchProductDetails();
    }, [selectedProductDetails, isAddMode]);

    /**
     * Updates product document files state based on initial values.
     */
    useEffect(() => {
        if (initialValues?.productDocuments.length) {
            const convertedFiles = initialValues.productDocuments.map((doc, index) => {
                return convertDocumentContentToExtendedFile(doc, index.toString());
            });
            setProductDocumentFiles(convertedFiles);
        }
    }, [initialValues?.productDocuments]);

    /**
     * Fetches product details when the component is mounted or productId changes.
     */
    useEffect(() => {
        if (productId) {
            dispatch(getProductDetailsRequest(productId));
        }
    }, []);

    /**
     * Updates selectedCategoryId state based on initial values.
     */
    useEffect(() => {
        if (initialValues.productCategoryId) {
            setSelectedCategoryId(initialValues.productCategoryId.toString());
        }
    }, [initialValues.productCategoryId]);

    /**
     * Updates categoryDocuments state based on selectedCategoryId.
     */
    useEffect(() => {
        if (selectedCategoryId) {
            const selectedCategory = productCategories.find(
                (category: ProductCategory) =>
                    category.category_id.toString() === selectedCategoryId
            );
            if (selectedCategory) {
                setCategoryDocuments(selectedCategory.documents || []);
            }
        } else {
            setCategoryDocuments([]);
        }
    }, [selectedCategoryId]);

    /**
     * Handles category change event and updates Formik field value.
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event.
     * @param {FormikProps<ProductFormValues>} formik - Formik instance.
     */
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

    /**
     * Submits the form values to add or edit a product.
     * @param {ProductFormValues} values - The form values.
     */
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

    /**
     * Converts a file to base64 format.
     * @param {any} file - The file to convert.
     * @returns {Promise<string>} A promise that resolves to the base64 encoded string.
     */
    const convertBase64 = (file: any) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                // eslint-disable-next-line no-console
                console.log('Error: ', error);
            };
        });
    };

    /**
     * Processes uploaded files and converts them to base64 format.
     * @param {any} uploadedFiles - The uploaded files.
     * @returns {Promise<ProductDocument[]>} A promise that resolves to an array of product documents.
     */
    async function processFiles(uploadedFiles: any) {
        // Map over the files and create an array of promises
        const fileDataPromises = uploadedFiles.map(async (doc: any) => {
            const base64File = removeDataUriPrefix(String(await convertBase64(doc)));
            return {
                documentType: doc.type,
                documentName: doc.name,
                documentData: base64File
            };
        });

        // Wait for all promises to resolve
        const fileData = await Promise.all(fileDataPromises);
        return fileData;
    }

    /**
     * Removes the Data URI prefix (e.g., `data:image/jpeg;base64,`) from a base64-encoded string.
     *
     * @param {string} dataUri - The Data URI string containing the base64-encoded data.
     * @returns {string} The base64 string without the Data URI prefix. Returns an empty string if the base64 part is not found.
     */
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
                            handleSubmit({ ...values, productCustomFields });
                            resetForm();
                        }}
                    >
                        {(props) => {
                            const customFieldErrors = props.errors
                                .productCustomFields as CustomFieldErrors[];
                            const customFieldTouched = props.touched
                                .productCustomFields as CustomFieldTouched[];

                            return (
                                <>
                                    {isLoading ? (
                                        <div className="container my-4">
                                            <CustomLoader />
                                        </div>
                                    ) : (
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
                                                    <label
                                                        htmlFor="originHsnCode"
                                                        className="form-label"
                                                    >
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
                                                        {productCategories?.map(
                                                            (category: ProductCategory) => (
                                                                <option
                                                                    key={category.category_id}
                                                                    value={category.category_id}
                                                                    title={
                                                                        category.category_description
                                                                    }
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
                                                        className="form-label text-black"
                                                    >
                                                        Required To Attach Documents for Selected
                                                        Category :
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
                                                                        <td>
                                                                            {doc.document_type_name}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                doc.document_type_description
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                doc.document_type_format
                                                                            }
                                                                        </td>
                                                                        <td
                                                                            className={
                                                                                doc.mandatory
                                                                                    ? 'text-secondary'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            {doc.mandatory
                                                                                ? 'Yes'
                                                                                : 'No'}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <p>
                                                            No Documents required for the selected
                                                            category.
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            <div className="row mb-3">
                                                <div className="col-sm-6">
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
                                                <div className="col-sm-6">
                                                    <label
                                                        htmlFor="productFeature"
                                                        className="form-label"
                                                    >
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
                                            <div className="row mb-3">
                                                <Dropzone
                                                    name="Attachment"
                                                    initialFiles={productDocumentFiles}
                                                    onFileChange={async (uploadedFiles) => {
                                                        const fileData =
                                                            await processFiles(uploadedFiles);
                                                        props.setFieldValue(
                                                            'productDocuments',
                                                            fileData || null
                                                        );
                                                    }}
                                                    formikField="productDocuments"
                                                    label="Attachment"
                                                />
                                            </div>

                                            {productCustomFields.length > 0 || customFieldAdded ? (
                                                <div className="row mb-3">
                                                    {productCustomFields.map((field, index) => (
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
                                                                    autoFocus={isAddMode}
                                                                    className={`form-control ${customFieldTouched?.[index]?.FieldName && customFieldErrors?.[index]?.FieldName ? 'is-invalid' : ''}`}
                                                                    value={field.FieldName}
                                                                    onChange={(
                                                                        e: React.ChangeEvent<HTMLInputElement>
                                                                    ) => {
                                                                        const updatedFields = [
                                                                            ...productCustomFields
                                                                        ];
                                                                        updatedFields[index] = {
                                                                            ...updatedFields[index],
                                                                            FieldName:
                                                                                e.target.value
                                                                        };
                                                                        setProductCustomFields(
                                                                            updatedFields
                                                                        );
                                                                    }}
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
                                                                    onChange={(
                                                                        e: React.ChangeEvent<HTMLInputElement>
                                                                    ) => {
                                                                        const updatedFields = [
                                                                            ...productCustomFields
                                                                        ];
                                                                        updatedFields[index] = {
                                                                            ...updatedFields[index],
                                                                            FieldValue:
                                                                                e.target.value
                                                                        };
                                                                        setProductCustomFields(
                                                                            updatedFields
                                                                        );
                                                                    }}
                                                                />
                                                                <ErrorMessage
                                                                    component="div"
                                                                    name={`productCustomFields[${index}].FieldValue`}
                                                                    className="invalid-feedback"
                                                                />
                                                            </div>
                                                            <div className="col-sm-12 col-md-1 d-flex align-items-center justify-content-center customField-delete-icon">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-rounded btn-secondary"
                                                                    onClick={() => {
                                                                        const updatedFields = [
                                                                            ...productCustomFields
                                                                        ];
                                                                        updatedFields.splice(
                                                                            index,
                                                                            1
                                                                        );
                                                                        setProductCustomFields(
                                                                            updatedFields
                                                                        );
                                                                        props.setFieldValue(
                                                                            'productCustomFields',
                                                                            updatedFields
                                                                        );
                                                                        props.setFieldTouched(
                                                                            'productCustomFields',
                                                                            true
                                                                        );
                                                                        setCustomFieldAdded(true);
                                                                    }}
                                                                >
                                                                    <Icon icon="mdi:trash-can-outline" />
                                                                </button>
                                                            </div>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            ) : null}

                                            <div className="row justify-content-center justify-content-lg-end">
                                                <div className="col-12 col-md-4 col-lg-auto mb-2 mb-md-0">
                                                    <button
                                                        className="btn btn-rounded btn-secondary w-100 d-flex align-items-center justify-content-center"
                                                        onClick={() => {
                                                            if (isAddMode) {
                                                                navigate(ROUTES.PRODUCTS);
                                                            } else {
                                                                navigate(
                                                                    `${ROUTES.PRODUCTS}/${productId}`
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <Icon
                                                            icon="icon-park-outline:back"
                                                            className="me-1"
                                                        />
                                                        Cancel
                                                    </button>
                                                </div>
                                                <div className="col-12 col-md-4 col-lg-auto mb-2 mb-md-0">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                                                        onClick={() => {
                                                            setProductCustomFields([
                                                                ...productCustomFields,
                                                                { FieldName: '', FieldValue: '' }
                                                            ]);
                                                            setCustomFieldAdded(true);
                                                        }}
                                                    >
                                                        <Icon icon="tabler:plus" className="me-1" />
                                                        Add Product Property
                                                    </button>
                                                </div>
                                                <div className="col-12 col-md-4 col-lg-auto mb-2 mb-md-0">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-rounded btn-primary w-100 d-flex align-items-center justify-content-center"
                                                        disabled={
                                                            !props.isValid ||
                                                            (!props.dirty && !customFieldAdded) ||
                                                            isLoading ||
                                                            (productCustomFields.length > 0 &&
                                                                productCustomFields.some(
                                                                    (field) =>
                                                                        !field.FieldName ||
                                                                        !field.FieldValue
                                                                ))
                                                        }
                                                    >
                                                        <Icon
                                                            icon={
                                                                productId
                                                                    ? 'tabler:edit'
                                                                    : 'tabler:plus'
                                                            }
                                                            className="me-1"
                                                        />
                                                        {(() => {
                                                            if (isLoading) {
                                                                return productId
                                                                    ? 'Updating...'
                                                                    : 'Adding...';
                                                            } else {
                                                                return productId
                                                                    ? 'Save Changes'
                                                                    : 'Add Product';
                                                            }
                                                        })()}
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
