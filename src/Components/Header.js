import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPaperPlane, faSignOutAlt, faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import '../Styles/TrangChu.css';
import '../Styles/Header.css';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';

function Header() {
    const { isLoggedIn, logout } = useAuth();
    const { cartCount } = useCart();
    const location = useLocation(); // Sử dụng useLocation để lấy đường dẫn hiện tại

    return (
        <header className="header-top">
            <div id="menu-btn" className="fas">
                <FontAwesomeIcon icon={faBars} />
            </div>
            <Link to="/" className="logo">
                <FontAwesomeIcon icon={faPaperPlane} /> Travel Phu Quoc
            </Link>
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Trang chủ</Link>
                    </li>
                    <li>
                        <Link to="/Tour" className={location.pathname === "/Tour" ? "active" : ""}>Tour</Link>
                    </li>
                    <li>
                        <Link to="/diemden" className={location.pathname === "/diemden" ? "active" : ""}>Điểm đến</Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link to="/Info" className={location.pathname === "/Info" ? "active" : ""}>
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </li>
                    )}

                    <li className="nav-item">
                        {/* Kiểm tra nếu đang ở trang /cart */}
                        <Link to="/cart" className={`nav-link text-danger ${location.pathname === "/cart" ? "active" : ""}`}>
                            &#128722; <span className="badge bg-danger cart-counter">{cartCount}</span>
                        </Link>
                    </li>
                    {/* Thêm mục FAQs với biểu tượng message */}
                    <li>
                        <Link to="/Faq" className={location.pathname === "/Faq" ? "active" : ""}>
                            <FontAwesomeIcon icon={faComment} /> Hỗ Trợ
                        </Link>
                    </li>
                    {isLoggedIn ? (
                        <li>
                            <button onClick={logout} className="btn-logout">
                                <FontAwesomeIcon icon={faSignOutAlt} /> Đăng Xuất
                            </button>
                        </li>
                    ) : (
                        <></>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
