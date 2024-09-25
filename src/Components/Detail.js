import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiInstance, Api } from '../Config/APi';
import { formatDistanceToNow } from 'date-fns'; // Import the function
import '../Styles/Detail.css';

const Detail = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adultQuantity, setAdultQuantity] = useState(0);
    const [childQuantity, setChildQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const cloudinaryBaseUrl = "https://res.cloudinary.com/driiz3taz/";

    // Fetch reviews outside of useEffect so it can be used in multiple places
    const fetchReviews = async () => {
        let allReviews = [];
        let nextPage = Api.reviews;
        try {
            while (nextPage) {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const reviewResponse = await apiInstance.get(nextPage, { headers });
                const reviewsData = reviewResponse.data.results || [];
                allReviews = [...allReviews, ...reviewsData];

                nextPage = reviewResponse.data.next;
            }

            console.log('Tất cả đánh giá từ API:', allReviews);
            const filteredReviews = allReviews.filter(review => review.tour === parseInt(id));
            console.log('Đánh giá đã lọc:', filteredReviews);
            setReviews(filteredReviews);
        } catch (reviewError) {
            console.error('Lỗi khi lấy đánh giá:', reviewError);
            setError(reviewError);
        }
    };

    useEffect(() => {
        const fetchTourDetail = async () => {
            setLoading(true);
            try {
                if (id) {
                    const response = await apiInstance.get(Api.detail(id));
                    console.log('Dữ liệu từ API:', response.data);
                    setTour(response.data);
                } else {
                    throw new Error("Tour ID is not provided");
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết tour:', error);
                setError(error);
            }
            setLoading(false);
        };

        fetchTourDetail();
        fetchReviews(); // Call fetchReviews from useEffect
    }, [id]);

    useEffect(() => {
        if (tour) {
            const adultPrice = parseFloat(tour.price_adult) || 0;
            const childPrice = parseFloat(tour.price_child) || 0;
            const total = (adultPrice * adultQuantity) + (childPrice * childQuantity);
            setTotalPrice(total);
        }
    }, [adultQuantity, childQuantity, tour]);

    const handleAdultQuantityChange = (e) => {
        setAdultQuantity(parseInt(e.target.value) || 0);
    };

    const handleChildQuantityChange = (e) => {
        setChildQuantity(parseInt(e.target.value) || 0);
    };

    const handlePayment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const exchangeRate = 24000;
            const usdTotalPrice = (totalPrice / exchangeRate).toFixed(2);

            const response = await apiInstance.post(Api.createPayment(), { amount: usdTotalPrice }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const { approval_url } = response.data;
            if (approval_url) {
                window.location.href = approval_url;
            } else {
                setError(new Error('Không thể lấy URL phê duyệt của PayPal.'));
            }
        } catch (error) {
            setError(error.response ? new Error(error.response.data.message || 'Lỗi không xác định.') : new Error(error.message));
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const reviewData = {
                rating,
                comment,
                tour: parseInt(id),
            };

            await apiInstance.post(Api.reviews, reviewData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setRating(0);
            setComment('');
            alert('Đánh giá của bạn đã được gửi');
            fetchReviews(); // Refetch reviews after submission
        } catch (error) {
            setError(new Error('Không thể gửi đánh giá.'));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!tour) return <p>No tour found</p>;

    return (
        <div className="detail-container">
            {/* Other sections */}
            <section className="book" id="book">
                <div className="content">
                    <span>Kính chào quý khách đến với Phú Quốc</span>
                    <h3>Một hòn đảo tươi đẹp và thơ mộng</h3>
                    <p>Đến đây bạn sẽ được trải nghiệm nhiều điều thú vị về Phú Quốc</p>
                    <a href="#" className="btn">Đọc thêm </a>
                </div>
                <div className="video-container">
                    <video src="https://res.cloudinary.com/driiz3taz/video/upload/v1723734144/destinations/PhuQuoc_kbylok.mp4" muted autoPlay loop className="video1" id="slide1"></video>
                </div>
            </section>
            <div className="section-wrapper">

                <section className="tour-details">
                    <div className="box">
                        {[...Array(8)].map((_, index) => (
                            <span style={{ '--i': index }} key={index}>
                                <img src={`${cloudinaryBaseUrl}${tour.image}`} alt={tour.title} />
                            </span>
                        ))}
                    </div>
                    <div className="content">
                        <h1>{tour.title}</h1>
                        <p>{tour.description}</p>
                    </div>
                </section>

                <section className="booking-form">
                    <h2>Đặt Tour</h2>
                    <h2>Thời gian đi: {tour.start_date}</h2>
                    <div className="form-section">
                        <h3>Thông Tin Tour</h3>
                        <div className="form-group">
                            <label htmlFor="adultPrice">Giá vé người lớn (VND):</label>
                            <input type="number" id="adultPrice" value={tour.price_adult} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="childPrice">Giá vé trẻ em (VND):</label>
                            <input type="number" id="childPrice" value={tour.price_child} readOnly />
                        </div>
                    </div>
                    <div className="form-section">
                        <h3>Số Lượng</h3>
                        <div className="form-group">
                            <label htmlFor="adultQuantity">Số lượng người lớn:</label>
                            <input
                                type="number"
                                id="adultQuantity"
                                value={adultQuantity}
                                onChange={handleAdultQuantityChange}
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="childQuantity">Số lượng trẻ em:</label>
                            <input
                                type="number"
                                id="childQuantity"
                                value={childQuantity}
                                onChange={handleChildQuantityChange}
                                min="0"
                            />
                        </div>
                    </div>
                    <div className="total">
                        <button type="button" onClick={handlePayment} className="btn-remove">Thanh toán</button>
                        Tổng tiền: {totalPrice.toLocaleString()} VND
                    </div>
                </section>
            </div>

            <section className="reviews-section">
                <h2>Đánh Giá Tour</h2>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="review">
                            <p>
                                Đánh giá:
                                {Array(review.rating).fill().map((_, i) => (
                                    <i key={i} className="fas fa-star"></i>
                                ))}
                                {Array(5 - review.rating).fill().map((_, i) => (
                                    <i key={i} className="far fa-star"></i>
                                ))}
                            </p>
                            <p>Bình luận: {review.comment}</p>
                            <p>Ngày tạo: {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}</p>
                        </div>
                    ))
                ) : (
                    <p>Chưa có đánh giá nào cho tour này.</p>
                )}

                <h2>Thêm Đánh Giá</h2>
                <form onSubmit={handleReviewSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Xếp hạng (1-5):</label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value) || 0)}
                            min="1"
                            max="5"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Bình luận:</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Gửi Đánh Giá</button>
                </form>
            </section>
        </div>
    );
};

export default Detail;
