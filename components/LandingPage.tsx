import React, { useState } from 'react';
import { YoutubeIcon, PhotoIcon, SparklesIcon, VideoIcon, CodeIcon, ShieldCheckIcon, CpuChipIcon, ArrowTrendingUpIcon, TemplateIcon, CheckIcon, XMarkIcon, ChevronDownIcon } from './icons';
import type { Page } from '../App';

interface LandingPageProps {
    onGetStarted: () => void;
    onNavigate: (page: Page) => void;
}

const Feature: React.FC<{icon: React.ReactNode, title: string, subtitle: string, description: string}> = ({icon, title, subtitle, description}) => (
    <div className="flex flex-col border border-white/10 p-8 rounded-2xl bg-gray-800/20 hover:bg-gray-800/50 transition-colors">
        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
            {icon}
            {title}
        </dt>
        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
            <p className="flex-auto font-bold text-lg">{subtitle}</p>
            <p className="mt-2 text-gray-400">{description}</p>
        </dd>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onNavigate }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqData = [
        {
            question: "Можно ли монетизировать видео, сгенерированные AutoTube?",
            answer: "Да, абсолютно. Видео, созданные нашей платформой, соответствуют стандартам YouTube для монетизации «безликих» каналов, поскольку они представляют собой уникальные сборки изображений, сценариев и озвучки. Мы генерируем контент, а не копируем его."
        },
        {
            question: "Будут ли мои видео выглядеть как шаблонные или дешевые AI-ролики?",
            answer: "Категорически нет. Наше главное отличие — Мастер-Шаблон. AI сначала анализирует ваш уникальный визуальный промт и структуру конкурентов, чтобы гарантировать, что каждое сгенерированное видео идеально соответствует вашему бренду и не похоже на массовый продукт."
        },
        {
            question: "Какова цена генерации одного видео?",
            answer: "Мы работаем по системе кредитов, поэтому цена зависит от длины сценария, количества изображений и качества голоса. Однако в каждом плане мы даем примерное соотношение, чтобы вы могли планировать производство."
        },
        {
            question: "Могу ли я использовать свой собственный голос для озвучки?",
            answer: "Да. В планах уровня «Pro» и выше мы предлагаем функционал клонирования голоса, чтобы обеспечить полную узнаваемость вашего канала."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-gray-900 text-gray-100">
             {/* Header */}
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5 flex items-center">
                           <SparklesIcon className="h-8 w-8 text-indigo-400" />
                           <span className="ml-3 text-2xl font-bold text-gray-100 tracking-tight">AutoTube</span>
                        </a>
                    </div>
                    <div className="lg:flex lg:flex-1 lg:justify-end">
                        <button onClick={onGetStarted} className="text-sm font-semibold leading-6 text-white hover:text-indigo-300">
                            Войти <span aria-hidden="true">&rarr;</span>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <div className="relative isolate pt-14">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8085ff] to-[#4f46e5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Запустите полностью автоматизированную YouTube-империю</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">Мы создаем «безликие» видео студийного качества, используя AI-анализ конкурентов и консистентный стиль. Перестаньте жертвовать качеством ради масштаба.</p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <button onClick={onGetStarted} className="rounded-md bg-indigo-500 px-4 py-3 text-base font-semibold text-white shadow-lg hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-transform hover:scale-105">Начать 7-дневную бесплатную пробную версию</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Proof / Problem Section */}
            <div className="py-24 sm:py-32">
                 <div className="mx-auto max-w-7xl px-6 lg:px-8">
                     <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Создавайте контент на уровне лидеров рынка</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-400">
                           <span className="text-red-400">Проблема:</span> Ручное создание контента занимает недели. Шаблонная автоматизация убивает узнаваемость вашего бренда.
                           <br/>
                           <span className="text-green-400">Решение:</span> AutoTube — единственная платформа, которая сначала генерирует DNA вашего стиля, а затем масштабирует его.
                        </p>
                    </div>
                    <div className="mt-10 flex items-center justify-center space-x-8">
                        <div className="flex items-center text-gray-400">
                            <TemplateIcon className="h-6 w-6 mr-2 text-gray-400"/>
                            <span>Создал</span>
                        </div>
                         <div className="flex items-center text-gray-400">
                            <CpuChipIcon className="h-6 w-6 mr-2 text-gray-400"/>
                            <span>Настроил</span>
                        </div>
                         <div className="flex items-center text-gray-400">
                            <ArrowTrendingUpIcon className="h-6 w-6 mr-2 text-indigo-400"/>
                            <span>Получил результат</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* How it works Section */}
            <div className="bg-gray-800/20 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-400">Процесс</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Три шага до готового, профессионального видео</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-none sm:mt-20 lg:mt-24">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Step 1 Block */}
                            <div className="flex flex-col rounded-2xl bg-gray-800 p-8 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                                <div className="flex items-center gap-x-4">
                                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-xl ring-8 ring-indigo-500/10">
                                        1
                                    </div>
                                    <h3 className="text-lg font-semibold leading-7 text-white">
                                        Создайте Мастер-Шаблон
                                    </h3>
                                </div>
                                <p className="mt-4 text-base leading-7 text-gray-400">
                                    Загрузите 3 ссылки конкурентов и 5 скриншотов. Наш AI анализирует структуру и создает идеальный промт для вашего визуального стиля.
                                </p>
                            </div>
                            {/* Step 2 Block */}
                            <div className="flex flex-col rounded-2xl bg-gray-800 p-8 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                                <div className="flex items-center gap-x-4">
                                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-xl ring-8 ring-indigo-500/10">
                                        2
                                    </div>
                                    <h3 className="text-lg font-semibold leading-7 text-white">
                                        Запустите Автоматизацию
                                    </h3>
                                </div>
                                <p className="mt-4 text-base leading-7 text-gray-400">
                                    Наша система берет управление на себя: генерирует трендовые темы, пишет сценарии, создает озвучку и изображения на полном автопилоте.
                                </p>
                            </div>
                            {/* Step 3 Block */}
                            <div className="flex flex-col rounded-2xl bg-gray-800 p-8 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                                <div className="flex items-center gap-x-4">
                                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-xl ring-8 ring-indigo-500/10">
                                        3
                                    </div>
                                    <h3 className="text-lg font-semibold leading-7 text-white">
                                        Наблюдайте за Ростом
                                    </h3>
                                </div>
                                <p className="mt-4 text-base leading-7 text-gray-400">
                                    Платформа автоматически собирает и публикует готовые видео прямо на ваш YouTube-канал, готовые к монетизации.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Features Grid */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                     <div className="mx-auto max-w-2xl lg:text-center">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Что делает нас лучше</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                           <Feature 
                                icon={<ShieldCheckIcon className="h-6 w-6 text-indigo-400"/>}
                                title="Гарантия Стиля"
                                subtitle="Визуальная консистентность"
                                description="Каждое видео выглядит так, словно над ним работал дизайнер. Шаблон обеспечивает идеальное совпадение цветов, композиции и тона."
                           />
                           <Feature 
                                icon={<CpuChipIcon className="h-6 w-6 text-indigo-400"/>}
                                title="Полный Автопилот"
                                subtitle="От Идеи до Публикации"
                                description="Наша платформа берет на себя все: от генерации идей и написания сценария до финальной сборки и публикации видео. Вы не тратите время на контроль."
                           />
                           <Feature 
                                icon={<CodeIcon className="h-6 w-6 text-indigo-400"/>}
                                title="Качество LLM"
                                subtitle="Анализ, основанный на данных"
                                description="AI не просто придумывает. Он анализирует успех конкурентов и создает сценарий, точно повторяющий выигрышную структуру."
                           />
                           <Feature 
                                icon={<ArrowTrendingUpIcon className="h-6 w-6 text-indigo-400"/>}
                                title="Высокая Пропускная способность"
                                subtitle="Масштабируйте как агентство"
                                description="Используйте несколько шаблонов для разных ниш и генерируйте десятки видео в неделю. Идеально для контент-ферм."
                           />
                        </dl>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Выберите свой план для масштабирования</h2>
                    </div>
                    <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* Starter Plan */}
                        <div className="rounded-3xl p-8 ring-1 ring-gray-700 xl:p-10">
                             <h3 className="text-lg font-semibold leading-8 text-white">Starter</h3>
                             <p className="mt-4 text-sm leading-6 text-gray-300">Индивидуальные пользователи и тестирование ниш</p>
                             <p className="mt-6 flex items-baseline gap-x-1">
                                 <span className="text-4xl font-bold tracking-tight text-white">$100</span>
                                 <span className="text-sm font-semibold leading-6 text-gray-300">/мес</span>
                             </p>
                             <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />25 000 кредитов/мес ($1 = 250)</li>
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />До 3 Мастер-Шаблонов</li>
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />~10-15 средних видео/мес</li>
                                <li className="flex gap-x-3"><XMarkIcon className="h-6 w-5 flex-none text-gray-500" aria-hidden="true" />Клонирование Голоса</li>
                             </ul>
                            <button onClick={onGetStarted} className="mt-10 block w-full rounded-md bg-gray-700 px-3 py-2 text-center text-sm font-semibold leading-6 text-white hover:bg-gray-600">Начать</button>
                        </div>

                        {/* Pro Plan (Recommended) */}
                        <div className="relative rounded-3xl p-8 ring-2 ring-indigo-500 xl:p-10">
                             <div className="absolute top-0 right-0 -mt-2 -mr-2">
                                <div className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">Рекомендовано</div>
                             </div>
                             <h3 className="text-lg font-semibold leading-8 text-white">Pro</h3>
                             <p className="mt-4 text-sm leading-6 text-gray-300">Растущие каналы и команды</p>
                             <p className="mt-6 flex items-baseline gap-x-1">
                                 <span className="text-4xl font-bold tracking-tight text-white">$500</span>
                                 <span className="text-sm font-semibold leading-6 text-gray-300">/мес</span>
                             </p>
                             <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />150 000 кредитов/мес ($1 = 300)</li>
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />До 10 Мастер-Шаблонов</li>
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />~50-75 средних видео/мес</li>
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />2 уникальных клона голоса</li>
                             </ul>
                            <button onClick={onGetStarted} className="mt-10 block w-full rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400">Выбрать план</button>
                        </div>
                        
                        {/* Agency Plan */}
                        <div className="rounded-3xl p-8 ring-1 ring-gray-700 xl:p-10">
                             <h3 className="text-lg font-semibold leading-8 text-white">Agency</h3>
                             <p className="mt-4 text-sm leading-6 text-gray-300">Крупные контент-фермы и агентства</p>
                             <p className="mt-6 flex items-baseline gap-x-1">
                                 <span className="text-4xl font-bold tracking-tight text-white">$1500</span>
                                 <span className="text-sm font-semibold leading-6 text-gray-300">/мес</span>
                             </p>
                             <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />600 000 кредитов/мес ($1 = 400)</li>
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />До 25 Мастер-Шаблонов</li>
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />~200+ средних видео/мес</li>
                                <li className="flex gap-x-3"><CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />10 уникальных клонов голоса</li>
                             </ul>
                             <button onClick={onGetStarted} className="mt-10 block w-full rounded-md bg-gray-700 px-3 py-2 text-center text-sm font-semibold leading-6 text-white hover:bg-gray-600">Связаться</button>
                        </div>
                    </div>
                     <div className="mt-16 text-center">
                        <p className="text-lg font-semibold text-white">Не уверены?</p>
                        <p className="mt-2 text-gray-400">Начните с Бесплатного Пробного Периода! Получите 5000 кредитов на тестирование всех функций.</p>
                         <button onClick={onGetStarted} className="mt-6 rounded-md bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 transition-transform hover:scale-105">
                            Начать бесплатно
                        </button>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-4xl divide-y divide-white/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">Отвечаем на ваши вопросы</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-white/10">
                        {faqData.map((faq, index) => (
                            <div key={index} className="pt-6">
                                <dt>
                                    <button onClick={() => toggleFaq(index)} className="flex w-full items-start justify-between text-left text-white">
                                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                                        <span className="ml-6 flex h-7 items-center">
                                            <ChevronDownIcon className={`h-6 w-6 transform transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} aria-hidden="true" />
                                        </span>
                                    </button>
                                </dt>
                                {openFaq === index && (
                                    <dd className="mt-2 pr-12">
                                        <p className="text-base leading-7 text-gray-400">{faq.answer}</p>
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>
            </div>


            {/* Final CTA */}
             <div className="bg-gray-900">
                <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gray-800 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8085ff] to-[#4f46e5] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                        </div>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ваш следующий миллион подписчиков начинается здесь.</h2>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                <button onClick={onGetStarted} className="rounded-md bg-indigo-500 px-4 py-3 text-base font-semibold text-white shadow-lg hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-transform hover:scale-105">Попробовать AutoTube бесплатно</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* Footer */}
            <footer className="border-t border-white/10 mt-12">
                <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
                    <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
                        <div className="pb-6"><button onClick={() => onNavigate('terms')} className="text-sm leading-6 text-gray-400 hover:text-white">Условия</button></div>
                        <div className="pb-6"><button onClick={() => onNavigate('privacy')} className="text-sm leading-6 text-gray-400 hover:text-white">Конфиденциальность</button></div>
                        <div className="pb-6"><button onClick={() => onNavigate('contact')} className="text-sm leading-6 text-gray-400 hover:text-white">Контакты</button></div>
                    </nav>
                    <p className="mt-10 text-center text-xs leading-5 text-gray-400">&copy; 2024 AutoTube, Inc. Все права защищены.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
