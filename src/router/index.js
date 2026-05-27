import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'
import GanttView from '../GanttView.vue'

const routes = [
  { path: '/', component: App },
  { path: '/gantt', component: GanttView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router