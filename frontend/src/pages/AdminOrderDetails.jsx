import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import displayCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';
import moment from 'moment';

const generateRandomId = () => {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const AdminOrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest'); // State for sorting
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

    const sortOrders = (orders, order) => {
        return orders.slice().sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log("Fetching all orders");
                const { data } = await axios.get(SummaryApi.Get_all_orders.url, {
                    withCredentials: true,
                });
                console.log("API response:", data);
                if (data.success) {
                    console.log("Orders fetched successfully:", data.orders);
                    const sortedOrders = sortOrders(data.orders, sortOrder);
                    setOrders(sortedOrders);
                } else {
                    console.error("Error fetching orders:", data.message);
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error.response ? error.response.data : error.message);
                toast.error('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, [sortOrder]); // Add sortOrder as a dependency to refetch on sort change

    return (
        <div className="container mx-auto p-4 max-h-screen overflow-y-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">All Orders</h2>

            <div className="mb-4 flex justify-end">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {orders.map((order) => (
                <div key={order._id} className="mb-6 p-4 md:p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-600">Order ID: {generateRandomId()}</h3>
                    <p className="mb-2"><strong>User:</strong> {order.userId?.name} ({order.userId?.email})</p>
                    <p className="mb-2"><strong>Status:</strong> <span className={`inline-block px-2 py-1 rounded ${order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{order.status}</span></p>
                    <p className="mb-2"><strong>Total Amount:</strong> {displayPrice(order.totalAmount)}</p>
                    <p className="mb-2"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    <p className="mb-2"><strong>Order Date:</strong> {moment(order.createdAt).format('MMMM D, YYYY [at] h:mm A')}</p> {/* Displaying the order date */}
                    <p className="mb-4"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                    <h4 className="text-md md:text-lg font-semibold mb-2 text-gray-700">Products:</h4>
                    <ul className="space-y-4">
                        {order.products.map((product) => (
                            <li key={product.productId._id} className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 bg-gray-50 p-4 rounded-lg shadow">
                                {product.productId.productImage.length > 0 && (
                                    <img src={product.productId.productImage[0]} alt={product.productId.productName} className="w-full md:w-16 h-16 object-cover rounded mix-blend-multiply" />
                                )}
                                <div>
                                    <span className="block font-medium text-gray-800"><strong>Product:</strong> {product.productId.productName}</span>
                                    <span className="block text-gray-600"><strong>Brand:</strong> {product.productId.brandName}</span>
                                    <span className="block text-gray-600"><strong>Quantity:</strong> {product.quantity}</span>
                                    <span className="block text-gray-600"><strong>Selling Price:</strong> {displayPrice(product.sellingPrice)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AdminOrderDetails;
