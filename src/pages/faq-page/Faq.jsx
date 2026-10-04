import './Faq.css'
import { useLang } from '../../i18n/LanguageContext'

// render *emphasis* markers in an answer as <em>
function renderAnswer(text) {
  return text.split(/(\*[^*]+\*)/g).map((seg, i) =>
    seg.length > 2 && seg.startsWith('*') && seg.endsWith('*')
      ? <em key={i}>{seg.slice(1, -1)}</em>
      : seg,
  )
}

function Faq() {
  const { t } = useLang()
  const items = t('faq.items')
  const list = Array.isArray(items) ? items : []

  return (
    <section id="faq" className="faq">
      <h2 className="faq-title">{t('faq.title')}</h2>

      <ul className="faq-grid">
        {list.map((item, i) => (
          <li key={i} className="faq-card">
            <h3 className="faq-q">{item.q}</h3>
            <p className="faq-a">{renderAnswer(item.a)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Faq
