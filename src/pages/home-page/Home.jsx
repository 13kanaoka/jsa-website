import './Home.css'
import jsaLogo from '../../assets/jsa-logo.png'
import photo1 from '../../assets/slider/1_undoukai.png'
import photo2 from '../../assets/slider/2_karaoke.png'
import photo3 from '../../assets/slider/3_calligraphy.jpg'
import photo4 from '../../assets/slider/4_party.jpg'

import { useLang } from '../../i18n/LanguageContext'

const SLIDES = [photo1, photo2, photo4, photo3]

function Home() {
    const { t } = useLang()

    return (
        <section id="home" className="home">
            <div className="hero">
                <div className="slider">
                    <div className="slider-track">
                        {[...SLIDES, ...SLIDES].map((src, i) => (
                            <img key={i} src={src} className="slide" alt="" />
                        ))}
                    </div>
                </div>
                <div className="overlay"></div>
                <div className="hero-text">
                    <img src={jsaLogo} alt={t('hero.logoAlt')} className="hero-logo" />
                    <h2>{t('hero.kanji')}</h2>
                    <h1>{t('hero.title')}</h1>
                    <p>{t('hero.tagline')}</p>
                </div>
            </div>
        </section>
    )
}

export default Home