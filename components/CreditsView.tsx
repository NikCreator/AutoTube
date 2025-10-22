import React from 'react';
import { CheckIcon, CreditCardIcon, ClockIcon, VideoIcon } from './icons';
import type { Video } from './MainAppLayout';
import { useLanguage } from '../hooks/useLanguage';

interface CreditsViewProps {
    credits: {
        total: number;
        used: number;
    };
    videos: Video[];
}

const CreditsView: React.FC<CreditsViewProps> = ({ credits, videos }) => {
    const { t } = useLanguage();
    const remainingCredits = credits.total - credits.used;
    const usagePercentage = credits.total > 0 ? (credits.used / credits.total) * 100 : 0;

    const creditSpends = videos
        .filter(v => v.status === 'completed' || v.uploadStatus === 'Published' || v.uploadStatus === 'Scheduled')
        .sort((a, b) => (b.scheduleDate?.getTime() || 0) - (a.scheduleDate?.getTime() || 0));

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">{t('credits.title')}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Current Usage & Plan */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <CreditCardIcon className="h-6 w-6 mr-3 text-indigo-400" />
                            {t('credits.usage_title')}
                        </h2>
                        <div>
                            <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                                <span>{t('credits.used')}</span>
                                <span>{new Intl.NumberFormat().format(credits.used)} / {new Intl.NumberFormat().format(credits.total)}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${usagePercentage}%` }}></div>
                            </div>
                            <p className="text-right text-sm text-gray-400 mt-2">
                                {t('credits.remaining')}: <span className="font-bold text-white">{new Intl.NumberFormat().format(remainingCredits)}</span> {t('common.credits')}
                            </p>
                        </div>
                    </div>

                     <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6">
                         <h2 className="text-xl font-semibold text-white mb-4">{t('credits.your_plan')}</h2>
                         <div className="bg-gray-700/50 p-4 rounded-lg">
                            <h3 className="text-lg font-bold text-indigo-400">{t('landing.pricing.starter_title')}</h3>
                            <p className="mt-1 text-2xl font-bold text-white">$100 <span className="text-base font-normal text-gray-400">{t('landing.pricing.per_month')}</span></p>
                            <ul className="mt-4 space-y-2 text-sm text-gray-300">
                                <li className="flex items-center gap-x-2"><CheckIcon className="h-5 w-5 text-green-400" /><span>{t('landing.pricing.credits_per_month', {count: '25,000'})}</span></li>
                                <li className="flex items-center gap-x-2"><CheckIcon className="h-5 w-5 text-green-400" /><span>{t('landing.pricing.templates_limit', {count: 3})}</span></li>
                            </ul>
                         </div>
                          <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition">{t('credits.manage_subscription')}</button>
                    </div>
                </div>

                {/* Spending History */}
                <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <ClockIcon className="h-6 w-6 mr-3 text-gray-400" />
                        {t('credits.history_title')}
                    </h2>
                    <ul className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
                        {creditSpends.map(video => (
                            <li key={video.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                <div className="flex items-center">
                                    <VideoIcon className="h-5 w-5 mr-3 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-white truncate w-40">{video.topic}</p>
                                        <p className="text-xs text-gray-400">{t('credits.video_generation')}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-red-400">- {video.credits}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

             {/* Purchase More Credits */}
             <div className="mt-12">
                <h2 className="text-2xl font-bold text-white text-center">{t('credits.purchase_title')}</h2>
                <p className="text-center text-gray-400 mt-2">{t('credits.purchase_subtitle')}</p>
                 <div className="isolate mx-auto mt-8 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                     {[{credits: 5000, price: 25, popular:false}, {credits: 15000, price: 60, popular:true}, {credits: 50000, price: 150, popular:false}].map(pack => (
                        <div key={pack.credits} className={`rounded-3xl p-8 ring-1 ${pack.popular ? 'ring-2 ring-indigo-500' : 'ring-gray-700'} relative`}>
                             {pack.popular && <div className="absolute top-0 right-0 -mt-2 -mr-2"><div className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">{t('credits.popular')}</div></div>}
                            <h3 className="text-lg font-semibold leading-8 text-white">{new Intl.NumberFormat().format(pack.credits)} {t('common.credits')}</h3>
                            <p className="mt-6 flex items-baseline gap-x-1"><span className="text-4xl font-bold tracking-tight text-white">${pack.price}</span></p>
                            <button className={`mt-10 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm ${pack.popular ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-gray-700 hover:bg-gray-600'}`}>{t('credits.purchase_button')}</button>
                        </div>
                     ))}
                 </div>
             </div>
        </div>
    );
};

export default CreditsView;
