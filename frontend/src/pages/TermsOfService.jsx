import { motion } from 'framer-motion'; // For animation
import { FaRegFileAlt, FaRegHandshake, FaFileContract, FaRegEnvelope } from 'react-icons/fa'; // User icons from react-icons
import { FaCircleExclamation } from "react-icons/fa6";

const TermsOfService = () => {
    return (
        <div className="container mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg"
            >
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    Terms of Service
                </h1>

                <p className="text-lg text-gray-700 mb-8 text-center">
                    Welcome to Daisho Gold. By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaRegFileAlt className="text-blue-500 text-3xl mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Use of Our Services</h2>
                        <p className="text-gray-700">
                            - You must be at least 18 years old or have parental consent to use our services.<br />
                            - You agree to provide accurate and complete information when making a purchase.<br />
                            - You are responsible for maintaining the confidentiality of your account and password.<br />
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaRegHandshake className="text-green-500 text-3xl mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Prohibited Activities</h2>
                        <p className="text-gray-700">
                            - You may not use our services for any unlawful purpose or to engage in fraudulent activities.<br />
                            - You may not interfere with or disrupt the operation of our website.<br />
                            - You may not attempt to gain unauthorized access to any part of our website or services.<br />
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaCircleExclamation className="text-red-500 text-3xl mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Limitation of Liability</h2>
                        <p className="text-gray-700">
                            - Daisho Gold is not liable for any indirect, incidental, or consequential damages arising from the use of our website or services.<br />
                            - Our liability is limited to the maximum extent permitted by law.<br />
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaFileContract className="text-teal-500 text-3xl mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Changes to Terms</h2>
                        <p className="text-gray-700">
                            - We may update these terms from time to time. Changes will be posted on this page.<br />
                            - Your continued use of our services constitutes acceptance of the updated terms.<br />
                        </p>
                    </div>
                </div>

                <section className="mt-8 text-center">
                    <FaRegEnvelope className="text-purple-500 text-3xl mb-4 mx-auto" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h2>
                    <p className="text-gray-700">
                        If you have any questions about our Terms of Service, please contact us at <a href="mailto:support@daishogold.com" className="text-blue-500 underline">support@daishogold.com</a>.
                    </p>
                </section>
            </motion.div>
        </div>
    );
};

export default TermsOfService;
