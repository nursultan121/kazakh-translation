import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { login as apiLogin, register as apiRegister } from '../api/api'
import './AuthModal.css'

export default function AuthModal() {
  // ✅ Получаем showModal и closeModal из контекста
  const { showModal, login, register, closeModal } = useAuth()
  
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ✅ Закрытие по Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeModal()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeModal, showModal])

  // ✅ Блокировка скролла ТОЛЬКО когда модалка открыта
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  // ✅ Если модалка не должна показываться — не рендерим ВООБЩЕ
  if (!showModal) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      if (mode === 'register') {
        await register(name, email, password)
      } else {
        await login(email, password)
      }
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

        {/* ✅ КНОПКА ЗАКРЫТИЯ (X) — ИСПРАВЛЕНА */}
        <button 
          className="auth-box__close" 
          onClick={(e) => { 
            e.stopPropagation()  // ✅ Останавливаем всплытие (чтобы не закрылось по клику на backdrop)
            closeModal()          // ✅ Закрываем модалку
          }} 
          type="button" 
          aria-label="Закрыть"
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            zIndex: 100,
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            color: '#666',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#000'}
          onMouseOut={(e) => e.currentTarget.style.color = '#666'}
        >
          ✕
        </button>
      </div>
    </div>
  )
}