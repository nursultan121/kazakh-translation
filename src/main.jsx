import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// ✅ Глобальные стили
import './index.css'

// ✅ Главный компонент приложения
import App from './App.jsx'

// ✅ Контексты (порядок импортов не важен, но порядок в JSX — критичен!)
import { LanguageProvider } from './i18n/LanguageContext'
import { UserEmailProvider } from './context/UserEmailContext'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'

// ==========================================
// 🚀 ТОЧКА ВХОДА В ПРИЛОЖЕНИЕ
// ==========================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 
      ✅ BrowserRouter должен быть самым верхним, 
      чтобы роутинг работал во всех провайдерах и компонентах 
    */}
    <BrowserRouter>
      
      {/* 
        ✅ Порядок вложенности провайдеров ВАЖЕН:
        1. LanguageProvider — базовый, не зависит от других
        2. UserEmailProvider — нужен для AuthProvider
        3. CartProvider / FavoritesProvider — независимые
        4. AuthProvider — зависит от UserEmailProvider, оборачивает App
      */}
      
      <LanguageProvider>
        <UserEmailProvider>
          <CartProvider>
            <FavoritesProvider>
              
              {/* ✅ AuthProvider оборачивает App, чтобы useAuth() работал внутри */}
              <AuthProvider>
                <App />
              </AuthProvider>
              
            </FavoritesProvider>
          </CartProvider>
        </UserEmailProvider>
      </LanguageProvider>
      
    </BrowserRouter>
  </React.StrictMode>
)