import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TableFilter } from 'components/common/table/tableFilter';
import DataTable from 'react-data-table-component';
import { productTableColumns, ActionsColumn, ProductDataRow } from 'utils/table/columns';
import { dummyProductTableData } from 'utils/table/data';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
import { AddProductModal } from 'components/common/modal/addProductModal';

const customStyles = {
    rows: {
        style: {
            minHeight: '50px' // override the row height
        }
    },
    headCells: {
        style: {
            paddingLeft: '6px', // override the cell padding for head cells
            paddingRight: '6px',
            fontSize: '14px',
            fontWeight: 'bold'
        }
    },
    cells: {
        style: {
            paddingLeft: '6px', // override the cell padding for data cells
            paddingRight: '6px'
        }
    }
};

export const ProductList = () => {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [productData, setProductData] = useState(dummyProductTableData);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

    const filteredItems = productData.filter((item) =>
        item.productDisplayName?.toLowerCase().includes(filterText.toLowerCase())
    );

    //Product Add Logic
    const handleOpenAddProductModal = () => {
        setIsAddProductModalOpen(true);
    };

    //Product Delete Logic
    const handleDelete = (id: number) => {
        setDeleteItemId(id);
        setShowConfirmationModal(true);
    };

    const handleConfirmDelete = () => {
        if (deleteItemId !== null) {
            const updatedData = productData.filter((item) => item.id !== deleteItemId);
            setProductData(updatedData);
            setResetPaginationToggle(!resetPaginationToggle);
            setShowConfirmationModal(false);
            setDeleteItemId(null);
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
                        onClick={handleOpenAddProductModal}
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
                columns={[...productTableColumns, ActionsColumn(handleEdit, handleDelete)]}
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
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={handleConfirmDelete}
            />
            <AddProductModal
                onClose={() => setIsAddProductModalOpen(false)}
                isOpen={isAddProductModalOpen}
            />
        </>
    );
};
