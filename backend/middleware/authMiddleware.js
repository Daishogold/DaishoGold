// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.cookies?.token;

//         if (!token) {
//             return res.status(401).json({
//                 message: 'Please Login...!',
//                 error: true,
//                 success: false,
//             });
//         }

//         jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({
//                     message: 'Invalid token',
//                     error: true,
//                     success: false,
//                 });
//             }

//             const user = await User.findById(decoded._id);
//             if (!user) {
//                 return res.status(401).json({
//                     message: 'User not found',
//                     error: true,
//                     success: false,
//                 });
//             }

//             req.userId = decoded._id;
//             req.userRole = user.role; // Add role information
//             next();
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false,
//         });
//     }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: 'Please Login...!',
                error: true,
                success: false,
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid token',
                    error: true,
                    success: false,
                });
            }

            const user = await User.findById(decoded._id);
            if (!user) {
                return res.status(401).json({
                    message: 'User not found',
                    error: true,
                    success: false,
                });
            }

            req.userId = decoded._id;
            req.userRole = user.role; // Add role information
            next();
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = authMiddleware;