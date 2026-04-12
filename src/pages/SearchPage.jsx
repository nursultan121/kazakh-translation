import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { getProducts } from '../api/api'
import { useLang } from '../i18n/LanguageContext'
import './SearchPage.css'

// ==========================================
// 📦 КОМПОНЕНТ КАРТОЧКИ ТОВАРА
// ==========================================
const ProductCard = ({ product }) => {
  // Анимация появления при скролле
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  // Формируем ссылку на детальную страницу товара
  const productLink = product.path || product.url || `/product/${product.slug || product.id}`

  return (
    <Link
      ref={ref}
      to={productLink}
      className={`search-card ${inView ? 'search-card--visible' : ''}`}
      aria-label={`Перейти к товару: ${product.title}`}
      role="listitem"
    >
      {/* Медиа-блок */}
      <div className="search-card__media">
        <img
          src={product.img}
          srcSet={product.srcSet || product.img}
          sizes="(max-width: 768px) 50vw, 33vw"
          loading="lazy"
          decoding="async"
          alt={`Купить ${product.title?.toLowerCase()} в STEM Academia`}
          className="search-card__img"
        />
        
        {/* Бейджи (Новинка / Скидка) */}
        {product.badge && (
          <span className={`badge badge--${product.badge}`}>
            {product.badge === 'new' ? 'NEW' : 'SALE'}
          </span>
        )}
      </div>

      {/* Информация о товаре */}
      <div className="search-card__info">
        <h3 className="search-card__title">{product.title}</h3>
        <p className="search-card__article">Арт: {product.article}</p>
        
        {/* Краткое описание (если есть в данных) */}
        {product.description && (
          <p className="search-card__desc">{product.description}</p>
        )}
        
        {/* ✅ Кнопка "Заказать" удалена */}
      </div>
    </Link>
  )
}

// ==========================================
// 📄 ОСНОВНАЯ СТРАНИЦА ПОИСКА
// ==========================================
export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useLang()

  // Загрузка результатов поиска
  useEffect(() => {
    if (query) {
      setLoading(true)
      getProducts({ q: query })
        .then(data => {
          setResults(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Ошибка поиска:', err)
          setLoading(false)
        })
    }
  }, [query])

  // Микроразметка Schema.org для SEO
  useEffect(() => {
    if (!query || results.length === 0) return

    const schema = {
      "@context": "https://schema.org",
      "@type": "SearchResultsPage",
      "name": `Результаты поиска: ${query}`,
      "description": `Найдено ${results.length} товаров по запросу "${query}" в STEM Academia.`,
      "mainEntity": results.map(p => ({
        "@type": "Product",
        "name": p.title,
        "image": p.img,
        "sku": p.article,
        "url": `${window.location.origin}${p.path || p.url || `/product/${p.id}`}`
      }))
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [query, results])

  return (
    <div className="search-page">
      {/* Хлебные крошки */}
      <nav className="search-breadcrumb" aria-label="Breadcrumb">
        <Link to="/" className="breadcrumb-link">{t.home}</Link>
        <span className="separator" aria-hidden="true"> / </span>
        <span className="current">Поиск: "{query}"</span>
      </nav>

      {/* Заголовок */}
      <h1 className="search-title">
        Результаты поиска: <span>"{query}"</span>
      </h1>

      {/* Состояния загрузки / пусто / результаты */}
      {loading ? (
        <p className="search-loading">Загрузка товаров...</p>
      ) : results.length === 0 ? (
        <div className="search-empty">
          <p>😔 Ничего не найдено по запросу "{query}"</p>
          <Link to="/" className="btn-back">← Вернуться на главную</Link>
        </div>
      ) : (
        <>
          <p className="search-count">
            🔍 Найдено: <strong>{results.length}</strong> {results.length === 1 ? 'товар' : 'товаров'}
          </p>
          
          <div className="search-grid" role="list">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}