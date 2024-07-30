const Order = require('../../models/orderModel');

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        console.log("Fetching all orders for admin:", req.userId); // Log userId
        const orders = await Order.find()
            .populate({
                path: 'userId',
                select: 'name email phone address' // Select specific fields to return
            })
            .populate({
                path: 'products.productId',
                select: 'productName brandName productImage description price sellingPrice' // Select specific fields to return
            });

        console.log("Orders fetched:", orders);

        if (!orders || orders.length === 0) {
            console.error("No orders found");
            return res.status(404).json({ success: false, message: 'No orders found' });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


// Get order details by user ID (User)
exports.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId })
            .populate('products.productId');
        if (!orders) {
            return res.status(404).json({ success: false, message: 'No orders found for user' });
        }
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


