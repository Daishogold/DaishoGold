import { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import countryCodes from '../helpers/countryCodes';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        shippingAddress: '',
        city: '',
        postalCode: '',
        countryCode: '',
        country: '',
        paymentMethod: 'cash'
    });
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);
    const navigate = useNavigate();

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

    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
            });

            const responseData = await response.json();

            if (responseData.success) {
                setData(responseData.data);
            } else {
                console.error('Failed to fetch cart data:', responseData.message);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading().finally(() => setLoading(false));
    }, []);

    const increaseQty = async (id, qty) => {
        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty + 1
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            } else {
                console.error('Failed to update quantity:', responseData.message);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            try {
                const response = await fetch(SummaryApi.updateCartProduct.url, {
                    method: SummaryApi.updateCartProduct.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        _id: id,
                        quantity: qty - 1
                    })
                });

                const responseData = await response.json();

                if (responseData.success) {
                    fetchData();
                } else {
                    console.error('Failed to update quantity:', responseData.message);
                }
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        }
    };

    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ _id: id })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            } else {
                console.error('Failed to delete product:', responseData.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity || 0), 0);
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity || 0) * (curr?.productId?.sellingPrice || 0), 0);
    const shippingCharges = 50; // Set shipping charges as needed

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (formData.paymentMethod === 'card') {
            navigate('/cancel');
        } else {
            try {
                const orderData = {
                    ...formData,
                    products: data.map(item => ({
                        productId: item.productId._id,
                        quantity: item.quantity,
                        sellingPrice: item.productId.sellingPrice
                    })),
                    totalPrice,
                    shippingCharges,
                    totalAmount: totalPrice + shippingCharges
                };

                const response = await fetch(SummaryApi.placeOrder.url, {
                    method: SummaryApi.placeOrder.method,
                    credentials: 'include',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });

                const responseData = await response.json();

                if (responseData.success) {
                    // Clear cart and redirect to success page
                    await fetchData();
                    context.fetchUserAddToCart();
                    navigate('/success');
                } else {
                    console.error('Failed to place order:', responseData.message);
                    // Show an error message to the user
                }
            } catch (error) {
                console.error('Error placing order:', error);
                // Show an error message to the user
            }
        }
    };

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* View Products */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => (
                                <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                            ))
                        ) : (
                            data.map((product, index) => (
                                <div key={product?._id + "Add To Cart Loading" + index} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} alt={product?.productId?.productName} className='w-full h-full object-scale-down mix-blend-multiply' />
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                            <MdDelete />
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category || 'No category'}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayPrice(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayPrice((product?.productId?.sellingPrice || 0) * (product?.quantity || 0))}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity || 0)}>-</button>
                                            <span>{product?.quantity || 0}</span>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity || 0)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>

                {/* Summary */}
                {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                            {
                                loading ? (
                                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                                ) : (
                                    <div className='h-36 bg-white'>
                                        <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                            <p>Quantity</p>
                                            <p>{totalQty}</p>
                                        </div>
                                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                            <p>Total Price</p>
                                            <p>{displayPrice(totalPrice)}</p>
                                        </div>
                                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                            <p>Shipping Charges</p>
                                            <p>{displayPrice(shippingCharges)}</p>
                                        </div>
                                        <button className='bg-gray-600 p-2 text-white w-full mt-2' onClick={() => setShowForm(true)}>Check Out</button>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>

            {/* Checkout Form */}
            {showForm && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-3/4 overflow-y-auto'>
                        <h2 className='text-xl font-bold mb-4'>Checkout</h2>
                        <form onSubmit={handlePayment} className='space-y-4'>
                            {/* Contact Information */}
                            <div className='mb-8'>
                                <label className='block text-lg font-medium text-gray-800 mb-4'>Contact Information</label>
                                <div className='flex flex-col md:flex-row gap-6'>
                                    <div className='flex-1'>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Country Code</label>
                                        <select
                                            name='countryCode'
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            className='w-full p-2 border border-gray-300 rounded bg-white text-gray-700'
                                            required
                                        >
                                            <option value="">Select Country Code</option>
                                            {countryCodes.map((country, index) => (
                                                <option key={index} value={country.code}>
                                                    {country.code}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex-1'>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                                        <input
                                            type='tel'
                                            name='phone'
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className='w-full p-2 border border-gray-300 rounded text-gray-700'
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='mt-6'>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
                                    <input
                                        type='text'
                                        name='country'
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className='w-full p-2 border border-gray-300 rounded text-gray-700'
                                        placeholder="Enter your country"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Personal Information */}
                            <h3 className='text-lg font-semibold mb-2'>Personal Information</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                                    <input
                                        type='text'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className='w-full p-2 border border-gray-300 rounded'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className='w-full p-2 border border-gray-300 rounded'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
                                <input
                                    type='text'
                                    name='address'
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className='w-full p-2 border border-gray-300 rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Shipping Address</label>
                                <input
                                    type='text'
                                    name='shippingAddress'
                                    value={formData.shippingAddress}
                                    onChange={handleInputChange}
                                    className='w-full p-2 border border-gray-300 rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                                <input
                                    type='text'
                                    name='city'
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className='w-full p-2 border border-gray-300 rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Postal Code</label>
                                <input
                                    type='text'
                                    name='postalCode'
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    className='w-full p-2 border border-gray-300 rounded'
                                    required
                                />
                            </div>

                            {/* Payment Method */}
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Payment Method</label>
                                <select
                                    name='paymentMethod'
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    className='w-full p-2 border border-gray-300 rounded'
                                    required
                                >
                                    <option value='cash'>Cash on Delivery</option>
                                    <option value='card'>Card</option>
                                </select>
                            </div>

                            {/* Order Summary */}
                            <h3 className='text-lg font-semibold mb-2'>Order Summary</h3>
                            <div className='bg-gray-100 p-4 rounded'>
                                {data.map(product => (
                                    <div key={product?._id} className='flex items-center mb-2'>
                                        <img src={product?.productId?.productImage[0]} alt={product?.productId?.productName} className='w-16 h-16 object-cover mr-4' />
                                        <div>
                                            <p className='text-sm font-semibold'>{product?.productId?.productName}</p>
                                            <p className='text-sm'>Quantity: {product?.quantity}</p>
                                            <p className='text-sm'>Price: {displayPrice(product?.productId?.sellingPrice)}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className='flex items-center justify-between mt-4 font-medium'>
                                    <p>Total Price</p>
                                    <p>{displayPrice(totalPrice)}</p>
                                </div>
                                <div className='flex items-center justify-between mt-2 font-medium'>
                                    <p>Shipping Charges</p>
                                    <p>{displayPrice(shippingCharges)}</p>
                                </div>
                                <div className='flex items-center justify-between mt-2 font-medium'>
                                    <p>Total Amount</p>
                                    <p>{displayPrice(totalPrice + shippingCharges)}</p>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='bg-gray-600 text-white p-2 rounded w-full mt-4'
                            >
                                Proceed to Payment
                            </button>
                            <button
                                type='button'
                                onClick={() => setShowForm(false)}
                                className='bg-red-600 text-white p-2 rounded w-full mt-2'
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Cart;
