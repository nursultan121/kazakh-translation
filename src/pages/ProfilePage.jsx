import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useLang } from '../i18n/LanguageContext.jsx'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, logout, setShowModal } = useAuth()
  const { cartItems, totalPrice } = useCart()
  const { favorites } = useFavorites()
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('info')

  if (!user) {
    return (
      <div className="profile-empty">
        <span>🔒</span>
        <h2>{t.profile_login_title}</h2>
        <p>{t.profile_login_desc}</p>
        <button onClick={() => setShowModal(true)} className="profile-login-btn">
          {t.profile_login_btn}
        </button>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="profile-page">

      {/* ШАПКА */}
      <div className="profile-header">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-header__info">
          <h1 className="profile-header__name">{user.name}</h1>
          <p className="profile-header__email">{user.email}</p>
        </div>
        <button className="profile-logout" onClick={handleLogout}>
          {t.profile_logout}
        </button>
      </div>

      {/* СТАТИСТИКА */}
      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat__num">{cartItems.length}</span>
          <span className="profile-stat__label">{t.cart}</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat__num">{favorites.length}</span>
          <span className="profile-stat__label">{t.favorite}</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat__num">{totalPrice > 0 ? totalPrice.toLocaleString() + ' ₸' : '0 ₸'}</span>
          <span className="profile-stat__label">{t.total_label}</span>
        </div>
      </div>

      {/* ТАБЫ */}
      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          {t.profile_tab_info}
        </button>
        <button
          className={`profile-tab ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          {t.profile_tab_cart} ({cartItems.length})
        </button>
        <button
          className={`profile-tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          {t.profile_tab_favorites} ({favorites.length})
        </button>
      </div>

      {/* КОНТЕНТ */}
      <div className="profile-content">

        {/* МОИ ДАННЫЕ */}
        {activeTab === 'info' && (
          <div className="profile-info">
            <div className="profile-info__row">
              <span className="profile-info__label">{t.profile_info_name}</span>
              <span className="profile-info__value">{user.name}</span>
            </div>
            <div className="profile-info__row">
              <span className="profile-info__label">{t.profile_info_email}</span>
              <span className="profile-info__value">{user.email}</span>
            </div>
            <div className="profile-info__row">
              <span className="profile-info__label">{t.profile_info_city}</span>
              <span className="profile-info__value">{lang === 'kz' ? 'Астана' : 'Астана'}</span>
            </div>
          </div>
        )}

        {/* КОРЗИНА */}
        {activeTab === 'cart' && (
          <div className="profile-list">
            {cartItems.length === 0 ? (
              <div className="profile-empty-tab">
                <p>{t.profile_cart_empty}</p>
                <Link to="/secondpage" className="profile-link-btn">{t.profile_cart_goto_catalog}</Link>
              </div>
            ) : (
              <>
                {cartItems.map(item => (
                  <div key={item.id} className="profile-item">
                    <img src={item.image} alt={item.name} className="profile-item__img" />
                    <div className="profile-item__info">
                      <p className="profile-item__name">{item.name}</p>
                      {item.color && <p className="profile-item__color">{t.profile_cart_color} {item.color}</p>}
                      <p className="profile-item__qty">{t.profile_cart_quantity} {item.quantity}</p>
                    </div>
                    <p className="profile-item__price">
                      {(item.price * item.quantity).toLocaleString()} ₸
                    </p>
                  </div>
                ))}
                <div className="profile-total">
                  <span>{t.profile_cart_total}</span>
                  <strong>{totalPrice.toLocaleString()} ₸</strong>
                </div>
              </>
            )}
          </div>
        )}

        {/* ИЗБРАННОЕ */}
        {activeTab === 'favorites' && (
          <div className="profile-list">
            {favorites.length === 0 ? (
              <div className="profile-empty-tab">
                <p>{t.profile_favorites_empty}</p>
                <Link to="/secondpage" className="profile-link-btn">{t.favorites_catalog_link}</Link>
              </div>
            ) : (
              favorites.map(item => (
                <div key={item.id} className="profile-item">
                  <img src={item.image} alt={item.name} className="profile-item__img" />
                  <div className="profile-item__info">
                    <p className="profile-item__name">{item.name}</p>
                  </div>
                  {item.price > 0 && (
                    <p className="profile-item__price">{item.price.toLocaleString()} ₸</p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}