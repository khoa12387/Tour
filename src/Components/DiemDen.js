import React, { useState, useEffect } from 'react';
import { apiInstance, Api } from '../Config/APi'; // Import axios instance and API configuration
import '../Styles/DiemDen.css';

const DiemDen = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cloudinaryBaseUrl = "https://res.cloudinary.com/driiz3taz/";

    // State to manage the expanded description
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        const fetchAllDestinations = async () => {
            setLoading(true);
            let allDestinations = [];
            let page = 1;
            let hasMore = true;

            while (hasMore) {
                try {
                    const response = await apiInstance.get(Api.destinations, { params: { page } });
                    const data = response.data;

                    if (data && Array.isArray(data.results)) {
                        allDestinations = [...allDestinations, ...data.results];
                        hasMore = data.next !== null;
                        page += 1;
                    } else {
                        console.error('Dữ liệu không phải là mảng hoặc thiếu thuộc tính results:', data);
                        hasMore = false;
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu:', error);
                    setError(error);
                    hasMore = false;
                }
            }

            setDestinations(allDestinations);
            setLoading(false);
        };

        fetchAllDestinations();
    }, []);

    // Function to handle the "Read More" button click
    const handleReadMore = (id) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [id]: !prevExpanded[id] // Toggle the expanded state for the specific destination
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <section className="book" id="book">
                <div className="content">
                    <span>Kính chào quý khách đến với Phú Quốc</span>
                    <h3>Một hòn đảo tươi đẹp và thơ mộng</h3>
                    <p>Đến đây bạn sẽ được trải nghiệm nhiều điều thú vị về Phú Quốc</p>
                    <a href="#" className="btn">Đọc thêm </a>
                </div>
                <div className="video-container">
                    <video src="https://res.cloudinary.com/driiz3taz/video/upload/v1723734144/destinations/PhuQuoc_kbylok.mp4" muted autoPlay loop className="video1" id="slide1"></video>
                </div>
            </section>

            <section className="description-section">
                {destinations.map(destination => (
                    <div className="about2" key={destination.id}>
                        <div className="image">
                            <img src={`${cloudinaryBaseUrl}${destination.image}`} alt={destination.name} />
                        </div>
                        <div className="container">
                            <h2>{destination.name}</h2>
                            <p>
                                {expanded[destination.id] ? destination.description : `${destination.description.substring(0, 100)}...`}
                            </p>
                            <button
                                className="read-more"
                                onClick={() => handleReadMore(destination.id)}
                            >
                                {expanded[destination.id] ? '' : 'Xem thêm'}
                            </button>
                        </div>
                    </div>
                ))}
            </section>
            <section class="about3" id="about3">

                <div class="row">

                    <div class="image">
                        <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725014919/destinations/1010nen2_ijpiom.jpg" alt="" />
                    </div>

                    <div class="content">
                        <h3>Cùng trải nghiệm những tiện nghi tốt nhất tại Travel Phu Quoc</h3>
                        <p>Với nhiều ưu đãi quý khách sẽ được tận hưởng mùa hè không thể nào quên cùng Travel Phu Quoc, với trải nghiệm nghỉ dưỡng đỉnh cao và những cuộc vui bất tận bên người thân yêu!</p>
                        <a href="#" class="btn">Xem them</a>
                    </div>

                </div>

            </section>


            <section class="products" id="products">
                <h1 class="heading2"> <span>Khách sạn</span> </h1>
                <p>We Are Currently Unable To Update Content. Please Forgive This Shortcoming</p>
                <div class="box-container">
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/vinholiday-1-phu-quoc/hotel/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&los=1&searchrequestid=3fa7d779-dfcb-4870-adae-3aac5e136b47">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725102639/destinations/102Vinholidays_Fiesta_Ph%C3%BA_Qu%E1%BB%91c_3.068.102%C4%91_whvr9p.webp" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>Vinholidays Fiesta Phu Quoc</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">3.068.102đ <span>6.228.204đ</span></div>
                        </div>
                    </div>

                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/vinpearl-resort-golf-phu-quoc/hotel/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&los=1&searchrequestid=8dcf64dc-9a6b-49ee-b2f1-85b29e2883b5">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104298/destinations/103Vinpearl_Resort_Spa_Phu_Quoc_2.293.651%C4%91_g0irqw.webp" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>Vinpearl Resort&Spa Phú Quốc</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">2.698.413đ <span>5.456.478đ</span></div>
                        </div>
                    </div>


                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/paralia-khem-beach-hotel/hotel/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&tspTypes=16&los=1&searchrequestid=3fa7d779-dfcb-4870-adae-3aac5e136b47">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104458/destinations/104Kh%C3%A1ch_s%E1%BA%A1n_Paralia_B%C3%A3i_Khem_Ph%C3%BA_Qu%E1%BB%91c_1.432.678%C4%91_iuplvd.webp" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>Khách sạn Paralia Bãi Khem Phú Quốc</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">1.432.678đ <span>3.457.123đ</span></div>
                        </div>
                    </div>
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/the-empire-hotel/hotel/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&tspTypes=2,2,16,16&los=1&searchrequestid=3fa7d779-dfcb-4870-adae-3aac5e136b47">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104461/destinations/105Kh%C3%A1ch_s%E1%BA%A1n_Empire_The_Empire_Hotel_-_742.843%C4%91_j2oshw.jpg" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>Khách sạn Empire Phú Quốc </h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">742.843đ <span>1.458.567đ</span></div>
                        </div>
                    </div>
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/the-shells-resort-spa-phu-quoc/hotel/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&tspTypes=9&los=1&searchrequestid=3fa7d779-dfcb-4870-adae-3aac5e136b47">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104661/destinations/106The_Shells_Resort_Spa-Phu_Quoc_1.650.564_bwb4j5.webp" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>The Shells Resort&Spa Phú Quốc</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">1.650.564đ <span>3.245.123đ</span></div>
                        </div>
                    </div>
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/3-rau-house-grand-world-phu-quoc/hotel/all/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&tspTypes=-1&los=1&searchrequestid=8dcf64dc-9a6b-49ee-b2f1-85b29e2883b5">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104659/destinations/107_3_Rau_house_grand_World_Phu_Quoc_546.650%C4%91_zzgrxn.jpg" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>3 Rau house grand World Phú Quốc</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price"> 546.650đ <span>1.532.142đ</span></div>
                        </div>
                    </div>
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/cassano-mini-hotel/hotel/all/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&los=1&searchrequestid=8dcf64dc-9a6b-49ee-b2f1-85b29e2883b5">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104657/destinations/108Cassano_Mini_Hotel_740.741%C4%91_wcn7ec.jpg" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>Cassano Mini Hotel Phu Quoc</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">740.741đ <span>1.567.235đ</span></div>
                        </div>
                    </div>
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/tropicana-resort-phu-quoc/hotel/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&tspTypes=9,16&los=1&searchrequestid=3fa7d779-dfcb-4870-adae-3aac5e136b47">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104654/destinations/109Tropicana_Resort_Phu_Quoc_594.375%C4%91_pzga5q.webp" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>Tropicana Resort Phú Quốc</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">594.375đ <span> 2.051.456đ</span></div>
                        </div>
                    </div>
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/muong-thanh-luxury-phu-quoc-hotel/hotel/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&tspTypes=5&los=1&searchrequestid=3fa7d779-dfcb-4870-adae-3aac5e136b47">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104776/destinations/110Muong_Thanh_Luxury_Phu_Quoc_Hotel_3.481.122%C4%91_v9nvss.webp" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>Muong Thanh Luxury Phu Quoc Hotel</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">3.481.122đ <span>7.457.512đ</span></div>
                        </div>
                    </div>
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/bauhinia-resort/hotel/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&tspTypes=1,16&los=1&searchrequestid=8dcf64dc-9a6b-49ee-b2f1-85b29e2883b5">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104780/destinations/111Baudinia_Resort_1.700.000%C4%91_hoem2y.webp" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>Baudinia Resort Phu Quoc</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">700.000đ <span> 1.500.654đ</span></div>
                        </div>
                    </div>
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/crowne-plaza-phu-quoc-starbay/hotel/phu-quoc-island-vn.html?cid=1844104"><img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104778/destinations/112Crowne_Plaza_Phu_Quoc_Starbay_1.945.884%C4%91_afvrxj.webp" alt="" /></a>
                        </div>
                        <div class="content">
                            <h3>Crowne Plaza Phu Quoc Starbay</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">1.945.884đ <span>3.845.127đ</span></div>
                        </div>
                    </div>
                    <div class="box">

                        <div class="image">
                            <a href="https://www.agoda.com/vi-vn/dusit-princess-moonrise-beach-resort/hotel/phu-quoc-island-vn.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1891453&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2022-08-30&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=VND&isFreeOccSearch=false&isCityHaveAsq=false&tspTypes=16,-1&los=1&searchrequestid=3fa7d779-dfcb-4870-adae-3aac5e136b47">
                                <img src="https://res.cloudinary.com/driiz3taz/image/upload/v1725104773/destinations/113Khu_ngh%E1%BB%89_d%C6%B0%E1%BB%A1ng_Dusit_Princess_Moonrise_pl8puh.webp" alt="" /> </a>
                        </div>
                        <div class="content">
                            <h3>Khu nghỉ dưỡng Dusit Princess Moonrise</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">1.745.884đ <span>4.845.127đ</span></div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    );
};

export default DiemDen;
