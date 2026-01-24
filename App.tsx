import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { googleLogout } from '@react-oauth/google';
import Dashboard from './components/Dashboard';
import SimulationView from './components/SimulationView';
import ProgressReport from './components/ProgressReport';
import EvaluationModal from './components/EvaluationModal';
import StudyView from './components/StudyView';
import PremiumModal from './components/PremiumModal';
import ProfileCreationView from './components/ProfileCreationView';
import FeedbackModal from './components/FeedbackModal';
import LandingPage from './components/LandingPage';
import LoginRequiredModal from './components/LoginRequiredModal';
import Navbar from './components/Navbar';
import ResourcesView from './components/ResourcesView';
import Footer from './components/Footer';
import LegalView from './components/LegalView';
import { supabase } from './lib/supabase';
import type { ChatMessage, Case, EvaluationRecord, UserProfile, Term, Stage, View, SimulationMode } from './types';
import { createSystemInstruction, createInitialMessage, TERMINOLOGY_LIST, createPremiumEvaluationPrompt, createFreeEvaluationPrompt, createPresentationSystemInstruction } from './constants';
import { cases } from './data/cases';

const App: React.FC = () => {
    const [apiKey] = useState(process.env.API_KEY || "");
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isGuest, setIsGuest] = useState<boolean>(false);
    const [partialGoogleProfile, setPartialGoogleProfile] = useState<Partial<UserProfile> | null>(null);
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [isLoading, setIsLoading] = useState(false);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [systemInstruction, setSystemInstruction] = useState<string>('');
    const [retryableMessage, setRetryableMessage] = useState<string | null>(null);

    const [selectedCaseId, setSelectedCaseId] = useState<number>(cases[0].id);
    const [selectedFlashcardCategory, setSelectedFlashcardCategory] = useState<string>('Tümü');
    
    // Simulation Stage & Mode Management
    const [simulationMode, setSimulationMode] = useState<SimulationMode | null>(null);
    const [currentStage, setCurrentStage] = useState<Stage>('anamnesis');
    const [anamnesisHistory, setAnamnesisHistory] = useState<ChatMessage[]>([]);
    const [arztbriefText, setArztbriefText] = useState<string>('');


    const selectedCase = useMemo(() => cases.find(c => c.id === selectedCaseId)!, [selectedCaseId]);

    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    
    const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState('');

    const [evaluationHistory, setEvaluationHistory] = useState<EvaluationRecord[]>([]);

    const [isPremium, setIsPremium] = useState<boolean>(false);
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState<boolean>(false);
    const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState<boolean>(false);
    const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    
    // Terminology state
    const [terminologyList, setTerminologyList] = useState<Term[]>(TERMINOLOGY_LIST);
    const [isGeneratingCards, setIsGeneratingCards] = useState(false);


     useEffect(() => {
        try {
            const storedProfile = localStorage.getItem('fspSimulatorProfile');
            if (storedProfile) {
                setUserProfile(JSON.parse(storedProfile));
                setIsGuest(false);
            }

            const storedHistory = localStorage.getItem('fspSimulatorHistory');
            if (storedHistory) setEvaluationHistory(JSON.parse(storedHistory));

        } catch (e) {
            console.error("Failed to load state from localStorage", e);
        }
    }, []);
    
    // Check premium status against Supabase when user profile is available
    useEffect(() => {
        const checkPremiumStatus = async () => {
            if (!supabase || !userProfile || !userProfile.email) {
                setIsPremium(false); // Default to non-premium in preview mode or if logged out
                return;
            }

            const { data, error } = await supabase
                .from('premium_users')
                .select('email')
                .eq('email', userProfile.email)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 = "Query returned no rows" which is not an error for us
                console.error('Error checking premium status:', error);
            }

            const isUserPremium = !!data;
            setIsPremium(isUserPremium);
            localStorage.setItem('fspSimulatorPremium', JSON.stringify(isUserPremium));
        };

        checkPremiumStatus();
    }, [userProfile]);


    const ai = useMemo(() => {
        if (!apiKey) return null;
        return new GoogleGenAI({ apiKey });
    }, [apiKey]);

    const handleGenerateNewCards = useCallback(async () => {
        if (!ai || !isPremium || isGeneratingCards) return;

        setIsGeneratingCards(true);
        setError(null);

        const prompt = 'FSP sınavı için Almanca tıbbi terminoloji uzmanısın. Daha önce listede olmayan, C1 seviyesinde, sınav için kullanışlı 5 yeni tıbbi terim üret. Çıktı, başka hiçbir açıklama veya markdown formatı olmadan, SADECE geçerli bir JSON array dizesi olmalıdır. Her nesnenin JSON yapısı şu şekilde olmalıdır: { "latin": "...", "german_common": "...", "german_medical": "...", "english": "...", "turkish": "...", "category": "AI Üretimi" }';

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            });

            const jsonString = response.text;
            const newCards: Omit<Term, 'id'>[] = JSON.parse(jsonString);

            if (Array.isArray(newCards)) {
                const formattedNewCards: Term[] = newCards.map((card, index) => ({
                    ...card,
                    id: terminologyList.length + index + 501, 
                }));
                setTerminologyList(prev => [...prev, ...formattedNewCards]);
            } else {
                throw new Error("Yapay zeka geçerli bir dizi formatında yanıt vermedi.");
            }

        } catch (e: any) {
            const errorMessage = `Yeni kartlar üretilemedi: ${e.message}`;
            setError(errorMessage);
            console.error(errorMessage, e);
        } finally {
            setIsGeneratingCards(false);
        }
    }, [ai, isPremium, isGeneratingCards, terminologyList.length]);

    const handleLoginSuccess = (googleUser: { given_name: string; family_name: string; email: string }) => {
        if (!supabase) {
            alert('Önizleme modunda giriş yapılamaz.');
            return;
        }
        setIsGuest(false);
        setPartialGoogleProfile({
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            email: googleUser.email
        });
    };
    
    const handleEnterGuestMode = () => {
        setIsGuest(true);
        setUserProfile(null);
    };

    const handleLogout = () => {
        googleLogout();
        setUserProfile(null);
        setIsGuest(false);
        setIsPremium(false);
        localStorage.removeItem('fspSimulatorProfile');
        localStorage.removeItem('fspSimulatorPremium');
        navigateTo('dashboard');
    };

    const handleSaveProfile = (profile: UserProfile) => {
        setUserProfile(profile);
        localStorage.setItem('fspSimulatorProfile', JSON.stringify(profile));
        setPartialGoogleProfile(null);
        setIsEditingProfile(false);
        setCurrentView('dashboard');
    };
    
    const navigateTo = (view: View) => {
        if (view !== 'simulation') {
            setChatHistory([]);
            setAnamnesisHistory([]);
            setArztbriefText('');
            setCurrentStage('anamnesis');
            setError(null);
            setRetryableMessage(null);
            setSimulationMode(null);
        }
        setCurrentView(view);
    };

    const startAnamnesis = useCallback(async (mode: SimulationMode) => {
        if (!ai || !selectedCase || (!userProfile && !isGuest)) return;
        
        const profileForSim = userProfile ?? { firstName: 'Guest', email: 'guest@example.com', lastName: 'User', gender: 'male', avatarId: 'Avatar1' };

        setIsLoading(true);
        setError(null);
        setRetryableMessage(null);
        setChatHistory([]);
        
        const instruction = createSystemInstruction(selectedCase, profileForSim, mode);
        setSystemInstruction(instruction);

        const initialMessage = createInitialMessage(selectedCase, profileForSim);
        setChatHistory([initialMessage]);
        setIsLoading(false);
        
    }, [ai, selectedCase, userProfile, isGuest]);

    const handleStartSimulation = useCallback((mode: SimulationMode) => {
        if (userProfile || isGuest) {
            setSimulationMode(mode);
            setCurrentStage('anamnesis');
            setAnamnesisHistory([]);
            setArztbriefText('');
            startAnamnesis(mode);
        }
    }, [userProfile, isGuest, startAnamnesis]);

    useEffect(() => {
        if (currentView === 'simulation') {
            setSimulationMode(null);
            setCurrentStage('anamnesis');
            setChatHistory([]);
            setAnamnesisHistory([]);
            setArztbriefText('');
            setError(null);
            setRetryableMessage(null);
        }
    }, [currentView, selectedCaseId]);

    const startPresentation = useCallback(async (report: string) => {
        if (!ai || !selectedCase || (!userProfile && !isGuest)) return;

        const profileForSim = userProfile ?? { firstName: 'Guest', email: 'guest@example.com', lastName: 'User', gender: 'male', avatarId: 'Avatar1' };
        
        setIsLoading(true);
        setError(null);
        setRetryableMessage(null);
        setChatHistory([]);

        const instruction = createPresentationSystemInstruction(selectedCase, profileForSim, report);
        setSystemInstruction(instruction);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [{role: 'user', parts: [{text: "Başla"}]}],
                config: {
                    systemInstruction: instruction,
                },
            });
            const initialMessage: ChatMessage = { role: 'model', content: response.text ?? 'Lütfen vakayı sunun.' };
            setChatHistory([initialMessage]);

        } catch (e: any) {
            setError(`Sunum aşaması başlatılamadı: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [ai, selectedCase, userProfile, isGuest]);


    const sendMessage = useCallback(async (message: string) => {
        if (!ai || isLoading || isEvaluating) return;
    
        const userMessage: ChatMessage = { role: 'user', content: message };
        const historyWithUserMessage = [...chatHistory, userMessage];
        setChatHistory(historyWithUserMessage);
    
        setIsLoading(true);
        setError(null);
        setRetryableMessage(null);
        
        const historyToPass = historyWithUserMessage.slice(-11);
        const mappedContents = historyToPass.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));
    
        try {
            const stream = await ai.models.generateContentStream({
                model: 'gemini-3-flash-preview',
                contents: mappedContents,
                config: {
                    systemInstruction: systemInstruction,
                }
            });
    
            let modelResponse = '';
            setChatHistory(prev => [...prev, { role: 'model', content: '' }]);
    
            for await (const chunk of stream) {
                const c = chunk as GenerateContentResponse;
                modelResponse += c.text;
                setChatHistory(prev => {
                    const newHistory = [...prev];
                    if (newHistory.length > 0 && newHistory[newHistory.length - 1].role === 'model') {
                        newHistory[newHistory.length - 1].content = modelResponse;
                    }
                    return newHistory;
                });
            }
        } catch (e: any) {
            const errorMessage = e.message || 'Bilinmeyen bir hata oluştu.';
            const isOverloaded = errorMessage.includes('503') || errorMessage.toLowerCase().includes('overloaded');
            
            if (isOverloaded) {
                setError("⚠️ Sunucu yoğunluğu nedeniyle cevap gecikiyor. Lütfen 'Yeniden Dene' butonuna basınız.");
                setRetryableMessage(message);
            } else {
                setError(`Mesaj gönderilemedi: ${errorMessage}`);
            }
            
            setChatHistory(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    }, [ai, isLoading, isEvaluating, chatHistory, systemInstruction]);
    
    const handleRetry = useCallback(() => {
        if (retryableMessage) {
            sendMessage(retryableMessage);
        }
    }, [retryableMessage, sendMessage]);
    
    const handleFinishAnamnesis = () => {
        setAnamnesisHistory(chatHistory);
        setChatHistory([]);
        setCurrentStage('documentation');
    };
    
    const handleFinishDocumentation = (report: string) => {
        setArztbriefText(report);
        setCurrentStage('presentation');
        startPresentation(report);
    };

    const handleFinishExam = useCallback(async () => {
        if (isLoading || isEvaluating) return;

        if (isGuest) {
            setIsLoginRequiredModalOpen(true);
            return;
        }

        if (!isPremium && selectedCase.id > 10) {
            setIsPremiumModalOpen(true);
            return;
        }
        
        setIsEvaluating(true);
        setError(null);
        setEvaluationResult('');
        setIsEvaluationModalOpen(true);
        
        try {
             if (!ai) throw new Error("AI client not initialized.");
            
            const anamnesisString = anamnesisHistory.map(m => `${m.role === 'user' ? 'Doctor' : 'Patient'}: ${m.content}`).join('\n');
            const presentationString = chatHistory.map(m => `${m.role === 'user' ? 'Candidate' : 'Examiner'}: ${m.content}`).join('\n');
            
            const evaluationPrompt = isPremium 
                ? createPremiumEvaluationPrompt(anamnesisString, arztbriefText, presentationString) 
                : createFreeEvaluationPrompt();
            
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: evaluationPrompt,
            });

            const report = response.text ?? 'Değerlendirme oluşturulamadı.';
            setEvaluationResult(report);

            if (isPremium) {
                const scoreMatch = report.match(/\*\*Puan:\*\*\s*(\d+)\/100/);
                const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;

                const newRecord: EvaluationRecord = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    patientName: selectedCase.name,
                    score,
                    report,
                };
                setEvaluationHistory(prev => {
                    const updatedHistory = [...prev, newRecord];
                    localStorage.setItem('fspSimulatorHistory', JSON.stringify(updatedHistory));
                    return updatedHistory;
                });
            }

        } catch (e: any) {
            setError(`Değerlendirme alınamadı: ${e.message}`);
            setEvaluationResult(`Değerlendirme alınırken bir hata oluştu: ${e.message}`);
        } finally {
            setIsEvaluating(false);
        }
    }, [ai, isLoading, isEvaluating, selectedCase.id, selectedCase.name, isGuest, isPremium, anamnesisHistory, arztbriefText, chatHistory]);

    
    if (!apiKey) {
        return <div className="bg-gray-900 text-white h-screen flex items-center justify-center">API Anahtarı bulunamadı. Lütfen .env dosyasını kontrol edin.</div>;
    }
    
    const handleLoginRequestFromModal = () => {
        setIsLoginRequiredModalOpen(false);
        setIsGuest(false);
        setUserProfile(null);
    };

    const handleLoginRequestFromNav = () => {
        setIsGuest(false);
        setUserProfile(null);
    };
    
    const handleUpgradeRequest = () => {
        if(isGuest) {
            setIsLoginRequiredModalOpen(true);
        } else {
            setIsPremiumModalOpen(true);
        }
    };
    
    const renderAppContent = () => {
        let viewContent;
        switch (currentView) {
            case 'simulation':
                viewContent = <SimulationView
                    cases={cases}
                    selectedCase={selectedCase}
                    selectedCaseId={selectedCaseId}
                    onCaseChange={(id) => setSelectedCaseId(id)}
                    chatHistory={chatHistory}
                    isLoading={isLoading}
                    isEvaluating={isEvaluating}
                    error={error}
                    onSendMessage={sendMessage}
                    onFinishAnamnesis={handleFinishAnamnesis}
                    onFinishDocumentation={handleFinishDocumentation}
                    onFinishExam={handleFinishExam}
                    isPremium={isPremium}
                    isGuest={isGuest}
                    onLoginRequest={() => setIsLoginRequiredModalOpen(true)}
                    onUpgradeRequest={handleUpgradeRequest}
                    currentStage={currentStage}
                    anamnesisHistory={anamnesisHistory}
                    onStartSimulation={handleStartSimulation}
                    simulationMode={simulationMode}
                    retryableMessage={retryableMessage}
                    onRetry={handleRetry}
                    apiKey={apiKey}
                />;
                break;
            case 'progress':
                viewContent = <ProgressReport
                    history={evaluationHistory}
                    isGuest={isGuest}
                />;
                break;
            case 'study':
                viewContent = <StudyView
                    terms={terminologyList}
                    isPremium={isPremium}
                    selectedCategory={selectedFlashcardCategory}
                    onCategoryChange={setSelectedFlashcardCategory}
                    isGuest={isGuest}
                    onLoginRequest={() => setIsLoginRequiredModalOpen(true)}
                    onUpgradeRequest={handleUpgradeRequest}
                    onGenerateNewCards={handleGenerateNewCards}
                    isGeneratingCards={isGeneratingCards}
                />;
                break;
            case 'resources':
                viewContent = <ResourcesView />;
                break;
            case 'legal':
                viewContent = <LegalView />;
                break;
            case 'dashboard':
            default:
                viewContent = <Dashboard
                    onStartSimulation={() => navigateTo('simulation')}
                    onStudyTerms={() => navigateTo('study')}
                    onShowProgress={() => {
                        if (isGuest) setIsLoginRequiredModalOpen(true);
                        else navigateTo('progress');
                    }}
                    isPremium={isPremium}
                    onUpgrade={handleUpgradeRequest}
                    onFeedback={() => setIsFeedbackModalOpen(true)}
                />;
                break;
        }
         return (
             <div className="min-h-screen bg-gray-900 flex flex-col">
                <Navbar 
                    currentView={currentView}
                    navigateTo={navigateTo}
                    userProfile={userProfile}
                    isGuest={isGuest}
                    onLogout={userProfile ? handleLogout : undefined}
                    onLogin={handleLoginRequestFromNav}
                    onEditProfile={userProfile ? () => setIsEditingProfile(true) : undefined}
                />
                <main className="pt-16 flex-grow">
                    {viewContent}
                </main>
                <Footer navigateTo={navigateTo} />
            </div>
         );
    }
    
    const renderAuthOrMain = () => {
         if (!userProfile && !isGuest) {
            if (partialGoogleProfile) {
                return <ProfileCreationView 
                    onSaveProfile={handleSaveProfile} 
                    initialProfile={partialGoogleProfile}
                />;
            }
            return <LandingPage onLoginSuccess={handleLoginSuccess} onEnterGuestMode={handleEnterGuestMode} />;
        }
        
        if (isEditingProfile && userProfile) {
             return <ProfileCreationView 
                onSaveProfile={handleSaveProfile} 
                initialProfile={userProfile}
                onCancel={() => setIsEditingProfile(false)}
            />;
        }

        return renderAppContent();
    }


    return (
        <>
            {renderAuthOrMain()}
            <EvaluationModal
                isOpen={isEvaluationModalOpen}
                onClose={() => setIsEvaluationModalOpen(false)}
                evaluationResult={evaluationResult}
                isPremium={isPremium}
                onUpgrade={() => {
                    setIsEvaluationModalOpen(false);
                    handleUpgradeRequest();
                }}
            />
            <PremiumModal
                isOpen={isPremiumModalOpen}
                onClose={() => setIsPremiumModalOpen(false)}
                onConfirm={() => {
                    console.log("Redirecting to Lemon Squeezy checkout page...");
                    setIsPremiumModalOpen(false);
                }}
            />
             <FeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
            />
            <LoginRequiredModal 
                isOpen={isLoginRequiredModalOpen}
                onClose={() => setIsLoginRequiredModalOpen(false)}
                onLogin={handleLoginRequestFromModal}
            />
        </>
    );
};

export default App;