import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import GoogleLoginButton from './GoogleLoginButton';
import { Api, apiInstance } from '../Config/APi';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const requestData = new URLSearchParams({
                grant_type: 'password',
                username: username,
                password: password,
                client_id: "Cjmncda7LIsE3LAa8Mk9tSyesN2WI4LXwtjfItOS",
                client_secret: "jfcnajbZguBYycNy8c2LRvshpGJ52Och1BuYCDuLh36CVL4dl7XBk0aEcENsFfqvFsUBy1FJ0ph9Io5zylvorLJhxIP0lvlTGAb6yeuTz4RxI9jkNkrXUQ9X8g0FjwKn"
            }).toString();

            const res = await apiInstance.post(Api.login, requestData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            const token = res.data.access_token;
            localStorage.setItem('token', token);

            // Fetch current user information
            const userRes = await apiInstance.get(Api.CurrentUser, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const user = userRes.data;

            // Log the user object to the console
            console.log('Fetched user:', user);

            // Check if the user belongs to the 'Customer' group
            const isCustomer = user.groups.some(group => group.name === 'Customer');
            if (isCustomer) {
                navigate('/');
                login(user);
            } else {
                console.error('User is not in the Customer group');
                // Handle non-customer user logic here
            }

        } catch (error) {
            if (error.response) {
                console.error('Login error response data:', error.response.data);
                console.error('Login error response status:', error.response.status);
            } else {
                console.error('Login error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };








    return (
        <div className="login-page">
            <section className="con">
                <div className="img-bg">
                    <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1723856152/destinations/DaoPhuNgoc_vgifkb.jpg" alt="Illustrative Image" />
                </div>

                <div className="login">
                    <form onSubmit={handleLogin} className="form">
                        <h2>Đăng Nhập</h2>
                        <div className="input-form">
                            <span>Tên Người Dùng</span>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-form">
                            <span>Mật Khẩu</span>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="nho-dang-nhap">
                            <label>
                                <input type="checkbox" name="remember" /> Nhớ Đăng Nhập
                            </label>
                        </div>
                        <div className="input-form">
                            <input type="submit" value="Đăng Nhập" disabled={loading} />
                        </div>
                        <div className="input-form">
                            <h1>
                                Bạn Chưa Có Tài Khoản?
                                <a href="#forgot" className="forgot">Quên mật khẩu</a>
                            </h1>
                            <h1>
                                <a href="#register">Đăng Ký</a>
                            </h1>
                        </div>
                        <h3>Đăng Nhập Bằng Mạng Xã Hội</h3>
                        <div>
                            <GoogleLoginButton />
                        </div>
                    </form>
                </div>
            </section>


        </div>
    );
};

export default Login;
