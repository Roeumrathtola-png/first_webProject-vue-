import { defineStore } from 'pinia'
import { login as loginRequest, setToken } from '@/services/api.js'
import { loadJSON, saveJSON } from '@/utils/storage.js'

const KEY = 'brutal-auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: '',
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token),
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    // Read a saved login (after a refresh) and give the token to the API file
    restore() {
      const saved = loadJSON(KEY, null)
      if (saved?.token) {
        this.user = saved.user
        this.token = saved.token
        setToken(saved.token)
      }
    },
    // Throws if the server says 401, so the page can show the message (Invalid email or password)
    async login(email, password) {
      const result = await loginRequest(email, password)
      this.user = result.user
      this.token = result.token
      setToken(result.token)
      saveJSON(KEY, result)
    },
    logout() {
      this.user = null
      this.token = ''
      setToken('')
      saveJSON(KEY, null)
    },
  },
})
