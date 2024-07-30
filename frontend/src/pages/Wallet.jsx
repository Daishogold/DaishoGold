import { FaWallet, FaMoneyBillWave } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Wallet = () => {
    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex items-center mb-4">
                <FaWallet size={24} className="text-blue-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Your Wallet</h2>
            </div>
            <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
                <div className="flex items-center">
                    <FaMoneyBillWave size={20} className="text-green-500 mr-2" />
                    <span className="text-lg font-medium text-gray-700">Cashback Earned:</span>
                </div>
                <span className="text-xl font-bold text-gray-900">100</span>
            </div>
            <div className="mb-4">
                <p className="text-sm text-gray-600">Place more orders to earn cashback!</p>
                <p className="text-md font-semibold text-blue-600">3% cashback on every order</p>
            </div>
            <div className="flex items-center">
                <Link to={'/'} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-900 focus:outline-none">
                    <span className="mr-2">Continue Shopping</span>
                    <MdArrowForward size={16} />
                </Link>
            </div>
        </div>
    );
};

export default Wallet;
