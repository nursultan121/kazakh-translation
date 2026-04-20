import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'
import './ProductList.css'

const API_BASE_URL = import.meta.env.VITE_API_URL_BACKEND || 'http://localhost:8000'

const KZ_TERM_MAP = [
  ['По согласованию с заказчиком', 'Тапсырыс берушімен келісім бойынша'],
  ['По размеру окна', 'Терезе өлшеміне қарай'],
  ['Ширина', 'Ені'],
  ['Высота', 'Биіктігі'],
  ['Глубина', 'Тереңдігі'],
  ['Каркас', 'Қаңқа'],
  ['Наполнение', 'Толтырғыш'],
  ['Ткань', 'Мата'],
  ['экокожа', 'эко-былғары'],
  ['кожзам', 'жасанды былғары'],
  ['Мягкая поверхность', 'Жұмсақ бет'],
  ['Пластмассовые ножки', 'Пластик аяқтар'],
  ['Металлические ножки', 'Металл аяқтар'],
  ['Стеклопластик', 'Шыныталшық'],
  ['Материал спинки', 'Арқалық материалы'],
  ['Материал сиденья', 'Орындық материалы'],
  ['Механизм качания', 'Тербелу механизмі'],
  ['Оранжевый', 'Қызғылт сары'],
  ['Бежевый', 'Беж'],
  ['Серый', 'Сұр'],
  ['Черный', 'Қара'],
  ['Белый', 'Ақ'],
  ['Коричневый', 'Қоңыр'],
  ['Темно-синий', 'Қою көк'],
  ['Темно-красный', 'Қою қызыл'],
  ['Красный', 'Қызыл'],
  ['Зеленый', 'Жасыл'],
  ['Зелёный', 'Жасыл'],
  ['Темно зеленый', 'Қою жасыл'],
  ['Темно-зеленый', 'Қою жасыл'],
  ['Тёмно-зелёный', 'Қою жасыл'],
  ['Светло-серый', 'Ашық сұр'],
  ['Светло коричневый', 'Ашық қоңыр'],
  ['Светло-коричневый', 'Ашық қоңыр'],
  ['Желтый', 'Сары'],
  ['Дуб', 'Емен'],
  ['Золотистый дуб', 'Алтын түсті емен'],
  ['Светлый дуб', 'Ашық емен'],
  ['Шторы', 'Перделер'],
  ['Мебель', 'Жиһаз'],
  ['Стулья', 'Орындықтар'],
  ['Столы', 'Үстелдер'],
  ['Кресла', 'Креслолар'],
  ['Диваны', 'Дивандар'],
  ['Тумбы', 'Тұмбалар'],
  ['Шкафы', 'Шкафтар'],
  ['Синий', 'Көк'],
  ['Голубой', 'Көгілдір'],
  ['Темный', 'Қою'],
  ['Тёмный', 'Қою'],
  ['Темно-коричневый', 'Қою қоңыр'],
  ['Мутно-коричневый', 'Күңгірт қоңыр'],
  ['Серо-зелёный', 'Сұр-жасыл'],
  ['Хвойно-зеленый', 'Қылқан жасыл'],
  ['Желто-зеленый', 'Сары-жасыл'],
  ['Золотисто-коричневый', 'Алтын қоңыр'],
  ['Латунный', 'Жез түсті'],
  ['Венге', 'Венге'],
  ['Дуб сонома', 'Сонома емені'],
  ['СТАНДАРТНЫЙ ШКАФ', 'СТАНДАРТ ШКАФ'],
  ['ВСТРОЕННЫЙ ШКАФ', 'КІРІКТІРМЕ ШКАФ'],
  ['ШКОЛЬНЫЙ СТУЛ', 'МЕКТЕП ОРЫНДЫҒЫ'],
  ['БАРНЫЙ СТУЛ', 'БАР ОРЫНДЫҒЫ'],
  ['МЯГКИЙ СТУЛ', 'ЖҰМСАҚ ОРЫНДЫҚ'],
  ['ТУМБА', 'ТҰМБА'],
  ['ПУФ', 'ПУФ'],
  ['ПАРТА', 'ПАРТА'],
  ['РЕСЕПШЕН', 'РЕСЕПШН'],
  ['СТЕЛЛАЖ', 'СТЕЛЛАЖ'],
  ['СПЕЦ СТОЛ ДЛЯ ПРЕПОДАВАТЕЛЯ', 'МҰҒАЛІМГЕ АРНАЛҒАН АРНАЙЫ ҮСТЕЛ'],
  ['Компактная модель для небольших помещений. Идеально подходит для прихожей, спальни или коридора. Внутреннее пространство организовано удобно - есть отделения для одежды, обуви и аксессуаров.', 'Шағын бөлмелерге арналған ықшам модель. Кіреберіске, жатын бөлмеге немесе дәлізге ыңғайлы. Ішкі кеңістік киім, аяқкиім және аксессуарларға арналған бөлімдермен тиімді ұйымдастырылған.'],
  ['Функциональный стандартный шкаф из качественных мебельных панелей с универсальным дизайном и прочной фурнитурой.', 'Сапалы жиһаз панельдерінен жасалған, әмбебап дизайны мен берік фурнитурасы бар функционалды стандарт шкаф.'],
  ['Удобная и практичная модель. Подходит для ежедневного использования. Простая конструкция, аккуратный внешний вид. Хорошо вписывается в любое пространство.', 'Ыңғайлы әрі практикалық модель. Күнделікті қолдануға қолайлы. Қарапайым конструкция, ұқыпты сыртқы көрініс. Кез келген кеңістікке жақсы үйлеседі.'],
  ['Компактный, надёжный, функциональный. Отличается от первой модели небольшими конструктивными особенностями, но сохраняет те же преимущества: простоту и удобство.', 'Ықшам, сенімді, функционалды. Бірінші модельден аздаған конструкциялық ерекшеліктерімен өзгешеленеді, бірақ қарапайымдылық пен ыңғайлылық артықшылықтарын сақтайды.'],
  ['Эргономичный школьный стул со стойкой конструкцией, лёгким уходом и устойчивой посадкой для учебных классов.', 'Оқу сыныптарына арналған берік конструкциялы, күтімі жеңіл және отыруы тұрақты эргономикалық мектеп орындығы.'],
  ['Высота 75 см, прочный металлический каркас и мягкая обивка делают этот барный стул удобным и стильным элементом любой кухни или бара.', 'Биіктігі 75 см, берік металл қаңқа мен жұмсақ қаптама бұл бар орындығын кез келген ас үй мен барға ыңғайлы және стильді етеді.'],
  ['Мягкий и комфортный стул с плотной обивкой и надёжным основанием, идеально подходящий для длительного сидения и уютных интерьеров.', 'Тығыз қаптамасы мен сенімді негізі бар жұмсақ әрі жайлы орындық, ұзақ отыруға және жайлы интерьерлерге өте қолайлы.'],
  ['Компактный и удобный стеллаж подойдёт для дома, офиса или магазина. Благодаря мягкой поверхности и аккуратному внешнему виду он не только помогает организовать хранение, но и выглядит современно.', 'Ықшам әрі ыңғайлы стеллаж үйге, кеңсеге немесе дүкенге жарайды. Жұмсақ беті мен ұқыпты сыртқы көрінісінің арқасында сақтау орнын ұйымдастырып қана қоймай, заманауи көрінеді.'],
]

