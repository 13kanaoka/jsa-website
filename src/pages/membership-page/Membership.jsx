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
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

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
      await fetch(SIGNUP_URL, {
        method: 'POST',
        // Apps Script sends no CORS headers, so the reply can't be read from
        // another domain. no-cors = send it, don't read back; the body must be
        // form-encoded for a "simple" request.
        mode: 'no-cors',
        body: new URLSearchParams({ fullName: name, email: mail }),
      })
      setStatus('success')
    } catch {
      setStatus('error') // only if the request couldn't be sent at all
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
