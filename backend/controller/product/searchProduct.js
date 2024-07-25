const productModel = require("../../models/productModel")

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q

        const regex = new RegExp(query, 'i', 'g')

        const product = await productModel.find({
            "$or": [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })

        res.json({
            data: product,
            messaage: "Search Product List",
            error: false,
            success: true
        })

    } catch (error) {
        res.json({
            messaage: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = searchProduct