import { useState, useRef, useEffect } from 'react'
import './AIWelcome.css'

// ✅ Базовый URL API: приоритет продакшена → локальной разработки
const API_BASE_URL = 
  import.meta.env.VITE_API_URL_BACKEND || 
  import.meta.env.VITE_API_URL || 
  'http://localhost:8000/api'

export default function AIWelcome() {
  // ✅ Локальное состояние видимости (не зависит от пропсов)
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: '👋 Здравствуйте! Я AI-помощник STEM Academia. Спросите меня про мебель, оборудование, доставку или наличие товаров!',
      timestamp: new Date()
    }
  ])
  
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const quickQuestions = [
    "🪑 Какие есть диваны?",
    "🚚 Условия доставки",
    "📍 Где самовывоз?",
    "💰 Как узнать цену?"
  ]

  // ✅ Показываем чат через 1 секунду после загрузки
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // ✅ Авто-скролл к последнему сообщению
  useEffect(() => {
    if (isVisible) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, isVisible])

  // ✅ Фокус на поле ввода при открытии
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isVisible])

  // ✅ Закрытие по Escape
  useEffect(() => {
    if (!isVisible) return
    const handler = (e) => {
      if (e.key === 'Escape') setIsVisible(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isVisible])

  // ✅ Блокировка скролла при открытом чате
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  // ✅ Если чат скрыт — не рендерим ничего
  if (!isVisible) return null

  // Отправка сообщения
  const handleSend = async (textToSend) => {
    const text = textToSend || input
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('❌ AI API error:', response.status, errorData)
        throw new Error(`Ошибка сервера: ${response.status}`)
      }

      const data = await response.json()
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        text: data.reply || '❓ Не удалось получить ответ',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      
    } catch (err) {
      console.error('💥 Ошибка отправки:', err)
      setError('Не удалось связаться с помощником. Попробуйте позже.')
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: '❌ Произошла ошибка соединения. Вы можете написать нам напрямую в [WhatsApp](https://wa.me/77000395877).',
        timestamp: new Date()
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  const renderTextWithLinks = (text) => {
    const urlRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = urlRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      parts.push(
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="chat-link">
          {match[1]}
        </a>
      )
      lastIndex = match.index + match[0].length
    }
    
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }
    
    return parts.length > 0 ? parts : text
  }

  return (
    <div className="ai-welcome-overlay" onClick={() => setIsVisible(false)}>
      <div className="ai-chat-container" onClick={(e) => e.stopPropagation()}>
        
        <header className="ai-chat-header">
          <div className="ai-header-content">
            <div className="ai-avatar">
              <span className="ai-avatar-icon" role="img" aria-label="AI помощник">🤖</span>
              <span className="ai-avatar-status"></span>
            </div>
            <div className="ai-header-info">
              <h3 className="ai-header-title">AI-помощник STEM</h3>
              <p className="ai-header-subtitle">онлайн • отвечает за ~2 сек</p>
            </div>
          </div>
          <button className="ai-close-btn" onClick={() => setIsVisible(false)} aria-label="Закрыть чат">×</button>
        </header>

        <div className="ai-chat-messages" role="log" aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.role}`}>
              <div className="message-bubble">
                <p className="message-text">{renderTextWithLinks(msg.text)}</p>
                <time className="message-time" dateTime={msg.timestamp.toISOString()}>
                  {formatTime(msg.timestamp)}
                </time>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message-wrapper ai">
              <div className="message-bubble typing" aria-label="ИИ печатает...">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="message-wrapper error">
              <div className="message-bubble error">
                <p className="message-text">⚠️ {error}</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && !isTyping && (
          <div className="ai-quick-questions">
            <p className="quick-questions-label">Быстрые вопросы:</p>
            <div className="quick-questions-list">
              {quickQuestions.map((question, idx) => (
                <button 
                  key={idx} 
                  className="quick-question-btn" 
                  onClick={() => handleSend(question.replace(/^[\w\s]+/, '').trim())}
                  type="button"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <footer className="ai-chat-input">
          <textarea
            ref={inputRef}
            className="ai-input-field"
            placeholder="Задайте вопрос..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            rows={1}
            maxLength={500}
            aria-label="Введите сообщение"
          />
          <button
            className="ai-send-btn"
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            aria-label="Отправить сообщение"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="send-icon">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
            </svg>
          </button>
        </footer>

        <div className="ai-chat-footer">
          <small>
            💡 ИИ может ошибаться. Для точной информации пишите в 
            <a href="https://wa.me/77000395877" target="_blank" rel="noopener" className="footer-link">WhatsApp</a>
          </small>
        </div>

      </div>
    </div>
  )
}