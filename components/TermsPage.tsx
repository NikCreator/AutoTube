import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { useLanguage } from '../hooks/useLanguage';

interface TermsPageProps {
  onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  return (
    <LegalPageLayout title={t('legal.terms_title')} onBack={onBack}>
      <p className="text-gray-400">{t('legal.terms_updated')}</p>
      <p>{t('legal.terms_intro')}</p>
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('legal.terms_h1')}</h2>
      <p>{t('legal.terms_p1')}</p>
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('legal.terms_h2')}</h2>
      <p>{t('legal.terms_p2')}</p>
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('legal.terms_h3')}</h2>
      <p>{t('legal.terms_p3')}</p>
    </LegalPageLayout>
  );
};

export default TermsPage;
