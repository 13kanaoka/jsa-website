import './Home.css'
import jsaLogo from '../../assets/jsa-logo.png'
import { useLang } from '../../i18n/LanguageContext'

// intrinsic pixel size (w, h) of each collage photo — drives its tile shape below.
// Add a photo? add its size here; anything missing falls back to a 1x1 tile.
const DIMS = {
  '01-barbecue-group': [900, 675],
  '02-calligraphy': [900, 672],
  '03-halloween-1': [900, 600],
  '04-sports-day-1': [900, 600],
  '05-board-group-1': [675, 900],
  '06-meet-the-clubs': [900, 675],
  '07-silly-2': [675, 900],
  '08-karaoke': [900, 672],
  '09-undoukai-2': [515, 900],
  '10-planning': [675, 900],
  '11-board-group-2': [900, 675],
  '12-party': [900, 675],
  '13-halloween-2': [900, 600],
  '14-sports-day-2': [900, 600],
  '15-undoukai-3': [667, 900],
  '16-silly-1': [507, 900],
  '17-undoukai-beach': [900, 672],
  '18-mrs-misumi': [675, 900],
  '19-csun-letters': [900, 673],
  '20-grad': [900, 593],
  '21-field-group': [900, 675],
  '22-mr-misumi': [900, 596],
}

// these render once at 2x2 as visual anchors
const BIG = new Set([
  '01-barbecue-group',
  '02-calligraphy',
  '06-meet-the-clubs',
  '09-undoukai-2', // undoukai kibasen — sword raised
  '18-mrs-misumi',
  '19-csun-letters', // undoukai — C S U N letters
  '22-mr-misumi',
])

// choose a tile shape from the photo's aspect ratio
function tileClass(name, anchor) {
  if (anchor && BIG.has(name)) return 'tile-2x2'
  const [w, h] = DIMS[name] ?? [1, 1]
  const r = w / h
  if (r >= 1.4) return 'tile-2x1' // wide  -> 2 cols x 1 row
  if (r <= 0.8) return 'tile-1x2' // tall  -> 1 col  x 2 rows
  return '' // ~square -> 1x1
}

const tiles = import.meta.glob('../../assets/collage/*.jpg', { eager: true, import: 'default' })
const PHOTOS = Object.entries(tiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({ src, name: path.split('/').pop().replace('.jpg', '') }))

const rot = (arr, n) => [...arr.slice(n), ...arr.slice(0, n)]
// small filler tiles: the photo set repeated (each copy rotated so no photo sits
// next to a copy of itself) to cover large screens. Overflow past the hero is clipped.
const FILLER = [
  ...rot(PHOTOS, 5),
  ...rot(PHOTOS, 11),
  ...rot(PHOTOS, 3),
  ...rot(PHOTOS, 17),
  ...rot(PHOTOS, 8),
  ...rot(PHOTOS, 14),
]

function Home() {
  const { t } = useLang()

  return (
    <section id="home" className="home">
      <div className="home-collage" aria-hidden="true">
        {PHOTOS.map((p, i) => (
          <img key={`p${i}`} className={tileClass(p.name, true)} src={p.src} alt="" decoding="async" />
        ))}
        {FILLER.map((p, i) => (
          <img
            key={`f${i}`}
            className={tileClass(p.name, false)}
            src={p.src}
            alt=""
            decoding="async"
            loading="lazy"
          />
        ))}
      </div>
      <div className="home-scrim" aria-hidden="true" />

      <div className="home-inner">
        <img src={jsaLogo} alt={t('hero.logoAlt')} className="home-logo" />
        <h2 className="home-kanji">{t('hero.kanji')}</h2>
        <h1 className="home-title">{t('hero.title')}</h1>
        <p className="home-tagline">{t('hero.tagline')}</p>
      </div>
    </section>
  )
}

export default Home
