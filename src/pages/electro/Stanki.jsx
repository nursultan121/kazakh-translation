import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import './Stanki.css'

const products = [
  {
    id: 1,
    tag: 'The cool tool',
    title: 'UNIMAT ML 160200',
    img: '/img/pagethird/stanki/item1.png',
    description: [
      'Unimat — это многофункциональный учебно-лабораторный станок, предназначенный для изучения основ обработки материалов, инженерии и технологий. Станок позволяет учащимся и студентам выполнять практические задания, развивать навыки работы с металлом и пластиком, а также создавать учебные проекты в безопасной учебной среде.',
    ],
    article: 'S.Me-ST.S.DP',
  },
  {
    id: 2,
    tag: 'The cool tool',
    title: 'UNIMAT 1 BASIC 4B1',
    img: '/img/pagethird/stanki/item2.png',
    description: [
      'Unimat по дереву — это многофункциональный учебно-лабораторный станок, предназначенный для изучения основ обработки древесины, инженерии и технологий. Станок позволяет учащимся и студентам выполнять практические задания, развивать навыки работы с древесными материалами.',
    ],
    article: 'S.Me-ST.S.DP',
  },
  {
    id: 3,
    tag: 'The cool tool',
    title: 'NAME_TEXT',
    img: '/img/pagethird/stanki/item3.png',
    description: [
      'Учебный станок для освоения базовых технологий обработки материалов и моделирования, оптимизированный для практических занятий.',
      'Оснащён безопасными механизмами и позволяет изучать точность обработки, сборку прототипов и конструирование изделий.',
    ],
    article: 'S.Me-ST.S.DP',
  },
]

export default function Stanki() {
  const { t, lang } = useLang()
  const isKz = lang === 'kz'
  const telegramBase = 'https://t.me/stem_academia_bot?text='

  return (
    <div className="stanki-page">

      <div className="stanki-breadcrumb">
        <Link to="/" className="breadcrumb-link">{t.home}</Link>
        <span> / </span>
        <Link to="/electro" className="breadcrumb-link">{t.electro}</Link>
        <span> / </span>
        <span>{t.electro_stanki}</span>
      </div>

      <h1 className="stanki-title">
        {t.electro_stanki} <span>{products.length} {isKz ? 'тауар' : 'товара'}</span>
      </h1>

      <div className="stanki-list">
        {products.map((p) => (
          <div key={p.id} className="divan-card">

            <div className="divan-card__gallery">
              <img src={p.img} alt={p.title} className="divan-card__main-img" />
            </div>

            <div className="divan-card__info">
              <p className="stanki-tag">{p.tag}</p>
              <h2 className="divan-card__title">{p.title}</h2>

              <div className="divan-card__section">
                <span className="divan-card__label">{t.product_description}:</span>
                {p.description.map((d, i) => (
                  <p key={i} className="divan-card__desc">{d}</p>
                ))}
              </div>

              <div className="divan-card__section">
                <table className="divan-card__table">
                  <tbody>
                    <tr>
                      <td>{t.article_label}</td>
                      <td>{p.article}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="divan-card__delivery">
                <span>🚚 {t.delivery}</span>
                <span>📍 {t.pickup}</span>
              </div>

              <div className="divan-card__actions">
                <a
                  href={`${telegramBase}${encodeURIComponent(`${t.inquiry_message_prefix} ${p.title}, ${t.article_label}: ${p.article}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-order"
                >
                  {t.order_btn}
                </a>
                <button className="btn-favorite">❤ {t.favorite_add}</button>
              </div>

              <div className="divan-card__share">
                <button>↗ {t.share}</button>
                <button>⚖ {t.compare}</button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}