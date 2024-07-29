const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

async function resetPasswordController(req, res) {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            throw new Error("Please provide a new password");
        }
        if (!validatePassword(password)) {
            throw new Error("Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character");
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
