import { TableColumn } from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { CountryType } from 'reduxSaga/modules/country-module/type/types';

// Country Types
type CountryActionColumnProps = {
    row: CountryType;
    onEdit: (row: CountryType) => void;
};

/**
 * Renders action buttons for a country row.
 *
 * @param {CountryActionColumnProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export const CountryAction: React.FC<CountryActionColumnProps> = ({ row, onEdit }) => {
    /**
     * Handles the editing of the country.
     */
    const handleEditCountry = () => {
        onEdit(row);
    };

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-warning btn-rounded d-flex align-items-center ms-2 justify-content-center p-2"
                data-toggle="tooltip"
                data-placement="left"
                title="Edit"
                onClick={handleEditCountry}
            >
                <Icon icon="solar:pen-outline" className="fs-5" />
            </button>
        </div>
    );
};

/**
 * Defines the action column configuration for the country table.
 *
 * @param {(row: CountryType) => void} onEdit - Callback function to handle editing of the country.
 * @returns {TableColumn<CountryType>} The column configuration object.
 */
export const CountryActionColumn = (onEdit: (row: CountryType) => void) => ({
    name: 'Action',
    cell: (row: CountryType) => <CountryAction row={row} onEdit={onEdit} />,
    ignoreRowClick: false,
    allowOverflow: true,
    button: true
});

/**
 * Defines the columns for the country table.
 *
 * @type {TableColumn<CountryType>[]}
 */
export const CountryTableColumns: TableColumn<CountryType>[] = [
    {
        name: 'Country Code',
        selector: (row) => row.country_code,
        sortable: true,
        grow: 1
    },
    {
        name: 'Country Name',
        selector: (row) => row.country_name,
        sortable: true,
        grow: 1
    }
];
