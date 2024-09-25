import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Hiển thị thông báo sau khi thanh toán thành công
        window.alert('Bạn đã thanh toán thành công!');
        // Khi nhấn OK trên alert, chuyển hướng về trang chủ
        navigate('/');
    }, [navigate]);

    return null; // Không cần render gì trên trang này
};

export default PaymentSuccess;
