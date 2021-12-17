import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import OntoInspecter from '../components/OntoInspecter.vue'
import ClassesInspector from '../views/ClassesInspector.vue'
import RuleViewer from '../views/RuleViewer.vue'
import QueryViewer from '../views/QueryViewer.vue'
import ExploreQuery from '../components/ExploreQuery.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/rules',
    name: 'Rule',
    component: RuleViewer
  },
  {
    path: '/queryView',
    name: 'QueryView',
    component: ExploreQuery
  },

  {
    path: '/query',
    name: 'Query',
    component: QueryViewer
  },

  {
    path:'/class',
    name:'Class',
    component:ClassesInspector
  }
  ,{
  path:'/inspect',
  name:'Inspect',
  component:OntoInspecter
}
  ,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
