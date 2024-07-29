import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import PageNotFound from '../pages/PageNotFound';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import Contact from '../pages/Contact';
import ResetPassword from '../pages/ResetPassword';
import Returns from '../pages/Returns';
import Shipping from '../pages/Shipping';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import WarrantyInformation from '../pages/WarrantyInformation';
import TrackYourOrder from '../pages/TrackYourOrder';
import ProductsByBrand from '../components/ProductsByBrand';
import SuccessPage from '../pages/SuccessPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: "/reset-password/:token",
                element: <ResetPassword />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },
            {
                path: 'product-category',
                element: <CategoryProduct />
            },
            {
                path: 'products-by-brand',
                element: <ProductsByBrand />
            },
            {
                path: 'product/:id',
                element: <ProductDetails />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'success',
                element: <SuccessPage />
            },
            {
                path: 'search',
                element: <SearchProduct />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'frequently-asked-questions',
                element: <FAQ />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'returns',
                element: <Returns />
            },
            {
                path: 'shipping',
                element: <Shipping />
            },
            {
                path: 'privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: 'terms-of-service',
                element: <TermsOfService />
            },
            {
                path: 'warranty',
                element: <WarrantyInformation />
            },
            {
                path: 'track-order',
                element: <TrackYourOrder />
            },
            {
                path: 'admin-panel',
                element: <AdminPanel />,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <PageNotFound />
    }
]);

export default router;
