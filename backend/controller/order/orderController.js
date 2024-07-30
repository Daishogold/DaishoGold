const orderModel = require('../../models/orderModel');
const addToCartModel = require('../../models/cartProduct'); // Make sure this matches your actual model file name

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

        // Ensure user is authenticated
        if (!req.userId) {
            return res.status(401).json({
                message: 'User not authenticated',
                error: true,
                success: false
            });
        }

        const newOrder = new orderModel({
            userId: req.userId, // Use req.userId instead of req.user._id
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

        // Remove items from cart
        await addToCartModel.deleteMany({ userId: req.userId });

        res.json({
            message: 'Order placed successfully',
            success: true,
            error: false,
            data: newOrder
        });

    } catch (error) {
        console.error('Order placement error:', error);
        res.status(400).json({
            message: error.message || 'An error occurred while placing the order',
            error: true,
            success: false
        });
    }
};

module.exports = orderController;