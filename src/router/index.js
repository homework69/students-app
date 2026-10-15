import { createRouter, createWebHistory } from 'vue-router'
import AllStudentsView from '../views/AllStudentsView.vue'
import StudentsTimeView from '../views/StudentsTimeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'all-students', component: AllStudentsView },
    { path: '/time/17-00', name: 'time-1700', component: StudentsTimeView, props: { time: '17:00' } },
    { path: '/time/18-00', name: 'time-1800', component: StudentsTimeView, props: { time: '18:00' } },
    { path: '/time/20-00', name: 'time-2000', component: StudentsTimeView, props: { time: '20:00' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
