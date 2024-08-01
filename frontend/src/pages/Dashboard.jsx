import { FaUsers, FaBoxOpen, FaDollarSign, FaClipboardList } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import SummaryApi from '../common';
import axios from 'axios';
import { useSelector } from 'react-redux';
import displayCurrency from '../helpers/displayCurrency';


const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [salesData, setSalesData] = useState([]);
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
        const fetchTotalUsers = async () => {
            try {
                const response = await fetch(SummaryApi.allUser.url, {
                    method: SummaryApi.allUser.method,
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.success) {
                    setTotalUsers(data.data.length);
                }
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        const fetchTotalProducts = async () => {
            try {
                const response = await fetch(SummaryApi.allProduct.url);
                const data = await response.json();
                setTotalProducts(data?.data?.length || 0);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        const fetchSalesData = async () => {
            try {
                const response = await axios.get(SummaryApi.Get_all_orders.url, {
                    withCredentials: true,
                });
                const orders = response.data.orders;

                // Set total orders
                setTotalOrders(orders.length);

                const deliveredOrders = orders.filter(order => order.status === 'Delivered');

                // Calculate total sales amount from delivered orders
                const totalSalesAmount = deliveredOrders.reduce((total, order) => total + order.totalAmount, 0);
                setTotalSales(totalSalesAmount);

                // Prepare data for the graph
                const monthlySales = deliveredOrders.reduce((acc, order) => {
                    const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
                    if (!acc[month]) {
                        acc[month] = 0;
                    }
                    acc[month] += order.totalAmount;
                    return acc;
                }, {});

                const salesChartData = Object.keys(monthlySales).map(month => ({
                    month,
                    sales: monthlySales[month],
                }));

                setSalesData(salesChartData);
            } catch (error) {
                console.error('Failed to fetch sales data', error);
            }
        };

        fetchTotalUsers();
        fetchTotalProducts();
        fetchSalesData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <FaDollarSign className="text-4xl text-green-600" />
                    <div className="ml-4">
                        <p className="text-gray-600">Total Sales</p>
                        <h3 className="text-2xl font-bold">{displayPrice(totalSales)}</h3>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <FaUsers className="text-4xl text-blue-600" />
                    <div className="ml-4">
                        <p className="text-gray-600">Total Users</p>
                        <h3 className="text-2xl font-bold">{totalUsers}</h3>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <FaBoxOpen className="text-4xl text-yellow-600" />
                    <div className="ml-4">
                        <p className="text-gray-600">Total Products</p>
                        <h3 className="text-2xl font-bold">{totalProducts}</h3>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <FaClipboardList className="text-4xl text-purple-600" />
                    <div className="ml-4">
                        <p className="text-gray-600">Total Orders</p>
                        <h3 className="text-2xl font-bold">{totalOrders}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Monthly Sales</h2>
                <LineChart
                    width={600}
                    height={300}
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default Dashboard;
