import React, { useState, useEffect } from 'react';
import type { Case, ChatMessage, Stage, SimulationMode } from '../types';
import PatientSelector from './PatientSelector';
import CaseFile from './CaseFile';
import ChatInterface from './ChatInterface';
import Message from './Message';
import Timer from './Timer';
import { ARZTBRIEF_TEMPLATES } from '../constants';
import useTextToSpeech from '../hooks/useTextToSpeech';

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
    onStartSimulation: (mode: SimulationMode) => void;
    simulationMode: SimulationMode | null;
    selectedCaseId: number;
    retryableMessage: string | null;
    onRetry: () => void;
    apiKey: string;
}

const AudioSettings: React.FC<{ isEnabled: boolean, onToggle: () => void }> = ({ isEnabled, onToggle }) => (
    <button onClick={onToggle} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700/50 transition-colors" title={isEnabled ? "Otomatik Okumayı Kapat" : "Otomatik Okumayı Aç"}>
        {isEnabled ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-400"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        )}
    </button>
);


const StageHeader: React.FC<{ stage: Stage, onTimeUp: () => void, isAutoReadEnabled: boolean, onToggleAutoRead: () => void, simulationMode: SimulationMode }> = ({ stage, onTimeUp, isAutoReadEnabled, onToggleAutoRead, simulationMode }) => {
    const stageDetails = {
        anamnesis: { title: "Aşama 1: Anamnez (Hasta Görüşmesi)", icon: "M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" },
        documentation: { title: "Aşama 2: Dokümantasyon (Arztbrief)", icon: "M12 22h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v1.45" },
        presentation: { title: "Aşama 3: Vaka Sunumu (Vorstellung)", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" },
    };

    const details = stageDetails[stage];

    return (
        <div className="bg-gray-900/50 p-3 flex items-center justify-between border-b border-gray-700/50">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-sky-400">
                    <path d={details.icon}></path>
                    {stage === 'anamnesis' && <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 8v4"/><path d="M12 12h.01"/></>}
                    {stage === 'documentation' && <><path d="m14 2-5 5" /><path d="M9 14h-1" /><path d="M5 14H4" /><path d="M17 14h-1" /><path d="m15 18-3-3 3-3" /><path d="M4 18h1" /></>}
                    {stage === 'presentation' && <><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
                </svg>
                <h2 className="text-lg font-bold text-gray-200">{details.title}</h2>
            </div>
             <div className="flex items-center">
                {simulationMode === 'training' && <AudioSettings isEnabled={isAutoReadEnabled} onToggle={onToggleAutoRead} />}
                
                {simulationMode === 'exam' ? (
                    <Timer duration={20 * 60} onTimeUp={onTimeUp} stage={stage} />
                ) : (
                    <div className="text-lg font-bold p-2 rounded-md text-gray-300 flex items-center gap-2">
                        <span>Süre:</span>
                        <span className="font-mono text-2xl" title="Sınırsız">∞</span>
                    </div>
                )}
            </div>
        </div>
    );
};


const SimulationView: React.FC<SimulationViewProps> = (props) => {
    const [arztbriefText, setArztbriefText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isAutoReadEnabled, setIsAutoReadEnabled] = useState(false);
    const { playAudio } = useTextToSpeech(props.apiKey);


    useEffect(() => {
        if (props.simulationMode === 'training' && isAutoReadEnabled && props.chatHistory.length > 0) {
            const lastMessage = props.chatHistory[props.chatHistory.length - 1];
            if (lastMessage.role === 'model' && lastMessage.content && !props.isLoading) {
                 playAudio(lastMessage.content, props.selectedCase.gender);
            }
        }
    }, [props.chatHistory, isAutoReadEnabled, props.isLoading, props.simulationMode, playAudio, props.selectedCase.gender]);


    const handleTimeUp = () => {
        if (props.simulationMode === 'exam') {
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
        }
    };
    
    const renderAnamnesisStage = () => (
         <>
            <StageHeader stage="anamnesis" onTimeUp={handleTimeUp} isAutoReadEnabled={isAutoReadEnabled} onToggleAutoRead={() => setIsAutoReadEnabled(!isAutoReadEnabled)} simulationMode={props.simulationMode!} />
            <ChatInterface
                messages={props.chatHistory}
                isLoading={props.isLoading}
                isEvaluating={props.isEvaluating}
                error={props.error}
                onSendMessage={(msg) => {
                    setUserInput('');
                    props.onSendMessage(msg);
                }}
                onEndSimulation={props.onFinishAnamnesis}
                isGuest={props.isGuest}
                isPremium={props.isPremium}
                stage="anamnesis"
                userInput={userInput}
                setUserInput={setUserInput}
                simulationMode={props.simulationMode!}
                retryableMessage={props.retryableMessage}
                onRetry={props.onRetry}
            />
        </>
    );

    const renderDocumentationStage = () => (
         <>
            <StageHeader stage="documentation" onTimeUp={handleTimeUp} isAutoReadEnabled={isAutoReadEnabled} onToggleAutoRead={() => setIsAutoReadEnabled(!isAutoReadEnabled)} simulationMode={props.simulationMode!} />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700/50 overflow-hidden">
                <div className="bg-gray-800/80 flex flex-col h-full">
                    <h3 className="p-3 bg-gray-900/50 text-md font-semibold text-gray-300 border-b border-gray-700">Referans: Anamnez Görüşmesi</h3>
                    <div className="overflow-y-auto p-4 space-y-4 flex-1">
                        {props.anamnesisHistory.map((msg, index) => (
                            <Message key={index} role={msg.role} content={msg.content} simulationMode={props.simulationMode!} />
                        ))}
                    </div>
                </div>
                <div className="bg-gray-800/80 flex flex-col h-full">
                     <div className="p-3 bg-gray-900/50 flex justify-between items-center text-md font-semibold text-gray-300 border-b border-gray-700">
                        <h3>Arztbrief Taslağı</h3>
                        {props.simulationMode === 'training' && (
                             <select onChange={(e) => setArztbriefText(prev => prev + e.target.value)} className="bg-gray-700 text-xs rounded p-1 border border-gray-600 focus:ring-sky-500">
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
                        onChange={(e) => setArztbriefText(e.target.value)}
                        placeholder="Hastanın bilgilerini, şikayetlerini, bulguları ve tedavi planını buraya yazın..."
                        className="w-full flex-1 p-4 bg-transparent text-gray-200 border-none focus:ring-2 focus:ring-inset focus:ring-sky-500 resize-none text-base"
                    />
                </div>
            </div>
            <div className="p-3 bg-gray-900/50 border-t border-gray-700/50">
                <button
                    onClick={() => props.onFinishDocumentation(arztbriefText)}
                    className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Raporu Tamamla ve Sunuma Geç
                </button>
            </div>
        </>
    );

    const renderPresentationStage = () => (
        <>
            <StageHeader stage="presentation" onTimeUp={handleTimeUp} isAutoReadEnabled={isAutoReadEnabled} onToggleAutoRead={() => setIsAutoReadEnabled(!isAutoReadEnabled)} simulationMode={props.simulationMode!} />
            <ChatInterface
                messages={props.chatHistory}
                isLoading={props.isLoading}
                isEvaluating={props.isEvaluating}
                error={props.error}
                onSendMessage={(msg) => {
                    setUserInput('');
                    props.onSendMessage(msg);
                }}
                onEndSimulation={props.onFinishExam}
                isGuest={props.isGuest}
                isPremium={props.isPremium}
                stage="presentation"
                userInput={userInput}
                setUserInput={setUserInput}
                simulationMode={props.simulationMode!}
                retryableMessage={props.retryableMessage}
                onRetry={props.onRetry}
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
    
    const ModeSelectionCard: React.FC<{icon: string, title: string, description: string, rules: string[], onClick: () => void, color: string}> = ({icon, title, description, rules, onClick, color}) => (
        <button onClick={onClick} className={`bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700 text-left w-full h-full flex flex-col hover:border-${color}-500 hover:shadow-${color}-500/20 transition-all transform hover:-translate-y-1`}>
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className={`text-2xl font-bold text-${color}-400`}>{title}</h3>
            <p className="text-gray-400 mt-2 mb-6 flex-grow">{description}</p>
            <ul className="space-y-2 text-sm">
                {rules.map((rule, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                        {rule}
                    </li>
                ))}
            </ul>
        </button>
    );

    if (!props.simulationMode) {
        return (
            <div className="font-sans bg-gradient-to-b from-gray-900 to-gray-950">
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6 min-h-[calc(100vh-4rem)]">
                     <aside className="hidden lg:flex flex-col gap-6 lg-col-span-1 pr-2">
                        <PatientSelector {...props} />
                        <CaseFile patient={props.selectedCase} />
                    </aside>
                     <div className="lg:col-span-2 flex flex-col items-center justify-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
                        <h2 className="text-3xl font-bold text-white mb-2">Simülasyon Modunu Seçin</h2>
                        <p className="text-gray-400 mb-8 text-center max-w-lg">Sınava nasıl hazırlanmak istediğinizi seçin. Her mod, farklı bir öğrenme deneyimi sunar.</p>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                            <ModeSelectionCard 
                                icon="🎓"
                                title="Eğitim Modu"
                                description="Baskı olmadan öğrenmeye ve pratik yapmaya odaklanın. Tüm yardımcı özellikler aktiftir."
                                rules={[
                                    "Süre sınırı yok",
                                    "Sesli okuma ve mikrofon aktif",
                                    "Anlık ipuçları ve 'Red Flag' uyarıları",
                                    "Arztbrief şablonları mevcut"
                                ]}
                                onClick={() => props.onStartSimulation('training')}
                                color="sky"
                            />
                             <ModeSelectionCard 
                                icon="🔥"
                                title="Sınav Modu"
                                description="Gerçek FSP deneyimini yaşayın. Kendinizi zaman ve kısıtlamalar altında test edin."
                                rules={[
                                    "20 Dakika Geri Sayım",
                                    "Tüm yardımcılar (ses, mikrofon) kapalı",
                                    "'Red Flag' uyarıları gizli",
                                    "AI daha net ve kısa cevaplar verir"
                                ]}
                                onClick={() => props.onStartSimulation('exam')}
                                color="red"
                            />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
    
    return (
        <div className="font-sans bg-gradient-to-b from-gray-900 to-gray-950">
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6 min-h-[calc(100vh-4rem)]">
                <aside className="hidden lg:flex flex-col gap-6 lg-col-span-1 pr-2">
                    <PatientSelector {...props} />
                    <CaseFile patient={props.selectedCase} />
                </aside>

                <div className="lg:col-span-2 flex flex-col bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700 h-full">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default SimulationView;