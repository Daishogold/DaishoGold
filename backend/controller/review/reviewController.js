const reviewModel = require("../../models/reviewModel");

const addReviewController = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;
        const newReview = new reviewModel({ productId, userId, rating, comment });
        await newReview.save();

        res.json({
            message: "Review added successfully",
            success: true,
            error: false,
            data: newReview
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

const getProductReviewsController = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ productId: req.params.productId }).sort({ createdAt: -1 }).populate('userId', 'name');

        res.json({
            message: "Product Reviews",
            success: true,
            error: false,
            data: reviews
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = {
    addReviewController,
    getProductReviewsController
};
