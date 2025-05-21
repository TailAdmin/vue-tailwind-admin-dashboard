import { createRouter, createWebHistory } from 'vue-router'
import NewCase from '../views/NewCase.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import Cases from '../views/Cases.vue'
import Reports from '../views/Reports.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'AdminLayout',
      component: AdminLayout,
      children: [{
          path: '/',
          component: Dashboard,
          meta: {
            title: 'Dashboard',
          },
        },
        {
          path: '/new-case',
          name: 'New Case',
          component: NewCase,
          meta: {
            title: 'New Case',
          },
        },
        {
          path: '/cases',
          name: 'Cases',
          component: Cases,
          meta: {
            title: 'Cases',
          },
        },
        {

          path: '/line-chart',
          name: 'Line Chart',
          component: () => import('../views/Chart/LineChart/LineChart.vue'),
        },
        {
          path: '/bar-chart',
          name: 'Bar Chart',
          component: () => import('../views/Chart/BarChart/BarChart.vue'),
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
          path: '/reports',
          name: 'Reports',
          component: Reports,
          meta: {
            title: 'Reports',
          },
        },
        {
          path: '/admin',
          name: 'Admin',
          component: Admin,
          meta: {
            title: 'Admin',
          },
        },
      ],
    }, {
        path: '/error-404',
        component: () => import('../views/Errors/FourZeroFour.vue'),
        meta: {
          title: '404 Error',
        },
      }, {
        path: '/signin',
        name: 'Signin',
        component: () => import('../views/Auth/Signin.vue'),
        meta: {
          title: 'Signin',
        },
      }, {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/Auth/Signup.vue'),
        meta: {
          title: 'Signup',
        },
      },
    ],
});

export default router;

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`;
  next();
});

