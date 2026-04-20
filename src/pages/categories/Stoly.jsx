import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import './Stoly.css'

export default function Stoly() {
  const { lang, t } = useLang()
  const isKz = lang === 'kz'
  const categories = [
    { title: isKz ? 'ПАРТАЛАР' : 'ПАРТЫ', img: '/img/pagesecond/stoly/spezstoly.jpg', path: '/secondpage/stoly/party' },
    { title: isKz ? 'ЖҰМЫС ҮСТЕЛДЕРІ' : 'РАБОЧИЕ СТОЛЫ', img: null, path: '/secondpage/stoly/rabochie' },
    { title: isKz ? 'РЕСЕПШН' : 'РЕСЕПШЕН', img: '/img/pagesecond/stoly/reception.png', path: '/secondpage/stoly/reception' },
    { title: isKz ? 'КОНФЕРЕНЦИЯ ҮСТЕЛІ' : 'КОНФЕРЕНЦ СТОЛ', img: '/img/pagesecond/stoly/confstol.png', path: '/secondpage/stoly/konferents' },
    { title: isKz ? 'АРНАЙЫ ҮСТЕЛДЕР' : 'СПЕЦ СТОЛЫ', img: null, path: '/secondpage/stoly/spets' },
    { title: isKz ? 'МҰҒАЛІМГЕ АРНАЛҒАН АРНАЙЫ ҮСТЕЛДЕР' : 'СПЕЦ СТОЛЫ для преподавателя', img: '/img/pagesecond/stoly/party.png', path: '/secondpage/stoly/spets-teacher' },
  ]

  return (
    <div className="stoly-page">
      <div className="stoly-breadcrumb">
        <Link to="/">{t.home}</Link> / <Link to="/secondpage">{t.furniture}</Link> / {isKz ? 'Үстелдер' : 'Столы'}
      </div>

      <h1 className="stoly-heading">
        {isKz ? 'Жиһаз | Үстелдер' : 'Мебель | Столы'} <span className="stoly-count">{t.found} {categories.length} {t.categories}</span>
      </h1>

      <div className="stoly-grid">
        {categories.map((cat) => (
          <Link to={cat.path} key={cat.title} className="stoly-card">
            <span className="stoly-card__title">{cat.title}</span>
            <div className="stoly-card__img-wrap">
              {cat.img ? (
                <img src={cat.img} alt={cat.title} />
              ) : (
                <div className="stoly-card__soon">
                  <span className="stoly-card__soon-badge">{isKz ? 'ЖАҚЫНДА' : 'СКОРО'}</span>
                  <span className="stoly-card__soon-text">{isKz ? 'ЖАҚЫНДА' : 'СКОРО'}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}