import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { createApplication } from '../api/api'
import { useLang } from '../i18n/LanguageContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const {
    cartItems, isOpen, setIsOpen,
    removeFromCart, increaseQty, decreaseQty,
    totalPrice, clearCart
  } = useCart()
  const { t } = useLang()

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleClose = () => setIsOpen(false)

  if (!isOpen) return null

  const handleOpenModal = () => {
    setShowModal(true)
    setSubmitSuccess(false)
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
    try {
      const applicationData = {
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment,
        product_name: cartItems.map(i => i.name).join(', '),
        article: cartItems.map(i => i.article).join(', '),
        product_url: window.location.href
      }
      await createApplication(applicationData)
      setSubmitSuccess(true)
      setTimeout(() => {
        setShowModal(false)
        clearCart()
        handleClose()
      }, 2000)
    } catch (err) {
      console.error('Ошибка отправки заявки:', err)
      alert('❌ Ошибка при отправке. Попробуйте снова.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="cart-overlay" onClick={handleClose} />

      <div className="cart-drawer">
        {/* Хедер */}
        <div className="cart-drawer__header">
          <h2>{t.cart}</h2>
          <button
            className="cart-drawer__close"
            onClick={(e) => { e.stopPropagation(); handleClose() }}
            type="button"
            aria-label={t.close_cart}
          >✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer__empty">
            <span>🛒</span>
            <p>{t.cart_empty}</p>
            <button className="cart-drawer__checkout" onClick={handleClose} type="button">
              {t.continue_shopping}
            </button>
          </div>
        ) : (
          <>
            {/* Список товаров */}
            <div className="cart-drawer__items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img
                    className="cart-item__img"
                    src={item.img}
                    alt={item.name}
                  />
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__article">Арт: {item.article}</p>
                    <p className="cart-item__price">
                      {(item.price * item.quantity).toLocaleString('ru-KZ')} ₸
                    </p>
                    <div className="cart-item__qty">
                      <button onClick={() => decreaseQty(item.id)} type="button">−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)} type="button">+</button>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                    type="button"
                  >✕</button>
                </div>
              ))}
            </div>

            {/* Футер */}
            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>{t.total_label || 'Итого:'}</span>
                <strong>{totalPrice.toLocaleString('ru-KZ')} ₸</strong>
              </div>
              <button
                className="cart-drawer__checkout"
                onClick={handleOpenModal}
                type="button"
              >
                📝 {t.order_application}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Модальное окно */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal} type="button">×</button>
            <h2>📝 {t.order_application || 'Оформить заявку'}</h2>
            <p>{t.total_label} <strong>{totalPrice.toLocaleString('ru-KZ')} ₸</strong></p>

            {submitSuccess ? (
              <div className="modal-success">
                <span>✅</span>
                <h3>{t.application_sent || 'Заявка отправлена!'}</h3>
                <p>{t.manager_contact || 'Наш менеджер свяжется с вами в ближайшее время.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="cart-name">{t.cart_name_label}</label>
                  <input
                    type="text"
                    id="cart-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={t.cart_placeholder_name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cart-phone">{t.cart_phone_label}</label>
                  <input
                    type="tel"
                    id="cart-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder={t.cart_placeholder_phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cart-comment">{t.cart_comment_label}</label>
                  <textarea
                    id="cart-comment"
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
                <p className="form-note">{t.data_protected || '🔒 Ваши данные защищены.'}</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}