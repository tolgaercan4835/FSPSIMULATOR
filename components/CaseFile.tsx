
import React from 'react';
import type { Case } from '../types';

interface CaseFileProps {
    patient: Case;
}

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="py-2 border-b border-gray-700">
        <span className="font-semibold text-gray-400">{label}:</span>
        <span className="text-gray-200 ml-2">{value}</span>
    </div>
);

const CaseFile: React.FC<CaseFileProps> = ({ patient }) => {
    if (!patient) {
        return (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-blue-400 mb-4 border-b-2 border-blue-800 pb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                Vaka Dosyası: {patient.name}
            </h2>
            <div className="space-y-2 text-sm">
                <InfoRow label="Ad Soyad" value={patient.name} />
                <InfoRow label="Yaş" value={String(patient.age)} />
                <InfoRow label="Ana Şikayet" value={patient.symptom} />
                <InfoRow label="Tanı (Gizli Bilgi)" value={patient.diagnosis} />
                <InfoRow label="Hikaye" value={patient.history} />
            </div>
        </div>
    );
};

export default CaseFile;