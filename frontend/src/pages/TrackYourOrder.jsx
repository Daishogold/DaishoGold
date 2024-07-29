import { motion } from 'framer-motion'; // For animation
import { useState } from 'react';
import { FaSearch, FaBox, FaCheckCircle } from 'react-icons/fa'; // Import icons

const TrackYourOrder = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [status, setStatus] = useState(null);

    const handleTrackOrder = () => {
        // Replace this with real tracking logic
        setStatus(`Order ${orderNumber} is currently in transit.`);
    };

    return (
        <div className="container mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-xl"
            >
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center justify-center">
                    <FaBox className="text-blue-600 text-4xl mr-3" />
                    Track Your Order
                </h1>
                <p className="text-lg text-gray-700 mb-6 text-center">
                    Use the form below to track the status of your order. Enter your order number and click &#34;Track&#34; to get the latest updates.
                </p>

                <div className="mb-8 flex flex-col items-center">
                    <div className="flex items-center mb-4 w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Enter your order number"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                        <button
                            onClick={handleTrackOrder}
                            className="bg-blue-600 text-white rounded-lg py-3 px-4 ml-4 hover:bg-blue-700 transition duration-300 flex items-center"
                        >
                            <FaSearch className="mr-2" />
                            Track
                        </button>
                    </div>

                    {status && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mt-4 p-4 w-full max-w-md text-center bg-white rounded-lg shadow-md"
                        >
                            <div className="flex items-center justify-center mb-2">
                                <FaCheckCircle className="text-green-500 text-3xl mr-2" />
                                <p className="text-gray-700">{status}</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default TrackYourOrder;
