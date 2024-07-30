import { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';
import displayCurrency from '../helpers/displayCurrency';

const AdminLoyalty = () => {
    const [wallets, setWallets] = useState([]);
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
        const fetchWallets = async () => {
            try {
                const response = await axios.get(SummaryApi.adminWallet.url, {
                    withCredentials: true // Ensure cookies are sent with the request
                });
                setWallets(response.data.wallets);
            } catch (error) {
                console.error('Error fetching wallet data:', error);
            }
        };

        fetchWallets();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Wallet Details</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Wallet Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {wallets.map((user) => (
                        <tr key={user._id} className='text-center'>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{displayPrice(user.wallet)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminLoyalty;
