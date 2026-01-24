import React from 'react';
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
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCaseId = Number(e.target.value);
        const isPremiumCase = newCaseId > FREE_CASE_LIMIT;
        const isGuestLimitExceeded = newCaseId > GUEST_CASE_LIMIT;

        if (isGuest && isGuestLimitExceeded) {
            onLoginRequest();
            // Reset the select to the current value to prevent visual change
            e.target.value = String(selectedCaseId); 
            return;
        }

        if (!isPremium && isPremiumCase) {
            onUpgradeRequest();
            e.target.value = String(selectedCaseId);
            return;
        }

        onCaseChange(newCaseId);
    };
    
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
             <h2 className="text-xl font-bold text-blue-400 mb-4 border-b-2 border-blue-800 pb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                Hasta Seçimi
            </h2>
            <div className="relative">
                <select
                    id="patient-select"
                    aria-label="Hasta Seçimi"
                    value={selectedCaseId}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 px-4 py-3 pr-8 text-gray-200 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-600"
                >
                    {cases.map((patient) => {
                        const isPremiumCase = patient.id > FREE_CASE_LIMIT;
                        const isGuestLocked = isGuest && patient.id > GUEST_CASE_LIMIT;
                        const isFreeUserLocked = !isGuest && !isPremium && isPremiumCase;
                        const isLocked = isGuestLocked || isFreeUserLocked;

                        return (
                            <option key={patient.id} value={patient.id} className={isLocked ? "text-gray-500" : ""}>
                                {patient.id}. {patient.name} - ({patient.symptom}) {isLocked ? '🔒' : ''}
                            </option>
                        )
                    })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
    );
};

export default PatientSelector;