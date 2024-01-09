import "../css/simple-datatables.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../css/style.css";

import Alpine from "alpinejs";
import persist from '@alpinejs/persist'
import flatpickr from "flatpickr";
import chart01 from "./components/chart-01";
import chart02 from "./components/chart-02";
import chart03 from "./components/chart-03";
import chart04 from "./components/chart-04";
import chart05 from "./components/chart-05";
import chart06 from "./components/chart-06";
import chart07 from "./components/chart-07";
import chart08 from "./components/chart-08";
import chart09 from "./components/chart-09";
import chart10 from "./components/chart-10";
import map01 from "./components/map-01";
import map02 from "./components/map-02";
import "./components/drag.js";
import "./components/image-resize";
import "./components/carousel-01";
import "./components/carousel-02";
import "./components/carousel-03";
import "./components/data-table-01.js";
import "./components/data-table-02.js";

Alpine.plugin(persist)
window.Alpine = Alpine;
Alpine.start();

// Init flatpickr
flatpickr(".datepicker", {
  mode: "range",
  static: true,
  monthSelectorType: "static",
  dateFormat: "M j, Y",
  defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
  prevArrow:
    '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
  nextArrow:
    '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
  onReady: (selectedDates, dateStr, instance) => {
    // eslint-disable-next-line no-param-reassign
    instance.element.value = dateStr.replace("to", "-");
    const customClass = instance.element.getAttribute("data-class");
    instance.calendarContainer.classList.add(customClass);
  },
  onChange: (selectedDates, dateStr, instance) => {
    // eslint-disable-next-line no-param-reassign
    instance.element.value = dateStr.replace("to", "-");
  },
});

// Document Loaded
document.addEventListener("DOMContentLoaded", () => {
  chart01();
  chart02();
  chart03();
  chart04();
  chart05();
  chart06();
  chart07();
  chart08();
  chart09();
  chart10();
  map01();
  map02();
});
