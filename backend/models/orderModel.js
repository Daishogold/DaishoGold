const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Make sure 'User' matches the name in userSchema
        required: true
    },
    name: String,
    email: String,
    phone: String,
    address: String,
    shippingAddress: String,
    city: String,
    postalCode: String,
    paymentMethod: String,
    countryCode: String,
    country: String,
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product', // Ensure this matches the productModel name
            required: true
        },
        quantity: Number,
        sellingPrice: Number
    }],
    totalPrice: Number,
    shippingCharges: Number,
    totalAmount: Number,
    status: {
        type: String,
        default: 'Pending'
    }
}, {
    timestamps: true
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;