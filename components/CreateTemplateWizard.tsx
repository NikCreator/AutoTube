import React, { useState } from 'react';
import { CompetitorAnalysisForm } from './CompetitorAnalysisForm';
import { VisualStyleForm } from './VisualStyleForm';
import { TemplateSaveForm } from './TemplateSaveForm';

interface CreateTemplateWizardProps {
    onClose: () => void;
    onSave: (templateData: { name: string; voiceId: string; links: string[], files: File[] }) => void;
}

const CreateTemplateWizard: React.FC<CreateTemplateWizardProps> = ({ onClose, onSave }) => {
    const [step, setStep] = useState(1);

    // State to hold data from all steps
    const [collectedLinks, setCollectedLinks] = useState<string[]>([]);
    const [collectedFiles, setCollectedFiles] = useState<File[]>([]);
    
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleStep1Submit = (links: string[]) => {
        if (links.length === 0 || links.every(l => l.trim() === '')) {
            setError("Пожалуйста, добавьте хотя бы одну ссылку.");
            return;
        };
        setError(null);
        setCollectedLinks(links.filter(l => l.trim() !== ''));
        setStep(2);
    };

    const handleStep2Submit = (files: File[]) => {
        if (files.length === 0) {
            setError("Пожалуйста, загрузите хотя бы один файл.");
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
            // Simulate API call
            console.log("Submitting all data to backend...", { ...templateData, links: collectedLinks, files: collectedFiles });
            onSave({
                ...templateData,
                links: collectedLinks,
                files: collectedFiles,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка при сохранении.');
            setIsSubmitting(false);
        }
        // No finally block to reset isSubmitting, as the component will unmount on success
    };
    
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                     <div>
                         <h3 className="text-lg font-semibold mb-2">Шаг 1: Анализ Конкурентов</h3>
                         <p className="text-gray-400 mb-4">Введите URL-адреса YouTube видео для анализа их структуры и тональности.</p>
                        <CompetitorAnalysisForm onSubmit={handleStep1Submit} isLoading={false} />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Шаг 2: Визуальный Стиль</h3>
                         <p className="text-gray-400 mb-4">Загрузите изображения, чтобы AI создал идеальный визуальный промт.</p>
                        <VisualStyleForm onSubmit={handleStep2Submit} isLoading={false} />
                    </div>
                );
            case 3:
                 return (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Шаг 3: Настройки и Сохранение</h3>
                        <p className="text-gray-400 mb-4">Дайте шаблону имя, укажите голос и запустите фоновый анализ.</p>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-6">
                            <h4 className="font-semibold text-gray-200">Собранные данные:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-400 mt-2">
                                <li>{collectedLinks.length} URL(-ов) конкурентов для анализа.</li>
                                <li>{collectedFiles.length} изображений для анализа стиля.</li>
                            </ul>
                        </div>
                        <TemplateSaveForm onSave={handleFinalSave} isLoading={isSubmitting} />
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
                    <h2 className="text-xl font-bold">Мастер Создания Шаблона: Шаг {step} из 3</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                
                <div className="p-8 overflow-y-auto">
                    {error && (
                        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-4" role="alert">
                            <strong className="font-bold">Ошибка! </strong>
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
