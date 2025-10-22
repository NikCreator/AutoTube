

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TemplatesView from './TemplatesView';
import VideosView from './VideosView';
import CreditsView from './CreditsView';
import SettingsView from './SettingsView';
import TeamView from './TeamView';
import SchedulerView from './SchedulerView';
import ProfileView from './ProfileView';
import { DashboardView, Page } from '../App';
// fix: Import Gemini API services for template analysis.
import { analyzeCompetitorVideos, generateVisualStylePrompt } from '../services/geminiService';

// Type definitions
export type TemplateStatus = 'ready' | 'analyzing' | 'error';

export interface Template {
    id: string;
    name: string;
    status: TemplateStatus;
    voiceId: string;
    sourceLinks: string[];
    sourceFiles: File[];
    competitorAnalysisResult?: string;
    visualStylePrompt?: string;
}

export type VideoStatus = 'completed' | 'failed' | 'scripting' | 'generating_images' | 'rendering';
export type UploadStatus = 'Not Scheduled' | 'Scheduled' | 'Uploading' | 'Published' | 'Error';

export interface Video {
    id: string;
    topic: string;
    template: string; // template name
    credits: number;
    status: VideoStatus;
    youtubeChannelId?: string;
    scheduleDate?: Date;
    uploadStatus: UploadStatus;
}

export type TeamMemberRole = 'Admin' | 'Manager' | 'Creator';
export type TeamMemberStatus = 'Invited' | 'Active' | 'Disabled';

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: TeamMemberRole;
    status: TeamMemberStatus;
}


interface MainAppLayoutProps {
    onLogout: () => void;
    onNavigate: (page: Page) => void;
}

// Mock data
const MOCK_TEMPLATES: Template[] = [
    {
        id: '1',
        name: 'Tech Gadget Review',
        status: 'ready',
        voiceId: 'voice_id_123',
        sourceLinks: ['https://www.youtube.com/watch?v=example1'],
        sourceFiles: [],
        competitorAnalysisResult: 'Analysis shows a fast pace, short sentences, and an energetic delivery. Keywords: "innovation", "future", "incredible".',
        visualStylePrompt: 'cinematic, hyperrealistic, dramatic lighting, vibrant cyberpunk palette, futuristic and sterile atmosphere, shot on 35mm film, shallow depth of field.'
    },
    {
        id: '2',
        name: 'Historical Facts',
        status: 'analyzing',
        voiceId: 'voice_id_456',
        sourceLinks: ['https://www.youtube.com/watch?v=example2'],
        sourceFiles: [],
    },
];

const MOCK_VIDEOS: Video[] = [
    { id: 'v1', topic: 'Top 5 Smartphones of 2024', template: 'Tech Gadget Review', credits: 150, status: 'completed', uploadStatus: 'Not Scheduled' },
    { id: 'v2', topic: 'Mysteries of Ancient Egypt', template: 'Historical Facts', credits: 200, status: 'rendering', uploadStatus: 'Not Scheduled' },
    { id: 'v3', topic: 'The New iPhone - A Revolution?', template: 'Tech Gadget Review', credits: 120, status: 'completed', uploadStatus: 'Scheduled', scheduleDate: new Date(new Date().setDate(new Date().getDate() + 3)) },
    { id: 'v4', topic: 'Unknown Heroes of WWII', template: 'Historical Facts', credits: 250, status: 'failed', uploadStatus: 'Error' },
    { id: 'v5', topic: 'How Quantum Computers Work', template: 'Tech Gadget Review', credits: 180, status: 'completed', uploadStatus: 'Published', scheduleDate: new Date(new Date().setDate(new Date().getDate() - 2)) },
];

