import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className='container mx-auto text-center mt-10'>
            <h1 className='text-2xl font-bold'>Order Successful</h1>
            <p className='mt-4 text-lg'>Your order has been placed successfully.</p>
            <Link to='/' className='mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded'>
                Continue Shopping
            </Link>
        </div>
    );
};

export default SuccessPage;