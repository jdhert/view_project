import { createWebHistory, createRouter } from 'vue-router';
import WelcomePage from '../components/HelloWorld.vue'
import LoginPage from '../components/LoginView.vue'
import MyPage from '../components/MyPage.vue'
import FreeBoard from '../components/FreeBoard.vue'
import SignUp from '../components/SignUp.vue'
import PetActivity from '../components/PetActivity.vue'

const routes = [
  {
    path: '/', component:WelcomePage
  },
  {
    path: '/login', component: LoginPage
  },
  {
    path: '/mypage', component: MyPage
  },
  {
    path: '/freeboard', component: FreeBoard
  },
  {
    path: '/signup', component: SignUp
  },
  {
    path : '/pet_act', component: PetActivity
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export { router };