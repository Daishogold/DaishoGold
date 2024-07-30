import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import SummaryApi from '../common';
import displayCurrency from '../helpers/displayCurrency';
import moment from 'moment';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'; // Importing icons

const generateRandomId = () => {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const OrderDetails = () => {
    const user = useSelector((state) => state.user.user);
    const [orders, setOrders] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'
    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
    const rates = useSelector(state => state.currency.rates);
    const defaultCurrency = 'PKR';

    const convertPrice = (price, fromCurrency, toCurrency) => {
        if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
            return price;
        }
        const basePriceInPKR = price / rates[fromCurrency];
        return (basePriceInPKR * rates[toCurrency]).toFixed(2);
    };

    const displayPrice = (price) => displayCurrency(convertPrice(price, defaultCurrency, selectedCurrency), selectedCurrency);

    const sortOrders = (orders, sortOrder) => {
        return [...orders].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    };

    useEffect(() => {
        if (user && user._id) {
            const fetchOrders = async () => {
                try {
                    const { data } = await axios.get(SummaryApi.Get_user_orders.url.replace(':userId', user._id), {
                        withCredentials: true,
                    });
                    if (data.success) {
                        setOrders(sortOrders(data.orders, sortOrder));
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error('Failed to fetch orders');
                }
            };
            fetchOrders();
        }
    }, [user, sortOrder]);

    return (
        <div className="container mx-auto p-4 md:p-6 max-h-screen overflow-y-auto mb-10 mt-10 bg-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-900">Order Details</h2>

            {/* Sorting Filter */}
            <div className="mb-4 flex items-center justify-between">
                <label htmlFor="sortOrder" className="text-gray-700 font-medium mb-2">Sort By Date:</label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 flex items-center"
                >
                    <option value="newest">Newest First <FaSortAmountDown className="inline-block ml-2 text-blue-600" /></option>
                    <option value="oldest">Oldest First <FaSortAmountUp className="inline-block ml-2 text-red-600" /></option>
                </select>
            </div>

            {orders.map((order) => (
                <div key={order._id} className="mb-6 md:mb-8 p-4 md:p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
                    <h3 className="text-lg md:text-2xl font-semibold mb-2 text-blue-800">Order ID: {generateRandomId()}</h3>
                    <p className="text-gray-700 mb-2">
                        <strong>Status:</strong>
                        <span className={`inline-block px-2 py-1 rounded ${order.status === 'Pending' ? 'bg-yellow-300 text-yellow-800' : order.status === 'Completed' ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'}`}>
                            {order.status}
                        </span>
                    </p>
                    <p className="text-gray-700 mb-2"><strong>Total Amount:</strong> {displayPrice(order.totalAmount)}</p>
                    <p className="text-gray-700 mb-4"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    <p className="text-gray-700 mb-4"><strong>Order Date:</strong> {moment(order.createdAt).format('MMMM D, YYYY [at] h:mm A')}</p>
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">Products:</h4>
                    <ul className="space-y-4">
                        {order.products.map((product) => (
                            <li key={product.productId._id} className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                                {product.productId.productImage.length > 0 && (
                                    <img src={product.productId.productImage[0]} alt={product.productId.productName} className="w-full md:w-20 h-20 object-cover rounded-lg" />
                                )}
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-800"><strong>Product:</strong> {product.productId.productName}</span>
                                    <span className="text-gray-600"><strong>Quantity:</strong> {product.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default OrderDetails;
