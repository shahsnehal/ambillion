export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const FETCH_PRODUCTDETAILS_REQUEST = 'FETCH_PRODUCTDETAILS_REQUEST';
export const FETCH_PRODUCTDETAILS_SUCCESS = 'FETCH_PRODUCTDETAILS_SUCCESS';
export const FETCH_PRODUCTDETAILS_FAILURE = 'FETCH_PRODUCTDETAILS_FAILURE';

export const UPDATE_PRODUCT_STATUS_REQUEST = 'UPDATE_PRODUCT_STATUS_REQUEST';
export const UPDATE_PRODUCT_STATUS_SUCCESS = 'UPDATE_PRODUCT_STATUS_SUCCESS';
export const UPDATE_PRODUCT_STATUS_FAILURE = 'UPDATE_PRODUCT_STATUS_FAILURE';

export const FETCH_IMPORTSTATUS_REQUEST = 'FETCH_IMPORTSTATUS_REQUEST';
export const FETCH_IMPORTSTATUS_SUCCESS = 'FETCH_IMPORTSTATUS_SUCCESS';
export const FETCH_IMPORTSTATUS_FAILURE = 'FETCH_IMPORTSTATUS_FAILURE';

export type NoteProps = {
    note_id: string | number;
    created_by: string;
    note_created_at: string;
    note_description: string;
    user_role: string;
    user_id: string | number;
};

export type ProductDocumentsProps = {
    document_id: string | number;
    document_name: string;
    filetype: string;
    contentpath: string;
    audit_timestamp: string;
    created_by: string;
    role: string;
    base64Data: string;
};
export type ProductDocument = {
    documentType: string;
    documentName: string;
    documentData: string;
};
export type ProductCustomField = {
    FieldName: string;
    FieldValue: string;
};
export type CustomFieldErrors = {
    FieldName?: string;
    FieldValue?: string;
};
export type CustomFieldTouched = {
    FieldName?: boolean;
    FieldValue?: boolean;
};
export type ImportStatus = {
    product_id: number;
    product_displayname: string;
    origin_hsn_code: string;
    country_id: number;
    country_name: string;
    import_status: string;
    notes: NoteProps[] | null;
};
export type Product = {
    product_id: number;
    category_id: number;
    product_displayname: string;
    customer_product_description: string;
    origin_hsn_code: string;
    product_feature: string;
    product_custom_fields?: string;
    category_name: string;
    audit_user_id: number;
    audit_timestamp: string;
    created_date: string;
    created_by: number;
    created_by_name: string;
    inactive_date: string | null;
    country_id: number;
    status: string;
    comments: string;
    notes: NoteProps[] | null;
    product_documents: ProductDocumentsProps[] | null;
    import_status: string;
};

export type ProductFormValues = {
    productId: number | string;
    productDisplayName?: string;
    originHsnCode?: string;
    productCategoryId: string | number | undefined;
    customerProductDescription?: string;
    productFeature?: string;
    productCustomFields: ProductCustomField[];
    productDocuments: ProductDocument[];
};

export type FetchProductsRequestAction = {
    type: typeof FETCH_PRODUCTS_REQUEST;
};

export type FetchProductsSuccessAction = {
    type: typeof FETCH_PRODUCTS_SUCCESS;
    payload: Product[];
};

export type FetchProductsFailureAction = {
    type: typeof FETCH_PRODUCTS_FAILURE;
    error: string;
};

export type UpdateProductStatusRequestAction = {
    type: typeof UPDATE_PRODUCT_STATUS_REQUEST;
    payload: {
        productId: string;
        comments: string;
        status: string;
        commentFor?: string;
        countryId?: string;
    };
};

export type UpdateProductStatusSuccessAction = {
    type: typeof UPDATE_PRODUCT_STATUS_SUCCESS;
    payload: { productId: string; comments: string; status: string; countryId?: string };
};

export type UpdateProductStatusFailureAction = {
    type: typeof UPDATE_PRODUCT_STATUS_FAILURE;
    error: string;
};

export type AddProductRequestAction = {
    type: typeof ADD_PRODUCT_REQUEST;
    payload: ProductFormValues & { navigate: (path: string) => void };
};

export type AddProductSuccessAction = {
    type: typeof ADD_PRODUCT_SUCCESS;
    payload: Product;
};

export type AddProductFailureAction = {
    type: typeof ADD_PRODUCT_FAILURE;
    error: string;
};

export type EditProductRequestAction = {
    type: typeof EDIT_PRODUCT_REQUEST;
    payload: {
        productId: number | string;
        product: ProductFormValues;
        navigate: (path: string) => void;
    };
};

export type EditProductSuccessAction = {
    type: typeof EDIT_PRODUCT_SUCCESS;
    payload: Product;
};

export type EditProductFailureAction = {
    type: typeof EDIT_PRODUCT_FAILURE;
    error: string;
};

export type DeleteProductRequestAction = {
    type: typeof DELETE_PRODUCT_REQUEST;
    payload: number;
};

export type DeleteProductSuccessAction = {
    type: typeof DELETE_PRODUCT_SUCCESS;
    payload: number;
};

export type DeleteProductFailureAction = {
    type: typeof DELETE_PRODUCT_FAILURE;
    error: string;
};

export type FetchProductDetailsRequestAction = {
    type: typeof FETCH_PRODUCTDETAILS_REQUEST;
    payload: number | string;
};

export type FetchProductDetailsSuccessAction = {
    type: typeof FETCH_PRODUCTDETAILS_SUCCESS;
    payload: Product;
};

export type FetchProductDetailsFailureAction = {
    type: typeof FETCH_PRODUCTDETAILS_FAILURE;
    error: string;
};

export type FetchImportStatusRequestAction = {
    type: typeof FETCH_IMPORTSTATUS_REQUEST;
    payload: { productId: number | string; countryId: number | string };
};

export type FetchImportStatusSuccessAction = {
    type: typeof FETCH_IMPORTSTATUS_SUCCESS;
    payload: ImportStatus;
};

export type FetchImportStatusFailureAction = {
    type: typeof FETCH_IMPORTSTATUS_FAILURE;
    error: string;
};

export type ProductActionTypes =
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailureAction
    | UpdateProductStatusRequestAction
    | UpdateProductStatusSuccessAction
    | UpdateProductStatusFailureAction
    | AddProductRequestAction
    | AddProductSuccessAction
    | AddProductFailureAction
    | EditProductRequestAction
    | EditProductSuccessAction
    | EditProductFailureAction
    | DeleteProductRequestAction
    | DeleteProductSuccessAction
    | DeleteProductFailureAction
    | FetchProductDetailsRequestAction
    | FetchProductDetailsSuccessAction
    | FetchProductDetailsFailureAction
    | FetchImportStatusRequestAction
    | FetchImportStatusSuccessAction
    | FetchImportStatusFailureAction;
