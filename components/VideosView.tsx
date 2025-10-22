import React from 'react';
import { VideoIcon, ArrowDownTrayIcon, LinkIcon, ExclamationTriangleIcon, ArrowPathIcon, CalendarIcon } from './icons';
import type { Video, VideoStatus, UploadStatus } from './MainAppLayout';
import { useLanguage } from '../hooks/useLanguage';

interface VideosViewProps {
    videos: Video[];
}

const StatusBadge: React.FC<{ status: VideoStatus, uploadStatus: UploadStatus, scheduleDate?: Date }> = ({ status, uploadStatus, scheduleDate }) => {
    const { t, language } = useLanguage();
    
    if (uploadStatus === 'Scheduled' && scheduleDate) {
        return (
             <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300`}>
                 <CalendarIcon className="h-4 w-4 mr-1.5" />
                {t('videos.status_scheduled', {date: new Intl.DateTimeFormat(language).format(scheduleDate)})}
            </span>
        )
    }

    if (uploadStatus === 'Published') {
         return (
             <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-300`}>
                {t('videos.status_published')}
            </span>
        )
    }

    const statusInfo = {
        pending: { text: t('videos.status_pending'), color: 'bg-gray-500/20 text-gray-300' },
        completed: { text: t('videos.status_ready'), color: 'bg-green-500/20 text-green-300' },
        failed: { text: t('videos.status_failed'), color: 'bg-red-500/20 text-red-300' },
        scripting: { text: t('videos.status_scripting'), color: 'bg-blue-500/20 text-blue-300' },
        generating_images: { text: t('videos.status_generating_images'), color: 'bg-yellow-500/20 text-yellow-300 animate-pulse' },
        rendering: { text: t('videos.status_rendering'), color: 'bg-purple-500/20 text-purple-300 animate-pulse' },
    };

    const { text, color } = statusInfo[status];

    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${color}`}>
            {text}
        </span>
    );
};

const VideoActions: React.FC<{ video: Video }> = ({ video }) => {
    const { t } = useLanguage();
    switch (video.status) {
        case 'completed':
            if (video.uploadStatus === 'Published') {
                return (
                    <a href="#" className="flex items-center text-indigo-400 hover:text-indigo-300 transition text-sm">
                        <LinkIcon className="h-4 w-4 mr-1" />
                        {t('videos.action_youtube')}
                    </a>
                );
            }
            return (
                <button className="flex items-center text-gray-300 hover:text-white transition text-sm">
                    <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                    {t('videos.action_download')}
                </button>
            );
        case 'failed':
            return (
                <div className="flex items-center gap-4 justify-end">
                    <span className="text-red-400 flex items-center text-xs" title="Something went wrong during generation.">
                         <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                         {t('videos.action_error')}
                    </span>
                    <button title={t('videos.action_retry')} className="p-1 text-gray-400 hover:text-indigo-300 transition rounded-md hover:bg-gray-700">
                        <ArrowPathIcon className="h-4 w-4" />
                    </button>
                </div>
            );
        default:
            return null; // No actions for videos in progress
    }
};


const VideosView: React.FC<VideosViewProps> = ({ videos }) => {
    const { t } = useLanguage();
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">{t('videos.title')}</h1>
            {videos.length === 0 ? (
                 <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
                    <VideoIcon className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-2 text-sm font-medium text-white">{t('videos.empty_title')}</h3>
                    <p className="mt-1 text-sm text-gray-400">{t('videos.empty_subtitle')}</p>
                </div>
            ) : (
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('videos.header_topic')}</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('videos.header_template')}</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('videos.header_status')}</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('videos.header_credits')}</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">{t('videos.header_actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {videos.map(video => (
                                <tr key={video.id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-white">{video.topic}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{video.template}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={video.status} uploadStatus={video.uploadStatus} scheduleDate={video.scheduleDate} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{video.credits}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <VideoActions video={video} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VideosView;