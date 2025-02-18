import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { HSNCode } from 'reduxSaga/modules/hsnCodes-module/type/types';

// HsnCode Types
type HsnCodeActionColumnProps = {
    row: HSNCode;
    onEdit: (row: HSNCode) => void;
};

/**
 * Component for rendering action buttons in the HSN Code table.
 *
 * @component
 * @param {HsnCodeActionColumnProps} props - The props for the component.
 * @returns {JSX.Element} The action column component with an edit button.
 */
export const HsnCodeAction: React.FC<HsnCodeActionColumnProps> = ({ row, onEdit }) => {
    const handleEditHsnCode = () => {
        onEdit(row);
    };

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-warning btn-rounded d-flex align-items-center ms-2 justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Edit"
                onClick={handleEditHsnCode}
            >
                <Icon icon="solar:pen-outline" className="fs-5" />
            </button>
        </div>
    );
};

/**
 * Generates the action column configuration for the DataTable.
 *
 * @param {(row: HSNCode) => void} onEdit - Callback function to handle editing an HSN code.
 * @returns {Object} The column configuration for the DataTable.
 */
export const HsnCodeActionColumn = (onEdit: (row: HSNCode) => void) => ({
    name: 'Action',
    cell: (row: HSNCode) => <HsnCodeAction row={row} onEdit={onEdit} />,
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

/**
 * Defines the columns for the HSN code table.
 *
 * @type {TableColumn<HSNCode>[]}
 */
export const hsnCodeTableColumns: TableColumn<HSNCode>[] = [
    {
        name: 'HSN Code',
        selector: (row) => row.hsn_code,
        sortable: true,
        grow: 1
    },
    {
        name: 'Description',
        selector: (row) => row.hsn_description,
        grow: 3
    }
];
