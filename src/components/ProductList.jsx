import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import './ProductList.css'

// ─── Модалка заявки ───────────────────────────────────────────
function ApplicationModal({ product, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    username: '',
    comment: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [nameError, setNameError] = useState('')

  // Закрытие по Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const validateName = (name) => {
    const cleaned = name.trim()
    return /^[A-Za-zА-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІіЁё\s-]{2,50}$/.test(cleaned)
  }

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '')
    return digits.length >= 10 && digits.length <= 15
  }

  const handlePhoneChange = (e) => {
    const filtered = e.target.value.replace(/[^\d+()\-\s]/g, '')
    setForm((prev) => ({ ...prev, phone: filtered }))
    setPhoneError('')
  }

  const handleNameChange = (e) => {
    setForm((prev) => ({ ...prev, name: e.target.value }))
    setNameError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateName(form.name)) {
      setNameError('Введите корректное имя')
      return
    }
    if (!validatePhone(form.phone)) {
      setPhoneError('Введите корректный номер телефона')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/applications/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          username: form.username,
          comment: form.comment,
          product_name: product.title,
          article: product.article,
          product_url: window.location.href,
        }),
      })

      if (!response.ok) throw new Error('Ошибка отправки')

      setSent(true)
    } catch {
      alert('Не удалось отправить заявку. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} type="button">
          ×
        </button>

        <h3 className="modal-title">Оставить заявку</h3>
        <p className="modal-product-name">{product.title}</p>
        {product.article && (
          <p className="modal-article">Артикул: {product.article}</p>
        )}

        {sent ? (
          <div className="modal-success">
            <strong>Заявка отправлена!</strong>
            <br />
            Менеджер свяжется с вами в ближайшее время.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <input
              className="modal-input"
              type="text"
              placeholder="Ваше имя"
              value={form.name}
              onChange={handleNameChange}
              required
            />
            {nameError && <p className="modal-error">{nameError}</p>}

            <input
              className="modal-input"
              type="tel"
              placeholder="+7 (777) 123-45-67"
              value={form.phone}
              onChange={handlePhoneChange}
              required
            />
            {phoneError && <p className="modal-error">{phoneError}</p>}

            <input
              className="modal-input"
              type="text"
              placeholder="Telegram username (необязательно)"
              value={form.username}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, username: e.target.value }))
              }
            />

            <textarea
              className="modal-input modal-textarea"
              placeholder="Комментарий"
              value={form.comment}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, comment: e.target.value }))
              }
            />

            <button type="submit" className="btn-order" disabled={loading}>
              {loading ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Карточка товара ──────────────────────────────────────────
function ProductCard({ product }) {
  const [activeColor, setActiveColor] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const { t } = useLang()

  const img = Array.isArray(product.imgs)
    ? product.imgs[0]
    : product.img

  const size = Array.isArray(product.size)
    ? product.size.join(', ')
    : product.size

  const material = Array.isArray(product.material)
    ? product.material.join(', ')
    : product.material

  const colors = product.colors || []

  const handleClose = useCallback(() => setShowModal(false), [])

  return (
    <>
      <div className="divan-card">
        <div className="divan-card__gallery">
          <img src={img} alt={product.title} className="divan-card__main-img" />
        </div>

        <div className="divan-card__info">
          <h2 className="divan-card__title">{product.title}</h2>
          <p className="divan-card__desc">{product.description}</p>

          {colors.length > 0 && (
            <div className="divan-card__section">
              <span className="divan-card__label">
                Цвет: <strong>{colors[activeColor]?.name}</strong>
              </span>
              <div className="divan-card__colors">
                {colors.map((c, i) => (
                  <button
                    key={i}
                    className={i === activeColor ? 'color-dot active' : 'color-dot'}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setActiveColor(i)}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="divan-card__section">
            <span className="divan-card__label">Характеристики:</span>
            <table className="divan-card__table">
              <tbody>
                {material && (
                  <tr>
                    <td>{t.material}</td>
                    <td>{material}</td>
                  </tr>
                )}
                {size && (
                  <tr>
                    <td>Размеры</td>
                    <td>{size}</td>
                  </tr>
                )}
                {product.article && (
                  <tr>
                    <td>Артикул</td>
                    <td>{product.article}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="divan-card__delivery">
            <span>🚚 {t.delivery}</span>
            <span>📍 {t.pickup}</span>
          </div>

          <div className="divan-card__actions">
            <button className="btn-order" onClick={() => setShowModal(true)}>
              {t.order_btn}
            </button>
            <button className="btn-favorite">❤ {t.favorite_btn}</button>
          </div>

          <div className="divan-card__share">
            <button>↗ {t.share}</button>
            <button>⚖ {t.compare_btn}</button>
          </div>
        </div>
      </div>

      {showModal && (
        <ApplicationModal product={product} onClose={handleClose} />
      )}
    </>
  )
}

// ─── Список товаров ───────────────────────────────────────────
export default function ProductList({ products, title, backPath, backLabel }) {
  const { t } = useLang()

  return (
    <div className="divany-page">
      <div className="divany-breadcrumb">
        <Link to="/" className="breadcrumb-link">{t.home}</Link>
        <span> / </span>
        <Link to={backPath} className="breadcrumb-link">{backLabel}</Link>
        <span> / </span>
        <span>{title}</span>
      </div>

      <h1 className="divany-title">
        {title} <span>{products.length} товаров</span>
      </h1>

      <div className="divany-list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}