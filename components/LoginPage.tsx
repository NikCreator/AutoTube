import React from 'react';
import { GoogleIcon } from './icons';
import { useLanguage } from '../hooks/useLanguage';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const { t } = useLanguage();
    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        {t('login.title')}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        {t('login.subtitle')}
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <button
                        type="button"
                        onClick={onLogin}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <GoogleIcon className="h-5 w-5 text-indigo-300" aria-hidden="true" />
                        </span>
                        {t('login.google_signin')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
