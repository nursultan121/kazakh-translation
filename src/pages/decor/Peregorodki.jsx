import { Link } from 'react-router-dom'
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
        <span className="perego-soon-badge">СКОРО</span>
        <span className="perego-soon-text">СКОРО</span>
      </div>
    </>
  )
}

export default function Peregorodki() {
  return (
    <div className="peregorodki-page">
      <div className="peregorodki-breadcrumb">
        <Link to="/" className="breadcrumb-link">Главная</Link>
        <span> / </span>
        <Link to="/decor" className="breadcrumb-link">Декор</Link>
        <span> / </span>
        <span>Перегородки</span>
      </div>

      <h1 className="peregorodki-title">
        Перегородки <span>{products.length} товара</span>
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
              <p className="peregorodki-card__desc-label">Описание:</p>
              <p className="peregorodki-card__desc">{p.description}</p>
              <table className="peregorodki-card__table">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{p.article}</td>
                  </tr>
                </tbody>
              </table>
              <div className="peregorodki-card__delivery">
                <span>🚚 Доставка по Казахстану</span>
                <span>📍 Самовывоз: г. Астана, ул. Домалак-ана 26</span>
              </div>
              <a
                href={`${telegramBase}${encodeURIComponent(`Здравствуйте! Хочу узнать о товаре: ${p.title}, артикул: ${p.article}`)}`}
                className="btn-order-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                📝 Оставить заявку
              </a>
              <div className="peregorodki-card__share">
                <button type="button">❤ В избранное</button>
                <button type="button">↗ Поделиться</button>
                <button type="button">⚖ Сравнить</button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}