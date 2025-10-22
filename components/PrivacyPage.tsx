import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { useLanguage } from '../hooks/useLanguage';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  return (
    <LegalPageLayout title={t('legal.privacy_title')} onBack={onBack}>
      <p className="text-gray-400">{t('legal.privacy_updated')}</p>
      <p>{t('legal.privacy_intro')}</p>
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('legal.privacy_h1')}</h2>
      <p>{t('legal.privacy_p1')}</p>
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('legal.privacy_h2')}</h2>
      <p>{t('legal.privacy_p2')}</p>
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('legal.privacy_h3')}</h2>
      <p>{t('legal.privacy_p3')}</p>
    </LegalPageLayout>
  );
};

export default PrivacyPage;
