import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import NProgress from 'nprogress'
import pages from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(pages),
})
router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
