import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { User } from 'reduxSaga/modules/user-module/type/types';
import { Product } from 'reduxSaga/modules/product-module/type/types';
import { userStatus, productStatus, userRoles } from 'constants/common';

export const customStyles = {
    rows: {
        style: {
            minHeight: '50px', // override the row height
            '&:hover': {
                cursor: 'pointer'
            }
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

export const getProductStatusClass = (status: string): string => {
    switch (status) {
        case productStatus.PENDING:
            return 'bg-warning-subtle text-warning';
        case productStatus.UNDER_VERIFICATION:
            return 'bg-info-subtle text-info';
        case productStatus.VERIFIED:
            return 'bg-success-subtle text-success';
        case productStatus.INFO_NEEDED:
            return 'bg-secondary-subtle text-secondary';
        case productStatus.SENT_FOR_APPROVAL:
            return 'bg-info-subtle text-info';
        case productStatus.UNDER_EXPORT_APPROVAL:
            return 'bg-info-subtle text-info';
        case productStatus.EXPORT_INFO_NEEDED:
            return 'bg-secondary-subtle text-secondary';
        case productStatus.APPROVED:
            return 'bg-success-subtle text-success';
        default:
            return '';
    }
};

//User Status Change Types
type UserStatusChangeActionProps = {
    status: string;
    onApprove: () => void;
    onReject: () => void;
};

//User Staus Change Action
export const UserStatusChangeAction: React.FC<UserStatusChangeActionProps> = ({
    status,
    onApprove,
    onReject
}) => {
    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-success btn-rounded d-flex align-items-center justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Approve"
                onClick={onApprove}
                disabled={status === userStatus.ACCEPTED}
            >
                <Icon icon="solar:check-circle-outline" className="fs-5" />
            </button>
            <button
                className="btn btn-secondary btn-rounded d-flex align-items-center justify-content-center p-2"
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

//User Status Change Action Column
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

//User Table Columns
export const userTableColumns: TableColumn<User>[] = [
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        wrap: true
    },
    {
        name: 'Company Name',
        selector: (row) => row.company_name ?? '',
        sortable: true
    },
    {
        name: 'Email Address',
        selector: (row) => row.email,
        sortable: true,
        grow: 1,
        wrap: true
    },
    {
        name: 'Mobile Number',
        selector: (row) => row.mobile_number,
        sortable: true
    },
    {
        name: 'Created Date',
        selector: (row) => {
            const date = new Date(row.created_timestamp);
            const [formattedDate] = date.toISOString().split('T');
            return formattedDate;
        },
        sortable: true
    },
    {
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

//Product Table Type
type ProductActionColumnProps = {
    row: Product;
    onEdit: (row: Product) => void;
    currentStatus: string;
    userRole: string;
};

//Product Table Actions
export const ProductAction: React.FC<ProductActionColumnProps> = ({
    row,
    onEdit,
    currentStatus,
    userRole
}) => {
    const handleEdit = () => {
        onEdit(row);
    };
    return (
        <div className="d-flex gap-2">
            {(userRole === userRoles.ADMIN || userRole === userRoles.OFFICER) && (
                <button
                    className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-2"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Change Status"
                    disabled={currentStatus === productStatus.APPROVED}
                >
                    <Icon icon="solar:pen-outline" className="fs-5" />
                </button>
            )}
            {userRole === userRoles.MANUFACTURER && (
                <button
                    className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center p-2"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Edit"
                    onClick={handleEdit}
                >
                    <Icon icon="solar:pen-outline" className="fs-5" />
                </button>
            )}
        </div>
    );
};

export const ProductActionColumn = (userRole: string, onEdit: (id: Product) => void) => ({
    name: 'Action',
    cell: (row: Product) => (
        <ProductAction row={row} onEdit={onEdit} currentStatus={row.status} userRole={userRole} />
    ),
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

//Product Table Columns
export const productsTableColumns: TableColumn<Product>[] = [
    {
        name: 'Name',
        selector: (row) => row.product_displayname,
        sortable: true
    },
    {
        name: 'HSN Code',
        selector: (row) => row.origin_hsn_code,
        sortable: true
    },
    {
        name: 'Category',
        selector: (row) => row.category_name,
        sortable: true
    },
    {
        name: 'Feature',
        selector: (row) => row.product_feature,
        sortable: true
    },
    {
        name: 'Description',
        selector: (row) => row.customer_product_description,
        sortable: true
    },
    {
        name: 'Export Status',
        selector: (row) => row.status,
        sortable: true,
        cell: (row) => (
            <span className={`badge ${getProductStatusClass(row.status)} rounded fw-semibold p-2`}>
                {row.status}
            </span>
        )
    }
];
