import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { ProductCategory } from 'reduxSaga/modules/productCategories-module/type/types';

//ProductCategory Types
type ProductCategoryActionColumnProps = {
    row: ProductCategory;
    onEdit: (row: ProductCategory) => void;
};

/**
 * Component for rendering action buttons in the product category table.
 *
 * @component
 * @param {ProductCategoryActionColumnProps} props - The props for the component.
 * @returns {JSX.Element} The action column component with an edit button.
 */
export const ProductCategoryAction: React.FC<ProductCategoryActionColumnProps> = ({
    row,
    onEdit
}) => {
    const handleEditProductCategory = () => {
        onEdit(row);
    };

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-warning btn-rounded d-flex align-items-center ms-2 justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Edit"
                onClick={handleEditProductCategory}
            >
                <Icon icon="solar:pen-outline" className="fs-5" />
            </button>
        </div>
    );
};

/**
 * Generates the action column configuration for the DataTable.
 *
 * @param {(row: ProductCategory) => void} onEdit - Callback function to handle editing a product category.
 * @returns {Object} The column configuration for the DataTable.
 */
export const ProductCategoryActionColumn = (onEdit: (row: ProductCategory) => void) => ({
    name: 'Action',
    cell: (row: ProductCategory) => <ProductCategoryAction row={row} onEdit={onEdit} />,
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

/**
 * Defines the columns for the product category table.
 *
 * @type {TableColumn<ProductCategory>[]}
 */
export const productCategoryTableColumns: TableColumn<ProductCategory>[] = [
    {
        name: 'Category Name',
        selector: (row) => row.category_name,
        sortable: true,
        grow: 1
    },
    {
        name: 'Description',
        selector: (row) => row.category_description,
        grow: 3
    }
];
