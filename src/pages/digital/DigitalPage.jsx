import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import './DigitalPage.css'

const row1 = [
  { title: 'ROQED SCIENCE',  img: '/img/pagedigital/roqed.png',         path: '/digital/roqed' },
  { title: 'STEM PLATFORM',  img: '/img/pagedigital/stem-platform.png', path: '/digital/stemplatform' },
]

const row2 = [
  {
    title: 'ИНФО СТЕНДЫ',
    img: '/img/pagedigital/infostend.png',
    path: '/digital/infostend',
    description: 'Инфо-стенды для образовательных пространств с современным дизайном и удобной подачей материалов для учеников и преподавателей.',
  },
  {
    title: 'STEAM BOOK',
    img: '/img/pagedigital/steambook.png',
    path: '/digital/steambook',
    description: 'STEAM BOOK — интерактивный образовательный формат с цифровыми ресурсами, практическими заданиями и учебными материалами для STEM-программ.',
  },
]

const allItems = [...row1, ...row2]

export default function DigitalPage() {
  const { lang, t } = useLang()
  const isKz = lang === 'kz'
  const row2Localized = row2.map((item) => ({
    ...item,
    title:
      isKz && item.title === 'ИНФО СТЕНДЫ'
        ? 'АҚПАРАТТЫҚ СТЕНДТЕР'
        : item.title,
    description:
      isKz && item.title === 'ИНФО СТЕНДЫ'
        ? 'Оқушылар мен мұғалімдерге арналған материалдарды заманауи түрде ұсынатын білім беру кеңістіктеріне арналған ақпараттық стендтер.'
        : isKz && item.title === 'STEAM BOOK'
          ? 'STEAM BOOK — цифрлық ресурстар, практикалық тапсырмалар және STEM бағдарламаларына арналған оқу материалдары бар интерактивті білім беру форматы.'
          : item.description,
  }))

  return (
    <div className="digital-page">

      <div className="digital-breadcrumb">
        <Link to="/" className="breadcrumb-link">{t.home}</Link>
        <span> / </span>
        <span>{t.nav_digital}</span>
      </div>

      <div className="digital-header">
        <h1 className="digital-header__title">{t.nav_digital}</h1>
        <span className="digital-header__count">{t.found} {allItems.length} {t.categories}</span>
      </div>

      <main className="digital-main">

        <div className="digital-row digital-row--2">
          {row1.map((item, i) => (
            <Link key={i} to={item.path} className="digital-card digital-card--img">
              <span className="digital-card__title">{item.title}</span>
              <div className="digital-card__img-wrap">
                <img src={item.img} alt={item.title} className="digital-card__img" />
              </div>
            </Link>
          ))}
        </div>

        <div className="digital-row digital-row--2">
          {row2Localized.map((item, i) => (
            <Link key={i} to={item.path} className="digital-card digital-card--text">
              <div className="digital-card__content">
                <span className="digital-card__title">{item.title}</span>
                <p className="digital-card__desc">{item.description}</p>
              </div>
              <div className="digital-card__img-wrap">
                <img src={item.img} alt={item.title} className="digital-card__img" />
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  )
}