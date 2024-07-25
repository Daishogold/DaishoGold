const productModel = require("../../models/productModel")

const getCategoryWiseProducts = async (req, res) => {
    try {
        const { category } = req?.body || req?.query
        const product = await productModel.find({ category })

        res.json({
            message: "Product",
            data: product,
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = getCategoryWiseProducts