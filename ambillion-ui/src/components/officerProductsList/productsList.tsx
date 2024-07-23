import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { TableFilter } from 'components/common/table/tableFilter';
import { ProductStatusModal } from './productStatusModal';
import { dummyProductsListTableData } from 'utils/table/data';
import {
    customStyles,
    productsListTableColumns,
    ProductStatusChangeActionColumn
} from 'utils/table/columns';

export const ProductsList = () => {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [productListData, setProductListData] = useState(dummyProductsListTableData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [currentStatus, setCurrentStatus] = useState<string>('');

    const filteredItems = useMemo(
        () =>
            productListData.filter((item) =>
                item.productDisplayName?.toLowerCase().includes(filterText.toLowerCase())
            ),
        [filterText, productListData]
    );

    const handleOpenModal = (productId: number, status: string) => {
        setSelectedProduct(productId);
        setCurrentStatus(status);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setCurrentStatus('');
    };

    const handleConfirmStatusChange = (productId: number, newStatus: string, comments: string) => {
        setProductListData((prevData) =>
            prevData.map((product) =>
                product.productId === productId
                    ? { ...product, status: newStatus, comments }
                    : product
            )
        );
        handleCloseModal();
    };

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className="d-flex align-items-start justify-content-between gap-4">
                <TableFilter
                    onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFilterText(e.target.value)
                    }
                    onClear={handleClear}
                    filterText={filterText}
                    placeholder="Filter By Product Name"
                />
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <DataTable
                columns={[
                    ...productsListTableColumns,
                    ProductStatusChangeActionColumn(handleOpenModal)
                ]}
                data={filteredItems}
                defaultSortFieldId="Status"
                defaultSortAsc={false}
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

            <ProductStatusModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                productId={selectedProduct ?? 0}
                currentStatus={currentStatus}
                onConfirm={handleConfirmStatusChange}
            />
        </>
    );
};
