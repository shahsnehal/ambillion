import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { TableFilter } from 'components/common/table/tableFilter';
import { ProductStatusModal } from './productStatusModal';
import {
    customStyles,
    productsTableColumns,
    ProductStatusChangeActionColumn
} from 'utils/table/columns';
import { RootState } from 'reduxSaga/config/store';
import {
    fetchProductsRequest,
    updateProductStatusRequest
} from 'reduxSaga/modules/product-module/action/actions';

export const Products = () => {
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [currentStatus, setCurrentStatus] = useState<string>('');
    const [currentComment, setCurrentComment] = useState<string>('');

    const { products, isLoading } = useSelector((state: RootState) => state.productModule);

    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, []);

    const filteredItems = useMemo(
        () =>
            products.filter((item) =>
                item.product_displayname?.toLowerCase().includes(filterText.toLowerCase())
            ),
        [filterText, products]
    );

    const handleOpenModal = (productId: string, status: string, comments: string) => {
        setSelectedProductId(productId);
        setCurrentStatus(status);
        setCurrentComment(comments);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProductId('');
        setCurrentStatus('');
        setCurrentComment('');
    };

    const handleConfirmStatusChange = (
        productId: string,
        newStatus: string,
        newComment: string
    ) => {
        if (productId !== null) {
            dispatch(updateProductStatusRequest(productId, newStatus, newComment));
        }
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
                    ...productsTableColumns,
                    ProductStatusChangeActionColumn(handleOpenModal)
                ]}
                data={filteredItems}
                defaultSortFieldId="Status"
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

            <ProductStatusModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                productId={selectedProductId ?? 0}
                currentStatus={currentStatus}
                currentComment={currentComment}
                onConfirm={handleConfirmStatusChange}
            />
        </>
    );
};
