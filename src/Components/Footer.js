import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faChevronCircleUp, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../Styles/TrangChu.css';
import '../Styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <section className="banner">
                <div className="content">
                    <h3>Khám phá Phú Quốc với các gói tour đặc biệt!</h3>
                    <Link to="/Register" className="btn">Đăng kí ngay</Link>
                </div>

            </section>
            <div className="box-container">
                <div className="box">
                    <h3>Theo dõi chúng tôi</h3>
                    <a href="#"><FontAwesomeIcon icon={faFacebookF} /> Facebook</a>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} /> Twitter</a>
                    <a href="#"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
                    <a href="#"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</a>
                </div>
                <div className="box">
                    <h3>Liên kết nhanh</h3>
                    <a href="#home"><FontAwesomeIcon icon={faChevronCircleUp} /> Trang chủ</a>
                    <a href="#about">Về chúng tôi</a>
                    <a href="#destination">Điểm đến</a>
                    <a href="#services">Dịch vụ</a>
                    <a href="#gallery">Gallery</a>
                    <a href="#review">Đánh giá</a>
                </div>
                <div className="box">
                    <h3>Thông tin liên hệ</h3>
                    <a href="#"><FontAwesomeIcon icon={faPaperPlane} /> travelphuquoc@example.com</a>
                    <a href="#"><FontAwesomeIcon icon={faPaperPlane} /> +84 123 456 789</a>
                    <a href="#"><FontAwesomeIcon icon={faPaperPlane} /> Phú Quốc, Việt Nam</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
