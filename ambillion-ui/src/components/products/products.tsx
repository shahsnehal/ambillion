import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { TableFilter } from 'components/common/table/tableFilter';
import { ProductStatusModal } from './productStatusModal';
import { customStyles, productsTableColumns, ProductActionColumn } from 'utils/table/columns';
import { RootState } from 'reduxSaga/config/store';
import {
    fetchProductsRequest,
    updateProductStatusRequest
} from 'reduxSaga/modules/product-module/action/actions';
import { CustomLoader } from 'common/loaders/loader';
import { getLocalStorage } from 'utils/localStorage';
import { localStorageKey, ROUTES, userRoles } from 'constants/common';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE) || {};
    const { role_name: userRole } = userProfile || null;
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

    //Filter Functionality
    const filteredItems = useMemo(
        () =>
            products?.filter((item) =>
                item.product_displayname.toLowerCase().includes(filterText.toLowerCase())
            ),
        [filterText, products]
    );

    //ProductStatus Change ModalOpen
    const handleOpenModal = (productId: string, status: string, comments: string) => {
        setSelectedProductId(productId);
        setCurrentStatus(status);
        setCurrentComment(comments);
        setIsModalOpen(true);
    };

    //ProductStatus Change ModalClose
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProductId('');
        setCurrentStatus('');
        setCurrentComment('');
    };

    //ProductStatus Change Functionality
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

    //AddProduct Route
    const handleAddProduct = () => {
        navigate(ROUTES.ADDPRODUCT);
    };

    //EditProduct Route
    const handleEdit = () => {
        navigate(`${ROUTES.PRODUCTS}`);
    };

    //ProductDetailView Route
    const handleView = (productId: number) => {
        navigate(`${ROUTES.PRODUCTS}/${productId}`);
    };

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className="d-flex align-items-start justify-content-between gap-4 mt-3">
                {userRole === userRoles.MANUFACTURER && (
                    <div>
                        <button
                            className="btn btn-primary text-white icon-center gap-2 mt-3"
                            onClick={() => handleAddProduct()}
                        >
                            <Icon icon="tabler:plus" />
                            Add Product
                        </button>
                    </div>
                )}
                <div className="d-flex align-items-start justify-content-between gap-4 mt-3">
                    <TableFilter
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                    ...productsTableColumns,
                    ProductActionColumn(userRole, handleEdit, handleOpenModal)
                ]}
                data={filteredItems}
                progressPending={isLoading}
                progressComponent={<CustomLoader />}
                onRowClicked={(row) => handleView(row.product_id)}
                pagination
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
