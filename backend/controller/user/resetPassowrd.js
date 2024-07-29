const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');

async function resetPasswordController(req, res) {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            throw new Error("Please provide a new password");
        }

        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            throw new Error("Password reset token is invalid or has expired");
        }

        user.password = await bcrypt.hash(password, 12);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({
            message: "Password has been updated successfully",
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

module.exports = resetPasswordController;
