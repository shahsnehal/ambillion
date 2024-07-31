import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { TableFilter } from 'components/common/table/tableFilter';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import {
    customStyles,
    productsListTableColumns,
    productViewEditActionColumn
} from 'utils/table/columns';
import { ROUTES } from 'constants/common';
import { RootState } from 'reduxSaga/config/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsRequest } from 'reduxSaga/modules/product-module/action/actions';
import { CustomLoader } from 'common/loaders/loader';

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
        item.product_displayname.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleAddProduct = () => {
        navigate(ROUTES.ADDPRODUCT);
    };

    //Product Edit Logic
    // const handleEdit = (row: ProductDataRow) => {
    //     navigate(`/products/edit/${row.id}`);
    // };

    const handleEdit = () => {
        navigate(`${ROUTES.PRODUCTSLIST}`);
    };

    const handleView = (productId: number) => {
        navigate(`${ROUTES.PRODUCTSLIST}/${productId}`);
    };

    const subHeaderComponentMemo = React.useMemo(() => {
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
                productViewEditActionColumn(handleView, handleEdit)
            ]}
            data={filteredItems}
            progressPending={isLoading}
            progressComponent={<CustomLoader />}
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
    );
};
