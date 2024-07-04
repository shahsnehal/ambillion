import { TableFilter } from 'components/common/table/tableFilter';
import React from 'react';
import DataTable from 'react-data-table-component';
import { userTableColumns } from 'utils/table/columns';
import { dummyUserTableData } from 'utils/table/data';

const customStyles = {
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
