import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TableFilter } from 'components/common/table/tableFilter';
import DataTable from 'react-data-table-component';
import {
    customStyles,
    productTableColumns,
    productEditDeleteActionColumn,
    ProductDataRow
} from 'utils/table/columns';
import { dummyProductTableData } from 'utils/table/data';
import { DeleteConfirmationModal } from 'components/common/modal/deleteConfirmationModal';
import { ProductFormModal } from 'components/common/modal/productFormModal';

type SelectableDeleteRowData = {
    productid: number | null;
    productName: string;
};

export const ProductList = () => {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [productData, setProductData] = useState(dummyProductTableData);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [showProductFormModal, setShowProductFormModal] = useState<boolean>(false);
    const [selectDeleteProduct, setSelectDeleteProduct] = useState<SelectableDeleteRowData>({
        productid: null,
        productName: ''
    });

    const filteredItems = productData.filter((item) =>
        item.productDisplayName?.toLowerCase().includes(filterText.toLowerCase())
    );

    //Product Add Logic
    const handleOpenProductFormModal = () => {
        setShowProductFormModal(true);
    };

    const handleConfirmAddProduct = () => {
        setShowProductFormModal(false);
    };

    //Product Delete Logic
    const handleDelete = (params: { id: number; productDisplayName: string }) => {
        setSelectDeleteProduct({ productid: params.id, productName: params.productDisplayName });
        setShowConfirmationModal(true);
    };

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

    const handleEdit = (editedRow: ProductDataRow) => {
        console.log('Edit action:', editedRow);
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
                        onClick={handleOpenProductFormModal}
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
                    productEditDeleteActionColumn(handleEdit, handleDelete)
                ]}
                data={filteredItems}
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
            <DeleteConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={handleConfirmDelete}
                isLoading={false}
                title="Delete Product"
                content={`Are you sure you want to delete the product "${selectDeleteProduct.productName}"?`}
                closeLabel="Cancel"
                confirmLabel="Delete"
            />
            <ProductFormModal
                isOpen={showProductFormModal}
                onClose={() => setShowProductFormModal(false)}
                onSubmit={handleConfirmAddProduct}
            />
        </>
    );
};
