import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';

type DataRow = {
    id: number;
    firstName: string;
    lastName: string;
    companyName: string;
    mobileNumber: string;
    emailAddress: string;
    isVerified: boolean;
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
    bySize: string;
    originHsnCode: string;
    unitMeasure: string;
    weight: string;
    dimensions: string;
    byGender: string;
    material: string;
    productFeatures: string;
    isActive: boolean;
};

type ActionsCellProps = {
    row: ProductDataRow;
    onEdit: (row: ProductDataRow) => void;
    onDelete: (id: number) => void;
};

export const ActionsCell: React.FC<ActionsCellProps> = ({ row, onEdit, onDelete }) => {
    const handleDelete = () => {
        onDelete(row.id);
    };

    const handleEdit = () => {
        onEdit(row);
    };

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-muted rounded-circle d-flex align-items-center justify-content-center p-2"
                onClick={handleEdit}
            >
                <Icon icon="solar:pen-outline" className="fs-5" />
            </button>
            <button
                className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center p-2"
                onClick={handleDelete}
            >
                <Icon icon="solar:trash-bin-minimalistic-outline" className="fs-5" />
            </button>
        </div>
    );
};

export const ActionsColumn = (
    onEdit: (id: ProductDataRow) => void,
    onDelete: (id: number) => void
) => ({
    name: 'Actions',
    cell: (row: ProductDataRow) => <ActionsCell row={row} onEdit={onEdit} onDelete={onDelete} />,
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

export const userTableColumns: TableColumn<DataRow>[] = [
    // {
    //     name: 'ID',
    //     selector: (row) => row.id,
    //     sortable: true,
    //     width: '60px'
    // },
    {
        name: 'First Name',
        selector: (row) => row.firstName,
        sortable: true
    },
    {
        name: 'Last Name',
        selector: (row) => row.lastName,
        sortable: true
    },
    {
        name: 'Company Name',
        selector: (row) => row.companyName,
        sortable: true
    },
    {
        name: 'Mobile Number',
        selector: (row) => row.mobileNumber,
        sortable: true
    },
    {
        name: 'Email Address',
        selector: (row) => row.emailAddress,
        sortable: true
    },
    {
        name: 'Status',
        selector: (row) => row.isVerified,
        sortable: true,
        cell: (row) =>
            row.isVerified ? (
                <span className="badge bg-success-subtle text-success rounded fw-semibold p-2">
                    Verified
                </span>
            ) : (
                <span className="badge bg-danger-subtle text-danger rounded fw-semibold p-2">
                    UnVerified
                </span>
            )
    }
];

export const productTableColumns: TableColumn<ProductDataRow>[] = [
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
        name: 'Brand Name',
        selector: (row) => row.brandName,
        sortable: true
    },
    {
        name: 'Ex-Work Price',
        selector: (row) => parseFloat(row.exWorkPrice),
        sortable: true,
        cell: (row) => `${parseFloat(row.exWorkPrice).toFixed(2)}`
    },

    {
        name: 'Color',
        selector: (row) => row.byColor,
        sortable: true
    },
    {
        name: 'Size',
        selector: (row) => row.bySize,
        sortable: true
    },
    {
        name: 'HSN Code',
        selector: (row) => row.originHsnCode,
        sortable: true
    },
    {
        name: 'Unit Measure',
        selector: (row) => row.unitMeasure,
        sortable: true
    },
    {
        name: 'Weight',
        selector: (row) => row.weight,
        sortable: true
    },
    {
        name: 'Dimensions',
        selector: (row) => row.dimensions,
        sortable: true
    },
    {
        name: 'Gender',
        selector: (row) => row.byGender,
        sortable: true
    },
    {
        name: 'Material',
        selector: (row) => row.material,
        sortable: true
    },
    {
        name: 'Features',
        selector: (row) => row.productFeatures,
        sortable: true
    }
];
