import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import NewsLetter from './NewsLetter';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePhoneAndroid } from "react-icons/md";

const Footer = () => {
    const location = useLocation();
    const isAdminPanel = location.pathname.startsWith('/admin-panel');

    if (isAdminPanel) {
        return null; // Do not render the footer in the admin panel
    }

    return (
        <>
            <NewsLetter />
            <footer className="bg-white text-black">
                <div className="container mx-auto p-6 flex flex-col lg:flex-row justify-between">
                    {/* Logo and Address Section */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center mb-6 lg:mb-0">
                        <img src={Logo} alt="logo" className="w-24 h-auto mb-4 lg:mb-0" />
                        <div className="ml-4">
                            <p className="font-bold text-lg">Daisho Gold</p>
                            <div className="flex items-center mt-2">
                                <FaLocationDot className="mr-2" />
                                <p>Ibaraki prefecture koga city morokawa 934-14, Japan.</p>
                            </div>
                            <div className="flex items-center mt-1">
                                <MdOutlinePhoneAndroid className="mr-2" />
                                <p>Phone: +81 80-3327-9070</p>
                            </div>
                        </div>

                    </div>

                    {/* Quick Links Section */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-12 mb-6 lg:mb-0">
                        <div className="mb-6 lg:mb-0">
                            <p className="font-bold text-lg mb-2">Quick Links</p>
                            <ul>
                                <li><a href="/about" className="hover:text-red-400">About Us</a></li>
                                <li><a href="/frequently-asked-questions" className="hover:text-red-400">FAQ</a></li>
                                <li><a href="/contact" className="hover:text-red-400">Contact Us</a></li>
                                <li><a href="/returns" className="hover:text-red-400">Returns & Exchange</a></li>
                                <li><a href="/shipping" className="hover:text-red-400">Shipping Info</a></li>
                            </ul>
                        </div>

                        <div className="mb-6 lg:mb-0">
                            <p className="font-bold text-lg mb-2">Customer Service</p>
                            <ul>
                                <li><a href="/privacy-policy" className="hover:text-red-400">Privacy Policy</a></li>
                                <li><a href="/terms-of-service" className="hover:text-red-400">Terms of Service</a></li>
                                <li><a href="/warranty" className="hover:text-red-400">Warranty Information</a></li>
                                <li><a href="/track-order" className="hover:text-red-400">Track Your Order</a></li>
                            </ul>
                        </div>

                        <div className="mb-6 lg:mb-0">
                            <p className="font-bold text-lg mb-2">Follow Us</p>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com/people/Daisho-Gold/61557842257625/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">
                                    <FaFacebookF size={20} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">
                                    <FaLinkedinIn size={20} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">
                                    <FaInstagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="bg-white text-center py-4">
                    <p>&copy; {new Date().getFullYear()} Daisho Gold. All rights reserved.</p>
                </div>

            </footer>
        </>
    );
};

export default Footer;
