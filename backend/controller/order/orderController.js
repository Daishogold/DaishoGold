const orderModel = require('../../models/orderModel');
const addToCartModel = require('../../models/cartProduct');
const userModel = require('../../models/userModel');

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
            shippingCharges
        } = req.body;

        if (!req.userId) {
            return res.status(401).json({
                message: 'User not authenticated',
                error: true,
                success: false
            });
        }

        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        const discount = Math.min(user.wallet, totalPrice + shippingCharges);
        const totalAmount = totalPrice + shippingCharges - discount;
        const cashback = Math.round(totalAmount * 0.03 * 100) / 100; // 3% cashback, rounded to 2 decimal places

        const newOrder = new orderModel({
            userId: req.userId,
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
            totalAmount,
            discountApplied: discount,
            cashbackEarned: cashback
        });

        await newOrder.save();

        user.wallet = user.wallet - discount + cashback;
        await user.save();

        await addToCartModel.deleteMany({ userId: req.userId });

        res.json({
            message: 'Order placed successfully',
            success: true,
            error: false,
            data: newOrder,
            discountApplied: discount,
            cashbackEarned: cashback
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