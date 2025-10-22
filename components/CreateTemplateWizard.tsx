import React, { useState } from 'react';
import { CompetitorAnalysisForm } from './CompetitorAnalysisForm';
import { VisualStyleForm } from './VisualStyleForm';
import { TemplateSaveForm } from './TemplateSaveForm';
import type { Template } from './MainAppLayout';
import { useLanguage } from '../hooks/useLanguage';

interface CreateTemplateWizardProps {
    onClose: () => void;
    onSave: (templateData: { id?: string; name: string; voiceId: string; links: string[], files: File[] }) => void;
    templateToEdit?: Template | null;
}

const CreateTemplateWizard: React.FC<CreateTemplateWizardProps> = ({ onClose, onSave, templateToEdit }) => {
    const { t } = useLanguage();
    const isEditing = !!templateToEdit;
    const [step, setStep] = useState(1);

    // State to hold data from all steps
    const [collectedLinks, setCollectedLinks] = useState<string[]>(templateToEdit?.sourceLinks || []);
    const [collectedFiles, setCollectedFiles] = useState<File[]>(templateToEdit?.sourceFiles || []);
    
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleStep1Submit = (links: string[]) => {
        if (links.length === 0 || links.every(l => l.trim() === '')) {
            setError(t('wizard.error_at_least_one_link'));
            return;
        };
        setError(null);
        setCollectedLinks(links.filter(l => l.trim() !== ''));
        setStep(2);
    };

    const handleStep2Submit = (files: File[]) => {
        if (files.length === 0) {
            setError(t('wizard.error_at_least_one_file'));
            return;
        }
        setError(null);
        setCollectedFiles(files);
        setStep(3);
    };

    const handleFinalSave = (templateData: { name: string; voiceId: string; }) => {
        setIsSubmitting(true);
        setError(null);
        try {
            onSave({
                id: templateToEdit?.id,
                ...templateData,
                links: collectedLinks,
                files: collectedFiles,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred while saving.');
            setIsSubmitting(false);
        }
    };
    
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                     <div>
                         <h3 className="text-lg font-semibold mb-2">{t('wizard.step1_title')}</h3>
                         <p className="text-gray-400 mb-4">{t('wizard.step1_subtitle')}</p>
                        <CompetitorAnalysisForm 
                            onSubmit={handleStep1Submit} 
                            isLoading={false}
                            initialLinks={templateToEdit?.sourceLinks}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{t('wizard.step2_title')}</h3>
                         <p className="text-gray-400 mb-4">{t('wizard.step2_subtitle')}</p>
                        <VisualStyleForm 
                            onSubmit={handleStep2Submit} 
                            isLoading={false}
                            initialFiles={templateToEdit?.sourceFiles}
                        />
                    </div>
                );
            case 3:
                 return (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{t('wizard.step3_title')}</h3>
                        <p className="text-gray-400 mb-4">{t('wizard.step3_subtitle')}</p>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-6">
                            <h4 className="font-semibold text-gray-200">{t('wizard.collected_data_title')}</h4>
                            <ul className="list-disc list-inside text-sm text-gray-400 mt-2">
                                <li>{t('wizard.collected_links', {count: collectedLinks.length})}</li>
                                <li>{t('wizard.collected_files', {count: collectedFiles.length})}</li>
                            </ul>
                        </div>
                        <TemplateSaveForm 
                            onSave={handleFinalSave} 
                            isLoading={isSubmitting}
                            isEditing={isEditing}
                            initialName={templateToEdit?.name}
                            initialVoiceId={templateToEdit?.voiceId}
                        />
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center items-center p-4">
            <div className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex-shrink-0 p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                         {isEditing ? t('wizard.title_edit') : t('wizard.title_create')}: {t('wizard.step_of', {step: step})}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                
                <div className="p-8 overflow-y-auto">
                    {error && (
                        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-4" role="alert">
                            <strong className="font-bold">{t('common.error')} </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    
                   {renderStepContent()}
                </div>
            </div>
        </div>
    );
};

export default CreateTemplateWizard;
