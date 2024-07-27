import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const faqData = [
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and bank transfers. We also offer cash on delivery in select regions."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order has been shipped, you will receive an email with a tracking number. You can use this number to track your order on our website or the carrier's website."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all our products. If you are not satisfied with your purchase, you can return it within 30 days for a full refund or exchange."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination."
    },
    {
        question: "How can I contact customer support?",
        answer: "You can reach our customer support team via email at support@daishogold.com or by calling our hotline at 1-800-123-4567. Our support team is available 24/7."
    }
];

const FAQ = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const toggleQuestion = (index) => {
        setSelectedQuestion(selectedQuestion === index ? null : index);
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex flex-col items-center text-center space-y-6">
                <motion.h1
                    className="text-4xl font-bold text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Frequently Asked Questions
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Find answers to some of the most common questions our customers have about our products and services.
                </motion.p>
            </div>
            <div className="mt-8 space-y-4">
                {faqData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        layout
                    >
                        <div
                            className="p-4 cursor-pointer flex justify-between items-center"
                            onClick={() => toggleQuestion(index)}
                        >
                            <h2 className="text-xl font-semibold">{item.question}</h2>
                            <motion.span
                                initial={{ rotate: 0 }}
                                animate={{ rotate: selectedQuestion === index ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {selectedQuestion === index ? <IoClose size={25} /> : <IoMdAdd size={25} />}
                            </motion.span>
                        </div>
                        <AnimatePresence>
                            {selectedQuestion === index && (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-4 border-t border-gray-200"
                                >
                                    <p className="text-gray-600">{item.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
