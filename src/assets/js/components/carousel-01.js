// import Swiper JS
import Swiper, { Navigation } from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const swiper = new Swiper(".carouselOne", {
  modules: [Navigation],
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
