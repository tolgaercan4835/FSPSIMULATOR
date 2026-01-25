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
    onGenerateNewCards: () => void;
    isGeneratingCards: boolean;
}

const FREE_CATEGORIES = ['Tümü', 'Semptomlar', 'Dahiliye', 'Anatomi', 'Aletler', 'Farmakoloji', 'Prosedürler'];

const StudyView: React.FC<StudyViewProps> = ({ terms, isPremium, selectedCategory, onCategoryChange, isGuest, onLoginRequest, onUpgradeRequest, onGenerateNewCards, isGeneratingCards }) => {

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
    
    const handleGenerateClick = () => {
        if (isGuest) {
            onLoginRequest();
            return;
        }
        if (!isPremium) {
            onUpgradeRequest();
            return;
        }
        onGenerateNewCards();
    };

    return (
        <div className="flex flex-col items-center p-6 w-full max-w-5xl mx-auto bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
             <header className="text-center mb-12 w-full pt-8">
                 <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">Terminoloji Kartları</h1>
                 <p className="text-lg text-gray-400 mt-2">Fachsprache bilginizi interaktif kartlarla test edin.</p>
            </header>

            <div className="w-full mb-8 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                <h2 className="text-base font-semibold text-gray-300 mb-3">Kategori Seç:</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => {
                        const isPremiumCategory = !FREE_CATEGORIES.includes(category);
                        const isLocked = isPremiumCategory && (!isPremium || isGuest);

                        return (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-2 border ${
                                    selectedCategory === category
                                        ? 'bg-sky-600 text-white shadow-md border-sky-500'
                                        : 'bg-gray-700 text-gray-300 border-gray-600'
                                } ${
                                    isLocked 
                                    ? 'text-gray-500' 
                                    : 'hover:bg-gray-600 hover:border-gray-500'
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
                <div className="flex flex-col items-center justify-center h-80 bg-gray-800/50 border border-gray-700 rounded-xl w-full max-w-lg">
                    <p className="text-gray-400">Bu kategoride kelime bulunamadı.</p>
                </div>
            )}

            <div className="w-full max-w-lg mt-8">
                <button
                    onClick={handleGenerateClick}
                    disabled={isGeneratingCards}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold rounded-lg shadow-lg shadow-indigo-500/30 disabled:bg-indigo-400 disabled:cursor-not-allowed hover:from-indigo-600 hover:to-purple-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transform hover:-translate-y-0.5"
                >
                    {isGeneratingCards ? (
                        <>
                            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Üretiliyor...</span>
                        </>
                    ) : (
                        <>
                            <span>✨ Yapay Zeka ile 5 Yeni Kart Üret</span>
                            {!isPremium && !isGuest && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                            )}
                        </>
                    )}
                </button>
                 {!isPremium && !isGuest && <p className="text-center text-xs text-gray-500 mt-2">Bu özellik Premium üyelere özeldir.</p>}
            </div>

            <div className="w-full mt-16">
                <header className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-sky-400">Sık Kullanılan İlaçlar</h2>
                    <p className="text-md text-gray-400 mt-1">FSP sınavında sıkça karşılaşabileceğiniz gruplar ve örnekler.</p>
                </header>
                <div className="bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-gray-700">
                    <ul className="space-y-4 text-gray-300 columns-1 md:columns-2">
                        <li className="break-inside-avoid mb-3"><strong>Analgetika:</strong> Ibuprofen, Paracetamol, Metamizol (Novalgin), Tilidin, Tramadol</li>
                        <li className="break-inside-avoid mb-3"><strong>Antihypertensiva:</strong> Ramipril, Amlodipin, Metoprolol, Candesartan, Valsartan, Bisoprolol</li>
                        <li className="break-inside-avoid mb-3"><strong>Antikoagulantien/Thrombozytenaggregationshemmer:</strong> ASS, Clopidogrel, Marcumar, Eliquis (Apixaban), Xarelto (Rivaroxaban)</li>
                        <li className="break-inside-avoid mb-3"><strong>Protonenpumpeninhibitoren (PPI):</strong> Pantoprazol, Omeprazol, Esomeprazol</li>
                        <li className="break-inside-avoid mb-3"><strong>Diuretika:</strong> HCT, Torasemid, Furosemid, Spironolacton</li>
                        <li className="break-inside-avoid mb-3"><strong>Statine:</strong> Simvastatin, Atorvastatin, Rosuvastatin</li>
                        <li className="break-inside-avoid mb-3"><strong>Antidiabetika:</strong> Metformin, Insulin (Lantus, NovoRapid), Gliclazid, Sitagliptin</li>
                        <li className="break-inside-avoid mb-3"><strong>Antibiotika:</strong> Amoxicillin, Ciprofloxacin, Doxycyclin, Azithromycin, Cefuroxim</li>
                        <li className="break-inside-avoid mb-3"><strong>Schilddrüsenhormone:</strong> L-Thyroxin, Thiamazol</li>
                        <li className="break-inside-avoid mb-3"><strong>Inhalativa (Asthma/COPD):</strong> Salbutamol, Ipratropiumbromid, Budesonid, Fluticason</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StudyView;