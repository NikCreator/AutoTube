import React from 'react';
import { AnalysisResult } from './AnalysisResult';
import { useLanguage } from '../hooks/useLanguage';
import type { Template } from './MainAppLayout';

interface TemplateDetailViewProps {
    template: Template | null;
}

const TemplateDetailView: React.FC<TemplateDetailViewProps> = ({ template }) => {
    const { t } = useLanguage();

    if (!template) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500 text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
                {t('templates.no_template_selected')}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AnalysisResult 
                title={t('templates.analysis_competitor_title')}
                content={template.competitorAnalysisResult || null}
                isLoading={template.status === 'analyzing'}
            />
            <AnalysisResult 
                title={t('templates.analysis_visual_title')}
                content={template.visualStylePrompt || null}
                isLoading={template.status === 'analyzing'}
            />
        </div>
    );
};

export default TemplateDetailView;
