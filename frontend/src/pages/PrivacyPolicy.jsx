import { motion } from 'framer-motion'; // For animation
import { FaUserShield, FaShieldAlt, FaLock, FaClipboardList, FaEnvelope } from 'react-icons/fa'; // User icons from react-icons

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-white shadow-lg rounded-lg p-8"
            >
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                    Privacy Policy
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                        <FaUserShield className="text-blue-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Information We Collect</h2>
                        <ul className="text-gray-700 list-disc list-inside">
                            <li className="mb-2">Personal information you provide, such as your name, email address, and payment details.</li>
                            <li className="mb-2">Information about your orders and interactions with our website.</li>
                            <li className="mb-2">Cookies and tracking technologies to enhance your browsing experience.</li>
                        </ul>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                        <FaShieldAlt className="text-green-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">How We Use Your Information</h2>
                        <ul className="text-gray-700 list-disc list-inside">
                            <li className="mb-2">To process and fulfill your orders.</li>
                            <li className="mb-2">To communicate with you about your orders and provide customer support.</li>
                            <li className="mb-2">To improve our website and services based on your feedback.</li>
                            <li className="mb-2">To send promotional offers and updates, if you have opted in.</li>
                        </ul>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                        <FaLock className="text-red-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">How We Protect Your Information</h2>
                        <ul className="text-gray-700 list-disc list-inside">
                            <li className="mb-2">We implement appropriate security measures to safeguard your personal information.</li>
                            <li className="mb-2">Your payment details are encrypted and processed securely.</li>
                            <li className="mb-2">We restrict access to your information to authorized personnel only.</li>
                        </ul>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                        <FaClipboardList className="text-purple-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Third-Party Services</h2>
                        <ul className="text-gray-700 list-disc list-inside">
                            <li className="mb-2">We may use third-party services for payment processing, analytics, or marketing.</li>
                            <li className="mb-2">These services are subject to their own privacy policies.</li>
                        </ul>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 shadow-md hover:bg-gray-200 transition duration-300 ease-in-out col-span-1 md:col-span-2 lg:col-span-3">
                        <FaEnvelope className="text-teal-500 text-3xl mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact Us</h2>
                        <p className="text-gray-700">
                            If you have any questions about our Privacy Policy, please contact us at <a href="mailto:support@daishogold.com" className="text-blue-500 underline">support@daishogold.com</a>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
