import { useLang } from '../i18n/LanguageContext.jsx'
import './Contacts.css'

export default function Contacts() {
  const { t, lang } = useLang()

  return (
    <div className="contacts-page">

      {/* Верхняя часть — зелёный фон с лого */}
      <div className="contacts-hero">
        <div className="contacts-hero__bg" />
        <div className="contacts-hero__logo">
          <img src="/img/vvedenie/Vector.png" alt="STEM Academia" className="contacts-hero__logo-img" />
        </div>
      </div>

      {/* Нижняя часть — контактная информация */}
      <div className="contacts-info">
        <div className="contacts-info__divider" />

        <div className="contacts-info__grid">

          {/* Телефон */}
          <div className="contacts-col">
            <h3 className="contacts-col__title">{t.contacts_phone}</h3>
            <a href="tel:+77778703206" className="contacts-col__text">+7 777 870 32 06</a>
            <a href="tel:+77776971423" className="contacts-col__text">+7 777 697 14 23</a>
            <a href="tel:+77000880132" className="contacts-col__text">+7 700 088 01 32</a>
            <a href="tel:+77000880137" className="contacts-col__text">+7 700 088 01 37</a>
            <a href="tel:+77000880958" className="contacts-col__text">+7 700 088 09 58</a>
          </div>

          {/* Почта */}
          <div className="contacts-col">
            <h3 className="contacts-col__title">{t.contacts_email}</h3>
            <p className="contacts-col__desc">{t.contacts_email_desc}</p>
            <a href="mailto:sm1@stem-academia.com" className="contacts-col__text">sm1@stem-academia.com</a>
            <a href="mailto:sm2@stem-academia.com" className="contacts-col__text">sm2@stem-academia.com</a>
            <a href="mailto:sm3@stem-academia.com" className="contacts-col__text">sm3@stem-academia.com</a>
            <a href="mailto:sm4@stem-academia.com" className="contacts-col__text">sm4@stem-academia.com</a>
            <a href="mailto:sm5@stem-academia.com" className="contacts-col__text">sm5@stem-academia.com</a>
          </div>

          {/* Поддержка */}
          <div className="contacts-col">
            <h3 className="contacts-col__title">{t.contacts_support}</h3>
            <p className="contacts-col__desc">{t.contacts_support_desc}</p>
            <a href="mailto:info@stem-academia.com" className="contacts-col__text">info@stem-academia.com</a>
          </div>

          {/* Адрес */}
          <div className="contacts-col">
            <h3 className="contacts-col__title">{t.contacts_address}</h3>
            <p className="contacts-col__text">
              {lang === 'kz' ? 'Астана қ., Домалақ Ана 26' : 'г. Астана, Домалак Ана 26'}
            </p>
            <p className="contacts-col__text">
              {lang === 'kz' ? 'Алматы қ., Әл-Фараби даңғылы 77/2' : 'г. Алматы, проспект Аль - Фараби 77/2'}
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}