import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  return (
    <LegalPageLayout title="Контакты" onBack={onBack}>
      <p>Если у вас есть какие-либо вопросы о наших услугах, не стесняйтесь обращаться к нам.</p>
      
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">Электронная почта</h2>
      <p>Для общей поддержки и вопросов: <a href="mailto:support@autotube.example.com" className="text-indigo-400 hover:underline">support@autotube.example.com</a></p>
      <p>Для вопросов, связанных с продажами и партнерством: <a href="mailto:sales@autotube.example.com" className="text-indigo-400 hover:underline">sales@autotube.example.com</a></p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">Адрес</h2>
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
