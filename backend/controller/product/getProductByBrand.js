const productModel = require("../../models/productModel");

// Controller to get products by brand name
const getProductsByBrand = async (req, res) => {
    try {
        const { brandName } = req.query;

        if (!brandName) {
            return res.status(400).json({
                message: "Brand name is required",
                error: true,
                success: false
            });
        }

        // Find products by brand name
        const products = await productModel.find({ brandName });

        res.json({
            message: "Products fetched successfully",
            data: products,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = getProductsByBrand;
