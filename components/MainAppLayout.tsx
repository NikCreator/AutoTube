import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TemplatesView from './TemplatesView';
import VideosView from './VideosView';
import CreditsView from './CreditsView';
import SettingsView from './SettingsView';
import type { DashboardView } from '../App';

interface MainAppLayoutProps {
    onLogout: () => void;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ onLogout }) => {
    const [activeView, setActiveView] = useState<DashboardView>('templates');

    const renderActiveView = () => {
        switch(activeView) {
            case 'templates':
                return <TemplatesView />;
            case 'videos':
                return <VideosView />;
            case 'credits':
                return <CreditsView />;
            case 'settings':
                return <SettingsView />;
            default:
                return <TemplatesView />;
        }
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                {renderActiveView()}
            </main>
        </div>
    );
};

export default MainAppLayout;