import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TableFilter } from 'components/common/table/tableFilter';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import {
    customStyles,
    productTableColumns,
    productViewEditDeleteActionColumn,
    ProductDataRow
} from 'utils/table/columns';
import { dummyProductTableData } from 'utils/table/data';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
import { ROUTES } from 'constants/common';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteProductRequest } from 'Modules/product-module/action/actions';
// import { RootState } from 'config/store';
// import { getProductsRequest } from 'Modules/product-module/action/actions';

type SelectableDeleteRowData = {
    productid: number | null;
    productName: string;
};

export const Products = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    // const [pending, setPending] = useState<boolean>(true);
    const [productData, setProductData] = useState(dummyProductTableData);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [selectDeleteProduct, setSelectDeleteProduct] = useState<SelectableDeleteRowData>({
        productid: null,
        productName: ''
    });
    // const { products } = useSelector((state: RootState) => state.productModule);

    // useEffect(() => {
    //     const getProducts = () => {
    //         setPending(true);
    //         dispatch(getProductsRequest());
    //         setPending(false);
    //     };
    //     getProducts();
    // }, [dispatch]);

    const filteredItems = productData.filter((item) =>
        item.productDisplayName?.toLowerCase().includes(filterText.toLowerCase())
    );

    // const filteredItems = products.filter((product) =>
    //     product.name?.toLowerCase().includes(filterText.toLowerCase())
    // );

    const handleAddProduct = () => {
        navigate(ROUTES.ADDPRODUCT);
    };

    //Product Edit Logic
    const handleEdit = (row: ProductDataRow) => {
        navigate(`/products/edit/${row.id}`);
    };

    const handleView = (productId: number) => {
        navigate(`/products/${productId}`);
    };

    //Product Delete Logic
    const handleDelete = (params: { id: number; productDisplayName: string }) => {
        setSelectDeleteProduct({ productid: params.id, productName: params.productDisplayName });
        setShowConfirmationModal(true);
    };

    // Confirm Delete Logic
    const handleConfirmDelete = () => {
        if (selectDeleteProduct.productid) {
            const updatedData = productData.filter(
                (item) => item.id !== selectDeleteProduct.productid
            );
            setProductData(updatedData);
            setResetPaginationToggle(!resetPaginationToggle);
            setShowConfirmationModal(false);
        }
    };

    // const handleConfirmDelete = () => {
    //     if (selectDeleteProduct?.productid) {
    //         dispatch(deleteProductRequest(selectDeleteProduct.productid));
    //         setShowConfirmationModal(false);
    //     }
    // };

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
                    ...productTableColumns,
                    productViewEditDeleteActionColumn(handleView, handleEdit, handleDelete)
                ]}
                data={filteredItems}
                defaultSortFieldId={'Status'}
                defaultSortAsc={false}
                // progressPending={pending}
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
