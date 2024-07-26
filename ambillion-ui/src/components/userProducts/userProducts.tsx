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
import { ROUTES } from 'constants/common';
import { RootState } from 'reduxSaga/config/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsRequest } from 'reduxSaga/modules/product-module/action/actions';

export const UserProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const { isLoading, products } = useSelector((state: RootState) => state.productModule);

    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, []);

    const filteredItems = products.filter((item) =>
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
        <DataTable
            columns={[
                ...productsListTableColumns,
                productViewEditDeleteActionColumn(handleView, handleEdit)
            ]}
            data={filteredItems}
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
    );
};
