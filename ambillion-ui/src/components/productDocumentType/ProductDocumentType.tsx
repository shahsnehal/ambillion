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

    //Fetch ProductDocumentType
    useEffect(() => {
        dispatch(fetchProductDocumentTypeRequest());
    }, []);

    //Add ProductDocumentType
    const handleAddProductDocumentType = () => {
        setDocumentTypeFormData({
            documentTypeId: '',
            documentTypeName: '',
            documentTypeDescription: '',
            documentTypeFormat: ''
        });
        setIsDocumentTypeModalOpen(true);
    };

    //Edit ProductDocumentType
    const handleEditProductDocumentType = (row: ProductDocumentsType) => {
        setDocumentTypeFormData({
            documentTypeId: row.document_type_id,
            documentTypeName: row.document_type_name,
            documentTypeDescription: row.document_type_description,
            documentTypeFormat: row.document_type_format
        });
        setIsDocumentTypeModalOpen(true);
    };

    // Add & Edit Confirmation Logic
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

    //HandleCloseModal For All Actions
    const handleCloseModal = () => {
        setDocumentTypeFormData(null);
        setIsDocumentTypeModalOpen(false);
    };

    //Filter Functionality
    const filteredItems = useMemo(
        () =>
            productDocumentsType.filter((item) =>
                item.document_type_name.toLowerCase().includes(filterText.toLowerCase())
            ),
        [filterText, productDocumentsType]
    );

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
                        placeholder="Filter By Product Document Name"
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
