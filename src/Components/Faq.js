import React, { useState, useEffect } from 'react';
import { apiInstance, Api } from '../Config/APi';
import '../Styles/Faq.css';

const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeQuestion, setActiveQuestion] = useState(null); // Câu hỏi đang hoạt động

    useEffect(() => {
        const fetchFAQs = async () => {
            setLoading(true);
            let allFaqs = [];
            let nextUrl = Api.faqs; // Đảm bảo bạn có URL đúng cho FAQs

            while (nextUrl) {
                try {
                    const response = await apiInstance.get(nextUrl);
                    const data = response.data;

                    if (data && Array.isArray(data.results)) {
                        allFaqs = [...allFaqs, ...data.results];
                        nextUrl = data.next; // Lấy URL trang tiếp theo
                    } else {
                        console.error('Dữ liệu không phải là mảng hoặc thiếu thuộc tính results:', data);
                        nextUrl = null; // Ngừng vòng lặp nếu không có kết quả
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu FAQs:', error);
                    setError(error);
                    nextUrl = null; // Ngừng vòng lặp nếu có lỗi
                }
            }

            setFaqs(allFaqs); // Cập nhật danh sách FAQs
            setLoading(false);
        };

        fetchFAQs();
    }, []);

    const handleQuestionClick = (index) => {
        // Nếu câu hỏi được nhấn đã đang mở thì đóng nó, ngược lại thì mở
        setActiveQuestion(activeQuestion === index ? null : index);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <section className="faq-section">
            <h2>Câu hỏi thường gặp</h2>
            <div className="faq-container">
                {faqs.length > 0 ? (
                    <div className="faq-content">
                        {faqs.map((faq, index) => (
                            <div key={faq.id}>
                                <div
                                    className="faq-question"
                                    onClick={() => handleQuestionClick(index)}
                                >
                                    <div className="faq-question-bubble">
                                        <span className="bot"></span>{faq.question}
                                    </div>
                                </div>
                                {/* Hiện câu trả lời nếu câu hỏi đang hoạt động */}
                                {activeQuestion === index && (
                                    <div className="faq-answer-container">
                                        <div className="faq-answer-bubble">
                                            <span className="user"></span>{faq.answer}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Không có câu hỏi nào.</p>
                )}
            </div>
        </section>
    );
};

export default Faq;
