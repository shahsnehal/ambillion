import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { TableFilter } from 'components/common/table/tableFilter';
import { customStyles } from 'utils/table/columns';
import { RootState } from 'reduxSaga/config/store';
import { CustomLoader } from 'common/loaders/loader';
import {
    addHSNCodeRequest,
    fetchHSNCodesRequest,
    updateHSNCodeRequest
} from 'reduxSaga/modules/hsnCodes-module/action/actions';
import { HsnCodeActionColumn, hsnCodeTableColumns } from './hsnCodesColumn';
import { HsnCodeModal } from './hsnCodeModal';
import {
    HSNCode,
    HSNCodeFormValues,
    HSNDocumentTypePayload
} from 'reduxSaga/modules/hsnCodes-module/type/types';
import { useDebounce } from 'utils/common';

export const HsnCodes = () => {
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [isHsnCodeModalOpen, setIsHsnCodeModalOpen] = useState<boolean>(false);
    const [hsnCodeFormData, setHsnCodeFormData] = useState<HSNCodeFormValues | null>(null);
    const { hsnCodes, isLoading } = useSelector((state: RootState) => state.hsnCodeModule);
    // Debounce the filter text to avoid excessive re-renders
    const debouncedFilterText = useDebounce(filterText, 500);

    /**
     * Fetches HSN Codes when the component mounts.
     */
    useEffect(() => {
        dispatch(fetchHSNCodesRequest());
    }, []);

    /**
     * Opens the modal for adding a new HSN Code with default form values.
     */
    const handleAddHsnCode = () => {
        setHsnCodeFormData({
            hsnId: '',
            hsnCode: '',
            hsnDescription: '',
            documentTypes: []
        });
        setIsHsnCodeModalOpen(true);
    };

    /**
     * Opens the modal for editing an existing HSN Code with the selected HSN Code's data.
     *
     * @param {HSNCode} row - The HSN Code to edit.
     */
    const handleEditHsnCode = (row: HSNCode) => {
        // Directly map HSNDocumentType to HSNDocumentTypePayload
        const documentTypes: HSNDocumentTypePayload[] = row.documents.map((doc) => ({
            documentTypeId: doc.document_type_id,
            mandatory: Boolean(doc.mandatory)
        }));

        setHsnCodeFormData({
            hsnId: row.hsn_id,
            hsnCode: row.hsn_code,
            hsnDescription: row.hsn_description,
            documentTypes
        });
        setIsHsnCodeModalOpen(true);
    };

    /**
     * Submits the form data to either add or update a HSN Code based on the presence of a HSNId.
     *
     * @param {HSNCodeFormValues} values - The form values to submit.
     */
    const handleSubmit = (values: HSNCodeFormValues) => {
        if (values.hsnId) {
            dispatch(
                updateHSNCodeRequest(
                    values.hsnId,
                    String(values.hsnCode),
                    values.hsnDescription,
                    values.documentTypes
                )
            );
        } else {
            dispatch(
                addHSNCodeRequest(values.hsnCode, values.hsnDescription, values.documentTypes)
            );
        }
        handleCloseModal();
    };

    /**
     * Closes the modal and clears the form data.
     */
    const handleCloseModal = () => {
        setHsnCodeFormData(null);
        setIsHsnCodeModalOpen(false);
    };

    /**
     * Filters HSN Code based on the provided filter text.
     *
     * @type {Array<HSNCode>}
     */
    const filteredHsnCodes = useMemo(() => {
        const lowercasedFilterText = debouncedFilterText.toLowerCase();

        return hsnCodes.filter((hsn) => {
            const fieldsToSearch = [String(hsn.hsn_code), hsn.hsn_description];

            return fieldsToSearch.some((field) =>
                field?.toLowerCase().includes(lowercasedFilterText)
            );
        });
    }, [debouncedFilterText, hsnCodes]);

    /**
     * Creates a memoized subheader component for the data table.
     *
     * Includes a filter input and a clear button to manage the filter text.
     *
     * @returns {JSX.Element} The subheader component.
     */
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className="d-flex align-items-start justify-content-between gap-4 mt-3">
                <div>
                    <button
                        className="btn btn-rounded btn-primary ms-2 gap-2 mt-3"
                        onClick={() => handleAddHsnCode()}
                    >
                        <Icon icon="tabler:plus" className="me-1" />
                        Add HSN Code
                    </button>
                </div>

                <div className="d-flex align-items-start justify-content-between gap-4 mt-3">
                    <TableFilter
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFilterText(e.target.value)
                        }
                        onClear={handleClear}
                        filterText={filterText}
                        placeholder="Filter HSN Code..."
                    />
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <DataTable
                columns={[...hsnCodeTableColumns, HsnCodeActionColumn(handleEditHsnCode)]}
                data={filteredHsnCodes}
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

            {isHsnCodeModalOpen && (
                <HsnCodeModal
                    isOpen={isHsnCodeModalOpen}
                    onClose={handleCloseModal}
                    hsnCodeFormData={hsnCodeFormData}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};
