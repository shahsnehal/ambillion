import { TableColumn } from 'react-data-table-component';

type DataRow = {
    id: number;
    firstName: string;
    lastName: string;
    companyName: string;
    mobileNumber: string;
    emailAddress: string;
    isVerified: boolean;
};
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
