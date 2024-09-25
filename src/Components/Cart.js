import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { apiInstance, Api } from '../Config/APi';
import '../Styles/Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();
    const [tourDetails, setTourDetails] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const cloudinaryBaseUrl = "https://res.cloudinary.com/driiz3taz/";

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const details = await Promise.all(
                    cartItems.map(async (item) => {
                        const response = await apiInstance.get(Api.detail(item.id));
                        return response.data;
                    })
                );
                setTourDetails(details);
                setQuantities(details.reduce((acc, tour) => {
                    acc[tour.id] = { adult: 1, child: 0 };
                    return acc;
                }, {}));
            } catch (error) {
                console.error('Error fetching tour details:', error);
            }
        };

        if (cartItems.length > 0) {
            fetchTourDetails();
        }
    }, [cartItems]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            let price = 0;
            tourDetails.forEach(tour => {
                const { adult = 1, child = 0 } = quantities[tour.id] || {};
                const tourTotal = (tour.price_adult * adult) + (tour.price_child * child);
                price += tourTotal;
            });
            setTotalPrice(price);
        };

        calculateTotalPrice();
    }, [quantities, tourDetails]);

    const handleQuantityChange = (tourId, type, value) => {
        setQuantities(prev => ({
            ...prev,
            [tourId]: {
                ...prev[tourId],
                [type]: Number(value)
            }
        }));
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
            const tourIds = cartItems.map(item => item.id);

            // Ensure tour_ids is included and properly formatted
            const response = await apiInstance.post(Api.createPayment(), {
                amount: usdTotalPrice,
                tour_ids: tourIds
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const { approval_url } = response.data;
            if (approval_url) {
                window.location.href = approval_url;
            } else {
                console.error('Failed to get PayPal approval URL.');
            }
        } catch (error) {
            console.error('Error initiating payment:', error.response ? error.response.data : error.message);
        }
    };


    return (
        <div className="cart">
            <section className="book2" id="book2">
                <div className="content">
                    {/* Additional content */}
                </div>
                <div className="video-container">
                    <video src="https://res.cloudinary.com/driiz3taz/video/upload/v1724772136/destinations/stock-footage-kien-giang-vietnam-july-hyperlapse-phu-quoc-night-market-is-vibrant-and-bustling_npwddc.webm" muted autoPlay loop className="video1" id="slide1"></video>
                </div>
            </section>

            {tourDetails.length === 0 ? (
                <p>Giỏ hàng của bạn hiện đang trống.</p>
            ) : (
                <div>
                    <ul>
                        {tourDetails.map(tour => {
                            const { adult = 1, child = 0 } = quantities[tour.id] || {};
                            const tourTotal = (tour.price_adult * adult) + (tour.price_child * child);
                            return (
                                <li key={tour.id} className="cart-item">
                                    <img src={`${cloudinaryBaseUrl}${tour.image}`} alt={tour.title} />
                                    <form className="item-details">
                                        <h2>{tour.title}</h2>
                                        <p>{tour.description}</p>

                                        <div className="form-group">
                                            <label htmlFor={`adult-quantity-${tour.id}`}>Số lượng người lớn:</label>
                                            <input
                                                type="number"
                                                id={`adult-quantity-${tour.id}`}
                                                value={adult}
                                                onChange={(e) => handleQuantityChange(tour.id, 'adult', e.target.value)}
                                                min="1"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor={`child-quantity-${tour.id}`}>Số lượng trẻ em:</label>
                                            <input
                                                type="number"
                                                id={`child-quantity-${tour.id}`}
                                                value={child}
                                                onChange={(e) => handleQuantityChange(tour.id, 'child', e.target.value)}
                                                min="0"
                                            />
                                        </div>

                                        <p>Giá: {tour.price_adult} VNĐ (Người lớn)</p>
                                        <p>Giá: {tour.price_child} VNĐ (Trẻ em)</p>
                                        <p>Tổng giá: {tourTotal} VNĐ</p>
                                        <div className="button-container">
                                            <button type="button" onClick={() => removeFromCart(tour.id)} className="btn-remove">Xóa</button>
                                            <button type="button" onClick={handlePayment} className="btn-remove">Thanh toán</button>
                                        </div>
                                    </form>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Cart;
