import { TableFilter } from 'components/common/table/tableFilter';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, UserStatusChangeActionColumn, userTableColumns } from 'utils/table/columns';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
import { fetchUsersRequest, updateUserStatusRequest } from 'Modules/user-module/action/actions';
import { RootState } from 'config/store';
import { userStatus } from 'constants/common';

export const actionType = {
    APPROVE: 'APPROVE',
    REJECT: 'REJECT'
};

export const UserList: React.FC = () => {
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [currentActionType, setCurrentActionType] = useState<string | null>(null);
    const { isLoading, users } = useSelector((state: RootState) => state.userModule);

    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);

    const filteredItems = users.filter((user) =>
        user.email?.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleApprove = (userId: number) => {
        setSelectedUserId(userId);
        setCurrentActionType(actionType.APPROVE);
    };

    const handleReject = (userId: number) => {
        setSelectedUserId(userId);
        setCurrentActionType(actionType.REJECT);
    };

    const handleConfirmAction = () => {
        if (selectedUserId !== null && currentActionType !== null) {
            dispatch(
                updateUserStatusRequest(
                    selectedUserId,

                    currentActionType === actionType.APPROVE
                        ? userStatus.ACCEPTED
                        : userStatus.REJECTED
                )
            );
        }

        handleCloseModal();
    };

    const handleCloseModal = () => {
        setCurrentActionType(null);

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
            <DataTable
                columns={[
                    ...userTableColumns,

                    UserStatusChangeActionColumn(handleApprove, handleReject)
                ]}
                data={filteredItems}
                progressPending={isLoading}
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
                isOpen={currentActionType !== null}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAction}
                title={
                    currentActionType === actionType.APPROVE
                        ? 'Approve Confirmation'
                        : 'Reject Confirmation'
                }
                content={
                    currentActionType === actionType.APPROVE
                        ? 'Are you sure you want to approve?'
                        : 'Are you sure you want to reject?'
                }
                confirmLabel={currentActionType === actionType.APPROVE ? 'Approve' : 'Reject'}
                confirmBtnClassName={
                    currentActionType === actionType.APPROVE ? 'btn btn-success' : 'btn btn-danger'
                }
                isLoading={false}
                actionInProgressLabel={
                    currentActionType === actionType.APPROVE ? 'Approving...' : 'Rejecting...'
                }
            />
        </>
    );
};
