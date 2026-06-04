"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import fr from '../i18n/fr.json';
import en from '../i18n/en.json';

type Language = 'fr' | 'en';
type Dictionary = typeof fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const dictionaries: Record<Language, Dictionary> = {
  fr,
  en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    // Load language from localStorage if available
    const storedLang = localStorage.getItem('language') as Language;
    
    // Wrap setState in a microtask to avoid React strict mode cascading renders warning
    Promise.resolve().then(() => {
      if (storedLang && (storedLang === 'fr' || storedLang === 'en')) {
        setLanguageState(storedLang);
      } else {
        // Default to French
        setLanguageState('fr');
      }
    });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = dictionaries[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to French if key not found in English
        let fallbackValue: unknown = dictionaries['fr'];
        for (const fbKey of keys) {
           if (fallbackValue && typeof fallbackValue === 'object' && fbKey in fallbackValue) {
             fallbackValue = (fallbackValue as Record<string, unknown>)[fbKey];
           } else {
             return key; // return key name if not found at all
           }
        }
        return typeof fallbackValue === 'string' ? fallbackValue : key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
