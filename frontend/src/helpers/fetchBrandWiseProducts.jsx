import SummaryApi from "../common";

const fetchProductsByBrand = async (brandName) => {
    const response = await fetch(`${SummaryApi.brandWiseProduct.url}?brandName=${encodeURIComponent(brandName)}`, {
        method: SummaryApi.brandWiseProduct.method,
        headers: {
            "content-type": "application/json"
        }
    });

    const dataResponse = await response.json();
    return dataResponse;
};

export default fetchProductsByBrand;
