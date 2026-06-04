"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguage = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        aria-label="Changer de langue"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-stone-400 hover:text-[hsl(var(--primary))] transition-colors p-2 rounded-lg"
      >
        <Globe className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-xs font-semibold uppercase">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
          <button
            onClick={() => toggleLanguage('fr')}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              language === 'fr' ? 'text-[hsl(var(--primary))] bg-white/5' : 'text-stone-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            FR
          </button>
          <button
            onClick={() => toggleLanguage('en')}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              language === 'en' ? 'text-[hsl(var(--primary))] bg-white/5' : 'text-stone-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
