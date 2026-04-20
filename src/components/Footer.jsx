import { Link } from 'react-router-dom'
import TelegramButton from './TelegramButton'
import { useLang } from '../i18n/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t, lang } = useLang()
  return (
    <footer className="footer">
      <div className="footer-main">

        {/* КОЛОНКА 1 — Бренд */}
        <div className="footer-col footer-col--brand">
          <div className="footer-logo">
            <span className="footer-logo-stem">STEM</span>
            <span className="footer-logo-academia">Academia</span>
          </div>
          <p className="footer-tagline">{t.footer_tagline}</p>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/stem_academia?igsh=OGhjeHR5YnNoYXE5"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
            >
              IG
            </a>
            <a
              href="https://www.youtube.com/@stemacademia6974"
              target="_blank"
              rel="noreferrer"
              title="YouTube"
            >
              YT
            </a>
            <a href="#" title="WhatsApp">WA</a>
            <a
              href="https://t.me/stem_academia_bot"
              target="_blank"
              rel="noreferrer"
              title="Telegram"
            >
              TG
            </a>
          </div>
        </div>

        {/* КОЛОНКА 2 — Каталог */}
        <div className="footer-col">
          <h4 className="footer-col__title">{t.footer_catalog}</h4>
          <ul className="footer-col__list">
            <li><Link to="/">{t.nav_design}</Link></li>
            <li><Link to="/secondpage">{t.nav_furniture}</Link></li>
            <li><Link to="/electro">{t.nav_electro}</Link></li>
            <li><Link to="/decor">{t.nav_decor}</Link></li>
            <li><Link to="/equipment">{t.nav_equipment}</Link></li>
            <li><Link to="/digital">{t.nav_digital}</Link></li>
          </ul>
        </div>

        {/* КОЛОНКА 3 — Компания */}
        <div className="footer-col">
          <h4 className="footer-col__title">{t.footer_company}</h4>
          <ul className="footer-col__list">
            <li>
              <a
                href="https://stem-academia.com/about-us/"
                target="_blank"
                rel="noreferrer"
              >
                {t.footer_about}
              </a>
            </li>
            <li>
              <a
                href="https://stem-academia.com/pricing-plan/"
                target="_blank"
                rel="noreferrer"
              >
                {t.footer_projects}
              </a>
            </li>
            <li><Link to="/contacts">{t.footer_partners}</Link></li>
            <li><Link to="/contacts">{t.footer_vacancies}</Link></li>
          </ul>
        </div>

        {/* КОЛОНКА 4 — Контакты */}
        <div className="footer-col">
          <h4 className="footer-col__title">{t.nav_contacts}</h4>
          <ul className="footer-col__list footer-col__list--contacts">
            <li>📍 {lang === 'kz' ? 'Астана қ., Домалақ-ана көшесі 26' : 'г. Астана, ул. Домалак-ана 26'}</li>
            <li>📞 <a href="tel:+77000000000">+7 (700) 000-00-00</a></li>
            <li>✉ <a href="mailto:info@stemacademia.kz">info@stemacademia.kz</a></li>
            <li>🕐 {t.footer_schedule}</li>
          </ul>
        </div>
      </div>

      {/* НИЖНЯЯ ПОЛОСА */}
      <div className="footer-bottom">
        <span>{t.footer_rights}</span>
        <div className="footer-bottom__links">
          <a href="#">{t.footer_privacy}</a>
          <a href="#">{t.footer_terms}</a>
        </div>
      </div>
    </footer>
  )
}