import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Ecommerce',
      component: () => import('../views/Ecommerce.vue'),
      meta: {
        title: 'eCommerce Dashboard',
      },
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: () => import('../views/Analytics.vue'),
      meta: {
        title: 'Analytics Dashboard',
      },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: {
        title: 'Calendar',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
      },
    },
    {
      path: '/form-layout',
      name: 'Form Layout',
      component: () => import('../views/Forms/FormLayout.vue'),
      meta: {
        title: 'Form Layout',
      },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: {
        title: 'Basic Tables',
      },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
      meta: {
        title: 'Line Chart',
      },
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
      meta: {
        title: 'Bar Chart',
      },
    },
    {
      path: '/area-chart',
      name: 'Area Chart',
      component: () => import('../views/Chart/AreaChart/AreaChart.vue'),
      meta: {
        title: 'Area Chart',
      },
    },
    {
      path: '/pie-chart',
      name: 'Pie Chart',
      component: () => import('../views/Chart/PieChart/PieChart.vue'),
      meta: {
        title: 'Pie Chart',
      },
    },
    {
      path: '/donut-chart',
      name: 'Donut Chart',
      component: () => import('../views/Chart/DonutChart/DonutChart.vue'),
      meta: {
        title: 'Donut Chart',
      },
    },
    {
      path: '/radar-chart',
      name: 'Radar Chart',
      component: () => import('../views/Chart/RadarChart/RadarChart.vue'),
      meta: {
        title: 'Radar Chart',
      },
    },
    {
      path: '/column-chart',
      name: 'Column Chart',
      component: () => import('../views/Chart/ColumnChart/ColumnChart.vue'),
      meta: {
        title: 'Column Chart',
      },
    },
    {
      path: '/candlestick-chart',
      name: 'Candlestick Chart',
      component: () => import('../views/Chart/CandlestickChart/CandlestickChart.vue'),
      meta: {
        title: 'Candlestick Chart',
      },
    },
    {
      path: '/mixed-chart',
      name: 'Mixed Chart',
      component: () => import('../views/Chart/MixedChart/MixedChart.vue'),
      meta: {
        title: 'Mixed Chart',
      },
    },
    {
      path: '/radialbar-chart',
      name: 'Radial Bar Chart',
      component: () => import('../views/Chart/RadialBarChart/RadialBarChart.vue'),
      meta: {
        title: 'Radial Bar Chart',
      },
    },
    {
      path: '/heatmap-chart',
      name: 'Heatmap Chart',
      component: () => import('../views/Chart/HeatmapChart/HeatmapChart.vue'),
      meta: {
        title: 'Heatmap Chart',
      },
    },
    {
      path: '/scatter-chart',
      name: 'Scatter Chart',
      component: () => import('../views/Chart/ScatterChart/ScatterChart.vue'),
      meta: {
        title: 'Scatter Chart',
      },
    },
    {
      path: '/bubble-chart',
      name: 'Bubble Chart',
      component: () => import('../views/Chart/BubbleChart/BubbleChart.vue'),
      meta: {
        title: 'Bubble Chart',
      },
    },
    {
      path: '/polar-area-chart',
      name: 'Polar Area Chart',
      component: () => import('../views/Chart/PolarAreaChart/PolarAreaChart.vue'),
      meta: {
        title: 'Polar Area Chart',
      },
    },
    {
      path: '/treemap-chart',
      name: 'Treemap Chart',
      component: () => import('../views/Chart/TreemapChart/TreemapChart.vue'),
      meta: {
        title: 'Treemap Chart',
      },
    },
    {
      path: '/funnel-chart',
      name: 'Funnel Chart',
      component: () => import('../views/Chart/FunnelChart/FunnelChart.vue'),
      meta: {
        title: 'Funnel Chart',
      },
    },
    {
      path: '/boxplot-chart',
      name: 'BoxPlot Chart',
      component: () => import('../views/Chart/BoxPlotChart/BoxPlotChart.vue'),
      meta: {
        title: 'BoxPlot Chart',
      },
    },
    {
      path: '/range-area-chart',
      name: 'Range Area Chart',
      component: () => import('../views/Chart/RangeAreaChart/RangeAreaChart.vue'),
      meta: {
        title: 'Range Area Chart',
      },
    },
    {
      path: '/timeline-chart',
      name: 'Timeline Chart',
      component: () => import('../views/Chart/TimelineChart/TimelineChart.vue'),
      meta: {
        title: 'Timeline Chart',
      },
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
      },
    },

    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
      },
    },

    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: {
        title: 'Images',
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
      },
    },
    {
      path: '/icons',
      name: 'Icons',
      component: () => import('../views/UiElements/IconsPage.vue'),
      meta: {
        title: 'Icons',
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
      },
    },

    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },

    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
    {
      path: '/reset-password',
      name: 'Reset Password',
      component: () => import('../views/Auth/ResetPassword.vue'),
      meta: {
        title: 'Reset Password',
      },
    },
    {
      path: '/two-step-verification',
      name: 'Two-Step Verification',
      component: () => import('../views/Auth/TwoStepVerification.vue'),
      meta: {
        title: 'Two-Step Verification',
      },
    },
  ],
})

export default router

router.beforeEach((to, _from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})
