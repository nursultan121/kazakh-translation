import './FirstPage.css'
import HeroSlider from '../components/HeroSlider'
import CategoryGrid from '../components/CategoryGrid'
import { useLang } from '../i18n/LanguageContext'

export default function FirstPage() {
  const { t, lang } = useLang()
  const isKz = lang === 'kz'
  
  return (
    <div className="page">
      {/* Hero и категории */}
      <HeroSlider />
      <CategoryGrid />
      
      {/* Breadcrumb */}
      <div className="breadcrumb">{t.design_breadcrumb}</div>
      
      {/* Пакеты дизайна */}
      <main className="packages">
        {/* STANDARD */}
        <div className="package package--s">
          <div className="package__content">
            <h2 className="package__title">Standard</h2>
            <p className="package__desc">{t.pkg_s_desc}</p>
            <ul className="package__list">
              {t.pkg_s_items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <img src="/img/pagefirst/Слой1.png" alt={isKz ? 'Орындық' : 'Стул'} className="package__img" />
          <div className="package__price">90 000 ₸</div>
        </div>

        {/* COMFORT */}
        <div className="package package--m">
          <div className="package__content">
            <h2 className="package__title">Comfort</h2>
            <p className="package__desc">{t.pkg_m_desc}</p>
            <ul className="package__list">
              {t.pkg_m_items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <img src="/img/pagefirst/plant.png" alt={isKz ? 'Өсімдік' : 'Растение'} className="package__img" />
          <div className="package__price">130 000 ₸</div>
        </div>

        {/* PREMIUM */}
        <div className="package package--l">
          <div className="package__content">
            <h2 className="package__title">Premium</h2>
            <p className="package__desc">{t.pkg_l_desc}</p>
            <ul className="package__list">
              {t.pkg_l_items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <img src="/img/pagefirst/F5.png" alt={isKz ? 'Кресло' : 'Кресло'} className="package__img" />
          <div className="package__price">180 000 ₸</div>
        </div>
      </main>

      {/* Dream секция БЕЗ TelegramButton */}
      <section className="dream">
        <img src="/img/pagefirst/key1.png" alt="" className="dream__key dream__key--tl" />
        <img src="/img/pagefirst/key1.png" alt="" className="dream__key dream__key--tm" />
        <img src="/img/pagefirst/key1.png" alt="" className="dream__key dream__key--bl" />
        <img src="/img/pagefirst/key1.png" alt="" className="dream__key dream__key--br" />
        
        <div className="dream__left">
          <h2 className="dream__title">{isKz ? 'Болашағымызға арналған инновациялық шешім' : 'Инновационное решение для нашего будущего'}</h2>
          <p className="dream__desc">{t.dream_desc}</p>
          <a href="#" className="dream__btn">{t.dream_btn}</a>
          {/* TelegramButton удалён */}
        </div>
        
        <div className="dream__right">
          <img src="/img/pagefirst/room.png" alt={isKz ? 'Бөлме' : 'Комната'} className="dream__room" />
        </div>
      </section>
    </div>
  )
}