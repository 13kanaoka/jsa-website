import './About.css'
import { useLang } from '../../i18n/LanguageContext'

function About() {
    const { t } = useLang()

    return (
        <section id="about" className="about">
            <div className="about-header">
                <h1>{t('about.title')}</h1>
            </div>
        </section>
    )
}

export default About