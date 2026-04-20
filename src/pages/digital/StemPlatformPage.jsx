import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import './StemPlatformPage.css'

export default function StemPlatformPage() {
  const { lang, t } = useLang()
  const isKz = lang === 'kz'

  return (
    <div className="stemplatform-page">
      <div className="stemplatform-breadcrumb">
        <Link to="/">{t.home}</Link> / <Link to="/digital">{t.nav_digital}</Link> / STEM Platform
      </div>

      <div className="stemplatform-layout">

        {/* ЛЕВАЯ КОЛОНКА — только текст */}
        <div className="stemplatform-left">
          <div className="stemplatform-card">
            <h1>STEM PLATFORM</h1>
            <p className="stemplatform-desc">
              {isKz
                ? 'STEM PLATFORM — оқу жобалары мен сыныпты цифрлық басқаруға арналған платформа. Ол интерактивті оқыту, прогресті бақылау және STEM іс-шараларын ұйымдастыру құралдарын біріктіреді.'
                : 'STEM PLATFORM — платформа для учебных проектов и цифрового управления классом. Она объединяет инструменты для интерактивного обучения, контроля прогресса и организации STEM-мероприятий.'}
            </p>
            <div className="stemplatform-article">{t.article_label}: S.Ee-PC.MB.AVT.Pro</div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА — только картинка */}
        <div className="stemplatform-right">
          <img
            src="/img/pagethird/computers/item2.png"
            alt="STEM Platform"
            className="stemplatform-img"
          />
        </div>

      </div>
    </div>
  )
}