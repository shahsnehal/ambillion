import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useParams, useNavigate } from 'react-router-dom';
import { CustomLoader } from 'common/loaders/loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reduxSaga/config/store';
import { getImportStatusRequest } from 'reduxSaga/modules/product-module/action/actions';
import { ROUTES } from 'constants/common';
import { getProductStatusClass } from 'utils/table/columns';
import NoteList from 'common/notes/noteList';

export const ProductImportStatusDetails: React.FC = () => {
    const { productId, countryId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { importStatus, isLoading } = useSelector((state: RootState) => state.productModule);

    useEffect(() => {
        if (productId && countryId) {
            dispatch(getImportStatusRequest(productId, countryId));
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="card">
                    <div className="card-body">
                        <div className="container my-4">
                            <CustomLoader />
                        </div>
                    </div>
                </div>
            ) : importStatus ? (
                <div className="card">
                    <div className="card-body">
                        <div className="container my-4">
                            <div>
                                <h4 className="mb-3">
                                    Product Name : {importStatus?.product_displayname}
                                </h4>
                                <div className="d-flex align-items-center gap-8 mb-3">
                                    <h6 className="mb-0 fs-4">HSN Code:</h6>
                                    <span>{importStatus?.origin_hsn_code}</span>
                                </div>
                                <div className="mb-3">
                                    <h4 className="d-flex flex-wrap align-items-center">
                                        <span className="me-2">{importStatus?.country_name} :</span>
                                        <span
                                            className={`badge ${getProductStatusClass(importStatus?.import_status ?? '')} fs-2 fw-semibold`}
                                        >
                                            {importStatus?.import_status}
                                        </span>
                                    </h4>
                                </div>

                                <hr className="mt-4" />
                                <div className="mt-1">
                                    <h6 className="fw-semibold mb-0 text-dark mb-3">
                                        Notes History
                                    </h6>
                                    <NoteList notesList={importStatus?.notes || null} />
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-content-end">
                                <button
                                    className="btn btn-rounded btn-secondary back-btn"
                                    onClick={() => navigate(`${ROUTES.PRODUCTS}/${productId}`)}
                                >
                                    <Icon icon="icon-park-outline:back" className="me-1" />
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No Import Status Available For This Product.</div>
            )}
        </>
    );
};
