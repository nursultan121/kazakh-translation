import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import './Peregorodki.css'

const products = [
  {
    id: 1,
    title: 'СТЕКЛО',
    img: ['/img/pagedecor/peregorodki/item1.png'],
    description: 'Стеклянные перегородки делают пространство визуально лёгким и просторным. Они пропускают свет, не загромождая комнату. Идеально подходят для зонирования офисов, гостиных, кухонь или ванных комнат.',
    article: 'S.Me-ST.S.DP',
  },
  {
    id: 2,
    title: 'РЕЙКИ',
    img: ['/img/pagedecor/peregorodki/item2.png'],
    description: 'Реечные перегородки из деревянных или пластиковых реек создают ритм и текстуру в интерьере. Отлично смотрятся в стиле лофт, скандинавском или минимализм.',
    article: 'S.Me-ST.S.DP',
  },
  {
    id: 3,
    title: 'МЕТАЛЛ',
    img: ['/img/pagedecor/peregorodki/item31.png', '/img/pagedecor/peregorodki/item32.png'],
    description: 'Металлические перегородки — для современных интерьеров. Прочные, долговечные, с индустриальным характером. Подходят для офисов, лофтов, студий и технических помещений.',
    article: 'S.Me-ST.S.DP',
  },
]

const telegramBase = 'https://t.me/stem_academia_bot?text='

function CardImage({ src, alt }) {
  const { t } = useLang()
  const handleError = (e) => {
    e.target.style.display = 'none'
    e.target.nextSibling.style.display = 'flex'
  }
  return (
    <>
      <img
        src={src}
        alt={alt}
        className="perego-img-item"
        onError={handleError}
      />
      <div className="perego-img-soon" style={{ display: 'none' }}>
        <span className="perego-soon-badge">{t.equipment_soon}</span>
        <span className="perego-soon-text">{t.equipment_soon}</span>
      </div>
    </>
  )
}

export default function Peregorodki() {
  const { t, lang } = useLang()
  const isKz = lang === 'kz'
  return (
    <div className="peregorodki-page">
      <div className="peregorodki-breadcrumb">
        <Link to="/" className="breadcrumb-link">{t.home}</Link>
        <span> / </span>
        <Link to="/decor" className="breadcrumb-link">{t.decor}</Link>
        <span> / </span>
        <span>{t.decor_peregorodki}</span>
      </div>

      <h1 className="peregorodki-title">
        {t.decor_peregorodki} <span>{products.length} {isKz ? 'тауар' : 'товара'}</span>
      </h1>

      <div className="peregorodki-list">
        {products.map((p) => (
          <div key={p.id} className="peregorodki-card">

            <div className="peregorodki-card__gallery">
              {p.img.length > 1 ? (
                <div className="perego-multi-img">
                  {p.img.map((src, i) => (
                    <CardImage key={i} src={src} alt={p.title} />
                  ))}
                </div>
              ) : (
                <CardImage src={p.img[0]} alt={p.title} />
              )}
            </div>

            <div className="peregorodki-card__info">
              <h2>{p.title}</h2>
              <p className="peregorodki-card__desc-label">{t.product_description}:</p>
              <p className="peregorodki-card__desc">{p.description}</p>
              <table className="peregorodki-card__table">
                <tbody>
                  <tr>
                    <td>{t.article_label}</td>
                    <td>{p.article}</td>
                  </tr>
                </tbody>
              </table>
              <div className="peregorodki-card__delivery">
                <span>🚚 {t.delivery}</span>
                <span>📍 {t.pickup}</span>
              </div>
              <a
                href={`${telegramBase}${encodeURIComponent(`${t.inquiry_message_prefix} ${p.title}, ${t.article_label}: ${p.article}`)}`}
                className="btn-order-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                📝 {t.order_btn}
              </a>
              <div className="peregorodki-card__share">
                <button type="button">❤ {t.favorite_add}</button>
                <button type="button">↗ {t.share}</button>
                <button type="button">⚖ {t.compare}</button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}