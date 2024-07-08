import { TableFilter } from 'components/common/table/tableFilter';
import React from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, userTableColumns } from 'utils/table/columns';
import { dummyUserTableData } from 'utils/table/data';

export const UserList = () => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState<boolean>(false);
    const filteredItems = dummyUserTableData.filter((item) =>
        item.emailAddress?.toLowerCase().includes(filterText.toLowerCase())
    );
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <TableFilter
                onFilter={(e: { target: { value: React.SetStateAction<string> } }) =>
                    setFilterText(e.target.value)
                }
                onClear={handleClear}
                filterText={filterText}
                placeholder="Filter By Email"
            />
        );
    }, [filterText, resetPaginationToggle]);
    return (
        <DataTable
            columns={userTableColumns}
            data={filteredItems}
            pagination
            title=" "
            selectableRows
            fixedHeader
            highlightOnHover
            fixedHeaderScrollHeight="450px"
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            customStyles={customStyles}
        />
    );
};
