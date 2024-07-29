const orderModel = require('../../models/orderModel');
const productModel = require('../../models/productModel');

const orderController = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            address,
            shippingAddress,
            city,
            postalCode,
            paymentMethod,
            countryCode,
            country,
            products,
            totalPrice,
            shippingCharges,
            totalAmount
        } = req.body;

        const newOrder = new orderModel({
            name,
            email,
            phone,
            address,
            shippingAddress,
            city,
            postalCode,
            paymentMethod,
            countryCode,
            country,
            products,
            totalPrice,
            shippingCharges,
            totalAmount
        });

        await newOrder.save();

        res.json({
            message: 'Order placed successfully',
            success: true,
            error: false,
            data: newOrder
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = orderController;
