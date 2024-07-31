const Order = require('../../models/orderModel');

exports.updateOrderStatus = async (req, res) => {
    console.log('Request body:', req.body);
    try {
        const { orderId, status } = req.body;

        // Validate status
        const validStatuses = ['Received', 'Pending', 'Transit', 'Delivered'];
        if (!validStatuses.includes(status)) {
            console.log('Invalid status value:', status);
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Find the order by ID and update it
        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: { status },
                $push: { statusHistory: { status, timestamp: new Date() } }
            },
            { new: true, runValidators: true }
        );

        if (!order) {
            console.log('Order not found for ID:', orderId);
            return res.status(404).json({ message: 'Order not found' });
        }

        console.log('Order status updated:', order);
        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};