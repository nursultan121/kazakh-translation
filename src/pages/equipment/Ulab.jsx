import './EquipmentDetail.css'
import { useLang } from '../../i18n/LanguageContext'

export default function Ulab() {
  const { lang, t } = useLang()
  const isKz = lang === 'kz'
  return (
    <div className="page">
      <div className="breadcrumb">{isKz ? 'ЖАБДЫҚТАР | ULABS' : 'ОБОРУДОВАНИЕ | ULABS'}</div>

      <main className="detail-layout">

        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="detail-left">

          <div className="detail-info-block">
            <h2 className="detail-title">{isKz ? 'ULABS ЖИЫНТЫҒЫ' : 'НАБОР ULABS'}</h2>
            <p className="detail-desc">
              {isKz
                ? 'ULABS "Зертханалық жинақ" K-12 бағдарламасы бойынша оқытуға арналған. Мұғалімдер оны биологиядан демонстрациялық, зертханалық және практикалық жұмыстарда қолданады. Ол оқушыларды өсімдіктер мен жануарлардың морфологиялық және анатомиялық құрылысымен, тірі ағзалардағы биохимиялық және физиологиялық үдерістермен таныстырады.'
                : 'Набор ULABS «Лабораторный комплект» предназначен для обучения по программе К-12. Используется учителем во время демонстрационных, лабораторных и практических работ по биологии. Позволяет ознакомить учеников с морфологическим и анатомическим строением растений, животных, особенностями биохимических и физиологических процессов живых организмов. Элементы набора используются в работах с цифровыми измерительными комплексами.'}
            </p>

            <p className="detail-order">
              <strong>{isKz ? 'pcb-ulabs-01 Бұйрық №70, нөмірі - 1628' : 'pcb-ulabs-01 Приказ №70, номер - 1628'}</strong><br />
              {isKz ? 'Демонстрациялық тәжірибелер мен зертханалық жұмыстарға арналған ыдыстар мен құралдар жиынтығы' : 'Набор посуды и принадлежностей для демонстрационных опытов и лабораторных работ'}
            </p>
          </div>

          <div className="detail-chars">
            <h3 className="detail-chars__title">{t.product_characteristics}</h3>
            <div className="detail-chars__grid">
              <div className="char-card">
                <span className="char-card__icon">🖥️</span>
                <span className="char-card__label">{isKz ? 'Процессор сериясы' : 'Серия процессора'}</span>
                <span className="char-card__value">Intel Core i3 GEN6</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">🖼️</span>
                <span className="char-card__label">{isKz ? 'Дисплей ажыратымдылығы' : 'Разрешение дисплея'}</span>
                <span className="char-card__value">FullHD</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">💾</span>
                <span className="char-card__label">{isKz ? 'Жедел жад көлемі' : 'Объём оперативной памяти'}</span>
                <span className="char-card__value">8Gb</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">⚡</span>
                <span className="char-card__label">{isKz ? 'Жедел жад түрі' : 'Тип оперативной памяти'}</span>
                <span className="char-card__value">DDR3</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">💿</span>
                <span className="char-card__label">{isKz ? 'Жинақтағыш түрі' : 'Тип накопителя'}</span>
                <span className="char-card__value">SSD 128Gb</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">🪟</span>
                <span className="char-card__label">{isKz ? 'Операциялық жүйе' : 'Операционная система'}</span>
                <span className="char-card__value">Windows 10</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">📐</span>
                <span className="char-card__label">{isKz ? 'Диагональ' : 'Диагональ'}</span>
                <span className="char-card__value">49"</span>
              </div>
              <div className="char-card">
                <span className="char-card__icon">👆</span>
                <span className="char-card__label">{isKz ? 'Жанасу саны' : 'Количество касаний'}</span>
                <span className="char-card__value">{isKz ? '10 жанасу' : '10 касаний'}</span>
              </div>
            </div>
          </div>

          <p className="detail-article">{t.article_label}: S.Ee-INK.DD5.K</p>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className="detail-right">
          <img src="/img/equipment/ulab.png" alt="ULABS" className="detail-img" />
        </div>

      </main>
    </div>
  )
}
