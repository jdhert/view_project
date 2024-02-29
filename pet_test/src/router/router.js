import { createWebHistory, createRouter } from 'vue-router';
import WelcomePage from '../components/HelloWorld.vue'
import LoginPage from '../components/LoginView.vue'
import MyPage from '../components/MyPage.vue'
import FreeBoard from '../components/FreeBoard.vue'
import Asd from '../components/Asd.vue'
import SignUp from '../components/SignUp.vue'
import Gallery from '../components/PetDiary_Gallery.vue'
import Diary from '../components/PetDiary.vue'
import CreateDiary from '../components/CreateDiary.vue'
import PetCalendar from '../components/PetCalendar.vue'
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
    path: '/asd', component: Asd
  },
  {
    path: '/signup', component: SignUp
  },
  {
    path: '/gallery', component: Gallery
  },
  {
    path: '/diary', component: Diary
  },
  {
    path: '/create', component: CreateDiary
  },
  {
    path: '/calendar', component: PetCalendar
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