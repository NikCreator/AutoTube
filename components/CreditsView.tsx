import React from 'react';
import { CreditCardIcon } from './icons';

const CreditsView: React.FC = () => {
    const totalCredits = 150000;
    const usedCredits = 45000;
    const percentageUsed = (usedCredits / totalCredits) * 100;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Кредиты и Тариф</h1>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                <div className="flex items-center mb-6">
                    <CreditCardIcon className="h-8 w-8 text-indigo-400 mr-4" />
                    <div>
                        <h2 className="text-xl font-bold text-white">Ваш текущий тариф: Pro</h2>
                        <p className="text-sm text-gray-400">Следующее списание: 15 августа 2024 г.</p>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm font-medium text-gray-300">Остаток кредитов</span>
                        <span className="text-lg font-semibold text-white">{new Intl.NumberFormat().format(totalCredits - usedCredits)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                        <div 
                            className="bg-indigo-500 h-4 rounded-full" 
                            style={{ width: `${100 - percentageUsed}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between items-baseline mt-2 text-xs text-gray-400">
                        <span>Использовано: {new Intl.NumberFormat().format(usedCredits)}</span>
                        <span>Всего: {new Intl.NumberFormat().format(totalCredits)}</span>
                    </div>
                </div>
                
                <button
                    className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                    Обновить план
                </button>
            </div>
        </div>
    );
};

export default CreditsView;