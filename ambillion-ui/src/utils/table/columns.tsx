import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { User } from 'reduxSaga/modules/user-module/type/types';
import { Product } from 'reduxSaga/modules/product-module/type/types';
import { userStatus, productStatus } from 'constants/common';
import productImage from 'assets/images/product.jpg';

export const customStyles = {
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

const getUserStatusClass = (status: string): string => {
    switch (status) {
        case userStatus.ACCEPTED:
            return 'bg-success-subtle text-success';
        case userStatus.REJECTED:
            return 'bg-danger-subtle text-danger';
        case userStatus.PENDING:
            return 'bg-info-subtle text-info';
        default:
            return '';
    }
};

const getProductStatusClass = (status: string): string => {
    switch (status) {
        case productStatus.APPROVED:
            return 'bg-success-subtle text-success';
        case productStatus.REJECTED:
            return 'bg-danger-subtle text-danger';
        case productStatus.PENDING:
            return 'bg-info-subtle text-info';
        case productStatus.INREVIEW:
            return 'bg-warning-subtle text-warning';
        case productStatus.ONHOLD:
            return 'bg-secondary-subtle text-secondary';
        default:
            return '';
    }
};

type DeleteActionParams = {
    id: number;
    productDisplayName: string;
};

type ProductViewEditDeleteActionProps = {
    row: Product;
    onView: (id: number) => void;
    onEdit: (row: Product) => void;
    onDelete: (params: DeleteActionParams) => void;
};

//UserStatusChangeTypes
type UserStatusChangeActionProps = {
    status: string;
    onApprove: () => void;
    onReject: () => void;
};

//ProductStatusChangeTypes
type ProductStatusChangeActionProps = {
    productId: number;
    currentStatus: string;
    currentComment: string;
    onOpenModal: (productId: number, status: string, comments: string) => void;
};

export const UserStatusChangeAction: React.FC<UserStatusChangeActionProps> = ({
    status,
    onApprove,
    onReject
}) => {
    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-success rounded-circle d-flex align-items-center justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Approve"
                onClick={onApprove}
                disabled={status === userStatus.ACCEPTED}
            >
                <Icon icon="solar:check-circle-outline" className="fs-5" />
            </button>
            <button
                className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Reject"
                onClick={onReject}
                disabled={status === userStatus.REJECTED}
            >
                <Icon icon="solar:close-circle-outline" className="fs-5" />
            </button>
        </div>
    );
};

export const ProductStatusChangeAction: React.FC<ProductStatusChangeActionProps> = ({
    productId,
    currentStatus,
    currentComment,
    onOpenModal
}) => {
    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Change Status"
                onClick={() => onOpenModal(productId, currentStatus, currentComment)}
            >
                <Icon icon="solar:pen-outline" className="fs-5" />
            </button>
        </div>
    );
};

