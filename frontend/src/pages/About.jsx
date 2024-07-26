import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaMotorcycle } from "react-icons/fa";

const About = () => {
    useEffect(() => {
        // Add any initialization code if needed
    }, []);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex flex-col items-center text-center space-y-6">
                {/* Header with animation */}
                <motion.h1
                    className="text-4xl font-bold text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    About Us
                </motion.h1>

                {/* Description with animation */}
                <motion.p
                    className="text-lg text-gray-600 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Welcome to Daisho Gold, your premier destination for high-quality bikes and accessories. At Daisho Gold, we are passionate about delivering top-notch motorcycles and accessories to enhance your riding experience. Our commitment to excellence and customer satisfaction sets us apart as a leading provider in the industry.
                </motion.p>

                {/* Animation for image or icon */}
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <FaMotorcycle className="text-6xl text-blue-600" />
                </motion.div>

                {/* Additional information with animation */}
                <motion.div
                    className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-3xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-600">
                        At Daisho Gold, our mission is to provide the best bikes and accessories that meet the highest standards of quality and performance. We strive to create a seamless and enjoyable experience for all our customers, ensuring that every ride is smooth and exhilarating. Whether you are an avid rider or a first-time buyer, we are here to assist you in finding the perfect bike and accessories to suit your needs.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
