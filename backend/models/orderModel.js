const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
            ref: 'product',
            required: true
        },
        quantity: Number,
        price: Number
    }],
    totalPrice: Number,
    shippingCharges: Number,
    totalAmount: Number
}, {
    timestamps: true
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
