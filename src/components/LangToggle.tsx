import { useLang } from '../i18n/LanguageContext'
import './LangToggle.css'

function LangToggle() {
  const { lang, toggleLang, t } = useLang()

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggleLang}
      role="switch"
      aria-checked={lang === 'ja'}
      aria-label={t('ui.switchLanguage')}
    >
      <span className={`lang-option ${lang === 'en' ? 'is-active' : ''}`}>EN</span>
      <span className={`lang-option ${lang === 'ja' ? 'is-active' : ''}`}>日本語</span>
    </button>
  )
}

export default LangToggle