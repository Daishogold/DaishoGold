import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const AdminOrderDetails = () => {
    const [orders, setOrders] = useState([]);

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
                    setOrders(data.orders);
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
    }, []);

    return (
        <div className="container mx-auto p-4 max-h-screen overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Orders</h2>
            {orders.map((order) => (
                <div key={order._id} className="mb-6 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">Order ID: {order._id}</h3>
                    <p className="mb-2"><strong>User:</strong> {order.userId?.name} ({order.userId?.email})</p>
                    <p className="mb-2"><strong>Status:</strong> <span className={`inline-block px-2 py-1 rounded ${order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{order.status}</span></p>
                    <p className="mb-2"><strong>Total Amount:</strong> ${order.totalAmount}</p>
                    <p className="mb-2"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    <p className="mb-4"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                    <h4 className="text-lg font-semibold mb-2 text-gray-700">Products:</h4>
                    <ul className="space-y-4">
                        {order.products.map((product) => (
                            <li key={product.productId._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow">
                                {product.productId.productImage.length > 0 && (
                                    <img src={product.productId.productImage[0]} alt={product.productId.productName} className="w-16 h-16 object-cover rounded mix-blend-multiply" />
                                )}
                                <div>
                                    <span className="block font-medium text-gray-800"><strong>Product:</strong> {product.productId.productName}</span>
                                    <span className="block text-gray-600"><strong>Brand:</strong> {product.productId.brandName}</span>
                                    <span className="block text-gray-600"><strong>Quantity:</strong> {product.quantity}</span>
                                    <span className="block text-gray-600"><strong>Selling Price:</strong> ${product.sellingPrice}</span>
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