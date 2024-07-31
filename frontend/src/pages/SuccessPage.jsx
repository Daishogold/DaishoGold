import { Link } from 'react-router-dom';
import img from '../assets/success.gif'

const SuccessPage = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen mt-10'>
            <h1 className="text-3xl font-bold mb-4">Order Successful</h1>
            <img src={img} alt="Order Successful" className="mx-auto w-[100px] h-[100px] max-w-sm object-contain mt-4" />
            <p className='mt-4 text-lg'>Your order has been placed successfully.</p>
            <p className='mt-4 text-2xl text-green-500'>3% Discount Applied!</p>
            <Link to='/' className='mt-6 inline-block bg-red-600 text-white px-4 py-2 rounded'>
                Continue Shopping
            </Link>
        </div>
    );
};

export default SuccessPage;