function localizeText(value, lang) {
  if (lang !== 'kz' || typeof value !== 'string') return value
  let out = value
  KZ_TERM_MAP.forEach(([ru, kz]) => {
    out = out.split(ru).join(kz)
  })
  return out
}

function localizeProduct(product, lang) {
  if (lang !== 'kz') return product
  return {
    ...product,
    title: localizeText(product.title, lang),
    description: localizeText(product.description_ru || product.description, lang),
    material: Array.isArray(product.material)
      ? product.material.map((item) => localizeText(item, lang))
      : localizeText(product.material, lang),
    size: localizeText(product.size, lang),
    colors: Array.isArray(product.colors)
      ? product.colors.map((c) => ({ ...c, name: localizeText(c.name, lang) }))
      : product.colors,
  }
}

/**
 * Модальное окно для отправки заявки
 */
function ApplicationModal({ product, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    username: '',
    comment: '',
  })
  const [sent, setSent] = useState(false)
  const { t } = useLang()
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [nameError, setNameError] = useState('')

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const validateName = (name) => {
    const cleaned = name.trim().replace(/\s+/g, ' ')
    return /^[A-Za-zА-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІіЁё]+(?:[ -][A-Za-zА-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІіЁё]+)*$/.test(cleaned)
  }

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '')
    return /^(\d{10}|\d{11}|\d{12})$/.test(digits)
  }

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, '')
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1)
    }
    if (digits.startsWith('7')) {
      digits = digits.slice(0, 11)
      const p1 = digits.slice(1, 4)
      const p2 = digits.slice(4, 7)
      const p3 = digits.slice(7, 9)
      const p4 = digits.slice(9, 11)
      let formatted = '+7'
      if (p1) formatted += ` (${p1}`
      if (p1.length === 3) formatted += ')'
      if (p2) formatted += ` ${p2}`
      if (p3) formatted += `-${p3}`
      if (p4) formatted += `-${p4}`
      return formatted
    }
    return value
  }

  const handleNameChange = (e) => {
    const filtered = e.target.value.replace(
      /[^A-Za-zА-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІіЁё\s-]/g,
      ''
    )
    setForm((prev) => ({ ...prev, name: filtered }))
    setNameError('')
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    setForm((prev) => ({ ...prev, phone: formatted }))
    setPhoneError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cleanName = form.name.trim().replace(/\s+/g, ' ')
    const cleanPhone = form.phone.trim()

    if (!cleanName || cleanName.length < 2) {
      setNameError(t.name_error_short)
      return
    }
    if (!validateName(cleanName)) {
      setNameError(t.name_error_chars)
      return
    }
    if (!cleanPhone) {
      setPhoneError(t.phone_error_required)
      return
    }
    if (!validatePhone(cleanPhone)) {
      setPhoneError(t.phone_error_invalid)
      return
    }

    setLoading(true)
    
    const finalComment = product.selectedColor
      ? `${t.color_selected_prefix} ${product.selectedColor}\n${form.comment.trim()}`
      : form.comment.trim()

    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          username: form.username.trim(),
          comment: finalComment,
          product_name: product.title,
          article: product.article,
          product_url: window.location.href,
        }),
      })
      if (!response.ok) throw new Error('Ошибка отправки')
      setSent(true)
    } catch {
      setSent(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} type="button">×</button>
        {sent ? (
          <div className="modal-success">
            <strong>✅ {t.application_sent || 'Заявка отправлена!'}</strong> {t.manager_contact || 'Менеджер свяжется с вами в ближайшее время.'}
          </div>
        ) : (
          <>
            <h3 className="modal-title">{t.order_application || 'Оставить заявку'}</h3>
            <p className="modal-product-name">{product.title}</p>
            {product.selectedColor && (
              <p className="modal-selected-color" style={{ color: '#2f6f55', fontWeight: 'bold', marginBottom: '8px' }}>
                {t.color_label} {product.selectedColor}
              </p>
            )}
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-field">
                <input
                  className="modal-input"
                  type="text"
                  placeholder={t.name_placeholder || 'Ваше имя'}
                  value={form.name}
                  onChange={handleNameChange}
                  required
                />
                {nameError && <span className="modal-error">{nameError}</span>}
              </div>
              <div className="modal-field">
                <input
                  className="modal-input"
                  type="tel"
                  placeholder={t.phone_placeholder || '+7 (777) 123-45-67'}
                  value={form.phone}
                  onChange={handlePhoneChange}
                  required
                />
                {phoneError && <span className="modal-error">{phoneError}</span>}
              </div>
              <div className="modal-field">
                <input
                  className="modal-input"
                  type="text"
                  placeholder={t.telegram_username_placeholder || 'Telegram username (необязательно)'}
                  value={form.username}
                  onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <textarea
                  className="modal-input modal-textarea"
                  placeholder={t.comment_placeholder || 'Комментарий'}
                  value={form.comment}
                  onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
                />
              </div>
              <button type="submit" className="btn-order" disabled={loading}>
                {loading ? t.sending : t.send_request}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function ImagePlaceholder() {
  const { t } = useLang()
  return (
    <div className="divan-card__no-img">
      <span className="divan-card__soon-badge">{t.equipment_soon}</span>
      <span className="divan-card__soon-text">{t.equipment_soon}</span>
    </div>
  )
}

/**
 * Карточка отдельного товара
 */
function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { t, lang } = useLang()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()

  const localizedProduct = useMemo(() => localizeProduct(product, lang), [product, lang])
  const colors = useMemo(() => localizedProduct.colors || [], [localizedProduct.colors])
  
  const getInitialImg = useCallback(() => {
    if (colors.length > 0 && colors[0].img) return colors[0].img
    if (Array.isArray(localizedProduct.imgs) && localizedProduct.imgs.length > 0) return localizedProduct.imgs[0]
    return localizedProduct.img || ''
  }, [colors, localizedProduct.imgs, localizedProduct.img])

  const [currentImg, setCurrentImg] = useState(getInitialImg())
  const [activeColor, setActiveColor] = useState(colors.length > 0 ? colors[0].name : null)

  useEffect(() => {
    setCurrentImg(getInitialImg())
    setActiveColor(colors.length > 0 ? colors[0].name : null)
    setImgError(false)
  }, [localizedProduct.id, getInitialImg, colors])

  const size = Array.isArray(localizedProduct.size) ? localizedProduct.size.join(', ') : localizedProduct.size
  const material = Array.isArray(localizedProduct.material) ? localizedProduct.material.join(', ') : localizedProduct.material
  const inFavorite = isFavorite(localizedProduct.id)
  const showPlaceholder = !currentImg || imgError

  const handleClose = useCallback(() => setShowModal(false), [])

  const handleAddToCart = () => {
    addToCart({
      ...localizedProduct,
      image: currentImg,
      color: activeColor
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleColorSelect = (color) => {
    setActiveColor(color.name)
    if (color.img) {
      setCurrentImg(color.img)
      setImgError(false)
    }
  }

  return (
    <>
      <div className="divan-card">
        <div className="divan-card__gallery">
          {showPlaceholder ? (
            <ImagePlaceholder />
          ) : (
            <img
              src={currentImg}
              alt={localizedProduct.title}
              className="divan-card__main-img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
          {localizedProduct.in_stock === false && <span className="badge-out">{t.out_of_stock}</span>}
        </div>
        <div className="divan-card__info">
          <h2 className="divan-card__title">{localizedProduct.title}</h2>
          <p className="divan-card__desc">{localizedProduct.description_ru || localizedProduct.description}</p>

          {colors.length > 0 && (
            <div className="divan-card__section color-selection">
              <span className="divan-card__label">
                {t.color_label} <strong style={{ color: '#2f6f55' }}>{activeColor}</strong>
              </span>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                {colors.map((color, idx) => (
                  <button
                    key={`${localizedProduct.id}-color-${idx}`}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`color-circle-btn ${activeColor === color.name ? 'active' : ''}`}
                    style={{
                      backgroundColor: color.hex,
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: activeColor === color.name ? '3px solid #2f6f55' : '1px solid #ddd',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.2s ease',
                      boxShadow: activeColor === color.name ? '0 0 0 2px white inset' : 'none',
                      transform: activeColor === color.name ? 'scale(1.1)' : 'scale(1)'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="divan-card__section">
            <span className="divan-card__label">{t.product_characteristics}:</span>
            <table className="divan-card__table">
              <tbody>
                {material && (
                  <tr>
                    <td>{t.material || 'Материал'}</td>
                    <td>{material}</td>
                  </tr>
                )}
                {size && (
                  <tr>
                    <td>{t.size_label}</td>
                    <td>{size}</td>
                  </tr>
                )}
                {localizedProduct.article && (
                  <tr>
                    <td>{t.article_label}</td>
                    <td>{localizedProduct.article}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="divan-card__actions">
            <button
              className="btn-add-to-cart"
              onClick={handleAddToCart}
              disabled={addedToCart || localizedProduct.in_stock === false}
              type="button"
            >
              {addedToCart ? t.added_to_cart || '✓ Добавлено!' : t.add_to_cart || '🛒 В корзину'}
            </button>
            <button
              className={`btn-favorite ${inFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(localizedProduct)}
              type="button"
            >
              ❤ {inFavorite ? t.favorite_in || 'В избранном' : t.favorite_add || 'В избранное'}
            </button>
          </div>

          <button
            className="btn-order-full"
            onClick={() => setShowModal(true)}
            type="button"
          >
            📝 {t.order_application || 'Оставить заявку'}
          </button>
        </div>
      </div>
      {showModal && (
        <ApplicationModal 
          product={{ ...localizedProduct, selectedColor: activeColor }}
          onClose={handleClose} 
        />
      )}
    </>
  )
}

export default function ProductList({ products, title, backPath, backLabel }) {
  const { t, lang } = useLang()
  const localizedTitle = localizeText(title, lang)
  const localizedBackLabel = localizeText(backLabel, lang)

  if (!products || products.length === 0) {
    return (
      <div className="divany-page">
        <div className="empty-state">
          <h2>😕 {t.products_not_found}</h2>
          <Link to={backPath || '/'} className="btn-back">
            ← {t.back}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="divany-page">
      <div className="divany-breadcrumb">
        <Link to="/" className="breadcrumb-link">
          {t.home || 'Главная'}
        </Link>
        <span> / </span>
        {backPath && (
          <>
            <Link to={backPath} className="breadcrumb-link">
              {localizedBackLabel || t.catalog}
            </Link>
            <span> / </span>
          </>
        )}
        <span>{localizedTitle}</span>
      </div>
      <h1 className="divany-title">
        {localizedTitle} <span>{products.length} {t.favorites_items}</span>
      </h1>
      <div className="divany-list">
        {products.map((product) => (
          <ProductCard key={product.id || product.article} product={product} />
        ))}
      </div>
    </div>
  )
}