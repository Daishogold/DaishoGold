const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req, res) {
    try {

        const sessionUserId = req.userId

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission Denied!")
        }

        const UploadProduct = new productModel(req.body)
        const saveProduct = await UploadProduct.save()

        res.status(201).json({
            message: "Product Uploaded Successfully!",
            error: false,
            success: true,
            data: saveProduct
        })


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = UploadProductController