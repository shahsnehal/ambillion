import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { User } from 'Modules/user-module/type/types';
import { userStatus } from 'constants/common';

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

export type ProductDataRow = {
    id: number;
    uploadImage: string;
    productCategory: string;
    productType: string;
    productDisplayName: string;
    customerProductDescription: string;
    brandName: string;
    exWorkPrice: string;
    byColor: string;
    bySize: string[];
    originHsnCode: string;
    unitMeasure: string;
    weight: string;
    dimensions: string;
    byGender: string;
    material: string;
    productFeatures: string;
    approvalStatus: string;
    // isApproved: boolean;
};

const getStatusClass = (status: string): string => {
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

type DeleteActionParams = {
    id: number;
    productDisplayName: string;
};

type ProductViewEditDeleteActionProps = {
    row: ProductDataRow;
    onView: (id: number) => void;
    onEdit: (row: ProductDataRow) => void;
    onDelete: (params: DeleteActionParams) => void;
};

type UserStatusChangeActionProps = {
    status: string;
    onApprove: () => void;
    onReject: () => void;
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
                disabled={status === 'ACCEPTED'}
            >
                <Icon icon="solar:check-circle-outline" className="fs-5" />
            </button>
            <button
                className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Reject"
                onClick={onReject}
                disabled={status === 'REJECTED'}
            >
                <Icon icon="solar:close-circle-outline" className="fs-5" />
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

// ProductEditDeleteAction component renders edit and delete actions for a table row.
export const ProductViewEditDeleteAction: React.FC<ProductViewEditDeleteActionProps> = ({
    row,
    onView,
    onEdit,
    onDelete
}) => {
    const handleView = () => {
        onView(row.id);
    };

    const handleEdit = () => {
        onEdit(row);
    };

    const handleDelete = () => {
        onDelete({ id: row.id, productDisplayName: row.productDisplayName });
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
    onEdit: (id: ProductDataRow) => void,
    onDelete: (params: DeleteActionParams) => void
) => ({
    name: 'Actions',
    cell: (row: ProductDataRow) => (
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
            <span className={`badge ${getStatusClass(row.status)} rounded fw-semibold p-2`}>
                {row.status}
            </span>
        )
    }
    // {
    //     name: 'Status',
    //     selector: (row) => row.isVerified,
    //     sortable: true,
    //     cell: (row) =>
    //         row.isVerified ? (
    //             <span className="badge bg-success-subtle text-success rounded fw-semibold p-2">
    //                 Verified
    //             </span>
    //         ) : (
    //             <span className="badge bg-danger-subtle text-danger rounded fw-semibold p-2">
    //                 UnVerified
    //             </span>
    //         )
    // },
];

export const productTableColumns: TableColumn<ProductDataRow>[] = [
    {
        name: 'HSN Code',
        selector: (row) => row.originHsnCode,
        sortable: true
    },
    {
        name: 'Image',
        selector: (row) => row.uploadImage,
        cell: (row) => <img src={row.uploadImage} alt={row.productDisplayName} width="50" />,
        sortable: false
    },
    {
        name: 'Category',
        selector: (row) => row.productCategory,
        sortable: true
    },
    {
        name: 'Type',
        selector: (row) => row.productType,
        sortable: true
    },
    {
        name: 'Name',
        selector: (row) => row.productDisplayName,
        sortable: true
    },
    {
        name: 'Description',
        selector: (row) => row.customerProductDescription,
        sortable: true
    },
    {
        id: 'Status',
        name: 'Status',
        selector: (row) => row.approvalStatus,
        sortable: true,
        cell: (row) => (
            <span className={`badge ${getStatusClass(row.approvalStatus)} rounded fw-semibold p-2`}>
                {row.approvalStatus}
            </span>
        )
    }
    // {
    //     name: 'Brand Name',
    //     selector: (row) => row.brandName,
    //     sortable: true
    // },
    // {
    //     name: 'Ex-Work Price',
    //     selector: (row) => parseFloat(row.exWorkPrice),
    //     sortable: true,
    //     cell: (row) => `${parseFloat(row.exWorkPrice).toFixed(2)}`
    // },

    // {
    //     name: 'Color',
    //     selector: (row) => row.byColor,
    //     sortable: true
    // },
    // {
    //     name: 'Size',
    //     selector: (row) => row.bySize.join(', '),
    //     sortable: true
    // },
    // {
    //     name: 'Unit Measure',
    //     selector: (row) => row.unitMeasure,
    //     sortable: true
    // },
    // {
    //     name: 'Weight',
    //     selector: (row) => row.weight,
    //     sortable: true
    // },
    // {
    //     name: 'Dimensions',
    //     selector: (row) => row.dimensions,
    //     sortable: true
    // },
    // {
    //     name: 'Gender',
    //     selector: (row) => row.byGender,
    //     sortable: true
    // },
    // {
    //     name: 'Material',
    //     selector: (row) => row.material,
    //     sortable: true
    // },
    // {
    //     name: 'Features',
    //     selector: (row) => row.productFeatures,
    //     sortable: true
    // }
];