const MOCK_TEAM_MEMBERS: TeamMember[] = [
    { id: 'user1', name: 'John Doe (You)', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active' },
    { id: 'user3', name: 'Peter Jones', email: 'peter@example.com', role: 'Creator', status: 'Invited' },
];


const MainAppLayout: React.FC<MainAppLayoutProps> = ({ onLogout, onNavigate }) => {
    const [activeView, setActiveView] = useState<DashboardView>('templates');
    const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
    const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
    const [credits, setCredits] = useState({ total: 25000, used: MOCK_VIDEOS.reduce((acc, v) => v.status === 'completed' || v.uploadStatus === 'Published' ? acc + v.credits : acc, 0) });
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);

    const currentUser = teamMembers.find(m => m.id === 'user1');

    // fix: Replace mock timeout with async calls to the Gemini API for analysis.
    const handleSaveTemplate = async (templateData: { id?: string; name: string; voiceId: string; links: string[], files: File[] }) => {
        const { id, name, voiceId, links, files } = templateData;

        const newTemplate: Template = {
            id: id || `template-${Date.now()}`,
            name,
            voiceId,
            sourceLinks: links,
            sourceFiles: files,
            status: 'analyzing',
            competitorAnalysisResult: undefined,
            visualStylePrompt: undefined,
        };

        let updatedTemplates;
        if (id) {
            updatedTemplates = templates.map(t => t.id === id ? { ...t, ...newTemplate } : t);
        } else {
            updatedTemplates = [...templates, newTemplate];
        }
        setTemplates(updatedTemplates);

        try {
            const [competitorAnalysisResult, visualStylePrompt] = await Promise.all([
                analyzeCompetitorVideos(links),
                generateVisualStylePrompt(files)
            ]);

            setTemplates(prevTemplates => prevTemplates.map(t => 
                t.id === newTemplate.id 
                ? { ...t, status: 'ready', competitorAnalysisResult, visualStylePrompt } 
                : t
            ));
        } catch (error) {
            console.error("Error processing template with Gemini API:", error);
            setTemplates(prevTemplates => prevTemplates.map(t => 
                t.id === newTemplate.id ? { ...t, status: 'error' } : t
            ));
        }
    };

    const handleSelectTemplate = (templateId: string) => {
        // A full implementation would likely navigate to a template detail view.
        // For now, we'll log to the console to show the action is captured and fix the prop error.
        console.log("Selected template with ID:", templateId);
        // e.g., setActiveView('templateDetail');
    };

    const handleInviteMember = (email: string, role: TeamMemberRole) => {
        const newMember: TeamMember = {
            id: `user-${Date.now()}`,
            name: 'Pending...',
            email,
            role,
            status: 'Invited',
        };
        setTeamMembers(prev => [...prev, newMember]);
    };

    const handleUpdateMemberRole = (memberId: string, newRole: TeamMemberRole) => {
        setTeamMembers(prev => prev.map(m => m.id === memberId ? { ...m, role: newRole } : m));
    };

    const handleRemoveMember = (memberId: string) => {
        setTeamMembers(prev => prev.filter(m => m.id !== memberId));
    };
    
    const handleScheduleVideo = (videoId: string, scheduleDate: Date) => {
        setVideos(prev => prev.map(v => v.id === videoId ? {...v, scheduleDate, uploadStatus: 'Scheduled' } : v));
    };
    
    const handleUnscheduleVideo = (videoId: string) => {
        setVideos(prev => prev.map(v => v.id === videoId ? {...v, scheduleDate: undefined, uploadStatus: 'Not Scheduled' } : v));
    };

    const handleUpdateProfile = (newName: string) => {
        if (!currentUser) return;
        setTeamMembers(prev => prev.map(m => 
            m.id === currentUser.id ? { ...m, name: `${newName.trim()} (You)` } : m
        ));
    };

    const renderView = () => {
        switch (activeView) {
            case 'templates':
                return <TemplatesView templates={templates} onSaveTemplate={handleSaveTemplate} onSelectTemplate={handleSelectTemplate} />;
            case 'videos':
                return <VideosView videos={videos} />;
            case 'credits':
                return <CreditsView credits={credits} videos={videos} />;
            case 'settings':
                return <SettingsView />;
            case 'team':
                return <TeamView members={teamMembers} onInvite={handleInviteMember} onUpdateRole={handleUpdateMemberRole} onRemove={handleRemoveMember} />;
            case 'scheduler':
                return <SchedulerView videos={videos} onSchedule={handleScheduleVideo} onUnschedule={handleUnscheduleVideo} />;
            case 'profile':
                 return currentUser ? (
                    <ProfileView 
                        user={currentUser} 
                        onUpdateProfile={handleUpdateProfile}
                        onNavigateToCredits={() => setActiveView('credits')}
                    />
                ) : <div className="text-center text-gray-400">Failed to load profile data.</div>;
            default:
                return <TemplatesView templates={templates} onSaveTemplate={handleSaveTemplate} onSelectTemplate={handleSelectTemplate} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar 
                activeView={activeView}
                setActiveView={setActiveView}
                onLogout={onLogout}
                onNavigate={onNavigate}
                credits={credits}
                currentUser={currentUser}
            />
            <main className="flex-1 p-8 overflow-y-auto">
                {renderView()}
            </main>
        </div>
    );
};

export default MainAppLayout;