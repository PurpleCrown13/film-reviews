import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/css/effect-cube';
import '../styles/About.css';

const Slider = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            effect="cube"
            loop="true"
            style={{ width: '30vw', paddingTop: '50px', paddingBottom: '30px', zIndex: '0', position: 'relative' }}
        >
            <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/cat_about.jpg" alt="" style={{ width: "20vw", height: "30vw" }} />
            </SwiperSlide>
            <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/cat1.jpg" alt="" style={{ width: "20vw", height: "30vw" }} />
            </SwiperSlide>
            <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/cat2.jpg" alt="" style={{ width: "20vw", height: "30vw" }} />
            </SwiperSlide>
            <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/cat3.jpg" alt="" style={{ width: "20vw", height: "30vw" }} />
            </SwiperSlide>
        </Swiper>
    );
};

export default Slider;
