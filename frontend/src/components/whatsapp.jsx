import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    const phoneNumber = "+818033279070";
    const message = `Hi there! I'm interested in your bikes and accessories. Could you provide more details on the latest models and offers?`;

    return (
        <motion.a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-10"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <FaWhatsapp size={28} />
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-300 opacity-50 z-0"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.a>
    );
};

export default WhatsAppButton;
