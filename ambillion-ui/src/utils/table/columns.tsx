import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { User } from 'reduxSaga/modules/user-module/type/types';
import { Product } from 'reduxSaga/modules/product-module/type/types';
import { userStatus, productStatus, userRoles } from 'constants/common';

/**
 * Custom styles for DataTable components.
 *
 * @typedef {Object} CustomStyles
 * @property {Object} rows - Styles applied to the rows of the table.
 * @property {Object} headCells - Styles applied to the header cells of the table.
 * @property {Object} cells - Styles applied to the data cells of the table.
 */
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

/**
 * Gets the CSS class for a user status.
 *
 * @param {string} status - The status of the user.
 * @returns {string} The CSS class corresponding to the user status.
 */
export const getUserStatusClass = (status: string): string => {
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

/**
 * Gets the CSS class for a product status.
 *
 * @param {string} status - The status of the product.
 * @returns {string} The CSS class corresponding to the product status.
 */
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
        case productStatus.SENT_FOR_EXPORT_APPROVAL:
            return 'bg-info-subtle text-info';
        case productStatus.UNDER_EXPORT_APPROVAL:
            return 'bg-info-subtle text-info';
        case productStatus.EXPORT_INFO_NEEDED:
            return 'bg-secondary-subtle text-secondary';
        case productStatus.EXPORT_APPROVED:
            return 'bg-success-subtle text-success';
        case productStatus.SENT_FOR_IMPORT_APPROVAL:
            return 'bg-info-subtle text-info';
        case productStatus.UNDER_IMPORT_APPROVAL:
            return 'bg-info-subtle text-info';
        case productStatus.IMPORT_INFO_NEEDED:
            return 'bg-secondary-subtle text-secondary';
        case productStatus.IMPORT_APPROVED:
            return 'bg-success-subtle text-success';
        case productStatus.IMPORT_REJECTED:
            return 'bg-success-subtle text-danger';
        default:
            return '';
    }
};

/**
 * Props for the UserStatusChangeAction component.
 *
 * @typedef {Object} UserStatusChangeActionProps
 * @property {string} status - The current status of the user.
 * @property {() => void} onApprove - Function to call when the user is approved.
 * @property {() => void} onReject - Function to call when the user is rejected.
 * @property {() => void} onView - Function to call when the user details is shown.
 */

/**
 * A component that provides buttons for approving or rejecting a user's status.
 *
 * @param {UserStatusChangeActionProps} props - The props for the component.
 * @returns {JSX.Element} The UserStatusChangeAction component with approve and reject buttons.
 */
type UserStatusChangeActionProps = {
    status: string;
    onApprove: () => void;
    onReject: () => void;
    onView: () => void;
};

/**
 * Generates a column configuration for user status change actions in a DataTable.
 *
 * @param {function(number): void} onApprove - Callback function to handle user approval.
 * @param {function(number): void} onReject - Callback function to handle user rejection.
 * @returns {TableColumn<User>} The DataTable column configuration for user status change actions.
 */
export const UserStatusChangeAction: React.FC<UserStatusChangeActionProps> = ({
    status,
    onApprove,
    onReject,
    onView
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
            <button
                className="btn btn-warning btn-rounded d-flex align-items-center justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="View"
                onClick={onView}
            >
                <Icon icon="lsicon:view-outline" className="fs-5" />
            </button>
        </div>
    );
};

//User Status Change Action Column
export const UserStatusChangeActionColumn = (
    onApprove: (userId: number) => void,
    onReject: (userId: number) => void,
    onView: (userId: number) => void
) => ({
    name: 'Actions',
    cell: (row: User) => (
        <UserStatusChangeAction
            status={row.status}
            onApprove={() => onApprove(row.userprofile_id)}
            onReject={() => onReject(row.userprofile_id)}
            onView={() => onView(row.userprofile_id)}
        />
    ),
    ignoreRowClick: false,
    allowOverflow: true,
    button: true,
    width: '15%'
});

/**
 * Column configuration for displaying user data in a DataTable.
 *
 * @type {TableColumn<User>[]}
 */
export const userTableColumns: TableColumn<User>[] = [
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        wrap: true,
        width: '15%'
    },
    {
        name: 'Company Name',
        selector: (row) => row.company_name ?? '',
        sortable: true,
        wrap: true,
        width: '15%'
    },
    {
        name: 'Email Address',
        selector: (row) => row.email,
        sortable: true,
        grow: 1,
        wrap: true,
        width: '18%'
    },
    {
        name: 'Mobile Number',
        selector: (row) => row.mobile_number,
        sortable: true,
        wrap: true,
        width: '12%'
    },
    {
        name: 'Created Date',
        selector: (row) => {
            const date = new Date(row.created_timestamp);
            const [formattedDate] = date.toISOString().split('T');
            return formattedDate;
        },
        sortable: true,
        wrap: true,
        width: '10%'
    },
    {
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
        cell: (row) => (
            <span className={`badge ${getUserStatusClass(row.status)} rounded fw-semibold p-1`}>
                {row.status}
            </span>
        ),
        wrap: true,
        width: '15%'
    }
];

/**
 * Column configuration for displaying product data in a DataTable.
 *
 * @type {TableColumn<Product>[]}
 */
export const productsTableColumns = (userRole: string): TableColumn<Product>[] => [
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
        sortable: true,
        grow: 1
    },
    {
        name: 'Feature',
        selector: (row) => row.product_feature,
        sortable: true,
        grow: 2
    },
    {
        name: 'Description',
        selector: (row) => row.customer_product_description,
        sortable: true,
        grow: 1.7
    },
    {
        name: userRole === userRoles.IMPORT_OFFICER ? 'Import Status' : 'Export Status',
        selector: (row) => (userRole === userRoles.IMPORT_OFFICER ? row.import_status : row.status),
        sortable: true,
        cell: (row) => {
            const status = userRole === userRoles.IMPORT_OFFICER ? row.import_status : row.status;
            return (
                <span
                    className={`badge ${getProductStatusClass(status)} rounded fw-semibold p-2 sticky-column`}
                >
                    {status}
                </span>
            );
        },
        grow: 1.7
    }
];
