import { useState } from 'react'
import './Membership.css'
import { useLang } from '../../i18n/LanguageContext'

// Apps Script Web App /exec URL. Called from the browser, so it's not a secret.
const SIGNUP_URL =
  'https://script.google.com/macros/s/AKfycbw_0ErsIRBqf8Bj6rcwCGthFUcMkDjiXR2A70EsH9Vey-2QYj3wogzNRZi9m73EEg/exec'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Membership() {
  const { t } = useLang()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('') // honeypot
  const [status, setStatus] = useState('idle') // idle | submitting | success | duplicate | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (company.trim()) return // a bot filled the hidden field — drop it silently

    const name = fullName.trim()
    const mail = email.trim()
    if (!name || !EMAIL_RE.test(mail)) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      // A form-encoded POST is a "simple" request (no CORS preflight). Apps Script
      // redirects to script.googleusercontent.com, whose response IS readable
      // cross-origin, so we can act on the { ok, error } it sends back.
      const res = await fetch(SIGNUP_URL, {
        method: 'POST',
        body: new URLSearchParams({ fullName: name, email: mail }),
      })
      const data = await res.json()
      if (data.ok) setStatus('success')
      else if (data.error === 'duplicate') setStatus('duplicate')
      else setStatus('error')
    } catch {
      setStatus('error') // couldn't send, or couldn't read the reply
    }
  }

  return (
    <section id="membership" className="membership">
      <h2 className="mem-title">{t('membership.title')}</h2>

      <div className="mem-grid">
        {/* ---- membership ---- */}
        <div className="mem-card">
          <h3>{t('membership.cardTitle')}</h3>

          {status === 'success' ? (
            <p className="mem-done">{t('membership.done')}</p>
          ) : (
            <form className="mem-form" onSubmit={handleSubmit}>
              <label>
                {t('membership.nameLabel')}
                <input
                  type="text"
                  value={fullName}
                  autoComplete="name"
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
              <label>
                {t('membership.emailLabel')}
                <input
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              {/* honeypot */}
              <input
                className="mem-hp"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? t('membership.submitting') : t('membership.submit')}
              </button>

              {status === 'error' && <p className="mem-error">{t('membership.error')}</p>}
              {status === 'duplicate' && (
                <p className="mem-error">{t('membership.errorDuplicate')}</p>
              )}
            </form>
          )}

          <div className="mem-pay-locked">
            <span className="mem-pay-badge">🔒 {t('membership.payTitle')}</span>
            <p>{t('membership.payNote')}</p>
          </div>
        </div>

        {/* ---- board officer application ---- */}
        <div className="mem-card mem-card--muted">
          <h3>{t('membership.officerTitle')}</h3>
          <p>{t('membership.officerNote')}</p>
        </div>
      </div>
    </section>
  )
}

export default Membership
