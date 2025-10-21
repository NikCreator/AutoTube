
import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface TemplateSaveFormProps {
    onSave: (templateData: { name: string; voiceId: string; }) => void;
    isLoading: boolean;
}

export const TemplateSaveForm: React.FC<TemplateSaveFormProps> = ({ onSave, isLoading }) => {
    const [templateName, setTemplateName] = useState('');
    const [voiceId, setVoiceId] = useState('default-voice'); // Example voice ID

    const handleSave = () => {
        if (templateName.trim() && !isLoading) {
            onSave({
                name: templateName,
                voiceId: voiceId,
            });
        } else if (!templateName.trim()) {
            alert('Пожалуйста, введите название шаблона.');
        }
    };

    const isSubmitDisabled = !templateName.trim() || isLoading;

    return (
        <div className="bg-green-900/20 border border-green-700 rounded-xl shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-300">Сохранить шаблон</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="templateName" className="block text-sm font-medium text-gray-300">Название шаблона</label>
                    <input
                        type="text"
                        id="templateName"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        placeholder="Например, 'Динамичный обзор гаджетов'"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="voiceId" className="block text-sm font-medium text-gray-300">ID Голоса</label>
                    <input
                        type="text"
                        id="voiceId"
                        value={voiceId}
                        onChange={(e) => setVoiceId(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        placeholder="ID голоса из TTS сервиса"
                        disabled={isLoading}
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out disabled:opacity-50"
                    disabled={isSubmitDisabled}
                >
                    {isLoading ? <LoadingSpinner /> : 'Сохранить и начать анализ'}
                </button>
            </div>
        </div>
    );
};