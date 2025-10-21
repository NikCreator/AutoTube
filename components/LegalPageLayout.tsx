import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={onBack} className="text-sm font-semibold leading-6 text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
        &larr; Назад на главную
      </button>
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">{title}</h1>
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-4">
            {children}
        </div>
      </div>
    </div>
  );
};
