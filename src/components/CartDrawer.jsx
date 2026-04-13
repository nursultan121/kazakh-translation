import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { createApplication } from '../api/api'
import './CartDrawer.css'

export default function CartDrawer() {
  const {
    cartItems, isOpen, setIsOpen,
    removeFromCart, increaseQty, decreaseQty,
    totalPrice, clearCart
  } = useCart()

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
      {/* Оверлей */}
      <div className="cart-overlay" onClick={handleClose} />

      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Корзина</h2>
          <button
            onClick={(e) => { e.stopPropagation(); handleClose() }}
            type="button"
            aria-label="Закрыть корзину"
            style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '24px', padding: '5px', lineHeight: 1, zIndex: 10 }}
          >✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <span>🛒</span>
            <p>Ваша корзина пуста</p>
            <button className="btn-continue" onClick={handleClose}>
              Продолжить покупки
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} />
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
                    onClick={() => removeFromCart(item.id)}
                    type="button"
                    style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '18px' }}
                  >✕</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <p className="cart-total">
                Итого: <strong>{totalPrice.toLocaleString('ru-KZ')} ₸</strong>
              </p>
              {/* ✅ Теперь открывает модальное окно, а не alert */}
              <button className="btn-checkout" onClick={handleOpenModal} type="button">
                📝 Оформить заявку
              </button>
            </div>
          </>
        )}
      </div>

      {/* ✅ Модальное окно с формой */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal} type="button">×</button>
            <h2>📝 Оформить заявку</h2>

            <div className="modal-product-info">
              <p>Товары: <strong>{cartItems.map(i => i.name).join(', ')}</strong></p>
              <p>Итого: <strong>{totalPrice.toLocaleString('ru-KZ')} ₸</strong></p>
            </div>

            {submitSuccess ? (
              <div className="modal-success">
                <span>✅</span>
                <h3>Заявка отправлена!</h3>
                <p>Наш менеджер свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="cart-name">Ваше имя *</label>
                  <input
                    type="text"
                    id="cart-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Иван Иванов"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cart-phone">Телефон *</label>
                  <input
                    type="tel"
                    id="cart-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cart-comment">Комментарий</label>
                  <textarea
                    id="cart-comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder="Дополнительная информация (необязательно)"
                    rows="3"
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? 'Отправка...' : 'Отправить заявку'}
                </button>
                <p className="form-note">🔒 Ваши данные защищены.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}