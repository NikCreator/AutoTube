
import React, { useState } from 'react';
import type { Template } from './MainAppLayout';
import { TemplateIcon, PlusIcon, PencilIcon, TrashIcon, CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from './icons';
import CreateTemplateWizard from './CreateTemplateWizard';
import { useLanguage } from '../hooks/useLanguage';
import { AnalysisResult } from './AnalysisResult';

interface TemplatesViewProps {
    templates: Template[];
    onSaveTemplate: (templateData: { id?: string; name:string; voiceId: string; links: string[], files: File[] }) => void;
    onSelectTemplate: (templateId: string) => void;
}

const StatusIcon: React.FC<{ status: Template['status'] }> = ({ status }) => {
    const { t } = useLanguage();
    switch (status) {
        case 'ready':
            return <div className="flex items-center text-green-400 text-sm"><CheckCircleIcon className="h-5 w-5 mr-2" /> {t('templates.status_ready')}</div>;
        case 'analyzing':
            return <div className="flex items-center text-yellow-400 text-sm animate-pulse"><ClockIcon className="h-5 w-5 mr-2" /> {t('templates.status_analyzing')}</div>;
        case 'error':
            return <div className="flex items-center text-red-400 text-sm"><ExclamationCircleIcon className="h-5 w-5 mr-2" /> {t('templates.status_error')}</div>;
    }
}

const TemplatesView: React.FC<TemplatesViewProps> = ({ templates, onSaveTemplate, onSelectTemplate }) => {
    const { t } = useLanguage();
    const [isWizardOpen, setWizardOpen] = useState(false);
    const [templateToEdit, setTemplateToEdit] = useState<Template | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(templates.length > 0 ? templates[0] : null);

    const handleCreateNew = () => {
        setTemplateToEdit(null);
        setWizardOpen(true);
    };
    
    const handleEdit = (template: Template) => {
        setTemplateToEdit(template);
        setWizardOpen(true);
    };

    const handleSave = (templateData: { id?: string; name: string; voiceId: string; links: string[], files: File[] }) => {
        onSaveTemplate(templateData);
        setWizardOpen(false);
        setTemplateToEdit(null);
    }
    
    const handleSelect = (template: Template) => {
        setSelectedTemplate(template);
        onSelectTemplate(template.id);
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white">{t('templates.title')}</h1>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    {t('templates.cta_create')}
                </button>
            </div>

            {templates.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
                    <TemplateIcon className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-2 text-sm font-medium text-white">{t('templates.empty_title')}</h3>
                    <p className="mt-1 text-sm text-gray-400">{t('templates.empty_subtitle')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Template List */}
                    <div className="lg:col-span-4 space-y-3 pr-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
                        {templates.map(template => (
                            <div 
                                key={template.id}
                                onClick={() => handleSelect(template)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedTemplate?.id === template.id ? 'bg-gray-700/80 border-indigo-500' : 'bg-gray-800 border-gray-700 hover:border-gray-600'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="font-bold text-white">{template.name}</h2>
                                        <StatusIcon status={template.status} />
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleEdit(template); }}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-md"
                                        aria-label={t('common.edit')}
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Template Details */}
                    <div className="lg:col-span-8">
                        {selectedTemplate ? (
                            <div className="space-y-6">
                                <AnalysisResult 
                                    title={t('templates.analysis_competitor_title')}
                                    content={selectedTemplate.competitorAnalysisResult || null}
                                    isLoading={selectedTemplate.status === 'analyzing'}
                                />
                                <AnalysisResult 
                                    title={t('templates.analysis_visual_title')}
                                    content={selectedTemplate.visualStylePrompt || null}
                                    isLoading={selectedTemplate.status === 'analyzing'}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
                                {t('templates.no_template_selected')}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isWizardOpen && (
                <CreateTemplateWizard 
                    onClose={() => setWizardOpen(false)} 
                    onSave={handleSave}
                    templateToEdit={templateToEdit}
                />
            )}
        </div>
    );
};

export default TemplatesView;
