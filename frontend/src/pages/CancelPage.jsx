import { Link } from 'react-router-dom';
import img from '../assets/cancel.gif';

const CancelPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Unable to Proceed</h1>
            <img src={img} alt="Error" className="mx-auto w-[100px] h-[100px] max-w-xs object-contain mb-6" />
            <p className="text-center text-gray-700 mb-6">
                Due to some technical error, we cannot proceed at the moment. Please try again later.
            </p>
            <Link to="/" className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                Go to Home
            </Link>
        </div>
    );
};

export default CancelPage;
