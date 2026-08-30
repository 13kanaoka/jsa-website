import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'jsa-lang'
const SUPPORTED = ['en', 'ja']

function resolve(dict, key) {
  return key.split('.').reduce((obj, part) => (obj == null ? obj : obj[part]), dict)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return SUPPORTED.includes(saved) ? saved : 'en'
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    const title = resolve(translations[lang], 'meta.title')
    if (title) document.title = title
  }, [lang])

  const setLang = (next) => {
    if (SUPPORTED.includes(next)) setLangState(next)
  }

  const toggleLang = () => setLangState((l) => (l === 'en' ? 'ja' : 'en'))

  const t = (key) => {
    const value = resolve(translations[lang], key)
    return value == null ? key : value
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}