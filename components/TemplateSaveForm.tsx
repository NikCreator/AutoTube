import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { useLanguage } from '../hooks/useLanguage';

interface TemplateSaveFormProps {
    onSave: (templateData: { name: string; voiceId: string; }) => void;
    isLoading: boolean;
    isEditing?: boolean;
    initialName?: string;
    initialVoiceId?: string;
}

export const TemplateSaveForm: React.FC<TemplateSaveFormProps> = ({ onSave, isLoading, isEditing = false, initialName, initialVoiceId }) => {
    const { t } = useLanguage();
    const [templateName, setTemplateName] = useState(initialName || '');
    const [voiceId, setVoiceId] = useState(initialVoiceId || 'default-voice'); // Example voice ID

    const handleSave = () => {
        if (templateName.trim() && !isLoading) {
            onSave({
                name: templateName,
                voiceId: voiceId,
            });
        } else if (!templateName.trim()) {
            alert(t('save_form.alert_name_required'));
        }
    };

    const isSubmitDisabled = !templateName.trim() || isLoading;
    const buttonText = isEditing ? t('save_form.cta_update') : t('save_form.cta_save');

    return (
        <div className="bg-green-900/20 border border-green-700 rounded-xl shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-300">{isEditing ? t('save_form.title_update') : t('save_form.title_save')}</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="templateName" className="block text-sm font-medium text-gray-300">{t('save_form.name_label')}</label>
                    <input
                        type="text"
                        id="templateName"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        placeholder={t('save_form.name_placeholder')}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="voiceId" className="block text-sm font-medium text-gray-300">{t('save_form.voice_id_label')}</label>
                    <input
                        type="text"
                        id="voiceId"
                        value={voiceId}
                        onChange={(e) => setVoiceId(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        placeholder={t('save_form.voice_id_placeholder')}
                        disabled={isLoading}
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out disabled:opacity-50"
                    disabled={isSubmitDisabled}
                >
                    {isLoading ? <LoadingSpinner /> : buttonText}
                </button>
            </div>
        </div>
    );
};
