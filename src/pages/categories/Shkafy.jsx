import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import './Category.css'
import './Stulya.css'

export default function Shkafy() {
  const { lang } = useLang()
  const isKz = lang === 'kz'
  const subcategories = [
    { title: isKz ? 'КІРІКТІРМЕ ШКАФТАР' : 'ВСТРОЕННЫЕ ШКАФЫ', img: '/img/pagesecond/shkafy/vstroenye.png', path: '/secondpage/shkafy/vstroenye' },
    { title: isKz ? 'СТАНДАРТ ШКАФТАР' : 'СТАНДАРТНЫЕ ШКАФЫ', img: '/img/pagesecond/shkafy/standartnye.png', path: '/secondpage/shkafy/standartnye' },
  ]

  return (
    <div className="page">
      <div className="breadcrumb">{isKz ? 'ЖИҺАЗ / ШКАФТАР' : 'МЕБЕЛЬ / ШКАФЫ'}</div>
      <main className="stulya-grid">
        {subcategories.map((cat, i) => (
          <Link key={i} to={cat.path} className="stulya-card">
            {cat.img ? (
              <img
                src={cat.img}
                alt={cat.title}
                className="stulya-card__img"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div
              className="stulya-card__soon"
              style={{ display: cat.img ? 'none' : 'flex' }}
            >
              <span className="stulya-card__soon-badge">{isKz ? 'ЖАҚЫНДА' : 'СКОРО'}</span>
              <span className="stulya-card__soon-text">{isKz ? 'ЖАҚЫНДА' : 'СКОРО'}</span>
            </div>
            <span className="stulya-card__title">{cat.title}</span>
          </Link>
        ))}
      </main>
    </div>
  )
}