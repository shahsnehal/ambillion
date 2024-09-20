import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { TableFilter } from 'components/common/table/tableFilter';
import { customStyles } from 'utils/table/columns';
import { RootState } from 'reduxSaga/config/store';
import { CustomLoader } from 'common/loaders/loader';
import {
    addProductCategoryRequest,
    fetchProductCategoriesRequest,
    updateProductCategoryRequest
} from 'reduxSaga/modules/productCategories-module/action/actions';
import {
    ProductCategoryActionColumn,
    productCategoryTableColumns
} from './productCategoriesColumn';
import { ProductCategoryModal } from './productCategoryModal';
import {
    CategoryDocumentTypePayload,
    ProductCategory,
    ProductCategoryFormValues
} from 'reduxSaga/modules/productCategories-module/type/types';

/**
 * ProductCategories component manages a list of product categories, with functionalities for adding and editing categories.
 *
 * It fetches product category data from the store, filters categories based on the name, and shows a data table with action columns.
 * A modal is used for adding or editing product categories.
 *
 * @component
 * @example
 * return <ProductCategories />;
 */
export const ProductCategories = () => {
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [isProductCategoryModalOpen, setIsProductCategoryModalOpen] = useState<boolean>(false);
    const [productCategoryFormData, setProductCategoryFormData] =
        useState<ProductCategoryFormValues | null>(null);
    const { productCategories, isLoading } = useSelector(
        (state: RootState) => state.productCategoryModule
    );

    /**
     * Fetches product categories when the component mounts.
     */
    useEffect(() => {
        dispatch(fetchProductCategoriesRequest());
    }, []);

    /**
     * Opens the modal for adding a new product category with default form values.
     */
    const handleAddProductCategory = () => {
        setProductCategoryFormData({
            categoryId: '',
            categoryName: '',
            categoryDescription: '',
            documentTypes: []
        });
        setIsProductCategoryModalOpen(true);
    };

    /**
     * Opens the modal for editing an existing product category with the selected category's data.
     *
     * @param {ProductCategory} row - The product category to edit.
     */
    const handleEditProductCategory = (row: ProductCategory) => {
        // Directly map CategoryDocumentType to CategoryDocumentTypePayload
        const documentTypes: CategoryDocumentTypePayload[] = row.documents.map((doc) => ({
            documentTypeId: doc.document_type_id,
            mandatory: Boolean(doc.mandatory)
        }));

        setProductCategoryFormData({
            categoryId: row.category_id,
            categoryName: row.category_name,
            categoryDescription: row.category_description,
            documentTypes
        });
        setIsProductCategoryModalOpen(true);
    };

    /**
     * Submits the form data to either add or update a product category based on the presence of a categoryId.
     *
     * @param {ProductCategoryFormValues} values - The form values to submit.
     */
    const handleSubmit = (values: ProductCategoryFormValues) => {
        if (values.categoryId) {
            dispatch(
                updateProductCategoryRequest(
                    values.categoryId,
                    values.categoryName,
                    values.categoryDescription,
                    values.documentTypes
                )
            );
        } else {
            dispatch(
                addProductCategoryRequest(
                    values.categoryName,
                    values.categoryDescription,
                    values.documentTypes
                )
            );
        }
        handleCloseModal();
    };

    /**
     * Closes the modal and clears the form data.
     */
    const handleCloseModal = () => {
        setProductCategoryFormData(null);
        setIsProductCategoryModalOpen(false);
    };

    /**
     * Filters product categories based on the provided filter text.
     *
     * @type {Array<ProductCategory>}
     */
    const filteredCategories = useMemo(() => {
        const lowercasedFilterText = filterText.toLowerCase();

        return productCategories.filter((category) => {
            const fieldsToSearch = [category.category_name, category.category_description];

            return fieldsToSearch.some((field) =>
                field?.toLowerCase().includes(lowercasedFilterText)
            );
        });
    }, [filterText, productCategories]);

    /**
     * Creates a memoized subheader component for the data table.
     *
     * Includes a filter input and a clear button to manage the filter text.
     *
     * @returns {JSX.Element} The subheader component.
     */
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className="d-flex align-items-start justify-content-between gap-4 mt-3">
                <div>
                    <button
                        className="btn btn-rounded btn-primary ms-2 gap-2 mt-3"
                        onClick={() => handleAddProductCategory()}
                    >
                        <Icon icon="tabler:plus" className="me-1" />
                        Add Category
                    </button>
                </div>

                <div className="d-flex align-items-start justify-content-between gap-4 mt-3">
                    <TableFilter
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFilterText(e.target.value)
                        }
                        onClear={handleClear}
                        filterText={filterText}
                        placeholder="Filter Category..."
                    />
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <DataTable
                columns={[
                    ...productCategoryTableColumns,
                    ProductCategoryActionColumn(handleEditProductCategory)
                ]}
                data={filteredCategories}
                progressPending={isLoading}
                progressComponent={<CustomLoader />}
                pagination
                fixedHeader
                highlightOnHover
                fixedHeaderScrollHeight="450px"
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                customStyles={customStyles}
            />

            {isProductCategoryModalOpen && (
                <ProductCategoryModal
                    isOpen={isProductCategoryModalOpen}
                    onClose={handleCloseModal}
                    productCategoryFormData={productCategoryFormData}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};
