import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import './Sidebar.css'

const menuItems = [
  {
    label: 'sidebar_design',
    links: [
      { text: 'sidebar_design_packages', path: '/' },
      { text: 'sidebar_design_individual', path: '/' },
    ]
  },
  {
    label: 'sidebar_furniture',
    links: [
      { text: 'sidebar_furniture_divany', path: '/secondpage/divany' },
      { text: 'sidebar_furniture_kreslo', path: '/secondpage/kreslo' },
      { text: 'sidebar_furniture_kuhnya', path: '/secondpage' },
      { text: 'sidebar_furniture_pufy', path: '/secondpage/pufy' },
      { text: 'sidebar_furniture_stellazhi', path: '/secondpage/stellazhi' },
      { text: 'sidebar_furniture_stoly', path: '/secondpage' },
      { text: 'sidebar_furniture_stulya', path: '/secondpage/stulya' },
      { text: 'sidebar_furniture_tumby', path: '/secondpage/tumby' },
      { text: 'sidebar_furniture_shkafy', path: '/secondpage/shkafy' },
    ]
  },
  {
    label: 'sidebar_electro',
    links: [
      { text: 'sidebar_electro_panels', path: '/electro/interactive' },
      { text: 'sidebar_electro_computers', path: '/electro/computers' },
      { text: 'sidebar_electro_infokiosk', path: '/electro/infokiosk' },
      { text: 'sidebar_electro_stanki', path: '/electro/stanki' },
      { text: 'sidebar_electro_bytovaya', path: '/electro/bytovaya' },
      { text: 'sidebar_electro_printers', path: '/electro/printers3d' },
    ]
  },
  {
    label: 'sidebar_decor',
    links: [
      { text: 'sidebar_decor_gos', path: '/decor/gos' },
      { text: 'sidebar_decor_panels', path: '/decor/3dpanels' },
      { text: 'sidebar_decor_lighting', path: '/decor/lighting' },
      { text: 'sidebar_decor_peregorodki', path: '/decor/peregorodki' },
      { text: 'sidebar_decor_shtory', path: '/decor/shtory' },
      { text: 'sidebar_decor_rasteniya', path: '/decor/rasteniya' },
      { text: 'sidebar_decor_doski', path: '/decor/doski' },
    ]
  },
  {
    label: 'sidebar_digital',
    links: [
      { text: 'sidebar_digital_roqed', path: '#' },
      { text: 'sidebar_digital_platform', path: '#' },
      { text: 'sidebar_digital_posobiya', path: '#' },
      { text: 'sidebar_digital_stendy', path: '#' },
    ]
  },
  {
    label: 'sidebar_equipment',
    links: [
      { text: 'sidebar_equipment_ulabs', path: '/equipment/ulab' },
      { text: 'sidebar_equipment_labdisc', path: '/equipment/labdisc' },
      { text: 'sidebar_equipment_spike', path: '#' },
      { text: 'sidebar_equipment_arduino', path: '#' },
    ]
  },
  {
    label: 'sidebar_kanaty',
    links: []
  },
]

export default function Sidebar({ isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(null)
  const location = useLocation()
  const { t } = useLang()

  const toggle = (i) => {
    if (menuItems[i].links.length === 0) return
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <>
      <div className={`menu-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />

      <nav className={`menu-sidebar ${isOpen ? 'active' : ''}`}>
        <button className="menu-close" onClick={onClose}>✕</button>
        <h2 className="menu-title">{t.menu_title}</h2>

        <div className="accordion">
          {menuItems.map((item, i) => (
            <div key={i} className={`accordion-item ${openIndex === i ? 'open' : ''}`}>
              <div
                className="accordion-header"
                onClick={() => toggle(i)}
              >
                <span>{t[item.label]}</span>
                {item.links.length > 0 && (
                  <span className="accordion-arrow">V</span>
                )}
              </div>

              {item.links.length > 0 && (
                <div className="accordion-body">
                  <ul>
                    {item.links.map((link, j) => (
                      <li key={j}>
                        <Link
                          to={link.path}
                          className={`accordion-link ${location.pathname === link.path ? 'accordion-link--active' : ''}`}
                          onClick={onClose}
                        >
                          {t[link.text]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}