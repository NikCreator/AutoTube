import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'kz', name: 'Қазақша' },
];

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="relative">
            <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-gray-700/50 text-white text-sm font-medium rounded-md py-1.5 pl-3 pr-8 border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none transition"
                aria-label="Select language"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    );
};
