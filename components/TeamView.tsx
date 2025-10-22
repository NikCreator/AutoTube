import React, { useState } from 'react';
import type { TeamMember, TeamMemberRole } from './MainAppLayout';
import { PlusIcon, UsersIcon, ChevronDownIcon, TrashIcon } from './icons';
import { useLanguage } from '../hooks/useLanguage';

interface TeamViewProps {
    members: TeamMember[];
    onInvite: (email: string, role: TeamMemberRole) => void;
    onUpdateRole: (memberId: string, newRole: TeamMemberRole) => void;
    onRemove: (memberId: string) => void;
}

const InviteModal: React.FC<{
    onClose: () => void;
    onInvite: (email: string, role: TeamMemberRole) => void;
}> = ({ onClose, onInvite }) => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<TeamMemberRole>('Creator');

    const handleInvite = () => {
        if (email) {
            onInvite(email, role);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center items-center p-4">
            <div className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{t('team.modal_title')}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('team.modal_email')}</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="user@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300">{t('team.modal_role')}</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as TeamMemberRole)}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="Creator">{t('team.role_creator')}</option>
                            <option value="Manager">{t('team.role_manager')}</option>
                            <option value="Admin">{t('team.role_admin')}</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-700 flex justify-end">
                    <button onClick={handleInvite} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition">
                        {t('team.modal_cta')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const RoleBadge: React.FC<{ role: TeamMemberRole }> = ({ role }) => {
    const { t } = useLanguage();
    const roleText = {
        Admin: t('team.role_admin'),
        Manager: t('team.role_manager'),
        Creator: t('team.role_creator'),
    }
    const roleColors = {
        Admin: 'bg-red-500/20 text-red-300',
        Manager: 'bg-yellow-500/20 text-yellow-300',
        Creator: 'bg-blue-500/20 text-blue-300',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[role]}`}>{roleText[role]}</span>;
}

const TeamView: React.FC<TeamViewProps> = ({ members, onInvite, onUpdateRole, onRemove }) => {
    const { t } = useLanguage();
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);
    
    const isCurrentUserAdmin = members.length > 0 && members[0].role === 'Admin';
    
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <div>
                     <h1 className="text-3xl font-bold text-white">{t('team.title')}</h1>
                     <p className="text-gray-400 mt-1">{t('team.subtitle')}</p>
                </div>
                {isCurrentUserAdmin && (
                    <button
                        onClick={() => setInviteModalOpen(true)}
                        className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        {t('team.invite_button')}
                    </button>
                )}
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('team.header_member')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('team.header_status')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('team.header_role')}</th>
                            {isCurrentUserAdmin && <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {members.map(member => (
                            <tr key={member.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-white">{member.name}</div>
                                    <div className="text-sm text-gray-400">{member.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${member.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                        {member.status === 'Active' ? t('team.status_active') : t('team.status_invited')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {isCurrentUserAdmin && member.id !== members[0].id ? (
                                        <select
                                            value={member.role}
                                            onChange={(e) => onUpdateRole(member.id, e.target.value as TeamMemberRole)}
                                            className="bg-gray-700 border-gray-600 rounded-md px-2 py-1 text-gray-200 focus:ring-indigo-500"
                                        >
                                            <option value="Creator">{t('team.role_creator')}</option>
                                            <option value="Manager">{t('team.role_manager')}</option>
                                            <option value="Admin">{t('team.role_admin')}</option>
                                        </select>
                                    ) : (
                                        <RoleBadge role={member.role} />
                                    )}
                                </td>
                                {isCurrentUserAdmin && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {member.id !== members[0].id && (
                                             <button onClick={() => onRemove(member.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-md transition">
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {isInviteModalOpen && <InviteModal onClose={() => setInviteModalOpen(false)} onInvite={onInvite} />}
        </div>
    );
};

export default TeamView;