import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { createApplication } from '../api/api'
import './ProductDetail.css'

const API_BASE_URL = 
  import.meta.env.VITE_API_URL_BACKEND || 
  import.meta.env.VITE_API_URL || 
  'http://localhost:8000'

export default function ProductDetail() {
  const { id } = useParams()
  const { t } = useLang()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const url = `${API_BASE_URL}/api/products/${id}`
        const response = await fetch(url)
        if (!response.ok) {
          if (response.status === 404) throw new Error(t.product_not_found_title)
          throw new Error(`${t.error_occurred}: ${response.status}`)
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
  }, [id, t.error_occurred, t.product_not_found_title])

  // ✅ Нормализуем объект — добавляем name = title для корзины
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        name: product.title,
      })
    }
  }

  const handleOpenModal = () => {
    setShowModal(true)
    setSubmitSuccess(false)
    setSubmitError(null)
    setFormData({ name: '', phone: '', comment: '' })
  }

  const handleCloseModal = () => setShowModal(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      const applicationData = {
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment,
        product_name: product.title,
        article: product.article,
        product_url: window.location.href
      }
      await createApplication(applicationData)
      setSubmitSuccess(true)
      setTimeout(() => setShowModal(false), 2000)
    } catch (err) {
      console.error('Ошибка отправки заявки:', err)
      setSubmitError(t.product_request_error)
    } finally {
      setSubmitting(false)
    }
  }

  const getCategoryName = (cat) => {
    if (!cat) return null
    if (typeof cat === 'string') return cat
    if (typeof cat === 'object') {
      return cat.title_ru || cat.title_kz || cat.name || cat.title || t.product_category_default
    }
    return String(cat)
  }

  const categoryName = getCategoryName(product?.category)

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner">{t.product_loading}</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-error">
        <h2>{t.product_error_title}</h2>
        <p className="error-message">{error}</p>
        <Link to="/search" className="btn-back">{t.product_error_back}</Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>{t.product_not_found_title}</h2>
        <Link to="/search" className="btn-back">{t.product_not_found_back}</Link>
      </div>
    )
  }

  return (
    <>
      <div className="product-detail-page">
        <nav className="product-breadcrumb">
          <Link to="/" className="breadcrumb-link">{t.home}</Link>
          <span className="separator"> / </span>
          <Link to="/secondpage" className="breadcrumb-link">{t.product_breadcrumb_furniture}</Link>
          {categoryName && (
            <>
              <span className="separator"> / </span>
              <span className="current">{categoryName}</span>
            </>
          )}
        </nav>

        <div className="product-container">
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

          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>

            {product.description && (
              <p className="product-description">{product.description}</p>
            )}

            {product.article && (
              <div className="product-article">
                <span>{t.article_label}:</span> <strong>{product.article}</strong>
              </div>
            )}

            {product.price && (
              <div className="product-price">
                <span className="price-current">
                  {Number(product.price).toLocaleString('ru-KZ')} ₸
                </span>
                {product.old_price && (
                  <span className="price-old">
                    {Number(product.old_price).toLocaleString('ru-KZ')} ₸
                  </span>
                )}
              </div>
            )}

            <div className="product-delivery">
              <div className="delivery-item">🚚 {t.delivery}</div>
              <div className="delivery-item">📍 {t.pickup}</div>
            </div>

            <div className="product-actions">
              <button className="btn-add-to-cart" onClick={handleAddToCart}>
                {t.product_add_to_cart}
              </button>
            </div>

            <button className="btn-application" onClick={handleOpenModal}>
              {t.product_request}
            </button>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tabs-header">
            <button 
              className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              {t.product_description}
            </button>
            <button 
              className={`tab-button ${activeTab === 'characteristics' ? 'active' : ''}`}
              onClick={() => setActiveTab('characteristics')}
            >
              {t.product_characteristics}
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                {product.description ? (
                  <p>{product.description}</p>
                ) : (
                  <p className="no-content">{t.product_no_description}</p>
                )}
              </div>
            )}

            {activeTab === 'characteristics' && (
              <div className="tab-panel">
                {product.characteristics ? (
                  <div dangerouslySetInnerHTML={{ __html: product.characteristics }} />
                ) : (
                  <p className="no-content">{t.product_no_characteristics}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>

            <h2 className="modal-title">{t.product_request_title}</h2>
            <p className="modal-subtitle">
              {t.product_label} <strong>{product.title}</strong><br />
              {t.article_label}: {product.article}
            </p>

            {submitSuccess ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>{t.product_request_success}</h3>
                <p>{t.product_request_success_desc}</p>
              </div>
            ) : submitError ? (
              <div className="error-message">
                <div className="error-icon">⚠️</div>
                <p>{submitError}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="application-form">
                <div className="form-group">
                  <label htmlFor="name">{t.cart_name_label}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={t.cart_placeholder_name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t.cart_phone_label}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder={t.cart_placeholder_phone}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="comment">{t.cart_comment_label}</label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder={t.cart_placeholder_comment}
                    rows="3"
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? t.sending : t.send_request}
                </button>

                <p className="form-note">
                  {t.data_protected}
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}