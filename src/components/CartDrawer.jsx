import { useCart } from '../context/CartContext'
import { createOrder } from '../api/api'
import './CartDrawer.css'

export default function CartDrawer() {
  const { 
    cartItems, 
    isOpen, 
    closeCart, 
    removeFromCart, 
    increaseQty, 
    decreaseQty, 
    totalPrice,
    clearCart 
  } = useCart()

  // ✅ Если корзина закрыта — не рендерим ничего
  if (!isOpen) return null

  const handleCheckout = async () => {
    try {
      // Формируем заказ для отправки на бэкенд
      const orderData = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: totalPrice,
        customer_info: {
          // Можно добавить форму для данных клиента
        }
      }

      // Отправляем заказ (опционально)
      await createOrder(orderData)
      
      // Очищаем корзину и закрываем
      clearCart()
      closeCart()
      
      // Показываем уведомление (можно добавить toast)
      alert('✅ Заказ оформлен! Менеджер свяжется с вами.')
      
    } catch (err) {
      console.error('Ошибка оформления:', err)
      alert('❌ Не удалось оформить заказ. Попробуйте позже.')
    }
  }

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} aria-hidden="true" />
      <div className="cart-drawer" role="dialog" aria-label="Корзина покупок">
        <div className="cart-drawer__header">
          <h2>Корзина</h2>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Закрыть корзину">✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer__empty">
            <span className="empty-icon">🛒</span>
            <p>Ваша корзина пуста</p>
            <button className="btn-continue" onClick={closeCart}>Продолжить покупки</button>
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
                      <button onClick={() => decreaseQty(item.id)} aria-label="Уменьшить количество">−</button>
                      <span aria-label={`Количество: ${item.quantity}`}>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)} aria-label="Увеличить количество">+</button>
                    </div>
                  </div>
                  <button 
                    className="cart-item__remove" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Удалить ${item.name} из корзины`}
                  >✕</button>
                </div>
              ))}
            </div>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Итого:</span>
                <strong>{totalPrice.toLocaleString('ru-KZ')} ₸</strong>
              </div>
              <button className="cart-drawer__checkout" onClick={handleCheckout}>
                📝 Оформить заявку
              </button>
              <p className="cart-note">🔒 Данные защищены. Менеджер свяжется для подтверждения.</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}