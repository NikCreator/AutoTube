import React, { useState } from 'react';
// FIX: Import 'TemplateIcon' to resolve 'Cannot find name' error.
import { PlusIcon, SparklesIcon, TemplateIcon } from './icons';
import CreateTemplateWizard from './CreateTemplateWizard';
import { analyzeCompetitors, analyzeVisuals } from '../services/geminiService';
import { AnalysisResult } from './AnalysisResult';

interface Template {
    id: string;
    name: string;
    voiceId: string;
    status: 'analyzing' | 'ready' | 'error';
    competitorAnalysisResult: string | null;
    visualStyleResult: string | null;
}

// Simple hash function to generate a color from a string
const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

const TemplatesView: React.FC = () => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [templates, setTemplates] = useState<Template[]>([]);
    
    const handleSaveTemplate = async (templateData: { name: string; voiceId: string; links: string[], files: File[] }) => {
        const newTemplate: Template = {
            id: `template-${Date.now()}`,
            name: templateData.name,
            voiceId: templateData.voiceId,
            status: 'analyzing',
            competitorAnalysisResult: null,
            visualStyleResult: null,
        };

        setTemplates(prev => [...prev, newTemplate]);
        setIsWizardOpen(false);

        try {
            const [competitorResult, visualResult] = await Promise.all([
                analyzeCompetitors(templateData.links),
                analyzeVisuals(templateData.files)
            ]);

            setTemplates(prev => prev.map(t => 
                t.id === newTemplate.id 
                ? { ...t, status: 'ready', competitorAnalysisResult: competitorResult, visualStyleResult: visualResult }
                : t
            ));
        } catch (error) {
            console.error("Failed to analyze template sources:", error);
            setTemplates(prev => prev.map(t => 
                t.id === newTemplate.id 
                ? { ...t, status: 'error' }
                : t
            ));
        }
    };
    
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <div>
                     <h1 className="text-3xl font-bold text-white">Мастер-Шаблоны</h1>
                     <p className="text-gray-400 mt-1">Текущий баланс: <span className="font-semibold text-indigo-400">150,000</span> кредитов</p>
                </div>
                <button
                    onClick={() => setIsWizardOpen(true)}
                    className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Создать Шаблон
                </button>
            </div>
            
            {templates.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
                    <TemplateIcon className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-2 text-sm font-medium text-white">Шаблонов пока нет</h3>
                    <p className="mt-1 text-sm text-gray-400">Начните с создания своего первого Мастер-Шаблона.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map(template => {
                        const color1 = stringToColor(template.name);
                        const color2 = stringToColor(template.name.split('').reverse().join(''));

                        return (
                            <div key={template.id} className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg flex flex-col">
                                <div className="p-5 flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-10 h-10 rounded-lg flex-shrink-0"
                                                style={{background: `linear-gradient(45deg, ${color1}, ${color2})`}}
                                                title="Visual Profile"
                                            ></div>
                                            <div>
                                                <h2 className="text-lg font-bold text-white leading-tight">{template.name}</h2>
                                                <div className={`mt-1 flex items-center px-2 py-0.5 text-xs font-medium rounded-full w-fit ${
                                                    template.status === 'ready' ? 'bg-green-500/20 text-green-300' :
                                                    template.status === 'analyzing' ? 'bg-yellow-500/20 text-yellow-300 animate-pulse' :
                                                    'bg-red-500/20 text-red-300'
                                                }`}>
                                                    {template.status === 'ready' && 'Активен'}
                                                    {template.status === 'analyzing' && 'Анализ...'}
                                                    {template.status === 'error' && 'Ошибка'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-gray-700 bg-gray-800/50 rounded-b-xl">
                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed" disabled={template.status !== 'ready'}>
                                        Генерировать Видео
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {isWizardOpen && (
                <CreateTemplateWizard 
                    onClose={() => setIsWizardOpen(false)} 
                    onSave={handleSaveTemplate}
                />
            )}
        </div>
    );
};

export default TemplatesView;