import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function ProductDetail() {
  const { id } = useParams()
  const { t } = useLang()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Состояние для модалки заявки
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const url = `${API_BASE_URL}/products/${id}`
        const response = await fetch(url)
        
        if (!response.ok) {
          if (response.status === 404) throw new Error('Товар не найден')
          throw new Error(`Ошибка сервера: ${response.status}`)
        }
        
        const data = await response.json()
        setProduct(data)
        
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    if (id) loadProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) addToCart(product)
  }

  // Открытие модалки
  const handleOpenModal = () => {
    setShowModal(true)
    setSubmitSuccess(false)
    setFormData({ name: '', phone: '', comment: '' })
  }

  // Закрытие модалки
  const handleCloseModal = () => {
    setShowModal(false)
  }

  // Обработка ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Отправка заявки
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const applicationData = {
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment,
        product_name: product.title,
        article: product.article,
        product_url: `${window.location.href}`
      }

      const response = await fetch(`${API_BASE_URL}/applications/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData)
      })

      if (!response.ok) {
        throw new Error('Не удалось отправить заявку')
      }

      setSubmitSuccess(true)
      
      // Закрыть модалку через 2 секунды
      setTimeout(() => {
        setShowModal(false)
      }, 2000)
      
    } catch (err) {
      console.error('Ошибка отправки заявки:', err)
      alert('Произошла ошибка при отправке заявки. Попробуйте снова.')
    } finally {
      setSubmitting(false)
    }
  }

  // Вспомогательная функция для категории
  const getCategoryName = (cat) => {
    if (!cat) return null
    if (typeof cat === 'string') return cat
    if (typeof cat === 'object') {
      return cat.title_ru || cat.title_kz || cat.name || cat.title || 'Категория'
    }
    return String(cat)
  }

  const categoryName = getCategoryName(product?.category)

  // Загрузка
  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner">Загрузка товара...</div>
      </div>
    )
  }

  // Ошибка
  if (error) {
    return (
      <div className="product-error">
        <h2>⚠️ Не удалось загрузить товар</h2>
        <p className="error-message">{error}</p>
        <Link to="/search" className="btn-back">← К поиску</Link>
      </div>
    )
  }

  // Товар не найден
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>😔 Товар не найден</h2>
        <Link to="/search" className="btn-back">← Вернуться к поиску</Link>
      </div>
    )
  }

  return (
    <>
      <div className="product-detail-page">
        {/* Хлебные крошки */}
        <nav className="product-breadcrumb">
          <Link to="/" className="breadcrumb-link">{t.home}</Link>
          <span className="separator"> / </span>
          <Link to="/secondpage" className="breadcrumb-link">Мебель</Link>
          {categoryName && (
            <>
              <span className="separator"> / </span>
              <span className="current">{categoryName}</span>
            </>
          )}
        </nav>

        <div className="product-container">
          {/* Галерея */}
          <div className="product-gallery">
            <div className="product-main-image">
              <img 
                src={product.img} 
                alt={product.title}
                className="main-image"
                onError={(e) => { e.target.src = '/img/placeholder.png' }}
              />
            </div>
          </div>

          {/* Информация */}
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}

            {/* Артикул */}
            {product.article && (
              <div className="product-article">
                <span>Артикул:</span> <strong>{product.article}</strong>
              </div>
            )}

            {/* Цена */}
            {product.price && (
              <div className="product-price">
                <span className="price-current">{Number(product.price).toLocaleString('ru-KZ')} ₸</span>
                {product.old_price && (
                  <span className="price-old">{Number(product.old_price).toLocaleString('ru-KZ')} ₸</span>
                )}
              </div>
            )}

            {/* Доставка */}
            <div className="product-delivery">
              <div className="delivery-item">🚚 Доставка по Казахстану</div>
              <div className="delivery-item">📍 Самовывоз: Астана, Домалак-ана 26</div>
            </div>

            {/* Кнопки */}
            <div className="product-actions">
              <button 
                className="btn-add-to-cart" 
                onClick={handleAddToCart}
              >
                🛒 В корзину
              </button>
            </div>

            {/* ✅ Кнопка "Оставить заявку" — открывает модалку */}
            <button className="btn-application" onClick={handleOpenModal}>
              📝 Оставить заявку
            </button>
          </div>
        </div>
      </div>

      {/* 📋 МОДАЛКА ЗАЯВКИ */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            
            <h2 className="modal-title">📝 Оставить заявку</h2>
            <p className="modal-subtitle">
              Товар: <strong>{product.title}</strong><br/>
              Артикул: {product.article}
            </p>

            {submitSuccess ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Заявка отправлена!</h3>
                <p>Наш менеджер свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="application-form">
                <div className="form-group">
                  <label htmlFor="name">Ваше имя *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Иван Иванов"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="comment">Комментарий</label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder="Дополнительная информация (необязательно)"
                    rows="3"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Отправка...' : 'Отправить заявку'}
                </button>

                <p className="form-note">
                  🔒 Ваши данные защищены. Мы не передаём их третьим лицам.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}