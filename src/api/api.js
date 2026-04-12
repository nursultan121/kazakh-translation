// ✅ Базовый URL: приоритет продакшена → локальной разработки
// ❗ НЕ добавляем /api сюда, потому что auth эндпоинты не имеют этого префикса
const BASE_URL = 
  import.meta.env.VITE_API_URL_BACKEND || 
  import.meta.env.VITE_API_URL || 
  'http://localhost:8000'

// ===== ПРОДУКТЫ (с /api/) =====
export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString()
  const url = `${BASE_URL}/api/products${query ? '?' + query : ''}`
  const res = await fetch(url)
  
  if (!res.ok) {
    throw new Error(`Ошибка загрузки товаров: ${res.status}`)
  }
  
  return res.json()
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`)
  
  if (!res.ok) {
    throw new Error(`Товар не найден: ${id}`)
  }
  
  return res.json()
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`)
  return res.json()
}

// ===== ЗАКАЗЫ И ЗАЯВКИ (с /api/) =====
export async function createOrder(data) {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function createApplication(data) {
  // 🔥 ЖЕСТКИЙ ХАРДКОД для отладки
  const res = await fetch('https://stem-backend-wte3.onrender.com/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!res.ok) {
    const error = await res.text()
    throw new Error(error)
  }
  
  return res.json()
}

// ===== АВТОРИЗАЦИЯ (БЕЗ /api/!) =====
export async function login(email, password) {
  const body = new URLSearchParams()
  body.append('username', email)
  body.append('password', password)
  body.append('grant_type', 'password')

  // ✅ Auth endpoints: /auth/login (без /api/)
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Login failed')
  }

  return res.json()
}

export async function register(email, password, name) {
  // ✅ Auth endpoints: /auth/register (без /api/)
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Registration failed')
  }

  return res.json()
}

export async function getCurrentUser(token) {
  // ✅ Auth endpoints: /auth/me (без /api/)
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }

  return res.json()
}

export function logout() {
  localStorage.removeItem('stem_access_token')
}