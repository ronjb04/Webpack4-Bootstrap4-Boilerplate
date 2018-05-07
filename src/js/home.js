import 'bootstrap' // import bootstrap required js
import 'scss/common/bootstrap.scss'; // import bootstrap required css



//import Swiper from 'swiper/dist/js/swiper.js';
//import Swiper from 'swiper/dist/js/swiper.js';

import sliderSwiper from './components/slider-swiper';
sliderSwiper.initSwipe(); // init function inside slider-swiper.js

import 'scss/common/nav.scss';
import 'scss/home.scss';
import 'scss/components/slider-swiper.scss';
import 'scss/common/footer.scss';

import fontawesome from '@fortawesome/fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook'

// Add the icon to the library so you can use it in your page
fontawesome.library.add(faUser);
fontawesome.library.add(faFacebook);

console.log($().jquery);
$("body").css("background-color","red");

//require("style-loader!css-loader!less-loader!./font-awesome-styles.loader.js!./font-awesome.config.js");
//require("font-awesome-sass-loader"); //all
//require("font-awesome-sass-loader!../../font-awesome-sass.config.js"); //OG
//require("font-awesome-webpack!../font-awesome.config.js"); //Updated