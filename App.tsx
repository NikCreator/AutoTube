import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import MainAppLayout from './components/MainAppLayout';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import ContactPage from './components/ContactPage';

export type Page = 'landing' | 'login' | 'dashboard' | 'privacy' | 'terms' | 'contact';
export type DashboardView = 'templates' | 'videos' | 'credits' | 'settings';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('landing');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
    const handleLogin = () => {
        setIsAuthenticated(true);
        setPage('dashboard');
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
        setPage('landing');
    };
    
    const handleGetStarted = () => {
        setPage('login');
    };

    const handleNavigate = (targetPage: Page) => {
        setPage(targetPage);
    }
    
    const renderContent = () => {
        if (isAuthenticated && page === 'dashboard') {
            return <MainAppLayout onLogout={handleLogout} />;
        }

        switch (page) {
            case 'login':
                return <LoginPage onLogin={handleLogin} />;
            case 'privacy':
                return <PrivacyPage onBack={() => setPage('landing')} />;
            case 'terms':
                return <TermsPage onBack={() => setPage('landing')} />;
            case 'contact':
                return <ContactPage onBack={() => setPage('landing')} />;
            case 'landing':
            default:
                return <LandingPage onGetStarted={handleGetStarted} onNavigate={handleNavigate} />;
        }
    }

    return (
        <div className="bg-gray-900">
            {renderContent()}
        </div>
    );
};

export default App;