import React, { useState } from 'react';
import { UserCircleIcon, CreditCardIcon } from './icons';
import type { TeamMember } from './MainAppLayout';
import { useLanguage } from '../hooks/useLanguage';

interface ProfileViewProps {
    user: TeamMember;
    onUpdateProfile: (name: string) => void;
    onNavigateToCredits: () => void;
}

const SettingsCard: React.FC<{ title: string; description: string; children: React.ReactNode; footer?: React.ReactNode }> = ({ title, description, children, footer }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
        <div className="p-6">
            {children}
        </div>
        {footer && <div className="p-4 bg-gray-900/50 rounded-b-xl border-t border-gray-700 text-right">{footer}</div>}
    </div>
);


const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateProfile, onNavigateToCredits }) => {
    const { t } = useLanguage();
    const [name, setName] = useState(user.name.replace(' (You)', ''));

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateProfile(name);
    };

     const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Password change functionality is under development.");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">{t('profile.title')}</h1>
            <div className="space-y-8 max-w-3xl">
                <form onSubmit={handleSaveProfile}>
                    <SettingsCard
                        title={t('profile.profile_info_title')}
                        description={t('profile.profile_info_subtitle')}
                        footer={
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm">
                                {t('profile.save_changes')}
                            </button>
                        }
                    >
                        <div className="space-y-6">
                             <div className="flex items-center space-x-4">
                                <UserCircleIcon className="h-16 w-16 text-gray-500" />
                                <button type="button" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition">
                                    {t('profile.change_avatar')}
                                </button>
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{t('profile.name_label')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t('profile.email_label')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={user.email}
                                    disabled
                                    className="block w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </SettingsCard>
                </form>

                 <form onSubmit={handlePasswordChange}>
                    <SettingsCard
                        title={t('profile.password_title')}
                        description={t('profile.password_subtitle')}
                         footer={
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm">
                                {t('profile.password_cta')}
                            </button>
                        }
                    >
                         <div className="space-y-4">
                            <div>
                                <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-1">{t('profile.current_password_label')}</label>
                                <input type="password" id="current-password" placeholder="••••••••" className="block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">{t('profile.new_password_label')}</label>
                                <input type="password" id="new-password" placeholder="••••••••" className="block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                    </SettingsCard>
                </form>

                 <SettingsCard
                    title={t('profile.subscription_title')}
                    description={t('profile.subscription_subtitle')}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg font-bold text-white">{t('landing.pricing.starter_title')} Plan</p>
                            <p className="text-gray-400 text-sm">$100 {t('landing.pricing.per_month')}</p>
                        </div>
                         <button 
                            type="button"
                            onClick={onNavigateToCredits} 
                            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
                        >
                             <CreditCardIcon className="h-5 w-5 mr-2" />
                            {t('profile.manage_button')}
                        </button>
                    </div>
                </SettingsCard>
            </div>
        </div>
    );
};

export default ProfileView;