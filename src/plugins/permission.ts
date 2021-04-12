import router from '@/router'
// import store from '@/store'
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
