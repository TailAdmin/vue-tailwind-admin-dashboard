// import Swiper JS
import Swiper, { Pagination, Autoplay } from 'swiper'
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const swiper = new Swiper('.carouselTwo', {
  modules: [Pagination, Autoplay],
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})
