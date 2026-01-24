import React from 'react';
import type { ChatMessage, SimulationMode } from '../types';
import Message from './Message';
import { ARZTBRIEF_TEMPLATES } from '../constants';

interface ArztbriefGeneratorProps {
    anamnesisHistory: ChatMessage[];
    arztbriefText: string;
    onArztbriefChange: (text: string) => void;
    onFinishDocumentation: (report: string) => void;
    simulationMode: SimulationMode;
}

const ArztbriefGenerator: React.FC<ArztbriefGeneratorProps> = ({
    anamnesisHistory,
    arztbriefText,
    onArztbriefChange,
    onFinishDocumentation,
    simulationMode,
}) => {
    return (
        <>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700/50 overflow-hidden">
                <div className="bg-gray-800/80 flex flex-col h-full">
                    <h3 className="p-3 bg-gray-900/50 text-md font-semibold text-gray-300 border-b border-gray-700">Referans: Anamnez Görüşmesi</h3>
                    <div className="overflow-y-auto p-4 space-y-4 flex-1">
                        {anamnesisHistory.map((msg, index) => (
                            <Message key={index} role={msg.role} content={msg.content} simulationMode={simulationMode} />
                        ))}
                    </div>
                </div>
                <div className="bg-gray-800/80 flex flex-col h-full">
                     <div className="p-3 bg-gray-900/50 flex justify-between items-center text-md font-semibold text-gray-300 border-b border-gray-700">
                        <h3>Arztbrief Taslağı</h3>
                        {simulationMode === 'training' && (
                             <select 
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    if (selectedValue) {
                                        onArztbriefChange(arztbriefText + selectedValue);
                                        e.target.value = ""; // Reset select after adding
                                    }
                                }} 
                                className="bg-gray-700 text-xs rounded p-1 border border-gray-600 focus:ring-sky-500"
                             >
                                <option value="">Şablon Ekle...</option>
                                {Object.entries(ARZTBRIEF_TEMPLATES).map(([category, templates]) => (
                                    <optgroup label={category} key={category}>
                                        {templates.map(template => (
                                            <option key={template.label} value={template.text}>{template.label}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        )}
                    </div>
                    <textarea
                        value={arztbriefText}
                        onChange={(e) => onArztbriefChange(e.target.value)}
                        placeholder="Hastanın bilgilerini, şikayetlerini, bulguları ve tedavi planını buraya yazın..."
                        className="w-full flex-1 p-4 bg-transparent text-gray-200 border-none focus:ring-2 focus:ring-inset focus:ring-sky-500 resize-none text-base"
                    />
                </div>
            </div>
            <div className="p-3 bg-gray-900/50 border-t border-gray-700/50">
                <button
                    onClick={() => onFinishDocumentation(arztbriefText)}
                    className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Raporu Tamamla ve Sunuma Geç
                </button>
            </div>
        </>
    );
};

export default ArztbriefGenerator;