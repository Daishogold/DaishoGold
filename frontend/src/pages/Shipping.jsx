import { motion } from 'framer-motion'; // For animation
import { FaShippingFast, FaDollarSign, FaClock, FaGlobe, FaEnvelope } from 'react-icons/fa'; // User icons from react-icons
import { useState } from 'react';

const Shipping = () => {
    const [activeTab, setActiveTab] = useState('shipping-methods');

    const renderContent = () => {
        switch (activeTab) {
            case 'shipping-methods':
                return (
                    <>
                        <FaShippingFast className="text-blue-500 text-4xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Shipping Methods</h2>
                        <p className="text-gray-700">
                            - We offer standard and expedited shipping options.<br />
                            - Standard shipping typically takes 5-7 business days.<br />
                            - Expedited shipping typically takes 2-3 business days.<br />
                            - Shipping methods and costs will be displayed during checkout.<br />
                        </p>
                    </>
                );
            case 'shipping-charges':
                return (
                    <>
                        <FaDollarSign className="text-green-500 text-4xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Shipping Charges</h2>
                        <p className="text-gray-700">
                            - Shipping charges are calculated based on the weight of your order and your delivery location.<br />
                            - Any applicable shipping charges will be displayed during checkout.<br />
                            - Free shipping promotions may apply to orders over a certain amount.<br />
                        </p>
                    </>
                );
            case 'order-processing':
                return (
                    <>
                        <FaClock className="text-yellow-500 text-4xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Processing</h2>
                        <p className="text-gray-700">
                            - Orders are processed within 1-2 business days.<br />
                            - You will receive a confirmation email with tracking information once your order has been shipped.<br />
                            - If there are any delays in processing your order, we will notify you via email.<br />
                        </p>
                    </>
                );
            case 'international-shipping':
                return (
                    <>
                        <FaGlobe className="text-teal-500 text-4xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">International Shipping</h2>
                        <p className="text-gray-700">
                            - We offer international shipping to select countries.<br />
                            - International shipping times vary based on the destination.<br />
                            - All international orders are subject to customs duties and taxes, which are the responsibility of the customer.<br />
                        </p>
                    </>
                );
            case 'contact-us':
                return (
                    <>
                        <FaEnvelope className="text-purple-500 text-4xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact Us</h2>
                        <p className="text-gray-700">
                            If you have any questions or need assistance with your shipping, please contact our customer service team at <a href="mailto:support@daishogold.com" className="text-blue-500 underline">support@daishogold.com</a>.
                        </p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-white shadow-lg rounded-lg p-8"
            >
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    Shipping Policy
                </h1>

                <div className="flex flex-col md:flex-row mb-6">
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <ul className="bg-gray-100 rounded-lg p-4 shadow-md">
                            <li className={`mb-4 cursor-pointer ${activeTab === 'shipping-methods' ? 'text-blue-500 font-semibold' : 'text-gray-700'}`} onClick={() => setActiveTab('shipping-methods')}>
                                <FaShippingFast className="inline-block mr-2" /> Shipping Methods
                            </li>
                            <li className={`mb-4 cursor-pointer ${activeTab === 'shipping-charges' ? 'text-green-500 font-semibold' : 'text-gray-700'}`} onClick={() => setActiveTab('shipping-charges')}>
                                <FaDollarSign className="inline-block mr-2" /> Shipping Charges
                            </li>
                            <li className={`mb-4 cursor-pointer ${activeTab === 'order-processing' ? 'text-yellow-500 font-semibold' : 'text-gray-700'}`} onClick={() => setActiveTab('order-processing')}>
                                <FaClock className="inline-block mr-2" /> Order Processing
                            </li>
                            <li className={`mb-4 cursor-pointer ${activeTab === 'international-shipping' ? 'text-teal-500 font-semibold' : 'text-gray-700'}`} onClick={() => setActiveTab('international-shipping')}>
                                <FaGlobe className="inline-block mr-2" /> International Shipping
                            </li>
                            <li className={`cursor-pointer ${activeTab === 'contact-us' ? 'text-purple-500 font-semibold' : 'text-gray-700'}`} onClick={() => setActiveTab('contact-us')}>
                                <FaEnvelope className="inline-block mr-2" /> Contact Us
                            </li>
                        </ul>
                    </div>

                    <div className="w-full md:w-3/4 pl-6">
                        {/* Added padding-left for spacing */}
                        {renderContent()}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Shipping;
