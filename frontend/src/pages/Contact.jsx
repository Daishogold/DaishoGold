import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="text-center">
                <motion.h1
                    className="text-4xl font-bold text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Contact Us
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600 mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    We&apos;d love to hear from you! Reach out to us using any of the methods below.
                </motion.p>
            </div>
            <div className="flex flex-col md:flex-row justify-around items-center mt-8 space-y-6 md:space-y-0">
                <motion.div
                    className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <FaPhone className="text-4xl text-blue-600 mb-4" />
                    <h2 className="text-xl font-semibold">Phone</h2>
                    <p className="text-gray-600">1-800-123-4567</p>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <FaEnvelope className="text-4xl text-red-600 mb-4" />
                    <h2 className="text-xl font-semibold">Email</h2>
                    <p className="text-gray-600">support@daishogold.com</p>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <FaMapMarkerAlt className="text-4xl text-green-600 mb-4" />
                    <h2 className="text-xl font-semibold">Address</h2>
                    <p className="text-gray-600">123 Daisho St, Gold City, USA</p>
                </motion.div>
            </div>
            <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                <form className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                className="w-full mt-2 p-2 border border-gray-300 rounded"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full mt-2 p-2 border border-gray-300 rounded"
                                placeholder="Your Email"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block text-gray-700">Message</label>
                        <textarea
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                            placeholder="Your Message"
                            rows="5"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 bg-blue-600 text-white p-2 rounded w-full md:w-auto md:px-4"
                    >
                        Send Message
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Contact;
