import DataTable, { TableColumn } from 'react-data-table-component';
interface DataRow {
    id: number;
    firstName: string;
    lastName: string;
    companyName: string;
    mobileNumber: string;
    emailAddress: string;
}

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

const columns: TableColumn<DataRow>[] = [
    {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true
    },
    {
        name: 'FirstName',
        selector: (row) => row.firstName,
        sortable: true
    },
    {
        name: 'LastName',
        selector: (row) => row.lastName,
        sortable: true
    },
    {
        name: 'CompanyName',
        selector: (row) => row.companyName,
        sortable: true
    },
    {
        name: 'MobileNumber',
        selector: (row) => row.mobileNumber,
        sortable: true
    },
    {
        name: 'emailAddress',
        selector: (row) => row.emailAddress,
        sortable: true
    }
];
const dummyData = [
    {
        id: 1,
        firstName: 'Vishal',
        lastName: 'Devani',
        companyName: 'ABC Inc.',
        mobileNumber: '1234567890',
        emailAddress: 'vishal.devani@example.com'
    },
    {
        id: 2,
        firstName: 'John',
        lastName: 'Smith',
        companyName: 'XYZ Corp.',
        mobileNumber: '2345678901',
        emailAddress: 'john.smith@example.com'
    },
    {
        id: 3,
        firstName: 'Emily',
        lastName: 'Brown',
        companyName: '123 Company',
        mobileNumber: '3456789012',
        emailAddress: 'emily.brown@example.com'
    },
    {
        id: 4,
        firstName: 'Michael',
        lastName: 'Johnson',
        companyName: '456 Corp.',
        mobileNumber: '4567890123',
        emailAddress: 'michael.johnson@example.com'
    },
    {
        id: 5,
        firstName: 'Sarah',
        lastName: 'Wilson',
        companyName: 'DEF Ltd.',
        mobileNumber: '5678901234',
        emailAddress: 'sarah.wilson@example.com'
    },
    {
        id: 6,
        firstName: 'David',
        lastName: 'Lee',
        companyName: '789 Corp.',
        mobileNumber: '6789012345',
        emailAddress: 'david.lee@example.com'
    },
    {
        id: 7,
        firstName: 'Emma',
        lastName: 'Garcia',
        companyName: 'GHI Inc.',
        mobileNumber: '7890123456',
        emailAddress: 'emma.garcia@example.com'
    },
    {
        id: 8,
        firstName: 'Daniel',
        lastName: 'Martinez',
        companyName: 'JKL Corp.',
        mobileNumber: '8901234567',
        emailAddress: 'daniel.martinez@example.com'
    },
    {
        id: 9,
        firstName: 'Sophia',
        lastName: 'Lopez',
        companyName: 'MNO Ltd.',
        mobileNumber: '9012345678',
        emailAddress: 'sophia.lopez@example.com'
    },
    {
        id: 10,
        firstName: 'James',
        lastName: 'Davis',
        companyName: 'PQR Inc.',
        mobileNumber: '0123456789',
        emailAddress: 'james.davis@example.com'
    },
    {
        id: 11,
        firstName: 'Olivia',
        lastName: 'Miller',
        companyName: 'STU Corp.',
        mobileNumber: '9876543210',
        emailAddress: 'olivia.miller@example.com'
    },
    {
        id: 12,
        firstName: 'William',
        lastName: 'Rodriguez',
        companyName: 'VWX Ltd.',
        mobileNumber: '8765432109',
        emailAddress: 'william.rodriguez@example.com'
    },
    {
        id: 13,
        firstName: 'Ava',
        lastName: 'Martinez',
        companyName: 'YZA Inc.',
        mobileNumber: '7654321098',
        emailAddress: 'ava.martinez@example.com'
    },
    {
        id: 14,
        firstName: 'Alexander',
        lastName: 'Hernandez',
        companyName: 'BCD Corp.',
        mobileNumber: '6543210987',
        emailAddress: 'alexander.hernandez@example.com'
    },
    {
        id: 15,
        firstName: 'Mia',
        lastName: 'Gonzalez',
        companyName: 'EFG Ltd.',
        mobileNumber: '5432109876',
        emailAddress: 'mia.gonzalez@example.com'
    },
    {
        id: 16,
        firstName: 'Ethan',
        lastName: 'Perez',
        companyName: 'HIJ Inc.',
        mobileNumber: '4321098765',
        emailAddress: 'ethan.perez@example.com'
    },
    {
        id: 17,
        firstName: 'Isabella',
        lastName: 'Sanchez',
        companyName: 'KLM Corp.',
        mobileNumber: '3210987654',
        emailAddress: 'isabella.sanchez@example.com'
    },
    {
        id: 18,
        firstName: 'Alexander',
        lastName: 'Gonzalez',
        companyName: 'NOP Ltd.',
        mobileNumber: '2109876543',
        emailAddress: 'alexander.gonzalez@example.com'
    },
    {
        id: 19,
        firstName: 'Sophia',
        lastName: 'Rivera',
        companyName: 'QRS Inc.',
        mobileNumber: '1098765432',
        emailAddress: 'sophia.rivera@example.com'
    },
    {
        id: 20,
        firstName: 'Mason',
        lastName: 'Brooks',
        companyName: 'TUV Corp.',
        mobileNumber: '0987654321',
        emailAddress: 'mason.brooks@example.com'
    },
    {
        id: 21,
        firstName: 'Amelia',
        lastName: 'Roberts',
        companyName: 'WXY Ltd.',
        mobileNumber: '9876543210',
        emailAddress: 'amelia.roberts@example.com'
    },
    {
        id: 22,
        firstName: 'Logan',
        lastName: 'Cook',
        companyName: 'ZAB Inc.',
        mobileNumber: '8765432109',
        emailAddress: 'logan.cook@example.com'
    },
    {
        id: 23,
        firstName: 'Evelyn',
        lastName: 'Bailey',
        companyName: 'CDE Corp.',
        mobileNumber: '7654321098',
        emailAddress: 'evelyn.bailey@example.com'
    },
    {
        id: 24,
        firstName: 'Lucas',
        lastName: 'James',
        companyName: 'FGH Ltd.',
        mobileNumber: '6543210987',
        emailAddress: 'lucas.james@example.com'
    },
    {
        id: 25,
        firstName: 'Abigail',
        lastName: 'Phillips',
        companyName: 'IJK Inc.',
        mobileNumber: '5432109876',
        emailAddress: 'abigail.phillips@example.com'
    },
    {
        id: 26,
        firstName: 'Jackson',
        lastName: 'Evans',
        companyName: 'LMN Corp.',
        mobileNumber: '4321098765',
        emailAddress: 'jackson.evans@example.com'
    },
    {
        id: 27,
        firstName: 'Charlotte',
        lastName: 'Howard',
        companyName: 'OPQ Ltd.',
        mobileNumber: '3210987654',
        emailAddress: 'charlotte.howard@example.com'
    },
    {
        id: 28,
        firstName: 'Daniel',
        lastName: 'Morales',
        companyName: 'RST Inc.',
        mobileNumber: '2109876543',
        emailAddress: 'daniel.morales@example.com'
    },
    {
        id: 29,
        firstName: 'Harper',
        lastName: 'Ward',
        companyName: 'UVW Corp.',
        mobileNumber: '1098765432',
        emailAddress: 'harper.ward@example.com'
    },
    {
        id: 30,
        firstName: 'Aiden',
        lastName: 'Torres',
        companyName: 'XYZ Ltd.',
        mobileNumber: '0987654321',
        emailAddress: 'aiden.torres@example.com'
    },
    {
        id: 31,
        firstName: 'Madison',
        lastName: 'Flores',
        companyName: '123 Inc.',
        mobileNumber: '9876543210',
        emailAddress: 'madison.flores@example.com'
    },
    {
        id: 32,
        firstName: 'Elijah',
        lastName: 'Nguyen',
        companyName: '456 Corp.',
        mobileNumber: '8765432109',
        emailAddress: 'elijah.nguyen@example.com'
    },
    {
        id: 33,
        firstName: 'Avery',
        lastName: 'King',
        companyName: '789 Ltd.',
        mobileNumber: '7654321098',
        emailAddress: 'avery.king@example.com'
    },
    {
        id: 34,
        firstName: 'Grayson',
        lastName: 'Scott',
        companyName: 'ABC Inc.',
        mobileNumber: '6543210987',
        emailAddress: 'grayson.scott@example.com'
    },
    {
        id: 35,
        firstName: 'Scarlett',
        lastName: 'Gomez',
        companyName: 'XYZ Corp.',
        mobileNumber: '5432109876',
        emailAddress: 'scarlett.gomez@example.com'
    },
    {
        id: 36,
        firstName: 'Logan',
        lastName: 'Hill',
        companyName: '123 Company',
        mobileNumber: '4321098765',
        emailAddress: 'logan.hill@example.com'
    },
    {
        id: 37,
        firstName: 'Lily',
        lastName: 'Perez',
        companyName: '456 Corp.',
        mobileNumber: '3210987654',
        emailAddress: 'lily.perez@example.com'
    },
    {
        id: 38,
        firstName: 'Owen',
        lastName: 'Collins',
        companyName: '789 Ltd.',
        mobileNumber: '2109876543',
        emailAddress: 'owen.collins@example.com'
    },
    {
        id: 39,
        firstName: 'Liam',
        lastName: 'Stewart',
        companyName: 'ABC Inc.',
        mobileNumber: '1098765432',
        emailAddress: 'liam.stewart@example.com'
    },
    {
        id: 40,
        firstName: 'Zoe',
        lastName: 'Mitchell',
        companyName: 'XYZ Corp.',
        mobileNumber: '0987654321',
        emailAddress: 'zoe.mitchell@example.com'
    },
    {
        id: 41,
        firstName: 'Jackson',
        lastName: 'Rogers',
        companyName: '123 Company',
        mobileNumber: '9876543210',
        emailAddress: 'jackson.rogers@example.com'
    },
    {
        id: 42,
        firstName: 'Chloe',
        lastName: 'Price',
        companyName: '456 Corp.',
        mobileNumber: '8765432109',
        emailAddress: 'chloe.price@example.com'
    },
    {
        id: 43,
        firstName: 'Carter',
        lastName: 'Ward',
        companyName: '789 Ltd.',
        mobileNumber: '7654321098',
        emailAddress: 'carter.ward@example.com'
    },
    {
        id: 44,
        firstName: 'Emma',
        lastName: 'Brooks',
        companyName: 'ABC Inc.',
        mobileNumber: '6543210987',
        emailAddress: 'emma.brooks@example.com'
    },
    {
        id: 45,
        firstName: 'Aiden',
        lastName: 'Turner',
        companyName: 'XYZ Corp.',
        mobileNumber: '5432109876',
        emailAddress: 'aiden.turner@example.com'
    },
    {
        id: 46,
        firstName: 'Grace',
        lastName: 'Scott',
        companyName: '123 Company',
        mobileNumber: '4321098765',
        emailAddress: 'grace.scott@example.com'
    },
    {
        id: 47,
        firstName: 'Ethan',
        lastName: 'Gonzalez',
        companyName: '456 Corp.',
        mobileNumber: '3210987654',
        emailAddress: 'ethan.gonzalez@example.com'
    },
    {
        id: 48,
        firstName: 'Hannah',
        lastName: 'Evans',
        companyName: '789 Ltd.',
        mobileNumber: '2109876543',
        emailAddress: 'hannah.evans@example.com'
    },
    {
        id: 49,
        firstName: 'Luke',
        lastName: 'Ward',
        companyName: 'ABC Inc.',
        mobileNumber: '1098765432',
        emailAddress: 'luke.ward@example.com'
    },
    {
        id: 50,
        firstName: 'Leah',
        lastName: 'Morris',
        companyName: 'XYZ Corp.',
        mobileNumber: '0987654321',
        emailAddress: 'leah.morris@example.com'
    }
];

export const Dashboard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <DataTable
                    columns={columns}
                    data={dummyData}
                    pagination
                    selectableRows
                    fixedHeader
                    highlightOnHover
                    fixedHeaderScrollHeight="450px"
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
};
