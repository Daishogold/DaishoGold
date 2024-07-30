import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import SummaryApi from '../common';
import displayCurrency from '../helpers/displayCurrency';


const OrderDetails = () => {
    const user = useSelector((state) => state.user.user);
    const [orders, setOrders] = useState([]);
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

    useEffect(() => {
        if (user && user._id) {
            const fetchOrders = async () => {
                try {
                    const { data } = await axios.get(SummaryApi.Get_user_orders.url.replace(':userId', user._id), {
                        withCredentials: true,
                    });
                    if (data.success) {
                        setOrders(data.orders);
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error('Failed to fetch orders');
                }
            };
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="container mx-auto p-6 max-h-screen overflow-y-auto mb-10 mt-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Order Details</h2>
            {orders.map((order) => (
                <div key={order._id} className="mb-8 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold mb-2 text-blue-700">Order ID: {order._id}</h3>
                    <p className="text-gray-700 mb-2"><strong>Status:</strong>
                        <span className={`inline-block px-2 py-1 rounded ${order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {order.status}
                        </span>
                    </p>
                    <p className="text-gray-700 mb-2"><strong>Total Amount:</strong> {displayPrice(order.totalAmount)}</p>
                    <p className="text-gray-700 mb-4"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    <h4 className="text-xl font-semibold mb-3 text-gray-800">Products:</h4>
                    <ul className="space-y-4">
                        {order.products.map((product) => (
                            <li key={product.productId._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                                {product.productId.productImage.length > 0 && (
                                    <img src={product.productId.productImage[0]} alt={product.productId.productName} className="w-20 h-20 object-cover rounded-lg mix-blend-multiply" />
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
