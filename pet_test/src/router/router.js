import { createWebHistory, createRouter } from 'vue-router';
import WelcomePage from '../components/HelloWorld.vue'
import LoginPage from '../components/LoginView.vue'
import MyPage from '../components/MyPage.vue'
import FreeBoard from '../components/FreeBoard.vue'
import SignUp from '../components/SignUp.vue'
import Gallery from '../components/PetDiary_Gallery.vue'
import Diary from '../components/PetDiary.vue'
import CreateDiary from '../components/CreateDiary.vue'
import PetCalendar from '../components/PetCalendar.vue'

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
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export { router };