import './EquipmentDetail.css'
import { useLang } from '../../i18n/LanguageContext'

export default function Labdisc() {
  const { lang, t } = useLang()
  const isKz = lang === 'kz'
  return (
    <div className="page">
      <div className="breadcrumb">{isKz ? 'ЖАБДЫҚТАР | LABDISC' : 'ОБОРУДОВАНИЕ | LABDISC'}</div>

      <main className="detail-layout">

        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="detail-left">

          <div className="detail-info-block">
            <h2 className="detail-title">{isKz ? 'LABDISC ЦИФРЛЫҚ ЗЕРТХАНАСЫ' : 'ЦИФРОВАЯ ЛАБОРАТОРИЯ LABDISC'}</h2>
            <p className="detail-desc">
              {isKz
                ? 'LabDisc деректер тіркеушісі бастауыш және орта мектепте физиканы оқуға арнайы әзірленген. Әмбебаптығы, ықшамдылығы және кіріктірілген датчиктерінің арқасында құрылғыны қолдану оңай әрі ыңғайлы.'
                : 'Регистратор данных ЛабДиск специально разработан для изучения Физики в начальной и средней школе. Благодаря своей универсальности и портативности, а также наличию встроенных датчиков, использовать устройства довольно просто и удобно.'}
            </p>
            <p className="detail-desc">
              {isKz
                ? 'Далалық жағдайда деректерді тіркеу үшін LabDisc 150 сағатқа жететін аккумулятормен, графикалық дисплеймен және батырмалы пернетақтамен жабдықталған. Сыныпта құрылғы компьютермен USB немесе Bluetooth арқылы байланысады. Тіркеуші 12-биттік өлшеу дәлдігін қамтамасыз етіп, ғылыми тәжірибелердің кең ауқымында қолданылады.'
                : 'Для проведения регистрации данных в полевых условиях ЛабДиск имеет аккумулятор на 150 часов работы, графический дисплей, кнопочную клавиатуру. В классе ЛабДиск может взаимодействовать с компьютером через USB-кабель или беспроводное соединение Bluetooth. Регистратор может использоваться в широком диапазоне научных экспериментов, обеспечивая 12-битное разрешение измерений.'}
            </p>
          </div>

          <div className="detail-chars">
            <h3 className="detail-chars__title">{t.product_characteristics}</h3>
            <div className="detail-chars__grid">
              <div className="char-card">
                <span className="char-card__icon">🔋</span>
                <span className="char-card__label">{isKz ? 'Ішкі аккумулятор' : 'Внутренний аккумулятор'}</span>
                <span className="char-card__value">LiPO 3.6B</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">🖥️</span>
                <span className="char-card__label">{isKz ? 'Экран графикалық СК 64 x 128 пиксель' : 'Экран Графический жк 64 x 128 пикселей'}</span>
                <span className="char-card__value">{isKz ? 'Экран' : 'Экран'}</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">💧</span>
                <span className="char-card__label">{isKz ? 'pH датчигі' : 'Датчик pH'}</span>
                <span className="char-card__value">{isKz ? '0-ден 14 pH дейін' : 'От 0 до 14 pH'}</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">🔌</span>
                <span className="char-card__label">{isKz ? 'Интерфейс' : 'Интерфейс'}</span>
                <span className="char-card__value">USB V2.0</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">🌡️</span>
                <span className="char-card__label">{isKz ? 'Жұмыс температурасы' : 'Работает при температуре'}</span>
                <span className="char-card__value">{isKz ? '-10-нан 50 °C дейін' : 'От -10 до 50 °C'}</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">⚡</span>
                <span className="char-card__label">{isKz ? 'Өлшеудің ең жоғары жылдамдығы' : 'Максимальная скорость измерения'}</span>
                <span className="char-card__value">1000/сек</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">🔋</span>
                <span className="char-card__label">{isKz ? 'Аккумулятордың ең ұзақ жұмыс уақыты' : 'Максимальный срок службы аккумулятора'}</span>
                <span className="char-card__value">{isKz ? '150 сағат' : '150 часов'}</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">📶</span>
                <span className="char-card__label">{isKz ? 'Сымсыз байланыс' : 'Беспроводное соединение'}</span>
                <span className="char-card__value">Bluetooth V2.0</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">☁️</span>
                <span className="char-card__label">{isKz ? 'Оттегі датчигі' : 'Датчик кислорода'}</span>
                <span className="char-card__value">{isKz ? '0-ден 14 мг/л дейін (0-ден 25 %)' : 'От 0 до 14 Мг/л (от 0 до 25 %)'}</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">💡</span>
                <span className="char-card__label">{isKz ? 'Жарық датчигінің ауқымы, люкс' : 'Диапазон светового датчика, люкс'}</span>
                <span className="char-card__value">{isKz ? '0-ден 55 000 дейін' : 'От 0 до 55 000'}</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">🖥️</span>
                <span className="char-card__label">{isKz ? 'Қолдау көрсетілетін платформалар' : 'Поддерживаемые платформы'}</span>
                <span className="char-card__value">PC, MAC, Chromebook, iPad Linux, Android</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">💾</span>
                <span className="char-card__label">{isKz ? 'Деректерді сақтаудың ішкі жады' : 'Внутренняя память сохранения данных'}</span>
                <span className="char-card__value">{isKz ? '128 000 өлшем' : '128,000 измерений'}</span>
              </div>
            </div>
          </div>

          <p className="detail-article">{t.article_label}: S.Ee-INK.DDS.K</p>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className="detail-right">
          <img src="/img/equipment/labdisc.png" alt="LABDISC" className="detail-img" />
        </div>

      </main>
    </div>
  )
}
