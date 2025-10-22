import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { useLanguage } from '../hooks/useLanguage';

interface AnalysisResultProps {
    title: string;
    content: string | null;
    isLoading: boolean;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ title, content, isLoading }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 h-full">
            <h3 className="text-xl font-bold mb-4 text-gray-200">{title}</h3>
            <div className="bg-gray-900 rounded-md p-4 min-h-[150px] text-sm text-gray-300 font-mono whitespace-pre-wrap overflow-x-auto">
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center">
                            <LoadingSpinner />
                            <span className="mt-2 text-gray-400">{t('common.analyzing')}</span>
                        </div>
                    </div>
                )}
                {!isLoading && !content && (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        {t('analysis_result.placeholder')}
                    </div>
                )}
                {!isLoading && content && (
                    <code>{content}</code>
                )}
            </div>
        </div>
    );
};
