import { createContext, useContext, useState, useEffect } from 'react'
import { useUserEmail } from './UserEmailContext'

const CartContext = createContext()
const getCartKey = (email) => email ? `stem_cart_${email}` : null

export function CartProvider({ children }) {
  const { userEmail } = useUserEmail()
  const [cartItems, setCartItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (userEmail) {
      const saved = localStorage.getItem(getCartKey(userEmail))
      setCartItems(saved ? JSON.parse(saved) : [])
    } else {
      setCartItems([])
    }
  }, [userEmail])

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(getCartKey(userEmail), JSON.stringify(cartItems))
    }
  }, [cartItems, userEmail])

  const addToCart = (product) => {
    // ✅ Нормализация — работает для всех компонентов
    const normalizedProduct = {
      ...product,
      name: product.name || product.title,
      img: product.img || product.image || product.photo,
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === normalizedProduct.id)
      if (existing) {
        return prev.map(item =>
          item.id === normalizedProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...normalizedProduct, quantity: 1 }]
    })
  }

  const removeFromCart = (id) =>
    setCartItems(prev => prev.filter(item => item.id !== id))

  const increaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    if (userEmail) localStorage.removeItem(getCartKey(userEmail))
  }

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart,
      increaseQty, decreaseQty, clearCart,
      totalCount, totalPrice,
      isOpen, setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)