import React, { useState, useEffect, useRef } from 'react';
import type { Case } from '../types';

interface PatientSelectorProps {
    cases: Case[];
    selectedCaseId: number;
    onCaseChange: (id: number) => void;
    isLoading: boolean;
    isPremium: boolean;
    isGuest: boolean;
    onLoginRequest: () => void;
    onUpgradeRequest: () => void;
}

const FREE_CASE_LIMIT = 10;
const GUEST_CASE_LIMIT = 5;

const PatientSelector: React.FC<PatientSelectorProps> = ({ cases, selectedCaseId, onCaseChange, isLoading, isPremium, isGuest, onLoginRequest, onUpgradeRequest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedCase = cases.find(c => c.id === selectedCaseId)!;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleCaseSelect = (caseId: number) => {
        const isPremiumCase = caseId > FREE_CASE_LIMIT;
        const isGuestLimitExceeded = caseId > GUEST_CASE_LIMIT;

        if (isLoading) return;

        if (isGuest && isGuestLimitExceeded) {
            onLoginRequest();
            return;
        }

        if (!isPremium && isPremiumCase) {
            onUpgradeRequest();
            return;
        }

        onCaseChange(caseId);
        setIsOpen(false);
    };
    
    return (
        <div className="relative" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={isLoading}
                className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-700 w-full text-left flex justify-between items-center transition-colors hover:bg-gray-700/60 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Seçili Vaka</span>
                    <p className="font-bold text-lg text-sky-300 mt-1">{selectedCase.id}. {selectedCase.name}</p>
                    <p className="text-sm text-gray-300 truncate">{selectedCase.symptom}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 text-gray-400 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            
            {isOpen && (
                 <div className="absolute top-full mt-2 w-full bg-gray-800/90 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-gray-700 z-20 max-h-96 overflow-y-auto">
                    <div className="space-y-1">
                        {cases.map((patient) => {
                            const isSelected = patient.id === selectedCaseId;
                            const isPremiumCase = patient.id > FREE_CASE_LIMIT;
                            const isGuestLocked = isGuest && patient.id > GUEST_CASE_LIMIT;
                            const isFreeUserLocked = !isGuest && !isPremium && isPremiumCase;
                            const isLocked = isGuestLocked || isFreeUserLocked;

                            return (
                                <button 
                                    key={patient.id} 
                                    onClick={() => handleCaseSelect(patient.id)}
                                    disabled={isLoading}
                                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 border-l-4 ${
                                        isSelected 
                                        ? 'bg-sky-500/20 border-sky-500' 
                                        : 'border-transparent hover:bg-gray-700/50'
                                    } ${isLoading ? 'cursor-wait' : ''}`}
                                    role="option"
                                    aria-selected={isSelected}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className={`font-semibold ${isSelected ? 'text-sky-300' : 'text-gray-200'}`}>{patient.id}. {patient.name}</p>
                                            <p className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>{patient.symptom}</p>
                                        </div>
                                        {isLocked && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H7V7a3 3 0 013-3z" /></svg>}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                 </div>
            )}

        </div>
    );
};

export default PatientSelector;