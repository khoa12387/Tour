import React, { useState, useEffect } from 'react';
import { apiInstance, Api } from '../Config/APi';
import '../Styles/Tour.css';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

const Tour = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTour, setSelectedTour] = useState('');
    const [selectedDate, setSelectedDate] = useState(''); // Lưu ngày mà người dùng chọn
    const [filteredTours, setFilteredTours] = useState([]);
    const cloudinaryBaseUrl = "https://res.cloudinary.com/driiz3taz/";
    const { addToCart, cartItems } = useCart();

    const addedItemIds = new Set(cartItems.map(item => item.id));

    useEffect(() => {
        const fetchAllTours = async () => {
            setLoading(true);
            let allTours = [];
            let nextUrl = Api.tours;

            while (nextUrl) {
                try {
                    const response = await apiInstance.get(nextUrl);
                    const data = response.data;

                    if (data && Array.isArray(data.results)) {
                        allTours = [...allTours, ...data.results];
                        nextUrl = data.next;
                    } else {
                        console.error('Dữ liệu không phải là mảng hoặc thiếu thuộc tính results:', data);
                        nextUrl = null;
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu:', error);
                    setError(error);
                    nextUrl = null;
                }
            }

            setTours(allTours);
            setFilteredTours(allTours); // Set the initial filtered tours to all tours
            setLoading(false);
        };

        fetchAllTours();
    }, []);

    const handleTourChange = (e) => {
        const tourKeyword = e.target.value;
        setSelectedTour(tourKeyword);
        filterTours(tourKeyword, selectedDate);
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        filterTours(selectedTour, date); // Gọi filterTours để lọc khi thay đổi ngày
    };

    const filterTours = (tourKeyword, selectedDate) => {
        // Kiểm tra xem có từ khóa nào được chọn không
        let filtered = tours;

        if (tourKeyword) {
            const keyword = tourKeyword.toLowerCase();
            filtered = filtered.filter(t => t.title.toLowerCase().includes(keyword));
        }

        // Nếu người dùng chọn ngày, chỉ hiện những tour có ngày bắt đầu >= ngày được chọn
        if (selectedDate) {
            filtered = filtered.filter(t => new Date(t.start_date) >= new Date(selectedDate));
        }

        // Cập nhật danh sách tour đã lọc
        setFilteredTours(filtered);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleAddToCart = (tour) => {
        if (!addedItemIds.has(tour.id)) {
            addToCart(tour);
        }
    };

    return (
        <>
            <section className="Tour" id="Tour">
                <div className="content">
                    <h3>Vui hè cực đỉnh cùng Travel Phu Quoc</h3>
                    <p>Tận hưởng mùa hè không thể nào quên cùng Travel Phu Quoc, với trải nghiệm nghĩ dưỡng đỉnh cao và những cuộc vui bất tận bên người thân yêu!</p>
                    <a href="#" className="btn">Xem thêm</a>
                </div>
            </section>

            <section className="book-form" id="book-form">
                <form action="">
                    <div className="inputBox">
                        <span>Chọn tour</span>
                        <select onChange={handleTourChange}>
                            <option value="">--Chọn tour--</option>
                            <option value="2 ngày">2 ngày</option>
                            <option value="3 ngày">3 ngày</option>
                            <option value="4 ngày">4 ngày</option>
                            <option value="5 ngày">5 ngày</option>
                            <option value="1 ngày">Tour trong ngày</option>
                        </select>
                    </div>

                    <div className="inputBox">
                        <span>Thời gian đi</span>
                        <input type="date" onChange={handleDateChange} />
                    </div>

                    <a href="" className="btn">Tìm kiếm</a>
                </form>
            </section>

            <section className="tour-section">
                {filteredTours.length > 0 ? (
                    filteredTours.map(tour => (
                        <div className="tour" key={tour.id}>
                            <div className="image">
                                <img src={`${cloudinaryBaseUrl}${tour.image}`} alt={tour.title} />
                            </div>
                            <div className="content">
                                <h2>{tour.title}</h2>
                                <p>{tour.description}</p>
                                <Link to={`/tours/${tour.id}`} className="btn">Chi tiết</Link>
                                <button
                                    onClick={() => handleAddToCart(tour)}
                                    className="btn"
                                    disabled={addedItemIds.has(tour.id)}
                                >
                                    Thêm Vào giỏ Hàng
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có tour nào khớp với lựa chọn của bạn.</p>
                )}
            </section>

            <section className="contact" id="contact">
                <h1 className="heading"> <span>Liên hệ chúng tôi</span> </h1>
                <div className="row">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21631.099432363488!2d103.97540344221296!3d10.224465262798338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1661169509974!5m2!1svi!2s"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <form action="">
                        <h3>Liên hệ</h3>
                        <div className="inputBox">
                            <span className="fas fa-user"></span>
                            <input type="text" placeholder="---Họ và tên---" />
                        </div>
                        <div className="inputBox">
                            <span className="fas fa-envelope"></span>
                            <input type="email" placeholder="---Email của bạn---" />
                        </div>
                        <div className="inputBox">
                            <span className="fas fa-phone"></span>
                            <input type="number" placeholder="--Số điện thoại--" />
                        </div>
                        <input type="submit" value="Liên hệ ngay" className="btn" />
                    </form>
                </div>
            </section>
        </>
    );
};

export default Tour;
