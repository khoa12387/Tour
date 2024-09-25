import React, { useState, useEffect } from 'react';
import { apiInstance, Api } from '../Config/APi';
import '../Styles/Info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMapMarkerAlt, faPhone, faHistory, faHeart, faCheck, faKey, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';

const Info = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        phone: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await apiInstance.get(Api.CurrentUser, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setUser(res.data);
                setFormData({
                    first_name: res.data.first_name || '',
                    last_name: res.data.last_name || '',
                    email: res.data.email || '',
                    address: res.data.address || '',
                    phone: res.data.phone || ''
                });
            } catch (error) {
                console.error('Error fetching user info:', error);
                alert('Failed to load user information.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });

            await apiInstance.patch('/users/profile/', form, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUser(prevUser => ({ ...prevUser, ...formData }));
            setEditable(false);
            alert('User information updated successfully.');
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            alert('Failed to update user information.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            {/* Book3 Section */}
            <section className="book3">
                <div className="content">
                    {/* Add any banner content or relevant information here */}
                </div>
            </section>

            <div className="settings-container">
                {/* Sidebar Section */}
                <aside className="sidebar">
                    <div className="user-profile">
                        <div className="user-avatar">{user.first_name[0]}</div>
                        <p>{user.first_name} {user.last_name}</p>
                        <span>Thành viên từ Aug 2024</span>
                    </div>
                    <ul className="sidebar-menu">
                        <li><FontAwesomeIcon icon={faHistory} /> Lịch sử đặt Tour</li>
                        <li><FontAwesomeIcon icon={faHeart} /> Yêu thích</li>
                        <li><FontAwesomeIcon icon={faCheck} /> Xác minh</li>
                        <li><FontAwesomeIcon icon={faUser} /> Thông tin của tôi</li>
                        <li><FontAwesomeIcon icon={faKey} /> Thay đổi mật khẩu</li>
                        <li><FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất</li>
                        <li><FontAwesomeIcon icon={faHome} /> Quay lại trang chủ</li>
                    </ul>
                </aside>

                {/* Main Content Section */}
                <main className="main-content">
                    <h1>Cài đặt</h1>
                    {editable ? (
                        <form onSubmit={handleSubmit} className="user-info-form">
                            <div className="form-group1">
                                <label htmlFor="first_name">
                                    <FontAwesomeIcon icon={faUser} /> Tên
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">
                                    <FontAwesomeIcon icon={faUser} /> Họ
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    <FontAwesomeIcon icon={faEnvelope} /> E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">
                                    <FontAwesomeIcon icon={faPhone} /> Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit">Lưu thay đổi</button>
                                <button type="button" onClick={() => setEditable(false)}>Hủy bỏ</button>
                            </div>
                        </form>
                    ) : (
                        <div className="user-info-details">
                            <div className="info-block">
                                <FontAwesomeIcon icon={faUser} />
                                <p><strong>Tên:</strong> {user.first_name} {user.last_name}</p>
                            </div>
                            <div className="info-block">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                            <div className="info-block">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <p><strong>Địa chỉ:</strong> {user.address || 'Chưa cập nhật'}</p>
                            </div>
                            <div className="info-block">
                                <FontAwesomeIcon icon={faPhone} />
                                <p><strong>Số điện thoại:</strong> {user.phone || 'Chưa cập nhật'}</p>
                            </div>
                            <button onClick={() => setEditable(true)}>Chỉnh sửa</button>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default Info;
