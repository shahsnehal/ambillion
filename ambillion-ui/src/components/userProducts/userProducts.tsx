import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { TableFilter } from 'components/common/table/tableFilter';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import {
    customStyles,
    productsListTableColumns,
    productViewEditDeleteActionColumn
} from 'utils/table/columns';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
import { ROUTES } from 'constants/common';
import { RootState } from 'config/store';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductRequest, getProductsRequest } from 'Modules/product-module/action/actions';

type SelectableDeleteRowData = {
    productid: number | null;
    productName: string;
};

export const UserProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [selectDeleteProduct, setSelectDeleteProduct] = useState<SelectableDeleteRowData>({
        productid: null,
        productName: ''
    });
    const { isLoading, products } = useSelector((state: RootState) => state.productModule);

    useEffect(() => {
        dispatch(getProductsRequest());
    }, []);

    const filteredItems = products?.filter((item) =>
        item.product_displayname?.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleAddProduct = () => {
        navigate(ROUTES.ADDPRODUCT);
    };

    //Product Edit Logic
    // const handleEdit = (row: ProductDataRow) => {
    //     navigate(`/products/edit/${row.id}`);
    // };

    const handleEdit = () => {
        navigate('/products/edit');
    };

    const handleView = (productId: number) => {
        navigate(`/productsList/${productId}`);
    };

    //Product Delete Logic
    const handleDelete = (params: { id: number; productDisplayName: string }) => {
        setSelectDeleteProduct({ productid: params.id, productName: params.productDisplayName });
        setShowConfirmationModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectDeleteProduct?.productid) {
            dispatch(deleteProductRequest(selectDeleteProduct.productid));
            setShowConfirmationModal(false);
        }
    };

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className="d-flex align-items-start justify-content-between gap-4">
                <div>
                    <button
                        className="btn btn-primary text-white icon-center"
                        onClick={() => handleAddProduct()}
                    >
                        <Icon icon="tabler:plus"></Icon>
                        Add Product
                    </button>
                </div>
                <div>
                    <TableFilter
                        onFilter={(e: { target: { value: React.SetStateAction<string> } }) =>
                            setFilterText(e.target.value)
                        }
                        onClear={handleClear}
                        filterText={filterText}
                        placeholder="Filter By Product Name"
                    />
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <DataTable
                columns={[
                    ...productsListTableColumns,
                    productViewEditDeleteActionColumn(handleView, handleEdit, handleDelete)
                ]}
                data={filteredItems}
                defaultSortFieldId={'Status'}
                defaultSortAsc={false}
                progressPending={isLoading}
                pagination
                title=" "
                selectableRows
                fixedHeader
                highlightOnHover
                fixedHeaderScrollHeight="450px"
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                customStyles={customStyles}
            />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={handleConfirmDelete}
                isLoading={false}
                title="Delete Product"
                content={`Are you sure you want to delete the product "${selectDeleteProduct.productName}"?`}
                closeLabel="Cancel"
                confirmLabel="Delete"
                actionInProgressLabel="Deleting..."
            />
        </>
    );
};
