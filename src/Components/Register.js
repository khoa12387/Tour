import React, { useState } from 'react';
import '../Styles/Register.css';
import { apiInstance, Api } from '../Config/APi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2: '',
        email: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiInstance.post(Api.register, formData);
            alert('Đăng ký thành công!');
            navigate('/login'); // Redirect to the login page after successful registration
        } catch (error) {
            console.error('Đăng ký thất bại:', error.response?.data || error.message);
            alert('Đăng ký thất bại: ' + JSON.stringify(error.response?.data || error.message));
        }
    };

    return (
        <div className="login-page">
            {/* Phần Hình Ảnh */}
            <section className="con">
                <div className="img-bg">
                    <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1723856152/destinations/DaoPhuNgoc_vgifkb.jpg" alt="Hình Ảnh Minh Họa" />
                </div>

                {/* Phần Nội Dung */}
                <div className="login">
                    <form onSubmit={handleSubmit} className="form">
                        <h2>Đăng Ký</h2>
                        <div className="input-form">
                            <span>Tên Người Dùng</span>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-form">
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-form">
                            <span>Mật Khẩu</span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-form">
                            <span>Nhập Lại Mật Khẩu</span>
                            <input
                                type="password"
                                name="password2"
                                value={formData.password2}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-form">
                            <input type="submit" value="Đăng Ký" />
                        </div>

                    </form>
                </div>
            </section>
        </div>
    );
};

export default Register;
