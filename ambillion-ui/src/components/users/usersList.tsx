import { TableFilter } from 'components/common/table/tableFilter';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, UserStatusChangeActionColumn, userTableColumns } from 'utils/table/columns';
import { ConfirmationModal } from 'components/common/modal/confirmationModal';
import {
    fetchUsersRequest,
    updateUserStatusRequest
} from 'reduxSaga/modules/user-module/action/actions';
import { RootState } from 'reduxSaga/config/store';
import { userStatus } from 'constants/common';
import { CustomLoader } from 'common/loaders/loader';

export const actionType = {
    APPROVE: 'APPROVE',
    REJECT: 'REJECT'
};

/**
 * UserList component displays a list of users with the ability to approve or reject user status.
 *
 * It fetches user data from the store, filters users based on email, and shows a data table with action columns.
 * A confirmation modal is used for confirming the approval or rejection of a user.
 *
 * @component
 * @example
 * return <UserList />;
 */
export const UserList: React.FC = () => {
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [currentActionType, setCurrentActionType] = useState<string | null>(null);
    const { isLoading, users } = useSelector((state: RootState) => state.userModule);

    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, []);

    /**
     * Filters users based on the provided email filter text.
     *
     * @type {Array<User>}
     */
    const filteredItems = users.filter((user) =>
        user.email?.toLowerCase().includes(filterText.toLowerCase())
    );

    /**
     * Handles the approval action for a user.
     *
     * Sets the selected user ID and the current action type to 'APPROVE'.
     *
     * @param {number} userId - The ID of the user to approve.
     */
    const handleApprove = (userId: number) => {
        setSelectedUserId(userId);
        setCurrentActionType(actionType.APPROVE);
    };

    /**
     * Handles the rejection action for a user.
     *
     * Sets the selected user ID and the current action type to 'REJECT'.
     *
     * @param {number} userId - The ID of the user to reject.
     */
    const handleReject = (userId: number) => {
        setSelectedUserId(userId);
        setCurrentActionType(actionType.REJECT);
    };

    /**
     * Confirms the action for the selected user based on the current action type.
     *
     * Dispatches the appropriate action to update the user's status and closes the confirmation modal.
     */
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

    /**
     * Closes the confirmation modal and resets the action type and selected user ID.
     */
    const handleCloseModal = () => {
        setCurrentActionType(null);
        setSelectedUserId(null);
    };

    /**
     * Creates a memoized subheader component for the data table.
     *
     * Includes a filter input and a clear button to manage the filter text.
     *
     * @returns {JSX.Element} The subheader component.
     */
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);

                setFilterText('');
            }
        };

        return (
            <div className="d-flex align-items-start justify-content-between gap-4 mt-3">
                <TableFilter
                    onFilter={(e: { target: { value: React.SetStateAction<string> } }) =>
                        setFilterText(e.target.value)
                    }
                    onClear={handleClear}
                    filterText={filterText}
                    placeholder="Filter By Email"
                />
            </div>
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
                progressComponent={<CustomLoader />}
                pagination
                fixedHeader
                highlightOnHover
                fixedHeaderScrollHeight="450px"
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                customStyles={customStyles}
            />

            {currentActionType !== null && (
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
                        currentActionType === actionType.APPROVE
                            ? 'btn btn-success'
                            : 'btn btn-secondary'
                    }
                    isLoading={false}
                    actionInProgressLabel={
                        currentActionType === actionType.APPROVE ? 'Approving...' : 'Rejecting...'
                    }
                    confirmIcon={
                        currentActionType === actionType.APPROVE
                            ? 'mdi:check-circle-outline'
                            : 'fluent:text-change-reject-24-filled'
                    }
                    closeBtnClassName="btn btn-rounded btn-muted ms-2"
                />
            )}
        </>
    );
};
