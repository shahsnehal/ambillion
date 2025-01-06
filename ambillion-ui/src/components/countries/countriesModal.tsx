import React from 'react';
import { Formik, Field, ErrorMessage, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { CountryFormValues } from 'reduxSaga/modules/country-module/type/types';
import { Icon } from '@iconify/react';
import { trimValues } from 'utils/common';

export type CountryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    countryFormData: CountryFormValues | null;
    onSubmit: (values: CountryFormValues) => void;
};

/**
 * Validation schema for the country form.
 *
 * @type {Yup.ObjectSchema<CountryFormValues>}
 */
const validationSchema = Yup.object({
    countryName: Yup.string()
        .required('Country Name is required !')
        .trim()
        .max(100, 'Country Name must be at most 100 characters long !'),
    countryCode: Yup.string()
        .required('Country Code is required!')
        .trim()
        .length(3, 'Country Code must be exactly 3 characters long !')
});

/**
 * Modal component for adding or editing a country.
 *
 * @param {CountryModalProps} props - Component props.
 * @param {boolean} props.isOpen - Boolean indicating if the modal is open.
 * @param {() => void} props.onClose - Callback function to handle closing the modal.
 * @param {CountryFormValues | null} props.countryFormData - Form data for the country being edited, or null if adding a new one.
 * @param {(values: CountryFormValues) => void} props.onSubmit - Callback function to handle form submission with the provided values.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if the modal is not open.
 */
export const CountryModal: React.FC<CountryModalProps> = ({
    isOpen,
    onClose,
    countryFormData,
    onSubmit
}) => {
    // Early return if the modal is not open
    if (!isOpen) return null;

    /**
     * Initial values for the form, derived from the provided form data or default to empty strings.
     *
     * @type {CountryFormValues}
     */
    const initialValues: CountryFormValues = {
        countryId: countryFormData?.countryId ?? '',
        countryCode: countryFormData?.countryCode ?? '',
        countryName: countryFormData?.countryName ?? ''
    };

    return (
        <>
            <div
                className={`modal fade ${isOpen ? 'show' : ''}`}
                tabIndex={-1}
                aria-hidden={!isOpen}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                const trimmedValues = trimValues(values);
                                onSubmit(trimmedValues);
                                resetForm();
                            }}
                        >
                            {(formikProps: FormikProps<CountryFormValues>) => (
                                <Form>
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {countryFormData?.countryId
                                                ? 'Edit Country'
                                                : 'Add Country'}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={onClose}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="countryCode" className="form-label">
                                                Country Code <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                id="countryCode"
                                                name="countryCode"
                                                type="text"
                                                autoFocus
                                                className={`form-control ${
                                                    formikProps.touched.countryCode &&
                                                    formikProps.errors.countryCode
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="countryCode"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="countryName" className="form-label">
                                                Country Name <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                id="countryName"
                                                name="countryName"
                                                type="text"
                                                className={`form-control ${
                                                    formikProps.touched.countryName &&
                                                    formikProps.errors.countryName
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="countryName"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer flex-column flex-md-row justify-content-between">
                                        <div className="d-flex flex-column flex-md-row w-100 justify-content-md-start">
                                            <button
                                                type="button"
                                                className="btn btn-rounded btn-secondary w-100 w-md-auto mb-2 mb-md-0 me-md-2"
                                                onClick={onClose}
                                            >
                                                <Icon
                                                    icon="carbon:close-outline"
                                                    className="fs-5 me-1"
                                                />
                                                Close
                                            </button>

                                            <button
                                                type="submit"
                                                className="btn btn-rounded btn-primary w-100 w-md-auto mb-2 mb-md-0"
                                                disabled={
                                                    !formikProps.isValid || !formikProps.dirty
                                                }
                                            >
                                                <Icon icon="tabler:plus" className="fs-5 me-1" />
                                                {countryFormData?.countryId
                                                    ? 'Save Changes'
                                                    : 'Add Country'}
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};
