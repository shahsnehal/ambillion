import { CustomLoader } from 'common/loaders/loader';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'reduxSaga/config/store';
import { getProductDetailsRequest } from 'reduxSaga/modules/product-module/action/actions';
import uploadImages from 'assets/images/product.jpg';

export const ProductDetails: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useDispatch();
    const { selectedProductDetails, isLoading } = useSelector(
        (state: RootState) => state.productModule
    );

    useEffect(() => {
        if (productId) {
            dispatch(getProductDetailsRequest(productId));
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
            ) : (
                <div className="card">
                    <div className="card-body">
                        <div className="container my-4">
                            <div className="row">
                                <div className="col-lg-6 mb-4 mb-lg-0 d-flex flex-column align-items-center">
                                    <h2 className="mt-3 mb-3 text-center">
                                        {selectedProductDetails?.product_displayname}
                                    </h2>
                                    <div
                                        className="product-image-container border rounded d-flex justify-content-center align-items-center"
                                        style={{ width: '300px', height: '300px' }}
                                    >
                                        <img
                                            src={uploadImages}
                                            className="img-fluid rounded product-image"
                                            alt={selectedProductDetails?.product_displayname}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        />
                                    </div>

                                    <p className="mb-0 mt-5 text-center text-dark">
                                        <strong>HSN Code:</strong>{' '}
                                        {selectedProductDetails?.origin_hsn_code}
                                    </p>
                                </div>
                                <div className="col-lg-6">
                                    <div className="product-details bg-light p-4 rounded">
                                        <div className="mb-3">
                                            <strong>Category:</strong>{' '}
                                            {selectedProductDetails?.category_name}
                                        </div>
                                        <div className="mb-3">
                                            <strong>Description:</strong>{' '}
                                            {selectedProductDetails?.customer_product_description}
                                        </div>
                                        <div className="mb-3">
                                            <strong>Features:</strong>{' '}
                                            {selectedProductDetails?.product_feature}
                                        </div>
                                        <div className="mb-3">
                                            <strong>status:</strong>{' '}
                                            {selectedProductDetails?.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
