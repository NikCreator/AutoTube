import React from 'react';
import { SparklesIcon, TemplateIcon, VideoIcon, CreditCardIcon, CogIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from './icons';
import type { DashboardView } from '../App';

interface SidebarProps {
    activeView: DashboardView;
    setActiveView: (view: DashboardView) => void;
    onLogout: () => void;
}

const NavLink: React.FC<{
    view: DashboardView, 
    label: string, 
    icon: React.ReactNode, 
    activeView: DashboardView,
    onClick: () => void
}> = ({ view, label, icon, activeView, onClick }) => {
    const isActive = activeView === view;
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
            }`}
        >
            {icon}
            {label}
        </button>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout }) => {
    return (
        <aside className="w-64 bg-gray-800/50 border-r border-gray-700 flex flex-col flex-shrink-0">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <SparklesIcon className="h-8 w-8 text-indigo-400" />
                <h1 className="ml-3 text-2xl font-bold text-gray-100 tracking-tight">
                    AutoTube
                </h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavLink 
                    view="templates" 
                    label="Шаблоны" 
                    icon={<TemplateIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('templates')}
                />
                <NavLink 
                    view="videos" 
                    label="Мои Видео" 
                    icon={<VideoIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('videos')}
                />
                 <NavLink 
                    view="credits" 
                    label="Кредиты и Тариф" 
                    icon={<CreditCardIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('credits')}
                />
                 <NavLink 
                    view="settings" 
                    label="Настройки" 
                    icon={<CogIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('settings')}
                />
            </nav>
            <div className="px-4 py-4 border-t border-gray-700">
                <div className="flex items-center mb-4">
                    <UserCircleIcon className="h-10 w-10 text-gray-400"/>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Нурасыл</p>
                        <p className="text-xs text-gray-400">Pro Plan</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center bg-gray-700 hover:bg-red-700/80 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out text-sm"
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    Выйти
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;