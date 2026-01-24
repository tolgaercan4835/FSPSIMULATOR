
import React, { useMemo, useEffect } from 'react';
import type { Term } from '../types';
import Flashcard from './Flashcard';
import PremiumModal from './PremiumModal';

interface StudyViewProps {
    terms: Term[];
    isPremium: boolean;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    isGuest: boolean;
    onLoginRequest: () => void;
    onUpgradeRequest: () => void;
}

const FREE_CATEGORIES = ['Tümü', 'Semptomlar', 'Dahiliye', 'Anatomi', 'Aletler', 'Farmakoloji', 'Prosedürler'];

const StudyView: React.FC<StudyViewProps> = ({ terms, isPremium, selectedCategory, onCategoryChange, isGuest, onLoginRequest, onUpgradeRequest }) => {

    const categories = useMemo(() => {
        const allCategories = new Set(terms.map(term => term.category));
        return ['Tümü', ...Array.from(allCategories).sort()];
    }, [terms]);

    const filteredTerms = useMemo(() => {
        if (selectedCategory === 'Tümü') {
            if (!isPremium) {
                return terms.filter(term => FREE_CATEGORIES.includes(term.category));
            }
            return terms;
        }
        return terms.filter(term => term.category === selectedCategory);
    }, [selectedCategory, terms, isPremium]);

    useEffect(() => {
        const isPremiumCategory = !FREE_CATEGORIES.includes(selectedCategory);
        if (isPremiumCategory && (isGuest || !isPremium)) {
            onCategoryChange('Tümü');
        }
    }, [selectedCategory, isPremium, onCategoryChange, isGuest]);

    const handleCategoryClick = (category: string) => {
        const isPremiumCategory = !FREE_CATEGORIES.includes(category);
        
        if(isGuest && isPremiumCategory) {
            onLoginRequest();
            return;
        }

        if(!isPremium && isPremiumCategory) {
            onUpgradeRequest();
            return;
        }
        
        onCategoryChange(category);
    };

    return (
        <div className="flex flex-col items-center p-6 w-full max-w-5xl mx-auto">
            <div className="w-full mb-6">
                <h2 className="text-lg font-semibold text-gray-300 mb-3">Kategori Seç:</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => {
                        const isPremiumCategory = !FREE_CATEGORIES.includes(category);
                        const isLocked = isPremiumCategory && (!isPremium || isGuest);

                        return (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                                    selectedCategory === category
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-700 text-gray-300'
                                } ${
                                    isLocked 
                                    ? 'text-gray-500' 
                                    : 'hover:bg-gray-600'
                                }`}
                            >
                                {category}
                                {isLocked && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>}
                            </button>
                        );
                    })}
                </div>
            </div>
            
            {filteredTerms.length > 0 ? (
                 <Flashcard terms={filteredTerms} />
            ) : (
                <div className="flex flex-col items-center justify-center h-80 bg-gray-800 rounded-xl w-full max-w-lg">
                    <p className="text-gray-400">Bu kategoride kelime bulunamadı.</p>
                </div>
            )}
        </div>
    );
};

export default StudyView;