export const UserStatusChangeActionColumn = (
    onApprove: (userId: number) => void,
    onReject: (userId: number) => void
) => ({
    name: 'Actions',
    cell: (row: User) => (
        <UserStatusChangeAction
            status={row.status}
            onApprove={() => onApprove(row.userprofile_id)}
            onReject={() => onReject(row.userprofile_id)}
        />
    ),
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

export const ProductStatusChangeActionColumn = (
    onOpenModal: (productId: string, currentStatus: string, currentComment: string) => void
) => ({
    name: 'Action',
    cell: (row: Product) => (
        <ProductStatusChangeAction
            productId={row.product_id}
            currentStatus={row.status}
            currentComment={row.comments}
            onOpenModal={() => onOpenModal(row.product_id.toString(), row.status, row.comments)}
        />
    ),
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

// ProductEditDeleteAction component renders edit and delete actions for a table row.
export const ProductViewEditDeleteAction: React.FC<ProductViewEditDeleteActionProps> = ({
    row,
    onView,
    onEdit,
    onDelete
}) => {
    const handleView = () => {
        onView(row.product_id);
    };

    const handleEdit = () => {
        onEdit(row);
    };

    const handleDelete = () => {
        onDelete({ id: row.product_id, productDisplayName: row.product_displayname });
    };

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-muted rounded-circle d-flex align-items-center justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="View"
                onClick={handleView}
            >
                <Icon icon="solar:eye-outline" className="fs-5" />
            </button>
            <button
                className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Edit"
                onClick={handleEdit}
            >
                <Icon icon="solar:pen-outline" className="fs-5" />
            </button>
            <button
                className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Delete"
                onClick={handleDelete}
            >
                <Icon icon="solar:trash-bin-minimalistic-outline" className="fs-5" />
            </button>
        </div>
    );
};

//  productEditDeleteActionColumn configures the Edit/Delete Actions column for a React data table.
export const productViewEditDeleteActionColumn = (
    onView: (id: number) => void,
    onEdit: (id: Product) => void,
    onDelete: (params: DeleteActionParams) => void
) => ({
    name: 'Actions',
    cell: (row: Product) => (
        <ProductViewEditDeleteAction
            row={row}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    ),
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

export const userTableColumns: TableColumn<User>[] = [
    {
        name: 'First Name',
        selector: (row) => row.first_name,
        sortable: true
    },
    {
        name: 'Last Name',
        selector: (row) => row.last_name,
        sortable: true
    },
    {
        name: 'Company Name',
        selector: (row) => row.company_name ?? '',
        sortable: true
    },
    {
        name: 'Mobile Number',
        selector: (row) => row.mobile_number,
        sortable: true
    },
    {
        name: 'Email Address',
        selector: (row) => row.email,
        sortable: true
    },
    {
        id: 'Status',
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
        cell: (row) => (
            <span className={`badge ${getUserStatusClass(row.status)} rounded fw-semibold p-2`}>
                {row.status}
            </span>
        )
    }
];

//ProductListTableColumn For Officer
export const productsTableColumns: TableColumn<Product>[] = [
    {
        name: 'HSN Code',
        selector: (row) => row.origin_hsn_code,
        sortable: true
    },
    // {
    //     name: 'Manufacturer Name',
    //     selector: (row) => row.manufacturerName,
    //     sortable: true
    // },
    {
        name: 'Image',
        // selector: (row) => row.product_custom_fields,
        cell: (row) => <img src={productImage} alt={row.product_displayname} width="50" />,
        sortable: false
    },
    {
        name: 'Category',
        selector: (row) => row.product_category_id,
        sortable: true
    },
    {
        name: 'Feature',
        selector: (row) => row.product_feature,
        sortable: true
    },
    {
        name: 'Name',
        selector: (row) => row.product_displayname,
        sortable: true
    },
    {
        name: 'Description',
        selector: (row) => row.customer_product_description,
        sortable: true
    },
    {
        id: 'Status',
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
        cell: (row) => (
            <span className={`badge ${getProductStatusClass(row.status)} rounded fw-semibold p-2`}>
                {row.status}
            </span>
        )
    }
];

//ProductsTableColumn For Manufacturer
export const productsListTableColumns: TableColumn<Product>[] = [
    {
        name: 'HSN Code',
        selector: (row) => row.origin_hsn_code,
        sortable: true
    },
    {
        name: 'Image',
        // selector: (row) => row.product_custom_fields,
        cell: (row) => <img src={productImage} alt={row.product_displayname} width="50" />,
        sortable: false
    },
    {
        name: 'Category',
        selector: (row) => row.product_category_id,
        sortable: true
    },
    {
        name: 'Feature',
        selector: (row) => row.product_feature,
        sortable: true
    },
    {
        name: 'Name',
        selector: (row) => row.product_displayname,
        sortable: true
    },
    {
        name: 'Description',
        selector: (row) => row.customer_product_description,
        sortable: true
    },
    {
        id: 'Status',
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
        cell: (row) => (
            <span className={`badge ${getProductStatusClass(row.status)} rounded fw-semibold p-2`}>
                {row.status}
            </span>
        )
    }
];
