
import React, { useState } from 'react';

interface ArztbriefGeneratorProps {
    onGenerate: (notes: string) => void;
    isLoading: boolean;
}

const ArztbriefGenerator: React.FC<ArztbriefGeneratorProps> = ({ onGenerate, isLoading }) => {
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        onGenerate(notes);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-blue-400 mb-4 border-b-2 border-blue-800 pb-2 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2"><path d="M12 22h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v1.45" /><path d="m14 2-5 5" /><path d="M9 14h-1" /><path d="M5 14H4" /><path d="M17 14h-1" /><path d="m15 18-3-3 3-3" /><path d="M4 18h1" /></svg>
                Modul C: Arztbrief Oluştur
            </h2>
            <p className="text-sm text-gray-400 mb-4">
                Anamnez sırasında aldığınız notları buraya yapıştırın ve AI'ın sizin için resmi bir doktor mektubu oluşturmasını sağlayın.
            </p>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Örn: 45-jähriger Patient, seit gestern Abend Schmerzen, zunächst periumbilikal, dann in den rechten Unterbauch gewandert..."
                className="w-full h-32 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm"
                disabled={isLoading}
            />
            <button
                onClick={handleSubmit}
                disabled={isLoading || !notes.trim()}
                className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {isLoading ? 'Oluşturuluyor...' : 'Mektup Oluştur'}
            </button>
        </div>
    );
};

export default ArztbriefGenerator;