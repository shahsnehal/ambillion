import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { TableFilter } from 'components/common/table/tableFilter';
import { customStyles } from 'utils/table/columns';
import { RootState } from 'reduxSaga/config/store';
import { CustomLoader } from 'common/loaders/loader';
import {
    addCountryRequest,
    fetchCountryRequest,
    updateCountryRequest
} from 'reduxSaga/modules/country-module/action/actions';
import { CountryActionColumn, CountryTableColumns } from './countriesColumn';
import { CountryModal } from './countriesModal';
import { CountryType, CountryFormValues } from 'reduxSaga/modules/country-module/type/types';
import { useDebounce } from 'utils/common';

/**
 * Component to manage and display countries.
 * Allows for adding, editing, and filtering countries.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const Country = () => {
    const dispatch = useDispatch();
    const [filterText, setFilterText] = useState<string>('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [isCountryModalOpen, setIsCountryModalOpen] = useState<boolean>(false);
    const [countryFormData, setCountryFormData] = useState<CountryFormValues | null>(null);
    const { countries, isLoading } = useSelector((state: RootState) => state.CountryModule);
    const debouncedFilterText = useDebounce(filterText, 500);

    // Fetch all countries on mount
    useEffect(() => {
        dispatch(fetchCountryRequest());
    }, []);

    /**
     * Open modal for adding a new country.
     */
    const handleAddCountry = () => {
        setCountryFormData({
            countryId: '',
            countryCode: '',
            countryName: ''
        });
        setIsCountryModalOpen(true);
    };

    /**
     * Open modal for editing an existing country.
     *
     * @param {Country} row - The country to edit.
     */
    const handleEditCountry = (row: CountryType) => {
        setCountryFormData({
            countryId: row.country_id,
            countryCode: row.country_code,
            countryName: row.country_name
        });
        setIsCountryModalOpen(true);
    };

    /**
     * Submits the form data for adding or updating a country.
     *
     * @param {CountryFormValues} values - The form values.
     */
    const handleSubmit = (values: CountryFormValues) => {
        if (values.countryId) {
            dispatch(
                updateCountryRequest(
                    values.countryId,
                    values.countryCode.toUpperCase(),
                    values.countryName
                )
            );
        } else {
            dispatch(addCountryRequest(values.countryCode.toUpperCase(), values.countryName));
        }
        handleCloseModal();
    };

    /**
     * Close modal and reset form data.
     */
    const handleCloseModal = () => {
        setCountryFormData(null);
        setIsCountryModalOpen(false);
    };

    /**
     * Filter countries based on the filter text.
     *
     * @returns {Country[]} - Filtered list of countries.
     */
    const filteredCountries = useMemo(() => {
        const lowercasedFilterText = debouncedFilterText.toLowerCase();
        return countries.filter((country) => {
            return (
                country.country_code.toLowerCase().includes(lowercasedFilterText) ||
                country.country_name.toLowerCase().includes(lowercasedFilterText)
            );
        });
    }, [debouncedFilterText, countries]);

    /**
     * Create a subheader component with a filter input and an add button.
     *
     * @returns {JSX.Element} Subheader component.
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
                        onClick={() => handleAddCountry()}
                    >
                        <Icon icon="tabler:plus" className="me-1" />
                        Add Country
                    </button>
                </div>

                <div className="d-flex align-items-start justify-content-between gap-4 mt-3">
                    <TableFilter
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFilterText(e.target.value)
                        }
                        onClear={handleClear}
                        filterText={filterText}
                        placeholder="Filter Countries..."
                    />
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <DataTable
                columns={[...CountryTableColumns, CountryActionColumn(handleEditCountry)]}
                data={filteredCountries}
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

            {isCountryModalOpen && (
                <CountryModal
                    isOpen={isCountryModalOpen}
                    onClose={handleCloseModal}
                    countryFormData={countryFormData}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};
