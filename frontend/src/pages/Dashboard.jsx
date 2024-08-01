import { FaUsers, FaBoxOpen, FaDollarSign, FaEye } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { useEffect, useState } from 'react';
import SummaryApi from '../common'

const salesData = [
    { month: 'Jan', sales: 4000, visits: 2400 },
    { month: 'Feb', sales: 3000, visits: 2210 },
    { month: 'Mar', sales: 2000, visits: 2290 },
    { month: 'Apr', sales: 2780, visits: 2000 },
    { month: 'May', sales: 1890, visits: 2181 },
    { month: 'Jun', sales: 2390, visits: 2500 },
    { month: 'Jul', sales: 3490, visits: 2100 },
    { month: 'Aug', sales: 4000, visits: 2400 },
    { month: 'Sep', sales: 3000, visits: 2210 },
    { month: 'Oct', sales: 2000, visits: 2290 },
    { month: 'Nov', sales: 2780, visits: 2000 },
    { month: 'Dec', sales: 1890, visits: 2181 },
];

const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await fetch(SummaryApi.allUser.url, {
                    method: SummaryApi.allUser.method,
                    credentials: 'include'
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

        fetchTotalUsers();
        fetchTotalProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <FaDollarSign className="text-4xl text-green-600" />
                    <div className="ml-4">
                        <p className="text-gray-600">Total Sales</p>
                        <h3 className="text-2xl font-bold">$12,345</h3>
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
                    <FaEye className="text-4xl text-red-600" />
                    <div className="ml-4">
                        <p className="text-gray-600">Total Visitors</p>
                        <h3 className="text-2xl font-bold">4,567</h3>
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
                    <Line type="monotone" dataKey="visits" stroke="#82ca9d" />
                </LineChart>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Customer Visit Trends</h2>
                <BarChart
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
                    <Bar dataKey="visits" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
};

export default Dashboard;
