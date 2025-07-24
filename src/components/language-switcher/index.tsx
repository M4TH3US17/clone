"use client";
import { useLanguageStore } from '@/store/languageStore';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguageStore();

    return (
        <div>
            <button
                onClick={() => setLanguage('en')}
                disabled={language === 'en'}
            >
                English
            </button>
            <button
                onClick={() => setLanguage('pt')}
                disabled={language === 'pt'}
            >
                Português
            </button>
        </div>
    );
}