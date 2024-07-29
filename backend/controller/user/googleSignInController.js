// controllers/googleSignInController.js
const { OAuth2Client } = require('google-auth-library');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleSignInController(req, res) {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            throw new Error("Google ID Token is required");
        }

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture } = ticket.getPayload();

        let user = await userModel.findOne({ email });

        if (!user) {
            user = new userModel({
                name,
                email,
                profilePic: picture,
            });

            await user.save();
        }

        const tokenData = {
            _id: user._id,
            email: user.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        const tokenOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        };

        res.cookie("token", token, tokenOptions).status(200).json({
            message: "Login successful",
            data: token,
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

module.exports = googleSignInController;
