import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth.js'
import { onUnauthorized } from './services/api.js'

const pinia = createPinia()
const app = createApp(App).use(pinia)

// Bring back a saved login BEFORE the router starts, so the route guard knows who you are
const auth = useAuthStore(pinia)
auth.restore()

// The server said 401 (expired or wrong token): log out and go to the login page
onUnauthorized(() => {
  auth.logout()
  router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
})

app.use(router).mount('#app')
