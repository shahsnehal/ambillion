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
import ProductFormModal, { ProductFormValues } from 'components/common/modal/productFormModal';

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
    const [editedProduct, setEditedProduct] = useState<ProductDataRow | null>(null);
    const [selectDeleteProduct, setSelectDeleteProduct] = useState<SelectableDeleteRowData>({
        productid: null,
        productName: ''
    });

    const filteredItems = productData.filter((item) =>
        item.productDisplayName?.toLowerCase().includes(filterText.toLowerCase())
    );

    //Product Add/Edit Logic
    const handleOpenProductFormModal = (product?: ProductDataRow) => {
        console.log('product', product);
        if (product) {
            setEditedProduct(product);
        } else {
            setEditedProduct(null);
        }
        setShowProductFormModal(true);
    };

    //Confirm Add Logic
    const handleConfirmAddProduct = (values: ProductFormValues) => {
        const newProduct: ProductDataRow = {
            id: productData.length + 1,
            ...values
        };
        setProductData([...productData, newProduct]);
        setShowProductFormModal(false);
    };

    //Product Edit Logic
    const handleEdit = (editedRow: ProductDataRow) => {
        handleOpenProductFormModal(editedRow);
    };

    //Confirm Edit Logic
    const handleConfirmEditProduct = (values: ProductFormValues) => {
        if (editedProduct) {
            const updatedData = productData.map((item) =>
                item.id === editedProduct.id ? { ...item, ...values } : item
            );
            setProductData(updatedData);
            setShowProductFormModal(false);
        }
    };

    //Product Delete Logic
    const handleDelete = (params: { id: number; productDisplayName: string }) => {
        setSelectDeleteProduct({ productid: params.id, productName: params.productDisplayName });
        setShowConfirmationModal(true);
    };

    //Confirm Delete Logic
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
                        onClick={() => handleOpenProductFormModal()}
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
                // onRowClicked={handleRowClick}
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
                onClose={() => {
                    setShowProductFormModal(false);
                    setEditedProduct(null);
                }}
                onSubmit={editedProduct ? handleConfirmEditProduct : handleConfirmAddProduct}
                initialValues={editedProduct ? { ...editedProduct } : undefined}
                title={editedProduct ? 'Edit Product' : 'Add Product'}
                submitLabel={editedProduct ? 'Update' : 'Add'}
            />
        </>
    );
};
