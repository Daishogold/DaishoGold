import { motion } from 'framer-motion'; // For animation
import { FaShieldAlt, FaPhoneAlt, FaTimesCircle, FaRegCheckCircle } from 'react-icons/fa'; // User icons from react-icons

const WarrantyInformation = () => {
    return (
        <div className="container mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg shadow-lg"
            >
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    Warranty Information
                </h1>

                <p className="text-lg text-gray-700 mb-8 text-center">
                    At Daisho Gold, we stand behind the quality of our products. This Warranty Information page outlines the terms and conditions of our warranty policy.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaShieldAlt className="text-blue-500 text-3xl mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Warranty Coverage</h2>
                        <p className="text-gray-700">
                            - Our products come with a 1-year warranty against defects in materials and workmanship.<br />
                            - The warranty covers repairs or replacements of defective parts under normal use.<br />
                            - Warranty does not cover damage caused by misuse, accidents, or unauthorized modifications.<br />
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaPhoneAlt className="text-green-500 text-3xl mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">How to Claim Warranty</h2>
                        <p className="text-gray-700">
                            - Contact our customer service team with proof of purchase and details of the defect.<br />
                            - We will provide instructions for returning the defective product or part.<br />
                            - If the claim is approved, we will repair or replace the product at no cost to you.<br />
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaTimesCircle className="text-red-500 text-3xl mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Exclusions</h2>
                        <p className="text-gray-700">
                            - The warranty does not cover damages caused by accidents, misuse, or modifications.<br />
                            - Consumable items, such as batteries or accessories, are not covered under warranty.<br />
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaRegCheckCircle className="text-teal-500 text-3xl mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h2>
                        <p className="text-gray-700">
                            For any warranty-related questions or claims, please contact us at <a href="mailto:support@daishogold.com" className="text-blue-500 underline">support@daishogold.com</a>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default WarrantyInformation;
