const express = require('express')
const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const authToken = require('../middleware/authToken')
const userDetailsController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProduct')
const getCategoryWiseProducts = require('../controller/product/getCategoryWiseProducts')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewPeoduct = require('../controller/user/addToCartViewPeoduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const deleteProductController = require('../controller/product/deleteProduct')
const forgotPasswordController = require('../controller/user/forgotPassword')
const resetPasswordController = require('../controller/user/resetPassowrd')
const getProductsByBrand = require('../controller/product/getProductByBrand')
const orderController = require('../controller/order/orderController')
const googleSignInController = require('../controller/user/googleSignInController')
const auth = require('../middleware/auth')
const { getAllOrders, getOrdersByUserId, completeOrder } = require('../controller/order/showOrderController')
const authMiddleware = require('../middleware/authMiddleware')
const { getUserWallet } = require('../controller/order/walletController')
const walletMiddleware = require('../middleware/walletmiddleware')
const { getAllWallets } = require('../controller/order/adminWallet')

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.post('/google-signin', googleSignInController);
router.post("/forgot-password", forgotPasswordController)
router.post('/reset-password/:token', resetPasswordController);
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

//Admin Panel
router.get("/all-users", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

//product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.get("/products-by-brand", getProductsByBrand);
router.post("/category-product", getCategoryWiseProducts)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)
router.delete("/delete-product/:productId", deleteProductController)


//user add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-cart-product", authToken, addToCartViewPeoduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)

//order
router.post('/orders', auth, orderController)
router.get('/admin/orders', authMiddleware, getAllOrders);
router.get('/user/orders/:userId', authMiddleware, getOrdersByUserId);

router.get('/wallet', walletMiddleware, getUserWallet);
router.get('/admin/wallets', getAllWallets);


module.exports = router