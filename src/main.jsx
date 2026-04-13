import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'

import App from './App.jsx'

import { LanguageProvider } from './i18n/LanguageContext'
import { UserEmailProvider } from './context/UserEmailContext'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <UserEmailProvider>

          {/* ✅ AuthProvider теперь ВЫШЕ Cart и Favorites */}
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <App />
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>

        </UserEmailProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
)