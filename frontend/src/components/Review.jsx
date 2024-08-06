import { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import moment from 'moment';

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });
    const [loading, setLoading] = useState(false);

    const currentUser = useSelector(state => state.user?.user);
    const userId = currentUser?._id;

    useEffect(() => {
        if (!productId) {
            console.error('Product ID is undefined');
            return;
        }

        const fetchReviews = async () => {
            try {
                setLoading(true);
                const url = SummaryApi.getReview.url.replace(':productId', productId);
                const response = await axios.get(url);
                setReviews(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            }
        };
        fetchReviews();
    }, [productId]);


    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userId) {
                toast.error("You must be logged in to submit a review.");
                return;
            }

            const reviewData = { productId, userId, ...newReview };

            await axios.post(SummaryApi.addReview.url, reviewData);
            setNewReview({ rating: '', comment: '' });

            const url = SummaryApi.getReview.url.replace(':productId', productId);
            const updatedReviews = await axios.get(url);
            setReviews(updatedReviews.data.data);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className='text-yellow-400' />);
            } else if (i - rating === 0.5) {
                stars.push(<FaStarHalfAlt key={i} className='text-yellow-400' />);
            } else {
                stars.push(<FaRegStar key={i} className='text-yellow-400' />);
            }
        }
        return stars;
    };

    return (
        <div className='reviews mt-8'>
            <h3 className='text-2xl font-semibold mb-6 text-gray-800'>User Reviews</h3>
            {loading ? (
                <p className='text-gray-600'>Loading...</p>
            ) : reviews.length ? (
                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {reviews.map((review) => (
                        <div key={review._id} className='review p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'>
                            <div className='flex items-center mb-4'>
                                <div className='flex-shrink-0'>
                                    <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600'>
                                        {review.userId.name.charAt(0)}
                                    </div>
                                </div>
                                <div className='ml-4'>
                                    <strong className='text-lg font-medium text-gray-800'>{review.userId.name}</strong>
                                    <div className='flex items-center'>
                                        {renderStars(review.rating)}
                                    </div>
                                    <p className='text-sm text-gray-500 mt-1'>{moment(review.createdAt).format('LL')}</p>
                                </div>
                            </div>
                            <p className='text-gray-700 mb-4'>{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-gray-600'>No reviews yet. Be the first to review!</p>
            )}
            <form onSubmit={handleReviewSubmit} className='review-form mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
                <div className='mb-4'>
                    <label className='block mb-2 text-lg font-medium text-gray-700'>Rating:</label>
                    <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600'
                        required
                    >
                        <option value=''>Select</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label className='block mb-2 text-lg font-medium text-gray-700'>Comment:</label>
                    <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600'
                        rows='4'
                        required
                    />
                </div>
                <button type='submit' className='w-full px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-300 ease-in-out'>
                    Submit Review
                </button>
            </form>
        </div>
    );
};

Reviews.propTypes = {
    productId: PropTypes.string,
};

export default Reviews;
