import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { YoutubeIcon, PlusIcon, TrashIcon } from './icons';
import { useLanguage } from '../hooks/useLanguage';

interface CompetitorAnalysisFormProps {
    onSubmit: (links: string[]) => void;
    isLoading: boolean;
    initialLinks?: string[];
}

export const CompetitorAnalysisForm: React.FC<CompetitorAnalysisFormProps> = ({ onSubmit, isLoading, initialLinks }) => {
    const { t } = useLanguage();
    const [links, setLinks] = useState<string[]>(initialLinks && initialLinks.length > 0 ? initialLinks : ['']);
    
    const handleAddLink = () => {
        if (links.length < 3) {
            setLinks([...links, '']);
        }
    };

    const handleRemoveLink = (index: number) => {
        if (links.length > 1) {
            const newLinks = links.filter((_, i) => i !== index);
            setLinks(newLinks);
        } else {
             setLinks(['']);
        }
    };

    const handleLinkChange = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validLinks = links.filter(link => link.trim() !== '');
        onSubmit(validLinks);
    };

    const isSubmitDisabled = links.every(link => link.trim() === '') || isLoading;

    return (
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <YoutubeIcon className="h-6 w-6 mr-2 text-red-500" />
                {t('competitor_form.title')}
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
                {t('competitor_form.subtitle')}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                {links.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="url"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            disabled={isLoading}
                        />
                        <button 
                            type="button" 
                            onClick={() => handleRemoveLink(index)}
                            className="p-2 bg-gray-700 hover:bg-red-800/50 rounded-md transition disabled:opacity-50"
                            disabled={isLoading}
                        >
                            <TrashIcon className="h-5 w-5 text-gray-400 hover:text-red-400" />
                        </button>
                    </div>
                ))}

                {links.length < 3 && (
                    <button 
                        type="button" 
                        onClick={handleAddLink}
                        className="flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition disabled:opacity-50"
                        disabled={isLoading}
                    >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        {t('competitor_form.add_link')}
                    </button>
                )}

                <button 
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <LoadingSpinner /> : t('common.next')}
                </button>
            </form>
        </div>
    );
};
