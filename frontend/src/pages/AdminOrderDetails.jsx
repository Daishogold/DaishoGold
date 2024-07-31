import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import displayCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FaCheck } from 'react-icons/fa';

const AdminOrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest'); // State for sorting
    const [activeTab, setActiveTab] = useState('Received'); // State for active tab
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

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await axios.put(SummaryApi.Update_order_status.url, {
                orderId,
                status: newStatus
            }, {
                withCredentials: true
            });

            if (response.data.message) {
                toast.success('Order status updated successfully');
                setOrders(prevOrders => prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
            }
        } catch (error) {
            console.error('Failed to update order status', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to update order status');
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(SummaryApi.Get_all_orders.url, {
                    withCredentials: true,
                });
                if (data.success) {
                    const sortedOrders = sortOrders(data.orders, sortOrder);
                    setOrders(sortedOrders);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, [sortOrder]);

    const statusOptions = ['Received', 'Pending', 'Transit', 'Delivered'];

    const filteredOrders = orders.filter(order => order.status === activeTab);

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

            <div className="mb-6">
                <ul className="flex justify-center space-x-4">
                    {statusOptions.map(status => (
                        <li key={status}>
                            <button
                                onClick={() => setActiveTab(status)}
                                className={`px-4 py-2 rounded-t-lg font-medium ${activeTab === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                                    }`}
                            >
                                {status} ({orders.filter(order => order.status === status).length})
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <div key={order._id} className="mb-6 p-4 md:p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-600">Order ID: {order._id}</h3>
                        <p className="mb-2"><strong>User:</strong> {order.userId?.name} ({order.userId?.email})</p>
                        <p className="mb-2"><strong>Status:</strong></p>
                        <div className="flex items-center space-x-2 mb-2">
                            {statusOptions.map((status, index) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(order._id, status)}
                                    className={`px-2 py-1 rounded flex items-center space-x-1 ${order.status === status
                                        ? 'bg-green-500 text-white'
                                        : index <= statusOptions.indexOf(order.status)
                                            ? 'bg-green-200 text-green-800'
                                            : 'bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    {(index < statusOptions.indexOf(order.status) || (order.status === 'Delivered' && status === 'Delivered')) && <FaCheck />}
                                    <span>{status}</span>
                                </button>
                            ))}
                        </div>
                        <p className="mb-2"><strong>Total Amount:</strong> {displayPrice(order.totalAmount)}</p>
                        <p className="mb-2"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        <p className="mb-2"><strong>Order Date:</strong> {moment(order.createdAt).format('MMMM D, YYYY [at] h:mm A')}</p>
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
                ))
            ) : (
                <div className="text-center text-gray-500 mt-6">
                    No orders {activeTab.toLowerCase()} yet.
                </div>
            )}
        </div>
    );
};

export default AdminOrderDetails;
