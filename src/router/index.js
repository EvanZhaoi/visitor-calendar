import { createRouter, createWebHashHistory } from 'vue-router'
import CalendarView from '../CalendarView.vue'
import GanttView from '../GanttView.vue'

const routes = [
  { path: '/', component: CalendarView },
  { path: '/gantt', component: GanttView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router