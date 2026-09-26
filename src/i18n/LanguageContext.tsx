import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Lang } from './translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (next: Lang) => void
  toggleLang: () => void
  // Keys are dotted paths into `translations`, and the value shape varies
  // by key (string, or an array of story/activity/faq objects) — callers
  // narrow it themselves (see Array.isArray checks in About/Faq).
  t: (key: string) => any
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'jsa-lang'
const SUPPORTED: Lang[] = ['en', 'ja']

function isLang(value: string | null): value is Lang {
  return SUPPORTED.includes(value as Lang)
}

function resolve(dict: unknown, key: string): any {
  return key.split('.').reduce<any>((obj, part) => (obj == null ? obj : obj[part]), dict)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return isLang(saved) ? saved : 'en'
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    const title = resolve(translations[lang], 'meta.title')
    if (title) document.title = title
  }, [lang])

  const setLang = (next: Lang) => {
    if (isLang(next)) setLangState(next)
  }

  const toggleLang = () => setLangState((l) => (l === 'en' ? 'ja' : 'en'))

  const t = (key: string) => {
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
