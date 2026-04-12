import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import './Navbar.css'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const { lang, setLang, t } = useLang()
  const navigate = useNavigate()

  // ✅ Получаем функции из контекстов
  // isOpen: состояние (открыта ли корзина)
  // setIsOpen: функция для изменения состояния
  const { isOpen, setIsOpen, totalCount } = useCart()

  // ✅ Используем openModal вместо setShowModal
  const { user, logout, openModal } = useAuth()
  const { favorites } = useFavorites()

  const categories = [
    { label: t.nav_design,    path: '/' },
    { label: t.nav_furniture, path: '/secondpage' },
    { label: t.nav_electro,   path: '/electro' },
    { label: t.nav_decor,     path: '/decor' },
    { label: t.nav_equipment, path: '/equipment' },
    { label: t.nav_digital,   path: '/digital' },
    { label: t.nav_contacts,  path: '/contacts' },
  ]

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <header className="navbar-wrapper">

      {/* TOP BAR */}
      <div className="navbar-topbar">
        <span className="topbar-city">📍 {t.city}</span>
        <div className="topbar-right">
          <span className="topbar-phone">📞 {t.phone}</span>
          <span
            className={`topbar-lang ${lang === 'ru' ? 'active' : ''}`}
            onClick={() => setLang('ru')}
            style={{ cursor: 'pointer' }}
          >
            Рус
          </span>
          <span
            className={`topbar-lang ${lang === 'kz' ? 'active' : ''}`}
            onClick={() => setLang('kz')}
            style={{ cursor: 'pointer' }}
          >
            Қаз
          </span>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="navbar-main">
        <Link to="/" className="navbar-logo">
          <span className="logo-stem">STEM</span>
          <span className="logo-academia">Academia</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        <div className="navbar-icons">

          {/* ИЗБРАННОЕ */}
          <Link to="/favorites" className="nav-icon-btn" title={t.favorite}>
            <div className="cart-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {favorites.length > 0 && (
                <span className="cart-badge">{favorites.length}</span>
              )}
            </div>
            <span>{t.favorite}</span>
          </Link>

          {/* КОРЗИНА */}
          {/* ✅ ИСПРАВЛЕНО: setIsOpen(!isOpen) позволяет и открывать, и закрывать */}
          <button
            className="nav-icon-btn nav-cart"
            title="Корзина"
            onClick={() => setIsOpen(!isOpen)} 
            type="button"
          >
            <div className="cart-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalCount > 0 && (
                <span className="cart-badge">{totalCount}</span>
              )}
            </div>
            <span>Корзина</span>
          </button>

          {/* ВХОД / ЛИЧНЫЙ КАБИНЕТ */}
          {user ? (
            <div className="nav-user">
              <Link to="/profile" className="nav-icon-btn nav-account">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>{user.name || user.email}</span>
              </Link>
              <button 
                className="nav-logout" 
                onClick={(e) => { e.preventDefault(); logout() }} 
                title="Выйти"
                type="button"
              >✕</button>
            </div>
          ) : (
            <button
              className="nav-icon-btn nav-account"
              title="Войти"
              onClick={openModal}
              type="button"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Войти</span>
            </button>
          )}

        </div>
      </div>

      {/* CATEGORY BAR */}
      <nav className="navbar-categories">
        {categories.map((cat) => (
          <Link key={cat.path} to={cat.path} className="cat-link">
            {cat.label}
          </Link>
        ))}
      </nav>

    </header>
  )
}