import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import './Category.css'
import './Stulya.css'

export default function Stulya() {
  const { lang } = useLang()
  const isKz = lang === 'kz'
  const subcategories = [
    { title: isKz ? 'МЕКТЕП ОРЫНДЫҚТАРЫ' : 'ШКОЛЬНЫЕ СТУЛЬЯ', img: '/img/pagesecond/stulya/shkolnye.png', path: '/secondpage/stulya/shkolnye' },
    { title: isKz ? 'ТАБУРЕТТЕР' : 'ТАБУРЕТЫ', img: '/img/pagesecond/stulya/taburety.png', path: '/secondpage/stulya/taburety' },
    { title: isKz ? 'ЖҰМСАҚ ОРЫНДЫҚТАР' : 'МЯГКИЕ СТУЛЬЯ', img: '/img/pagesecond/stulya/myagkie.png', path: '/secondpage/stulya/myagkie' },
    { title: isKz ? 'БАР ОРЫНДЫҚТАРЫ' : 'БАРНЫЕ СТУЛЬЯ', img: '/img/pagesecond/stulya/barnye.png', path: '/secondpage/stulya/barnye' },
  ]

  return (
    <div className="page">
      <div className="breadcrumb">{isKz ? 'ЖИҺАЗ / ОРЫНДЫҚТАР' : 'МЕБЕЛЬ / СТУЛЬЯ'}</div>
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