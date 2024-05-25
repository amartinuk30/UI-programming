import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/components/HomePage';
import ProfilePage from '@/components/ProfilePage';
import RegisterPage from '@/components/RegisterPage';
import LoginPage from '@/components/LoginPage';
import NewsDetailPage from '@/components/NewsDetailPage';
import AboutPage from '@/components/AboutPage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetailPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
