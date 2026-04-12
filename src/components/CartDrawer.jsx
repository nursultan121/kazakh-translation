import { useCart } from '../context/CartContext'
import { createOrder } from '../api/api'
import './CartDrawer.css'

export default function CartDrawer() {
  const { 
    cartItems, 
    isOpen, 
    setIsOpen, 
    removeFromCart, 
    increaseQty, 
    decreaseQty, 
    totalPrice,
    clearCart 
  } = useCart()

  // ✅ Единая функция закрытия
  const handleClose = () => setIsOpen(false)

  // ✅ Если корзина закрыта — не рендерим ничего
  if (!isOpen) return null

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: totalPrice
      }

      await createOrder(orderData)
      clearCart()
      handleClose()
      alert('✅ Заказ оформлен! Менеджер свяжется с вами.')
      
    } catch (err) {
      console.error('Ошибка оформления:', err)
      alert('❌ Не удалось оформить заказ. Попробуйте позже.')
    }
  }

  return (
    <>
      {/* Оверлей (клик по фону тоже закрывает) */}
      <div className="cart-overlay" onClick={handleClose} aria-hidden="true" />
      
      <div className="cart-drawer" role="dialog" aria-label="Корзина покупок">
        <div className="cart-drawer__header">
          <h2>Корзина</h2>
          
          {/* ✅ ИСПРАВЛЕННАЯ КНОПКА ЗАКРЫТИЯ (X) */}
          <button
            className="cart-drawer__close"
            onClick={(e) => {
              e.stopPropagation() // ✅ Останавливаем всплытие
              handleClose()
            }}
            type="button"
            aria-label="Закрыть корзину"
            style={{ 
              cursor: 'pointer', 
              background: 'none', 
              border: 'none', 
              fontSize: '24px',
              padding: '5px',
              lineHeight: 1,
              zIndex: 10
            }}
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer__empty">
            <span className="empty-icon" style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>🛒</span>
            <p>Ваша корзина пуста</p>
            {/* ✅ Кнопка "Продолжить покупки" тоже закрывает корзину */}
            <button 
              className="btn-continue" 
              onClick={handleClose}
              type="button"
              style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer' }}
            >
              Продолжить покупки
            </button>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items" role="list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item" role="listitem">
                  <img src={item.image} alt={item.name} className="cart-item__img" loading="lazy" />
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__article">Арт: {item.article}</p>
                    <p className="cart-item__price">{(item.price * item.quantity).toLocaleString('ru-KZ')} ₸</p>
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
                    style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '18px' }}
                  >✕</button>
                </div>
              ))}
            </div>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Итого:</span>
                <strong>{totalPrice.toLocaleString('ru-KZ')} ₸</strong>
              </div>
              <button className="cart-drawer__checkout" onClick={handleCheckout} type="button">
                📝 Оформить заявку
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}