import jsaLogo from '../assets/jsa-logo.png'
import { useLang } from '../i18n/LanguageContext'
import LangToggle from './LangToggle'
import './Header.css'

function Header() {
    const { t } = useLang()

    return (
        <header className="site-header">
            <a href="#home" className="brand">
                <img src={jsaLogo} alt={t('header.logoAlt')} className="logo" />
            </a>

            <LangToggle />
        </header>
    )
}

export default Header