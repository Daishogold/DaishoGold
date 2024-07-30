const userModel = require('../../models/userModel');

const getAllWallets = async (req, res) => {
    try {
        const users = await userModel.find({}, 'name email wallet').lean();
        res.json({
            wallets: users
        });
    } catch (error) {
        console.error('Error fetching wallet data for all users:', error);
        res.status(500).json({
            message: 'An error occurred while fetching wallet data',
            error: true,
            success: false
        });
    }
};

module.exports = { getAllWallets };
