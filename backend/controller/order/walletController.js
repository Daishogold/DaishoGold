const userModel = require('../../models/userModel');

const getUserWallet = async (req, res) => {
    try {
        const userId = req.userId; // Use userId set by authToken middleware
        console.log('Fetching wallet for user ID:', userId);
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        res.json({
            wallet: user.wallet
        });
    } catch (error) {
        console.error('Error fetching user wallet:', error);
        res.status(500).json({
            message: 'An error occurred while fetching wallet data',
            error: true,
            success: false
        });
    }
};

module.exports = { getUserWallet };
