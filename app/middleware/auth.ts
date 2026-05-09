export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  
  // Don't redirect if already on login page or if authenticated
  if (to.path === '/login') {
    return
  }

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
