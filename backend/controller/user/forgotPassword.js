const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');

async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        // Generate a reset token
        const resetToken = (email + Date.now()).toString();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        res.status(200).json({
            message: "User found.. Now Proceed To Reset Password",
            data: { token: resetToken }, // Send token in response
            success: true,
            error: false
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = forgotPasswordController;
