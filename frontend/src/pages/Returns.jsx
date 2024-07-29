import { motion } from 'framer-motion'; // For animation
import { FaUndo, FaExchangeAlt, FaMoneyBillWave, FaEnvelope } from 'react-icons/fa'; // User icons from react-icons

const Returns = () => {
    return (
        <div className="container mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-white shadow-lg rounded-lg p-8"
            >
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                    Returns & Exchange Policy
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                        <FaUndo className="text-blue-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Return Eligibility</h2>
                        <p className="text-gray-700">
                            - Items must be returned within 30 days of purchase.<br />
                            - Items must be in their original condition, unused, and with all original packaging and tags.<br />
                            - Proof of purchase is required for all returns.<br />
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                        <FaExchangeAlt className="text-green-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">How to Return an Item</h2>
                        <p className="text-gray-700">
                            - Contact our customer service team to initiate a return.<br />
                            - Package the item securely and include the return authorization number.<br />
                            - Ship the package to our return address, which will be provided by our customer service team.<br />
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                        <FaExchangeAlt className="text-yellow-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Exchange Policy</h2>
                        <p className="text-gray-700">
                            - Exchanges are only accepted for items of equal or lesser value.<br />
                            - The item to be exchanged must be in its original condition and packaging.<br />
                            - Exchanges must be requested within 30 days of purchase.<br />
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                        <FaMoneyBillWave className="text-red-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Refunds</h2>
                        <p className="text-gray-700">
                            - Refunds will be processed to the original method of payment.<br />
                            - Please allow up to 10 business days for the refund to appear on your account.<br />
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out col-span-1 md:col-span-2 lg:col-span-3">
                        <FaEnvelope className="text-teal-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact Us</h2>
                        <p className="text-gray-700">
                            For any questions or concerns regarding our returns and exchange policy, please contact our customer service team at <a href="mailto:support@daishogold.com" className="text-blue-500 underline">support@daishogold.com</a>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Returns;
