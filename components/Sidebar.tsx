import React from 'react';
import { SparklesIcon, TemplateIcon, VideoIcon, CreditCardIcon, CogIcon, UserCircleIcon, ArrowRightOnRectangleIcon, UsersIcon, CalendarIcon } from './icons';
import type { DashboardView, Page } from '../App';
import type { TeamMember } from './MainAppLayout';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageSwitcher } from './LanguageSwitcher';


interface SidebarProps {
    activeView: DashboardView;
    setActiveView: (view: DashboardView) => void;
    onLogout: () => void;
    onNavigate: (page: Page) => void;
    credits: { total: number; used: number; };
    currentUser?: TeamMember;
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


const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout, onNavigate, credits, currentUser }) => {
    const { t } = useLanguage();
    const remainingCredits = credits.total - credits.used;

    return (
        <aside className="w-64 bg-gray-800/50 border-r border-gray-700 flex flex-col flex-shrink-0">
            <div 
                className="flex items-center justify-center h-20 border-b border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
                onClick={() => onNavigate('landing')}
            >
                <SparklesIcon className="h-8 w-8 text-indigo-400" />
                <h1 className="ml-3 text-2xl font-bold text-gray-100 tracking-tight">
                    {t('landing.header')}
                </h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavLink 
                    view="templates" 
                    label={t('sidebar.templates')} 
                    icon={<TemplateIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('templates')}
                />
                <NavLink 
                    view="videos" 
                    label={t('sidebar.videos')} 
                    icon={<VideoIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('videos')}
                />
                <NavLink 
                    view="scheduler" 
                    label={t('sidebar.scheduler')} 
                    icon={<CalendarIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('scheduler')}
                />
                 <NavLink 
                    view="credits" 
                    label={t('sidebar.credits_plan')} 
                    icon={<CreditCardIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('credits')}
                />
                <NavLink 
                    view="team" 
                    label={t('sidebar.team')} 
                    icon={<UsersIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('team')}
                />
                 <NavLink 
                    view="settings" 
                    label={t('sidebar.settings')} 
                    icon={<CogIcon className="h-5 w-5 mr-3"/>} 
                    activeView={activeView}
                    onClick={() => setActiveView('settings')}
                />
            </nav>
            <div className="px-4 py-4 border-t border-gray-700">
                <div className="mb-4">
                  <LanguageSwitcher />
                </div>
                <button
                    onClick={() => setActiveView('profile')}
                    className={`w-full text-left p-2 rounded-lg transition-colors mb-4 ${activeView === 'profile' ? 'bg-gray-700' : 'hover:bg-gray-700/50'}`}
                    aria-label={t('sidebar.profile_aria')}
                >
                    <div className="flex items-center">
                        <UserCircleIcon className="h-10 w-10 text-gray-400"/>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">{currentUser?.name.replace(' (You)', '')}</p>
                            <p className="text-xs text-gray-400" title={t('sidebar.credits_remaining', {count: new Intl.NumberFormat().format(remainingCredits)})}>
                                {t('sidebar.credits_remaining', {count: new Intl.NumberFormat().format(remainingCredits)})}
                            </p>
                        </div>
                    </div>
                </button>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center bg-gray-700 hover:bg-red-700/80 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out text-sm"
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    {t('sidebar.logout')}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
