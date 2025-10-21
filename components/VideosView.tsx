import React from 'react';
import { VideoIcon, ArrowDownTrayIcon, LinkIcon, ExclamationTriangleIcon, ArrowPathIcon } from './icons';

type VideoStatus = 'completed' | 'failed' | 'scripting' | 'generating_images' | 'rendering';

const mockVideos = [
    { id: 'vid_001', topic: 'The Future of AI Assistants', template: 'Dynamic Tech', credits: 120, status: 'completed' as VideoStatus },
    { id: 'vid_002', topic: 'Top 5 Gadgets of the Year', template: 'Cinematic Review', credits: 150, status: 'failed' as VideoStatus },
    { id: 'vid_003', topic: 'A Guide to Quantum Computing', template: 'Educational Deep Dive', credits: 200, status: 'rendering' as VideoStatus },
    { id: 'vid_004', topic: 'History of the Internet', template: 'Documentary Style', credits: 180, status: 'generating_images' as VideoStatus },
    { id: 'vid_005', topic: 'Unboxing the Latest Smartphone', template: 'Dynamic Tech', credits: 90, status: 'scripting' as VideoStatus },
];


const StatusBadge: React.FC<{ status: VideoStatus }> = ({ status }) => {
    const statusInfo = {
        completed: { text: 'Готово', color: 'bg-green-500/20 text-green-300' },
        failed: { text: 'Ошибка', color: 'bg-red-500/20 text-red-300' },
        scripting: { text: 'Написание сценария', color: 'bg-blue-500/20 text-blue-300' },
        generating_images: { text: 'Генерация изображений', color: 'bg-yellow-500/20 text-yellow-300 animate-pulse' },
        rendering: { text: 'Сборка видео', color: 'bg-purple-500/20 text-purple-300 animate-pulse' },
    };

    const { text, color } = statusInfo[status];

    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${color}`}>
            {text}
        </span>
    );
};

const ActionButtons: React.FC<{ status: VideoStatus }> = ({ status }) => {
    if (status === 'completed') {
        return (
            <div className="flex items-center space-x-2">
                {/* FIX: Moved the 'title' prop from the Icon component to the parent button element. */}
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition" title="Скачать (MP4)"><ArrowDownTrayIcon className="h-5 w-5" /></button>
                {/* FIX: Moved the 'title' prop from the Icon component to the parent button element. */}
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition" title="Поделиться ссылкой"><LinkIcon className="h-5 w-5" /></button>
            </div>
        );
    }
    if (status === 'failed') {
        return (
            <div className="flex items-center space-x-2">
                {/* FIX: Moved the 'title' prop from the Icon component to the parent button element. */}
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition" title="Просмотреть лог ошибки"><ExclamationTriangleIcon className="h-5 w-5" /></button>
                {/* FIX: Moved the 'title' prop from the Icon component to the parent button element. */}
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition" title="Повторить генерацию"><ArrowPathIcon className="h-5 w-5" /></button>
            </div>
        );
    }
    return null;
}

const VideosView: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Мои Видео</h1>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Тема Видео</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Шаблон</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Кредиты</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Статус</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Действия</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {mockVideos.map((video) => (
                                <tr key={video.id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{video.topic}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{video.template}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{video.credits}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusBadge status={video.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <ActionButtons status={video.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VideosView;