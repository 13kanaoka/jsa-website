import { useState } from 'react'
import './Board.css'
import { useLang } from '../../i18n/LanguageContext'
import { board } from '../../data/board'

const POSITION_ORDER = [
  'president', 'vp', 'secretary', 'treasurer',
  'public-relations', 'marketing', 'graphic-designer', 'content-creator', 'content-creation',
  'media', 'photography',
  'event-logistics', 'event-planner', 'event-coordinator',
  'advisor',
]

function semesterLabel(term, lang) {
  if (lang === 'ja') return `${term.year}年${term.season === 'fall' ? '秋' : '春'}`
  return `${term.season === 'fall' ? 'Fall' : 'Spring'} '${String(term.year).slice(2)}`
}

function byRole(a, b) {
  const rank = (p) => (POSITION_ORDER.indexOf(p) + 1 || 99)
  return rank(a.position) - rank(b.position)
}

function Board() {
  const { t, lang } = useLang()
  const [termId, setTermId] = useState(board[0].id)
  const [activeId, setActiveId] = useState(null)

  const term = board.find((s) => s.id === termId) ?? board[0]
  const members = [...term.members].sort(byRole)
  const [titlePre, titlePost] = t('board.title').split('{semester}')

  return (
    <section id="board" className="board">
      <h2 className="board-title">
        {titlePre}
        <span className="semester-picker">
          <select
            className="semester-select"
            value={termId}
            onChange={(e) => { setTermId(e.target.value); setActiveId(null) }}
            aria-label={t('board.pickerLabel')}
          >
            {board.map((s) => (
              <option key={s.id} value={s.id}>{semesterLabel(s, lang)}</option>
            ))}
          </select>
          <span className="semester-shown" aria-hidden="true">
            {semesterLabel(term, lang)}
            <svg className="semester-caret" viewBox="0 0 10 6" aria-hidden="true">
              <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        {titlePost}
      </h2>

      <ul className="board-grid">
        {members.map((m, i) => {
          const id = `${term.id}-${i}`
          const isActive = activeId === id
          const name = lang === 'ja' && m.nameJa ? m.nameJa : m.nameEn
          const position = m.position ? t(`positions.${m.position}`) : ''
          const fact = (lang === 'ja' && m.funFactJa ? m.funFactJa : m.funFactEn)
            || (lang === 'ja' ? '（準備中）' : 'Fun fact coming soon!')

          return (
            <li key={id} className="board-cell">
              <button
                type="button"
                className={`member${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => setActiveId(isActive ? null : id)}
              >
                <span className="member-photo-wrap">
                  {m.photo
                    ? <img className="member-photo" src={m.photo} alt="" loading="lazy" />
                    : <span className="member-photo member-photo--missing" aria-hidden="true" />}
                </span>
                <span className="member-name">{name}</span>
                {position && <span className="member-position">{position}</span>}
                <span className="member-fact">{fact}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Board
