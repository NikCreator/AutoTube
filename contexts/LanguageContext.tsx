import React, { createContext, useState, useEffect, useCallback } from 'react';

interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
    t: (key: string, options?: { [key: string]: string | number }) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => console.warn('setLanguage function is not initialized'),
    t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<string>(localStorage.getItem('language') || 'en');
    const [translations, setTranslations] = useState<Record<string, any>>({});

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const response = await fetch(`/locales/${language}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch translations: ${response.statusText}`);
                }
                const data = await response.json();
                setTranslations(data);
            } catch (error) {
                console.error(`Could not load translations for language: ${language}. Falling back to English.`, error);
                try {
                    const fallbackResponse = await fetch('/locales/en.json');
                     if (!fallbackResponse.ok) {
                        throw new Error(`Failed to fetch fallback translations: ${fallbackResponse.statusText}`);
                    }
                    const fallbackData = await fallbackResponse.json();
                    setTranslations(fallbackData);
                } catch (fallbackError) {
                     console.error('CRITICAL: Could not load fallback English translations.', fallbackError);
                     setTranslations({}); // Prevent app crash
                }
            }
        };

        loadTranslations();
    }, [language]);
    
    const setLanguage = (lang: string) => {
        localStorage.setItem('language', lang);
        setLanguageState(lang);
    };

    const t = useCallback((key: string, options?: { [key: string]: string | number }): string => {
        const keys = key.split('.');
        let result = translations;
        try {
            for (const k of keys) {
                result = result?.[k];
                if (result === undefined) {
                    // Return key if not found, so it's obvious something is missing.
                    return key;
                }
            }
            
            let finalString = String(result);

            if (options) {
                Object.keys(options).forEach(optKey => {
                    const regex = new RegExp(`\\{${optKey}\\}`, 'g');
                    const value = options[optKey];
                    // FIX: Format numbers according to the current locale and prevent stale closures.
                    const replacement = typeof value === 'number'
                        ? new Intl.NumberFormat(language).format(value)
                        : String(value);
                    finalString = finalString.replace(regex, replacement);
                });
            }
            
            return finalString;
        } catch (error) {
             console.warn(`Translation key not found or invalid: ${key}`);
            return key;
        }
    }, [translations, language]);

    const value = {
        language,
        setLanguage,
        t,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
