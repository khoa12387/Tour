// src/TrangChu.
import { useAuth } from '../AuthContext';
import Header from './Header';
import Footer from './Footer';
import React from 'react';
import '../Styles/TrangChu.css'; // Assuming this is your custom CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faMap, faPhone, faEnvelope, faClock, faUtensils, faBullhorn, faGlobeAsia, faPlane, faHiking, faHotel } from '@fortawesome/free-solid-svg-icons';
// Correct import for brand icons

function TrangChu() {

    const { isLoggedIn } = useAuth();

    return (
        <div className="TrangChu">
            {/* Header */}


            {/* Home Section */}
            <section className="home" id="home">
                <div className="content">
                    <span>PHU QUOC</span>
                    <h3>Chào Mừng Các Bạn Đến Với Tour Du Lịch Phú Quốc </h3>
                    <p>Rất Hân Hạnh Được chào đón quý khách</p>
                    {!isLoggedIn && <a href="/login" className="btn">Đăng Nhập </a>}
                </div>
            </section>



            {/* About Section */}
            <section className="about" id="about">
                <div className="video-container">
                    <video src="https://res.cloudinary.com/driiz3taz/video/upload/v1705978042/TrangChu/02_pdxc7o.mp4" muted autoPlay loop className="video"></video>
                </div>
                <div className="content">
                    <span>Kính chào quý khách đến với Phú Quốc</span>
                    <h3>Một hòn đảo tươi đẹp và thơ mộng</h3>
                    <p>Đến đây bạn sẽ được trải nghiệm nhiều điều thú vị về Phú Quốc </p>
                    <a href="#" className="btn">Đọc thêm </a>
                </div>
            </section>

            {/* Destination Section */}
            <section className="destination" id="destination">
                <div className="heading">
                    <span>Hãy đến đây với chúng tôi</span>
                    <h1>Trải nghiệm những điều mới lạ</h1>
                </div>
                <div className="box-container">
                    <div className="box">
                        <div className="image">
                            <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978013/TrangChu/trochoi_ge4uhc.jpg" alt="" />
                        </div>
                        <div className="content">
                            <h3>VinWonders Phú Quốc</h3>
                            <p>Thiên đường vui chơi giải trí hấp dẫn</p>
                            <a href="https://vinwonders.com/vi/vinwonders-phu-quoc/">Đọc thêm <FontAwesomeIcon icon={faAngleRight} /></a>
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978018/TrangChu/baidai_ighywh.jpg" alt="" />
                        </div>
                        <div className="content">
                            <h3>Bãi Dài</h3>
                            <p>Một trong những bãi biển đẹp hoang sơ nhất hành tinh</p>
                            <a href="https://vinpearl.com/vi/bai-dai-phu-quoc-o-dau-an-gi-ngon-choi-gi-vui-tai-bai-bien-dep-nhat-hanh-tinh"> Đọc Thêm <FontAwesomeIcon icon={faAngleRight} /></a>
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978011/TrangChu/tieu_p3s315.jpg" alt="" />
                        </div>
                        <div className="content">
                            <h3>Vườn tiêu Phú Quốc</h3>
                            <p>Tham quan và tìm hiểu vườn tiêu cùng bà con</p>
                            <a href="https://vinpearl.com/vi/vuon-tieu-phu-quoc-kham-pha-diem-check-in-khong-the-bo-qua">Đọc thêm<FontAwesomeIcon icon={faAngleRight} /></a>
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978015/TrangChu/lehoi_phjczl.jpg" alt="" />
                        </div>
                        <div className="content">
                            <h3>Văn hóa- Lễ hội</h3>
                            <p>Đặc sắc, hấp dẫn đậm bản sắc địa phương</p>
                            <a href="https://vinpearl.com/vi/top-10-le-hoi-o-phu-quoc-dam-net-truyen-thong-van-hoa-nen-trai-nghiem">Đọc thêm <FontAwesomeIcon icon={faAngleRight} /></a>
                        </div>
                    </div>
                    <a href="https://divui.com/blog/28-dia-diem-du-lich-phu-quoc-moi-ve-dem-mien-phi-tong-hop-tu-a-z/" className="btn">Đọc thêm </a>
                </div>
            </section>

            {/* Services Section */}
            <section className="services" id="services">
                <div className="heading">
                    <h1>Dịch vụ</h1>
                    <span>Trải nghiệm những điều mới lạ</span>
                </div>
                <div className="box-container">
                    <div className="box">
                        <FontAwesomeIcon icon={faHotel} />
                        <h3>Khách Sạn</h3>
                        <p>We are currently unable to update content. Please forgive this shortcoming</p>
                    </div>
                    <div className="box">
                        <FontAwesomeIcon icon={faUtensils} />
                        <h3>Đồ Ăn Thức Uống</h3>
                        <p>We are currently unable to update content. Please forgive this shortcoming</p>
                    </div>
                    <div className="box">
                        <FontAwesomeIcon icon={faBullhorn} />
                        <h3>Hướng Dẫn An Toàn</h3>
                        <p>We are currently unable to update content. Please forgive this shortcoming</p>
                    </div>
                    <div className="box">
                        <FontAwesomeIcon icon={faGlobeAsia} />
                        <h3>Khám phá</h3>
                        <p>We are currently unable to update content. Please forgive this shortcoming</p>
                    </div>
                    <div className="box">
                        <FontAwesomeIcon icon={faPlane} />
                        <h3>Điểm du lịch</h3>
                        <p>We are currently unable to update content. Please forgive this shortcoming</p>
                    </div>
                    <div className="box">
                        <FontAwesomeIcon icon={faHiking} />
                        <h3>Khám Phá</h3>
                        <p>We are currently unable to update content. Please forgive this shortcoming</p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section class="picture" id="picture">

                <div class="heading">
                    <h1>Phòng trưng bày</h1>
                    <span>Nơi lưu giữ những khoảnh khắc</span>
                </div>

                <div class="box-container">

                    <div class="box">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978029/TrangChu/03vuontieu_molfji.jpg" alt="" />
                        <div class="content">
                            <h3>Vườn tiêu</h3>
                            <a href="https://www.klook.com/vi/blog/vuon-tieu-phu-quoc/" class="btn">xem</a>
                        </div>
                    </div>
                    <div class="box">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978028/TrangChu/02traiong_flicww.jpg" alt="" />
                        <div class="content">
                            <h3>Trại ong </h3>
                            <a href="https://funnytripphuquoc.com/trai-ong-phu-quoc-kham-pha-the-gioi-ong-rung-lon-nhat-dao-ngoc/" class="btn">xem</a>
                        </div>
                    </div>
                    <div class="box">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978028/TrangChu/01suoi_rdaga4.jpg" alt="" />
                        <div class="content">
                            <h3>Suối Tranh</h3>
                            <a href="https://vinpearl.com/vi/suoi-tranh-phu-quoc-kinh-nghiem-kham-pha-sieu-hap-dan" class="btn">xem</a>
                        </div>
                    </div>
                    <div class="box">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978031/TrangChu/06_qwnf4i.jpg" alt="" />
                        <div class="content">
                            <h3>Grand World- Phú Quốc</h3>
                            <a href="http://grandworldphuquoc.vn/" class="btn">xem</a>
                        </div>
                    </div>
                    <div class="box">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978030/TrangChu/05_oploog.jpg" alt="" />
                        <div class="content">
                            <h3>Làng chài Rạch Vẹm</h3>
                            <a href="https://vinpearl.com/vi/check-in-rach-vem-phu-quoc-mua-sao-bien" class="btn">xem</a>
                        </div>
                    </div>
                    <div class="box">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978025/TrangChu/08_cdvlls.jpg" alt="" />
                        <div class="content">
                            <h3>Cáp treo Hòn Thơm</h3>
                            <a href="https://phuquocnews.vn/nhung-dieu-can-biet-khi-di-cap-treo-hon-thom-phu-quoc" class="btn">xem</a>
                        </div>
                    </div>
                    <div class="box">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978011/TrangChu/trangchu13_mamcwt.webp" alt="" />
                        <div class="content">
                            <h3>Lặn ngắm rạn san hô Nam đảo</h3>
                            <a href="https://hitour.vn/tour-du-lich-phu-quoc/tour-du-lich-phu-quoc-trong-ngay-cau-ca-ngam-san-ho-nam-dao-hon-goi-hon-thom" class="btn">xem</a>
                        </div>
                    </div>
                    <div class="box">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978013/TrangChu/tranhchu10_zlq7os.webp" alt="" />
                        <div class="content">
                            <h3>Quán cafe Chuồn Chuồn</h3>
                            <a href="https://www.tripadvisor.com.vn/Restaurant_Review-g1184679-d10765451-Reviews-Chuon_Chuon_Bistro_Bar-Duong_Dong_Phu_Quoc_Island_Kien_Giang_Province.html" class="btn">xem</a>
                        </div>
                    </div>
                    <div class="box">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978011/TrangChu/trangchu12_bevr50.jpg" alt="" />
                        <div class="content">
                            <h3>Thiền viện Trúc Lâm</h3>
                            <a href="https://mia.vn/cam-nang-du-lich/chua-ho-quoc-thien-vien-truc-lam-ho-quoc-dai-danh-thang-dung-bo-lo-cua-phu-quoc-33" class="btn">xem</a>
                        </div>
                    </div>

                </div>

            </section>

            {/* Review Section */}
            <section class="review" id="review">

                <div class="content">
                    <span>Bình luận của du khách</span>
                    <h3>Những bình luận mới nhất</h3>
                    <p>Cảm ơn quý khách đã đồng hành cùng chúng tôi</p>
                </div>

                <div class="box-container">

                    <div class="box">
                        <p>Dette sted er så smukt, at jeg elsker det.</p>
                        <div class="user">
                            <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978020/TrangChu/11_adlm8t.png" alt="" />
                            <div class="info">
                                <h3>Jack Son</h3>
                                <span>Greenland</span>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <p>This place is so beautiful I love it.</p>
                        <div class="user">
                            <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978023/TrangChu/12_pfg3yo.png" alt="" />
                            <div class="info">
                                <h3>jonh Son</h3>
                                <span>America</span>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <p>Thật đẹp, mọi thứ đều thật tuyệt vời!</p>
                        <div class="user">
                            <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978021/TrangChu/13_gtn49b.png" alt="" />
                            <div class="info">
                                <h3>Nguyễn Khoa</h3>
                                <span>Việt Nam</span>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <p>это место такое красивое я люблю его</p>
                        <div class="user">
                            <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1705978023/TrangChu/14_eddebu.png" alt="" />
                            <div class="info">
                                <h3>Katia</h3>
                                <span>Russia </span>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            {/* Contact Section */}
            <section className="contact" id="contact">
                <div className="heading">
                    <span>Liên hệ</span>
                    <h1>Chúng tôi có mặt mọi lúc để phục vụ bạn</h1>
                </div>
                <div className="contact-container">
                    <div className="contact-box">
                        <FontAwesomeIcon icon={faMap} />
                        <h3>Địa chỉ</h3>
                        <p>123 Đường Phú Quốc, TP. Hồ Chí Minh, Việt Nam</p>
                    </div>
                    <div className="contact-box">
                        <FontAwesomeIcon icon={faPhone} />
                        <h3>Điện thoại</h3>
                        <p>+84 123 456 789</p>
                    </div>
                    <div className="contact-box">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <h3>Email</h3>
                        <p>contact@travelphuquoc.com</p>
                    </div>
                    <div className="contact-box">
                        <FontAwesomeIcon icon={faClock} />
                        <h3>Giờ làm việc</h3>
                        <p>9:00 AM - 6:00 PM, Thứ 2 - Thứ 7</p>
                    </div>
                </div>
            </section>

            {/* Banner Section */}


            {/* Footer */}

        </div>
    );
}

export default TrangChu;
