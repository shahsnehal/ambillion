import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { TableFilter } from 'components/common/table/tableFilter';
import { customStyles } from 'utils/table/columns';
import { RootState } from 'reduxSaga/config/store';
import { CustomLoader } from 'common/loaders/loader';
import {
    addProductDocumentTypeRequest,
    fetchProductDocumentTypeRequest,
    updateProductDocumentTypeRequest
} from 'reduxSaga/modules/productDocumentType-module/action/actions';
import {
    ProductDocumentTypeActionColumn,
    ProductDocumentTypeTableColumns
} from './productDocumentTypeColumn';
import { ProductDocumentTypeModal } from './productDocumentTypeModal';
import {
    ProductDocumentsType,
    ProductDocumentTypeFormValues
} from 'reduxSaga/modules/productDocumentType-module/type/types';
import { useDebounce } from 'utils/common';

/**
 * Component to manage and display product document types.
 * Allows for adding, editing, and filtering document types.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const ProductDocumentType = () => {
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState<string>('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [isDocumentTypeModalOpen, setIsDocumentTypeModalOpen] = useState<boolean>(false);
    const [documentTypeFormData, setDocumentTypeFormData] =
        useState<ProductDocumentTypeFormValues | null>(null);
    const { productDocumentsType, isLoading } = useSelector(
        (state: RootState) => state.ProductDocumentTypeModule
    );
    // Debounce the filter text to avoid excessive re-renders
    const debouncedFilterText = useDebounce(filterText, 500);

    /**
     * Fetch product document types when the component mounts.
     */
    useEffect(() => {
        dispatch(fetchProductDocumentTypeRequest());
    }, []);

    /**
     * Opens the modal for adding a new product document type.
     */
    const handleAddProductDocumentType = () => {
        setDocumentTypeFormData({
            documentTypeId: '',
            documentTypeName: '',
            documentTypeDescription: '',
            documentTypeFormat: ''
        });
        setIsDocumentTypeModalOpen(true);
    };

    /**
     * Opens the modal for editing an existing product document type.
     *
     * @param {ProductDocumentsType} row - The document type to edit.
     */
    const handleEditProductDocumentType = (row: ProductDocumentsType) => {
        setDocumentTypeFormData({
            documentTypeId: row.document_type_id,
            documentTypeName: row.document_type_name,
            documentTypeDescription: row.document_type_description,
            documentTypeFormat: row.document_type_format
        });
        setIsDocumentTypeModalOpen(true);
    };

    /**
     * Submits the form data for adding or updating a product document type.
     *
     * @param {ProductDocumentTypeFormValues} values - The form values.
     */
    const handleSubmit = (values: ProductDocumentTypeFormValues) => {
        if (values.documentTypeId) {
            dispatch(
                updateProductDocumentTypeRequest(
                    values.documentTypeId,
                    values.documentTypeName,
                    values.documentTypeDescription,
                    values.documentTypeFormat
                )
            );
        } else {
            dispatch(
                addProductDocumentTypeRequest(
                    values.documentTypeName,
                    values.documentTypeDescription,
                    values.documentTypeFormat
                )
            );
        }
        handleCloseModal();
    };

    /**
     * Closes the modal and resets the form data.
     */
    const handleCloseModal = () => {
        setDocumentTypeFormData(null);
        setIsDocumentTypeModalOpen(false);
    };

    /**
     * Filters the product document types based on the filter text.
     *
     * @returns {ProductDocumentsType[]} - The filtered list of document types.
     */
    const filteredDocuments = useMemo(() => {
        const lowercasedFilterText = debouncedFilterText.toLowerCase();

        return productDocumentsType.filter((doc) => {
            const fieldsToSearch = [
                doc.document_type_name,
                doc.document_type_description,
                doc.document_type_format,
                doc.category_name
            ];

            return fieldsToSearch.some((field) =>
                field?.toLowerCase().includes(lowercasedFilterText)
            );
        });
    }, [debouncedFilterText, productDocumentsType]);

    /**
     * Creates a subheader component with a filter input and an add button.
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
                        onClick={() => handleAddProductDocumentType()}
                    >
                        <Icon icon="tabler:plus" className="me-1" />
                        Add ProductDocumentType
                    </button>
                </div>

                <div className="d-flex align-items-start justify-content-between gap-4 mt-3">
                    <TableFilter
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFilterText(e.target.value)
                        }
                        onClear={handleClear}
                        filterText={filterText}
                        placeholder="Filter Product DocumentType..."
                    />
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <DataTable
                columns={[
                    ...ProductDocumentTypeTableColumns,
                    ProductDocumentTypeActionColumn(handleEditProductDocumentType)
                ]}
                data={filteredDocuments}
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

            {isDocumentTypeModalOpen && (
                <ProductDocumentTypeModal
                    isOpen={isDocumentTypeModalOpen}
                    onClose={handleCloseModal}
                    documentTypeFormData={documentTypeFormData}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};
