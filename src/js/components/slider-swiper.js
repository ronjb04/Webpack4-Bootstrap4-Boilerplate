import '../../../node_modules/swiper/dist/css/swiper.css';
import Swiper from 'swiper';
function initSwipe() {
    
    console.log("initSwipe");
    
    var mySwiper = new Swiper('.swiper-container', {

        autoplay: {
            delay: 5000,
        },

        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
}

export default {
    initSwipe: initSwipe
}