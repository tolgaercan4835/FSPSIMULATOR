import React, { useState } from 'react';
import type { Case, ChatMessage, Stage } from '../types';
import PatientSelector from './PatientSelector';
import CaseFile from './CaseFile';
import ChatInterface from './ChatInterface';
import Message from './Message';
import Timer from './Timer';

interface SimulationViewProps {
    cases: Case[];
    selectedCase: Case;
    onCaseChange: (id: number) => void;
    chatHistory: ChatMessage[];
    isLoading: boolean;
    isEvaluating: boolean;
    error: string | null;
    onSendMessage: (message: string) => void;
    onFinishAnamnesis: () => void;
    onFinishDocumentation: (report: string) => void;
    onFinishExam: () => void;
    isPremium: boolean;
    isGuest: boolean;
    onLoginRequest: () => void;
    onUpgradeRequest: () => void;
    currentStage: Stage;
    anamnesisHistory: ChatMessage[];
}

const StageHeader: React.FC<{ stage: Stage, onTimeUp: () => void }> = ({ stage, onTimeUp }) => {
    const stageDetails = {
        anamnesis: { title: "Aşama 1: Anamnez (Hasta Görüşmesi)", icon: "M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" },
        documentation: { title: "Aşama 2: Dokümantasyon (Arztbrief)", icon: "M12 22h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v1.45" },
        presentation: { title: "Aşama 3: Vaka Sunumu (Vorstellung)", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" },
    };

    const details = stageDetails[stage];

    return (
        <div className="bg-gray-900/50 p-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-blue-400">
                    <path d={details.icon}></path>
                    {stage === 'anamnesis' && <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 8v4"/><path d="M12 12h.01"/></>}
                    {stage === 'documentation' && <><path d="m14 2-5 5" /><path d="M9 14h-1" /><path d="M5 14H4" /><path d="M17 14h-1" /><path d="m15 18-3-3 3-3" /><path d="M4 18h1" /></>}
                    {stage === 'presentation' && <><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
                </svg>
                <h2 className="text-lg font-bold text-gray-200">{details.title}</h2>
            </div>
            <Timer duration={20 * 60} onTimeUp={onTimeUp} stage={stage} />
        </div>
    );
};


const SimulationView: React.FC<SimulationViewProps> = (props) => {
    const [arztbriefText, setArztbriefText] = useState('');

    const handleTimeUp = () => {
        switch (props.currentStage) {
            case 'anamnesis':
                props.onFinishAnamnesis();
                break;
            case 'documentation':
                props.onFinishDocumentation(arztbriefText);
                break;
            case 'presentation':
                props.onFinishExam();
                break;
        }
    };
    
    const renderAnamnesisStage = () => (
         <>
            <StageHeader stage="anamnesis" onTimeUp={handleTimeUp} />
            <ChatInterface
                messages={props.chatHistory}
                isLoading={props.isLoading}
                isEvaluating={props.isEvaluating}
                error={props.error}
                onSendMessage={props.onSendMessage}
                onEndSimulation={props.onFinishAnamnesis}
                isGuest={props.isGuest}
                isPremium={props.isPremium}
                stage="anamnesis"
            />
        </>
    );

    const renderDocumentationStage = () => (
         <>
            <StageHeader stage="documentation" onTimeUp={handleTimeUp} />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700 overflow-hidden">
                <div className="bg-gray-800 flex flex-col h-full">
                    <h3 className="p-3 bg-gray-900/50 text-md font-semibold text-gray-300 border-b border-gray-700">Referans: Anamnez Görüşmesi</h3>
                    <div className="overflow-y-auto p-4 space-y-4 flex-1">
                        {props.anamnesisHistory.map((msg, index) => (
                            <Message key={index} role={msg.role} content={msg.content} />
                        ))}
                    </div>
                </div>
                <div className="bg-gray-800 flex flex-col h-full">
                     <h3 className="p-3 bg-gray-900/50 text-md font-semibold text-gray-300 border-b border-gray-700">Arztbrief Taslağı</h3>
                    <textarea
                        value={arztbriefText}
                        onChange={(e) => setArztbriefText(e.target.value)}
                        placeholder="Hastanın bilgilerini, şikayetlerini, bulguları ve tedavi planını buraya yazın..."
                        className="w-full flex-1 p-4 bg-gray-800 text-gray-200 border-none focus:ring-2 focus:ring-inset focus:ring-blue-500 resize-none text-base"
                    />
                </div>
            </div>
            <div className="p-3 bg-gray-900/50 border-t border-gray-700">
                <button
                    onClick={() => props.onFinishDocumentation(arztbriefText)}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Raporu Tamamla ve Sunuma Geç
                </button>
            </div>
        </>
    );

    const renderPresentationStage = () => (
        <>
            <StageHeader stage="presentation" onTimeUp={handleTimeUp} />
            <ChatInterface
                messages={props.chatHistory}
                isLoading={props.isLoading}
                isEvaluating={props.isEvaluating}
                error={props.error}
                onSendMessage={props.onSendMessage}
                onEndSimulation={props.onFinishExam}
                isGuest={props.isGuest}
                isPremium={props.isPremium}
                stage="presentation"
            />
        </>
    );

    const renderContent = () => {
        switch (props.currentStage) {
            case 'anamnesis':
                return renderAnamnesisStage();
            case 'documentation':
                return renderDocumentationStage();
            case 'presentation':
                return renderPresentationStage();
            default:
                return <div>Bilinmeyen aşama</div>;
        }
    };
    
    return (
        <div className="font-sans">
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-[calc(100vh-4rem)]">
                <aside className="hidden lg:flex flex-col gap-6 lg-col-span-1 overflow-y-auto pr-2">
                    <PatientSelector 
                        cases={props.cases}
                        selectedCaseId={props.selectedCase.id}
                        onCaseChange={props.onCaseChange}
                        isLoading={props.isLoading || props.isEvaluating}
                        isPremium={props.isPremium}
                        isGuest={props.isGuest}
                        onLoginRequest={props.onLoginRequest}
                        onUpgradeRequest={props.onUpgradeRequest}
                    />
                    <CaseFile patient={props.selectedCase} />
                </aside>

                <div className="lg:col-span-2 flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 h-full">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default SimulationView;