// src/services/api.js
const BASE = import.meta.env.VITE_API_URL

let token = ''
let unauthorizedHandler = null

// The auth store tells this file which token to send
export function setToken(value) {
  token = value
}

// Called when the server says 401 while we have a token (it expired or is wrong)
export function onUnauthorized(handler) {
  unauthorizedHandler = handler
}

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(BASE + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })
  } catch {
    // the browser could not reach the server at all
    throw new Error('Cannot reach the server. Is it running?')
  }

  // 204 means "done, nothing to send back" (for example after a delete)
  const data = response.status === 204 ? null : await response.json().catch(() => null)

  // A 401 while logged in means the token expired or is wrong.
  // A wrong password at login also gives 401, but then we have no token, so we do not log out.
  if (response.status === 401 && token && unauthorizedHandler) {
    unauthorizedHandler()
  }

  if (!response.ok) {
    throw new Error(data?.error ?? `Request failed (${response.status})`)
  }
  return data
}
export const getProducts = () => request('/products')
export const getProduct = (id) => request(`/products/${id}`)
export const createOrder = (items) => request('/orders', { method: 'POST', body: { items } })
export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: { email, password } })
export const getMyOrders = () => request('/orders')
export const createProduct = (product) => request('/products', { method: 'POST', body: product })
export const updateProduct = (id, product) =>
  request(`/products/${id}`, { method: 'PUT', body: product })
export const deleteProduct = (id) => request(`/products/${id}`, { method: 'DELETE' })
