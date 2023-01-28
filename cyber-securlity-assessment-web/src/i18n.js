import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(XHR)
  .use(initReactI18next)
  .init({
    fallbackLng: 'th',
    ns: ['trans'],
    defaultNS: 'trans',
    debug: true,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    }
  })

export default i18n