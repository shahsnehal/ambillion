import { TableFilter } from 'components/common/table/tableFilter';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, UserStatusChangeActionColumn, userTableColumns } from 'utils/table/columns';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
import { Loader } from 'common/loaders/loader';
import { fetchUsersRequest, updateUserStatusRequest } from 'Modules/user-module/action/actions';
import { RootState } from 'config/store';

export const UserList = () => {
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [actionType, setActionType] = useState<'APPROVE' | 'REJECT' | null>(null);

    const { isLoading, users } = useSelector((state: RootState) => state.userModule);
    console.log('users', users);

    useEffect(() => {
        const getUsers = () => {
            dispatch(fetchUsersRequest());
        };
        return () => getUsers();
    }, []);

    const filteredItems = users.filter((user) =>
        user.email?.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleApprove = (userId: number) => {
        setSelectedUserId(userId);
        setActionType('APPROVE');
    };

    const handleReject = (userId: number) => {
        setSelectedUserId(userId);
        setActionType('REJECT');
    };

    const handleConfirmAction = () => {
        if (selectedUserId !== null) {
            dispatch(
                updateUserStatusRequest(
                    selectedUserId,
                    actionType === 'APPROVE' ? 'ACCEPTED' : 'REJECTED'
                )
            );
            dispatch(fetchUsersRequest());
        }
    };

    const handleCloseModal = () => {
        setActionType(null);
        setSelectedUserId(null);
    };

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
        <>
            {isLoading && <Loader />}
            <DataTable
                columns={[
                    ...userTableColumns,
                    UserStatusChangeActionColumn(handleApprove, handleReject)
                ]}
                data={filteredItems}
                pagination
                title=" "
                selectableRows
                fixedHeader
                highlightOnHover
                fixedHeaderScrollHeight="450px"
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                customStyles={customStyles}
            />

            <ConfirmationModal
                isOpen={actionType !== null}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAction}
                title={actionType === 'APPROVE' ? 'Approve Confirmation' : 'Reject Confirmation'}
                content={
                    actionType === 'APPROVE'
                        ? 'Are you sure you want to approve?'
                        : 'Are you sure you want to reject?'
                }
                confirmLabel={actionType === 'APPROVE' ? 'Approve' : 'Reject'}
                confirmBtnClassName={
                    actionType === 'APPROVE' ? 'btn btn-success' : 'btn btn-danger'
                }
                isLoading={false}
                actionInProgressLabel={actionType === 'APPROVE' ? 'Approving...' : 'Rejecting...'}
            />
        </>
    );
};
