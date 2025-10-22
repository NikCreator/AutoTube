import React, { useState } from 'react';
import { YoutubeIcon, CheckIcon } from './icons';
import { useLanguage } from '../hooks/useLanguage';

const SettingsView: React.FC = () => {
    const { t, language } = useLanguage();
    const [isYoutubeConnected, setIsYoutubeConnected] = useState(false);

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">{t('settings.title')}</h1>

            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg max-w-3xl">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">{t('settings.youtube_title')}</h2>
                    <p className="text-sm text-gray-400 mt-1">{t('settings.youtube_subtitle')}</p>
                </div>
                <div className="p-6">
                    {isYoutubeConnected ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img src="https://yt3.ggpht.com/a/AATXAJz-sEO-e-2-3-3-3-3-3-3=s88-c-k-c0x00ffffff-no-rj" alt="Channel Avatar" className="h-12 w-12 rounded-full" />
                                <div className="ml-4">
                                    <p className="font-semibold text-white">Example Channel</p>
                                    <p className="text-xs text-gray-400 flex items-center">
                                        <CheckIcon className="h-4 w-4 text-green-400 mr-1"/>
                                        {t('settings.youtube_connected')}: {new Date().toLocaleDateString(language)}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsYoutubeConnected(false)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
                            >
                                {t('settings.youtube_disconnect')}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button 
                                onClick={() => setIsYoutubeConnected(true)}
                                className="flex items-center justify-center w-full max-w-xs mx-auto bg-[#FF0000] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition"
                            >
                                <YoutubeIcon className="h-6 w-6 mr-3"/>
                                {t('settings.youtube_connect')}
                            </button>
                            <p className="text-xs text-gray-500 mt-4 text-center max-w-sm mx-auto">
                                {t('settings.youtube_permission_info')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsView;