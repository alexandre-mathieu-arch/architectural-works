import { ref, computed } from 'vue'

export const useAuth = () => {
  const isAuthenticated = useState<boolean>('auth-state', () => {
    if (import.meta.client) {
      return localStorage.getItem('site-auth') === 'true'
    }
    return false
  })

  const login = (password: string) => {
    // Note: This is a simple client-side check. 
    // For a static site, this is the standard way to provide basic protection.
    if (password === 'matal2026') {
      isAuthenticated.value = true
      if (import.meta.client) {
        localStorage.setItem('site-auth', 'true')
      }
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    if (import.meta.client) {
      localStorage.removeItem('site-auth')
    }
  }

  return {
    isAuthenticated,
    login,
    logout
  }
}
