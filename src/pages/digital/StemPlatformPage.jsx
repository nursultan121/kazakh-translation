import { Link } from 'react-router-dom'
import './StemPlatformPage.css'

export default function StemPlatformPage() {
  return (
    <div className="stemplatform-page">
      <div className="stemplatform-breadcrumb">
        <Link to="/">Главная</Link> / <Link to="/digital">Цифровые продукты</Link> / STEM Platform
      </div>

      <div className="stemplatform-layout">

        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="stemplatform-left">
          <div className="stemplatform-card">
            <h1>STEM PLATFORM</h1>
            <p className="stemplatform-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque erat lacus,
              tempus id interdum in, ullamcorper in lorem. Vestibulum vel nisl consectetur,
              hendrerit nulla a, ornare risus. Fusce dolor nisi, rutrum eu placerat sed, rutrum sed
              massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Fusce vitae scelerisque nulla. Donec euismod augue vitae metus
              tristique elementum sit amet vel nibh. In euismod lorem turpis, ac tempus eros
              vestibulum sed.
            </p>

            <div className="stemplatform-image-block">
              <img
                src="/img/pagethird/computers/item2.png"
                alt="STEM Platform"
              />
            </div>

            <div className="stemplatform-article">Артикул: S.Ee-PC.MB.AVT.Pro</div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА — пустая как на макете */}
        <div className="stemplatform-right" />

      </div>
    </div>
  )
}