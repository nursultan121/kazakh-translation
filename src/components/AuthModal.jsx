import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { login as apiLogin, register as apiRegister } from '../api/api'
import './AuthModal.css'

export default function AuthModal() {
  const { showModal, closeModal, setUser, setUserEmail } = useAuth()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Закрытие по Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && showModal) closeModal()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [showModal, closeModal])

  // Блокировка скролла при открытой модалке
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  // ✅ Если модалка не должна показываться — не рендерим ничего
  if (!showModal) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      if (mode === 'register') {
        const data = await apiRegister(email, password, name)
        localStorage.setItem('stem_access_token', data.access_token)
        
        // Загружаем данные пользователя
        const API_BASE = import.meta.env.VITE_API_URL_BACKEND || import.meta.env.VITE_API_URL || 'http://localhost:8000'
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${data.access_token}` }
        })
        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
          setUserEmail(userData.email)
        }
      } else {
        const data = await apiLogin(email, password)
        localStorage.setItem('stem_access_token', data.access_token)
        
        // Загружаем данные пользователя
        const API_BASE = import.meta.env.VITE_API_URL_BACKEND || import.meta.env.VITE_API_URL || 'http://localhost:8000'
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${data.access_token}` }
        })
        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
          setUserEmail(userData.email)
        }
      }
      closeModal()
    } catch (err) {
      setError(err.message || 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-backdrop" onClick={closeModal}>
      <div className="auth-box" onClick={e => e.stopPropagation()}>

        <div className="auth-box__logo">
          <span className="auth-logo-stem">STEM</span>
          <span className="auth-logo-academia">Academia</span>
        </div>

        <div className="auth-box__tabs">
          <button
            className={`auth-box__tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError('') }}
            type="button"
          >Войти</button>
          <button
            className={`auth-box__tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError('') }}
            type="button"
          >Регистрация</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-box__form">
          {mode === 'register' && (
            <div className="auth-box__field">
              <label>Имя</label>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}
          <div className="auth-box__field">
            <label>Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="auth-box__field">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          {error && <div className="auth-box__error">⚠️ {error}</div>}

          <button type="submit" className="auth-box__submit" disabled={loading}>
            {loading ? 'Загрузка...' : mode === 'login' ? 'Войти в аккаунт' : 'Создать аккаунт'}
          </button>
        </form>

        <p className="auth-box__switch">
          {mode === 'login' ? (
            <>Нет аккаунта? <button type="button" onClick={() => { setMode('register'); setError('') }} className="link-btn">Зарегистрироваться</button></>
          ) : (
            <>Уже есть аккаунт? <button type="button" onClick={() => { setMode('login'); setError('') }} className="link-btn">Войти</button></>
          )}
        </p>

        <button className="auth-box__close" onClick={closeModal} type="button" aria-label="Закрыть">✕</button>
      </div>
    </div>
  )
}