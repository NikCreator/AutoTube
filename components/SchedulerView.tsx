import React, { useState, useMemo } from 'react';
import type { Video } from './MainAppLayout';
import { CalendarIcon, VideoIcon, XMarkIcon } from './icons';
import { useLanguage } from '../hooks/useLanguage';

interface SchedulerViewProps {
    videos: Video[];
    onSchedule: (videoId: string, date: Date) => void;
    onUnschedule: (videoId: string) => void;
}

const DraggableVideo: React.FC<{ video: Video }> = ({ video }) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("videoId", video.id);
    };

    return (
        <div 
            draggable
            onDragStart={handleDragStart}
            className="p-3 bg-gray-700/80 rounded-lg flex items-center gap-3 cursor-grab active:cursor-grabbing border border-transparent hover:border-indigo-500 transition"
        >
            <VideoIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <p className="text-sm font-medium text-white truncate">{video.topic}</p>
        </div>
    );
}

const CalendarEvent: React.FC<{ video: Video; onUnschedule: (videoId: string) => void }> = ({ video, onUnschedule }) => (
    <div className="bg-indigo-600/80 p-2 rounded-md text-white text-xs leading-tight group relative">
        <p className="font-semibold truncate">{video.topic}</p>
        <button 
            onClick={() => onUnschedule(video.id)}
            className="absolute top-0 right-0 p-0.5 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
            <XMarkIcon className="h-3 w-3" />
        </button>
    </div>
);


const SchedulerView: React.FC<SchedulerViewProps> = ({ videos, onSchedule, onUnschedule }) => {
    const { t, language } = useLanguage();
    const [currentDate, setCurrentDate] = useState(new Date());

    const readyToScheduleVideos = videos.filter(v => v.status === 'completed' && v.uploadStatus === 'Not Scheduled');
    const scheduledVideos = videos.filter(v => v.uploadStatus === 'Scheduled' && v.scheduleDate);

    const { days, firstDayOfMonth } = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
        return { days, firstDayOfMonth };
    }, [currentDate]);

    const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday is 0

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, date: Date) => {
        e.preventDefault();
        const videoId = e.dataTransfer.getData("videoId");
        if (videoId) {
            onSchedule(videoId, date);
        }
        e.currentTarget.classList.remove('bg-green-500/20', 'border-green-500');
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-green-500/20', 'border-green-500');
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('bg-green-500/20', 'border-green-500');
    };
    
    const changeMonth = (offset: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-4rem)]">
            {/* Sidebar with videos to schedule */}
            <div className="lg:w-1/4 bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-4">{t('scheduler.sidebar_title')}</h2>
                <div className="space-y-3 overflow-y-auto flex-grow pr-2">
                    {readyToScheduleVideos.length > 0 ? (
                        readyToScheduleVideos.map(video => <DraggableVideo key={video.id} video={video} />)
                    ) : (
                        <p className="text-sm text-gray-400 text-center py-8">{t('scheduler.empty_videos')}</p>
                    )}
                </div>
            </div>

            {/* Main Calendar */}
            <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                     <h1 className="text-2xl font-bold text-white">{t('scheduler.calendar_title')}</h1>
                     <div className="flex items-center gap-4">
                        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-700 rounded-md">&lt;</button>
                        <span className="text-lg font-semibold w-40 text-center">
                            {currentDate.toLocaleString(language, { month: 'long', year: 'numeric' })}
                        </span>
                        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-700 rounded-md">&gt;</button>
                    </div>
                </div>

                <div className="grid grid-cols-7 text-center font-semibold text-gray-400 text-sm border-b border-gray-700 pb-2 mb-2">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => <div key={day}>{day}</div>)}
                </div>

                <div className="grid grid-cols-7 grid-rows-5 flex-1 gap-2">
                    {Array.from({ length: startingDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
                    {days.map(date => {
                        const videosOnThisDay = scheduledVideos.filter(v => 
                            v.scheduleDate?.getFullYear() === date.getFullYear() &&
                            v.scheduleDate?.getMonth() === date.getMonth() &&
                            v.scheduleDate?.getDate() === date.getDate()
                        );
                        const isToday = new Date().toDateString() === date.toDateString();

                        return (
                            <div
                                key={date.toString()}
                                onDrop={(e) => handleDrop(e, date)}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className="bg-gray-900/50 rounded-lg p-2 border-2 border-transparent transition"
                            >
                                <span className={`text-sm ${isToday ? 'font-bold text-indigo-400' : 'text-gray-300'}`}>{date.getDate()}</span>
                                <div className="mt-1 space-y-1">
                                    {videosOnThisDay.map(video => 
                                        <CalendarEvent key={video.id} video={video} onUnschedule={onUnschedule} />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default SchedulerView;