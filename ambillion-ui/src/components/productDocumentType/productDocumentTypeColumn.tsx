import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { ProductDocumentsType } from 'reduxSaga/modules/productDocumentType-module/type/types';

//ProductDocumentType Types
type ProductDocumentTypeActionColumnProps = {
    row: ProductDocumentsType;
    onEdit: (row: ProductDocumentsType) => void;
};

//ProductDocumentType Action
export const ProductDocumentTypeAction: React.FC<ProductDocumentTypeActionColumnProps> = ({
    row,
    onEdit
}) => {
    const handleEditProductDocumentType = () => {
        onEdit(row);
    };

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-warning btn-rounded d-flex align-items-center ms-2 justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Edit"
                onClick={handleEditProductDocumentType}
            >
                <Icon icon="solar:pen-outline" className="fs-5" />
            </button>
        </div>
    );
};

//ProductDocumentType  Action Columns
export const ProductDocumentTypeActionColumn = (onEdit: (row: ProductDocumentsType) => void) => ({
    name: 'Action',
    cell: (row: ProductDocumentsType) => <ProductDocumentTypeAction row={row} onEdit={onEdit} />,
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

//ProductDocumentType  Tabellist
export const ProductDocumentTypeTableColumns: TableColumn<ProductDocumentsType>[] = [
    {
        name: 'Document Name',
        selector: (row) => row.document_type_name,
        sortable: true,
        grow: 1
    },
    {
        name: 'Description',
        selector: (row) => row.document_type_description,
        grow: 3
    },
    {
        name: 'Format',
        selector: (row) => row.document_type_format,
        sortable: true,
        grow: 1
    }
];
