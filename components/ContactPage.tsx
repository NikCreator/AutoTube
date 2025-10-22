import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { useLanguage } from '../hooks/useLanguage';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  return (
    <LegalPageLayout title={t('legal.contact_title')} onBack={onBack}>
      <p>{t('legal.contact_intro')}</p>
      
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('legal.contact_email_title')}</h2>
      <p>{t('legal.contact_email_support')} <a href="mailto:support@autotube.example.com" className="text-indigo-400 hover:underline">support@autotube.example.com</a></p>
      <p>{t('legal.contact_email_sales')} <a href="mailto:sales@autotube.example.com" className="text-indigo-400 hover:underline">sales@autotube.example.com</a></p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('legal.contact_address_title')}</h2>
      <p>
        AutoTube Inc.<br />
        123 Tech Avenue<br />
        Innovation City, CA 94043<br />
        United States
      </p>
    </LegalPageLayout>
  );
};

export default ContactPage;
