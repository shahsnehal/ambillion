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
    deleteProductCategoryRequest,
    fetchProductCategoriesRequest,
    updateProductCategoryRequest
} from 'reduxSaga/modules/productCategories-module/action/actions';
import {
    ProductCategoryActionColumn,
    ProductCategoryDeleteActionParams,
    productCategoryTableColumns
} from './productCategoriesColumn';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
import { ProductCategoryModal } from './productCategoryModal';
import {
    ProductCategory,
    ProductCategoryFormValues
} from 'reduxSaga/modules/productCategories-module/type/types';

export const ProductCategories = () => {
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [selectedDeleteProductCategory, setSelectedDeleteProductCategory] =
        useState<ProductCategoryDeleteActionParams | null>(null);
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
        setProductCategoryFormData({ categoryId: '', categoryName: '', categoryDescription: '' });
        setIsProductCategoryModalOpen(true);
    };

    //Edit ProductCategory
    const handleEditProductCategory = (row: ProductCategory) => {
        setProductCategoryFormData({
            categoryId: row.category_id,
            categoryName: row.category_name,
            categoryDescription: row.category_description
        });
        setIsProductCategoryModalOpen(true);
    };

    //Delete ProductCategory
    const handleDeleteProductCategory = (params: ProductCategoryDeleteActionParams) => {
        setSelectedDeleteProductCategory(params);
    };

    //Delete Confirmation logic
    const handleDeleteConfirmAction = () => {
        if (
            selectedDeleteProductCategory &&
            selectedDeleteProductCategory?.productCategoryId !== ''
        ) {
            dispatch(deleteProductCategoryRequest(selectedDeleteProductCategory.productCategoryId));
            handleCloseModal();
        }
    };

    // Add & Edit Confirmation Logic
    const handleSubmit = (values: ProductCategoryFormValues) => {
        if (values.categoryId) {
            dispatch(
                updateProductCategoryRequest(
                    values.categoryId,
                    values.categoryName,
                    values.categoryDescription
                )
            );
        } else {
            dispatch(addProductCategoryRequest(values.categoryName, values.categoryDescription));
        }
        handleCloseModal();
    };

    //HandleCloseModal For All Actions
    const handleCloseModal = () => {
        setSelectedDeleteProductCategory(null);
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
                    ProductCategoryActionColumn(
                        handleEditProductCategory,
                        handleDeleteProductCategory
                    )
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

            {selectedDeleteProductCategory && (
                <ConfirmationModal
                    isOpen={!!selectedDeleteProductCategory}
                    onClose={handleCloseModal}
                    onConfirm={handleDeleteConfirmAction}
                    title={'Delete ProductCategory'}
                    content={`Are you sure you want to Delete ${selectedDeleteProductCategory?.productCategoryName} category?`}
                    confirmLabel={'Yes'}
                    closeLabel={'No'}
                    confirmBtnClassName={
                        'btn btn-rounded btn-success d-flex align-items-center ms-2'
                    }
                    closeBtnClassName={'btn btn-rounded btn-secondary ms-2'}
                    isLoading={false}
                    confirmIcon={'pepicons-pop:checkmark-circle'}
                    actionInProgressLabel={'Deleting...'}
                />
            )}

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
