import { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { TableFilter } from 'components/common/table/tableFilter';
import { customStyles, productsTableColumns } from 'utils/table/columns';
import { RootState } from 'reduxSaga/config/store';
import { fetchProductsRequest } from 'reduxSaga/modules/product-module/action/actions';
import { CustomLoader } from 'common/loaders/loader';
import { getLocalStorage } from 'utils/localStorage';
import { localStorageKey, ROUTES, userRoles } from 'constants/common';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'utils/common';

/**
 * Component for displaying a list of products with filter functionality.
 * The component fetches the products, allows filtering by product name,
 * and provides navigation to add a new product or view product details.
 */
export const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE) || {};
    const { role_name: userRole } = userProfile || null;
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const { products, isLoading } = useSelector((state: RootState) => state.productModule);

    // Debounce the filter text to avoid excessive re-renders
    const debouncedFilterText = useDebounce(filterText, 500);

    /**
     * Fetches products when the component mounts.
     */
    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, []);

    /**
     * Filters the products based on the filterText input.
     *
     * @returns {Product[]} - Filtered list of products where the  matches the filter text.
     */

    const filteredProducts = useMemo(() => {
        const lowercasedFilterText = debouncedFilterText.toLowerCase();

        return products?.filter((item) => {
            const fieldsToSearch = [
                item.product_displayname,
                item.origin_hsn_code,
                item.category_name,
                item.product_feature,
                item.customer_product_description,
                item.status
            ];

            return fieldsToSearch.some((field) =>
                field?.toLowerCase().includes(lowercasedFilterText)
            );
        });
    }, [debouncedFilterText, products]);

    /**
     * Navigates to the Add Product route.
     */
    const handleAddProduct = () => {
        navigate(ROUTES.ADDPRODUCT);
    };

    /**
     * Navigates to the Product Detail View route for a specific product.
     *
     * @param {number} productId - The ID of the product to view.
     */
    const handleView = (productId: number) => {
        navigate(`${ROUTES.PRODUCTS}/${productId}`);
    };

    /**
     * Creates the sub-header component with a clear button for filtering.
     * Clears the filter text and resets pagination if filter text exists.
     *
     * @returns {JSX.Element} - The sub-header component.
     */
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-4 mt-3">
                {userRole === userRoles.MANUFACTURER && (
                    <div className="mb-sm-0">
                        <button
                            className="btn btn-primary text-white icon-center gap-2"
                            onClick={() => handleAddProduct()}
                        >
                            <Icon icon="tabler:plus" />
                            Add Product
                        </button>
                    </div>
                )}
                <div className="flex-grow-1">
                    <TableFilter
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFilterText(e.target.value)
                        }
                        onClear={handleClear}
                        filterText={filterText}
                        placeholder="Filter Products..."
                    />
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={productsTableColumns(userRole)}
            data={filteredProducts}
            progressPending={isLoading}
            progressComponent={<CustomLoader />}
            onRowClicked={(row) => handleView(row.product_id)}
            pagination
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
