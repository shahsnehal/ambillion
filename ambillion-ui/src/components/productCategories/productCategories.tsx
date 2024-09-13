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

    //Fetch ProductCategory
    useEffect(() => {
        dispatch(fetchProductCategoriesRequest());
    }, []);

    //Add ProductCategory
    const handleAddProductCategory = () => {
        setProductCategoryFormData({
            categoryId: '',
            categoryName: '',
            categoryDescription: '',
            documentTypes: []
        });
        setIsProductCategoryModalOpen(true);
    };

    // Edit ProductCategory
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

    // Add & Edit Confirmation Logic
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

    //HandleCloseModal For All Actions
    const handleCloseModal = () => {
        setProductCategoryFormData(null);
        setIsProductCategoryModalOpen(false);
    };

    //Filter Functionality
    const filteredItems = useMemo(
        () =>
            productCategories.filter((item) =>
                item.category_name.toLowerCase().includes(filterText.toLowerCase())
            ),
        [filterText, productCategories]
    );

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
                        placeholder="Filter By Category Name"
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
                data={filteredItems}
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
