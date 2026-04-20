import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useLang } from '../i18n/LanguageContext.jsx'
import './FavoritesPage.css'

// ─── Карточка товара ────────────────────────────────────────
const FavCard = memo(function FavCard({ item }) {
  const { toggleFavorite } = useFavorites()
  const { addToCart } = useCart()
  const { t } = useLang()
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const id = item.id || item.article || item.sku || Math.random()
  const name = item.name || item.title || item.product_name || t.no_name
  const price = item.price ?? item.cost ?? null
  const article = item.article || item.sku || ''
  
  const imageSrc = imgError 
    ? '/placeholder-product.svg' 
    : (item.imgs?.[0] || item.image || item.img || '/placeholder-product.svg')

  const telegramMsg = `${t.inquiry_message_prefix} ${name}`
  const telegramLink = `https://t.me/stem_academia_bot?text=${encodeURIComponent(telegramMsg)}`

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      image: imageSrc,
      price: price || 0,
      article,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // ✅ ИСПРАВЛЕНО - передаем весь объект item
  const handleRemove = () => {
    toggleFavorite(item)
  }

  return (
    <article className="fav-card">
      <button
        className="fav-card__remove"
        onClick={handleRemove}
        title={t.favorites_remove_title}
        aria-label={`${t.favorites_remove_title} ${name}`}
        type="button"
      >
        ×
      </button>

      <div className="fav-card__image-wrapper">
        <img 
          src={imageSrc} 
          alt={name} 
          className="fav-card__img" 
          loading="lazy"
          onError={() => setImgError(true)}
        />
        {imgError && (
          <div style={{color:'#999', textAlign:'center', position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <span style={{fontSize:'40px'}}>📦</span>
            <p>{t.favorites_no_photo}</p>
          </div>
        )}
      </div>

      <div className="fav-card__info">
        <h3 className="fav-card__name">{name}</h3>
        {article && <p className="fav-card__article">{t.favorites_article} {article}</p>}
        
        {price ? (
          <p className="fav-card__price">
            {Number(price).toLocaleString('ru-RU')} ₸
          </p>
        ) : (
          <p className="fav-card__price fav-card__price--ask">
            {t.favorites_price_ask}
          </p>
        )}

        <div className="fav-card__actions">
          <button
            className={`fav-btn-cart ${added ? 'fav-btn-cart--added' : ''}`}
            onClick={handleAddToCart}
            disabled={added}
            type="button"
          >
            {added ? t.favorites_added : t.favorites_add_to_cart}
          </button>

          <a
            href={telegramLink}
            target="_blank"
            rel="noreferrer noopener"
            className="fav-btn-order"
          >
            {t.favorites_order}
          </a>
        </div>
      </div>
    </article>
  )
})

export default function FavoritesPage() {
  const { favorites, isLoading } = useFavorites()
  const { user, setShowModal } = useAuth()
  const { t } = useLang()

  if (isLoading) {
    return <div className="fav-page"><p style={{textAlign:'center', paddingTop:'100px'}}>{t.favorites_loading}</p></div>
  }

  if (!user) {
    return (
      <div className="fav-empty">
        <span style={{fontSize: '50px', display:'block', marginBottom:'10px'}}>🔒</span>
        <h2>{t.favorites_login_title}</h2>
        <p>{t.favorites_login_desc}</p>
        <button onClick={() => setShowModal(true)} className="fav-login-btn">
          {t.favorites_login_btn}
        </button>
      </div>
    )
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="fav-empty">
        <span style={{fontSize: '50px', display:'block', marginBottom:'10px'}}>♡</span>
        <h2>{t.favorites_empty_title}</h2>
        <p>{t.favorites_empty_desc}</p>
        <Link to="/catalog" className="fav-login-btn">{t.favorites_catalog_link}</Link>
      </div>
    )
  }

  return (
    <main className="fav-page">
      <div className="fav-breadcrumb">
        <Link to="/">{t.home}</Link> / <span>{t.favorite}</span>
      </div>

      <h1 className="fav-title">
        {t.favorites_title} <span>{favorites.length} {t.favorites_items}</span>
      </h1>

      <div className="fav-grid">
        {favorites.map((item, index) => (
          <FavCard 
            key={item.id || item.article || `fav-${index}`} 
            item={item} 
          />
        ))}
      </div>
    </main>
  )
}