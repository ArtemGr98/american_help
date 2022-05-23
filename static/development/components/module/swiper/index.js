import Swiper, { Navigation, Pagination }  from 'swiper';
import 'swiper/swiper-bundle.css'
import './index.scss'

Swiper.use([Navigation, Pagination])

let swiper = new Swiper(".help_slider", {
    slidesPerView: '3.5',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".pagination_2",
        type: "progressbar",
    },
    breakpoints: {
        1200: {
            slidesPerView: 3.5,
        },
        992: {
            slidesPerView: 3,
        },
        700: {
            slidesPerView: 2.5,
        },
        500: {
            slidesPerView: 2,
        },
        400: {
            slidesPerView: 1.5,
        },
        300: {
            slidesPerView: 1,
        }
    },
});