import React, { useState, useMemo, useEffect } from 'react';
import type { Term } from '../types';

interface FlashcardProps {
    terms: Term[];
}

const Flashcard: React.FC<FlashcardProps> = ({ terms }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // This effect resets the card state whenever the list of terms changes (e.g., due to filtering)
    useEffect(() => {
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [terms]);

    const shuffledTerms = useMemo(() => {
        // Only shuffle if there are terms to avoid errors
        if (terms.length === 0) return [];
        return [...terms].sort(() => Math.random() - 0.5);
    }, [terms]);

    const handleNext = () => {
        if (currentIndex < shuffledTerms.length - 1) {
             setIsFlipped(false);
             // Wait for flip animation to start before changing content
             setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
            }, 250);
        }
    };
    
    // Prevent rendering if there are no terms
    if (shuffledTerms.length === 0) {
        return null;
    }

    const currentTerm = shuffledTerms[currentIndex];
    const cardContent = (
        <>
            {/* Front Card */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-xl shadow-xl flex flex-col justify-between p-6 backface-hidden border border-gray-600">
                <div>
                    <div className="text-sm text-gray-300 font-semibold uppercase tracking-wider">{currentTerm.category}</div>
                    <div className="font-bold text-5xl text-white mt-2 break-words">{currentTerm.latin}</div>
                </div>
                <div className="space-y-3">
                    <p className="text-xl font-semibold">🇬🇧 {currentTerm.english}</p>
                    <p className="text-xl font-semibold">🇹🇷 {currentTerm.turkish}</p>
                </div>
                 <div className="text-center text-gray-400 text-sm">Cevap için karta dokunun</div>
            </div>

            {/* Back Card */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-sky-600 to-blue-700 text-white rounded-xl shadow-xl flex flex-col justify-center items-center p-6 backface-hidden rotate-y-180 border border-sky-500">
                 <div className="text-center">
                    <div className="text-sm text-sky-200 font-semibold uppercase tracking-wider">Patientensprache</div>
                    <div className="font-bold text-5xl text-white mt-1 break-words">{currentTerm.german_common}</div>
                     {currentTerm.german_medical && currentTerm.german_medical !== currentTerm.german_common && (
                        <p className="mt-4 text-sky-100 italic">(Fachsprache: {currentTerm.german_medical})</p>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <div className="w-full max-w-lg flex flex-col text-white transform transition-transform duration-300 hover:-translate-y-1">
            <div 
                className="w-full h-80 cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {cardContent}
                </div>
            </div>

            <div className="mt-6">
                <p className="text-center text-gray-400 font-medium mb-4">
                    Kart {currentIndex + 1} / {shuffledTerms.length}
                </p>
                <button 
                    onClick={handleNext} 
                    disabled={currentIndex === shuffledTerms.length - 1}
                    className="w-full px-6 py-4 bg-sky-600 text-white text-lg font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-700 transition-all focus:outline-none focus:ring-4 focus:ring-sky-500/50"
                >
                    Sıradaki Kart &rarr;
                </button>
            </div>
        </div>
    );
};

export default Flashcard;