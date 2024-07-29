const backendDomin = import.meta.env.VITE_API_URL

const SummaryApi = {
    signUp: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    forgotPasword: {
        url: `${backendDomin}/api/forgot-password`,
        method: 'post'
    },
    resetPassword: {
        url: `${backendDomin}/api/reset-password`, // The token will be appended in the request URL
        method: 'post'
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    Logout_user: {
        url: `${backendDomin}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomin}/api/all-users`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomin}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomin}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomin}/api/update-product`,
        method: "post"
    },
    deleteProduct: {
        url: `${backendDomin}/api/delete-product`,
        method: "delete"
    },
    categoryProduct: {
        url: `${backendDomin}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomin}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomin}/api/addtocart`,
        method: "post"
    },
    addToCartProductCount: {
        url: `${backendDomin}/api/countAddToCartProduct`,
        method: "get"
    },
    addToCartProductView: {
        url: `${backendDomin}/api/view-cart-product`,
        method: "get"
    },
    updateCartProduct: {
        url: `${backendDomin}/api/update-cart-product`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${backendDomin}/api/delete-cart-product`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomin}/api/search`,
        method: "post"
    },
    filterProduct: {
        url: `${backendDomin}/api/filter-product`,
        method: "post"
    },
}

export default SummaryApi