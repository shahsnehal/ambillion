import { useParams } from 'react-router-dom';
import { dummyProductTableData } from 'utils/table/data';

export const ProductDetail = () => {
    const { productId } = useParams<{ productId: string }>();

    const productIdInt = productId ? parseInt(productId, 10) : undefined;

    const product = productIdInt
        ? dummyProductTableData.find((item) => item.id === productIdInt)
        : undefined;

    if (!product) {
        return <div className="container my-4">Product not found.</div>;
    }

    const {
        uploadImage,
        productCategory,
        productType,
        productDisplayName,
        customerProductDescription,
        brandName,
        exWorkPrice,
        byColor,
        bySize,
        originHsnCode,
        unitMeasure,
        weight,
        dimensions,
        byGender,
        material,
        productFeatures
    } = product;

    return (
        <div className="card">
            <div className="card-body">
                <div className="container my-4">
                    <div className="row">
                        <div className="col-lg-6 mb-4 mb-lg-0 d-flex flex-column align-items-center">
                            <h2 className="mt-3 text-center">{productDisplayName}</h2>
                            <div
                                className="product-image-container border rounded d-flex justify-content-center align-items-center"
                                style={{ width: '300px', height: '300px' }}
                            >
                                {uploadImage ? (
                                    <img
                                        src={uploadImage}
                                        className="img-fluid rounded product-image"
                                        alt={productDisplayName}
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                ) : (
                                    <div className="text-center">
                                        <span className="text-muted">No Image Available</span>
                                    </div>
                                )}
                            </div>
                            <p className="mb-0 mt-3 text-center">
                                <strong>HSN Code:</strong> {originHsnCode}
                            </p>
                        </div>

                        <div className="col-lg-6">
                            <div className="product-details bg-light p-4 rounded">
                                <div className="mb-3">
                                    <strong>Category:</strong> {productCategory}
                                </div>
                                <div className="mb-3">
                                    <strong>Type:</strong> {productType}
                                </div>
                                <div className="mb-3">
                                    <strong>Description:</strong> {customerProductDescription}
                                </div>
                                <div className="mb-3">
                                    <strong>Brand:</strong> {brandName}
                                </div>
                                <div className="mb-3">
                                    <strong>Price:</strong> ${exWorkPrice}
                                </div>
                                <div className="mb-3">
                                    <strong>Color:</strong> {byColor}
                                </div>
                                <div className="mb-3">
                                    <strong>Size:</strong> {bySize.join(', ')}
                                </div>
                                <div className="mb-3">
                                    <strong>Unit Measure:</strong> {unitMeasure}
                                </div>
                                <div className="mb-3">
                                    <strong>Weight:</strong> {weight} kg
                                </div>
                                <div className="mb-3">
                                    <strong>Dimensions:</strong> {dimensions}
                                </div>
                                <div className="mb-3">
                                    <strong>Gender:</strong> {byGender}
                                </div>
                                <div className="mb-3">
                                    <strong>Material:</strong> {material}
                                </div>
                                <div className="mb-0">
                                    <strong>Features:</strong> {productFeatures}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-start justify-content-end gap-4 mt-4">
                        <button className="btn btn-danger"> Reject </button>
                        <button className="btn btn-primary"> Accept </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
