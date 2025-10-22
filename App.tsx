
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import MainAppLayout from './components/MainAppLayout';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import ContactPage from './components/ContactPage';
import { LanguageProvider } from './contexts/LanguageContext';

export type Page = 'landing' | 'login' | 'dashboard' | 'privacy' | 'terms' | 'contact';
export type DashboardView = 'templates' | 'videos' | 'scheduler' | 'credits' | 'team' | 'settings' | 'profile';


const App: React.FC = () => {
    const [page, setPage] = useState<Page>('landing');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Simple auth persistence for better DX
        const loggedIn = localStorage.getItem('isAuthenticated');
        if (loggedIn === 'true') {
            setIsAuthenticated(true);
            setPage('dashboard');
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        setPage('dashboard');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        setPage('landing');
    };

    const handleNavigate = (newPage: Page) => {
        setPage(newPage);
    };

    const renderPage = () => {
        if (page === 'dashboard' && isAuthenticated) {
            return <MainAppLayout onLogout={handleLogout} onNavigate={handleNavigate} />;
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
                return <LandingPage 
                    onGetStarted={() => setPage('login')}
                    onNavigate={handleNavigate}
                    isAuthenticated={isAuthenticated}
                    onGoToDashboard={() => setPage('dashboard')}
                />;
        }
    };
    
    return (
        <div className="bg-gray-900 min-h-screen">
            {renderPage()}
        </div>
    );
};

const WrappedApp: React.FC = () => (
    <LanguageProvider>
        <App />
    </LanguageProvider>
);

export default WrappedApp;
