import './About.css'
import { useLang } from '../../i18n/LanguageContext'
import misumi from '../../assets/about-story/misumi.jpg'
import misumiWife from '../../assets/about-story/misumi-wife.jpg'
import founder from '../../assets/about-story/founder.jpg'
import today from '../../assets/about-story/today.jpg'
import undoukai from '../../assets/about-story/undoukai.jpg'

// photos per story stop (not language-dependent, so keyed by index)
const STORY_MEDIA = [[misumi, misumiWife], [founder], [today]]

function About() {
  const { t } = useLang()
  const story = t('about.story')
  const activities = t('about.activities')
  const storyList = Array.isArray(story) ? story : []
  const actList = Array.isArray(activities) ? activities : []

  return (
    <section id="about" className="about">
      <h2 className="about-title">{t('about.title')}</h2>
      <p className="about-lede">{t('about.lede')}</p>

      <h2 className="about-subhead">{t('about.storyTitle')}</h2>
      <ol className="about-timeline">
        {storyList.map((stop, i) => {
          const media = STORY_MEDIA[i] || []
          return (
            <li key={i} className="about-stop">
              <div className={`about-stop-media${media.length === 2 ? ' is-pair' : ''}`}>
                {media.map((src, j) => (
                  <img key={j} src={src} alt="" loading="lazy" />
                ))}
              </div>
              <div className="about-stop-text">
                <span className="about-stop-num" aria-hidden="true">{i + 1}</span>
                <h3>{stop.heading}</h3>
                <p>{stop.body}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <h2 className="about-subhead">{t('about.activitiesTitle')}</h2>
      <ul className="about-tiles">
        {actList.map((a, i) => (
          <li key={i} className="about-tile">
            <span className="about-tile-emoji" aria-hidden="true">{a.emoji}</span>
            <span>{a.label}</span>
          </li>
        ))}
      </ul>

      <div className="about-spotlight">
        <img src={undoukai} alt="" className="about-spotlight-img" loading="lazy" />
        <div className="about-spotlight-text">
          <h3>{t('about.undoukaiTitle')}</h3>
          <p>{t('about.undoukaiBody')}</p>
        </div>
      </div>
    </section>
  )
}

export default About
