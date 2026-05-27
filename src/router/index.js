import { createRouter, createWebHashHistory } from 'vue-router'
import CalendarPage from '../CalendarPage.vue'
import GanttView from '../GanttView.vue'

const routes = [
  { path: '/', component: CalendarPage },
  { path: '/gantt', component: GanttView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router