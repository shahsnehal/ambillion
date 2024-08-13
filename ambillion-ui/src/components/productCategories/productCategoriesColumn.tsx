import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { ProductCategory } from 'reduxSaga/modules/productCategories-module/type/types';

//ProductCategory Types
type ProductCategoryActionColumnProps = {
    row: ProductCategory;
    onEdit: (row: ProductCategory) => void;
};

//ProductCategory Action
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

//ProductCategory Action Columns
export const ProductCategoryActionColumn = (onEdit: (row: ProductCategory) => void) => ({
    name: 'Action',
    cell: (row: ProductCategory) => <ProductCategoryAction row={row} onEdit={onEdit} />,
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

//ProductCategory Tabellist
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
