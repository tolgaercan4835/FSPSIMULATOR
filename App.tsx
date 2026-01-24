
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
import LoginView from './components/LoginView';
import LoginRequiredModal from './components/LoginRequiredModal';
import Navbar from './components/Navbar';
import type { ChatMessage, Case, EvaluationRecord, UserProfile } from './types';
import { createSystemInstruction, createInitialMessage, TERMINOLOGY_LIST } from './constants';
import { cases } from './data/cases';

const App: React.FC = () => {
    const [apiKey] = useState(process.env.API_KEY || "");
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isGuest, setIsGuest] = useState<boolean>(false);
    const [partialGoogleProfile, setPartialGoogleProfile] = useState<{ firstName: string, lastName: string } | null>(null);
    const [currentView, setCurrentView] = useState<'dashboard' | 'simulation' | 'progress' | 'study'>('dashboard');
    const [isLoading, setIsLoading] = useState(false);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);

    const [selectedCaseId, setSelectedCaseId] = useState<number>(cases[0].id);
    const [selectedFlashcardCategory, setSelectedFlashcardCategory] = useState<string>('Tümü');

    const selectedCase = useMemo(() => cases.find(c => c.id === selectedCaseId)!, [selectedCaseId]);

    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    
    const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState('');

    const [evaluationHistory, setEvaluationHistory] = useState<EvaluationRecord[]>([]);

    const [isPremium, setIsPremium] = useState<boolean>(false);
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState<boolean>(false);
    const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState<boolean>(false);
    const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);

     useEffect(() => {
        try {
            const storedProfile = localStorage.getItem('fspSimulatorProfile');
            if (storedProfile) {
                setUserProfile(JSON.parse(storedProfile));
                setIsGuest(false);
            }

            const storedPremium = localStorage.getItem('fspSimulatorPremium');
            if (storedPremium) setIsPremium(JSON.parse(storedPremium));

            const storedHistory = localStorage.getItem('fspSimulatorHistory');
            if (storedHistory) setEvaluationHistory(JSON.parse(storedHistory));

        } catch (e) {
            console.error("Failed to load state from localStorage", e);
        }
    }, []);

    const ai = useMemo(() => {
        if (!apiKey) return null;
        return new GoogleGenAI({ apiKey });
    }, [apiKey]);

    const handleLoginSuccess = (googleUser: { given_name: string; family_name: string }) => {
        setIsGuest(false);
        setPartialGoogleProfile({
            firstName: googleUser.given_name,
            lastName: googleUser.family_name
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
        localStorage.removeItem('fspSimulatorProfile');
        navigateTo('dashboard');
    };

    const handleSaveProfile = (profile: UserProfile) => {
        setUserProfile(profile);
        localStorage.setItem('fspSimulatorProfile', JSON.stringify(profile));
        setPartialGoogleProfile(null);
        setIsEditingProfile(false);
        setCurrentView('dashboard');
    };
    
    const navigateTo = (view: 'dashboard' | 'simulation' | 'progress' | 'study') => {
        if (view !== 'simulation') {
            setChatHistory([]);
            setError(null);
            chatRef.current = null;
        }
        setCurrentView(view);
    };

    const startSimulation = useCallback(async () => {
        if (!ai || !selectedCase || (!userProfile && !isGuest)) return;
        
        const profileForSim = userProfile ?? { firstName: 'Guest', lastName: 'User', gender: 'male', avatarId: 'Avatar1' };

        setIsLoading(true);
        setError(null);
        setChatHistory([]);
        
        try {
            const chat = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: {
                    systemInstruction: createSystemInstruction(selectedCase, profileForSim),
                },
            });
            chatRef.current = chat;
            const initialMessage = createInitialMessage(selectedCase, profileForSim);
            setChatHistory([initialMessage]);
        } catch (e: any) {
            setError(`Simülasyon başlatılamadı: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [ai, selectedCase, userProfile, isGuest]);

    const sendMessage = useCallback(async (message: string) => {
        if (!chatRef.current || isLoading || isEvaluating) return;

        const userMessage: ChatMessage = { role: 'user', content: message };
        setChatHistory(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const stream = await chatRef.current.sendMessageStream({ message });
            let modelResponse = '';
            setChatHistory(prev => [...prev, { role: 'model', content: '' }]);

            for await (const chunk of stream) {
                const c = chunk as GenerateContentResponse;
                modelResponse += c.text;
                 setChatHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].content = modelResponse;
                    return newHistory;
                });
            }
        } catch (e: any) {
            setError(`Mesaj gönderilemedi: ${e.message}`);
            setChatHistory(prev => prev.slice(0, -2));
        } finally {
            setIsLoading(false);
        }
    }, [chatRef, isLoading, isEvaluating]);
    
    const endSimulation = useCallback(async () => {
        if (isLoading || isEvaluating) return;

        if (isGuest) {
            setIsLoginRequiredModalOpen(true);
            return;
        }

        if (!isPremium) {
            setIsPremiumModalOpen(true);
            return;
        }

        if (!chatRef.current) return;

        setIsEvaluating(true);
        setError(null);
        setEvaluationResult('');
        setIsEvaluationModalOpen(true);
        
        try {
            const response = await chatRef.current.sendMessage({ message: "Simülasyon Bitti" });
            const report = response.text ?? 'Değerlendirme oluşturulamadı.';
            setEvaluationResult(report);

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

        } catch (e: any) {
            setError(`Değerlendirme alınamadı: ${e.message}`);
            setEvaluationResult(`Değerlendirme alınırken bir hata oluştu: ${e.message}`);
        } finally {
            setIsEvaluating(false);
        }
    }, [chatRef, isLoading, isEvaluating, selectedCase.name, isGuest, isPremium]);

    const generateArztbrief = useCallback(async (notes: string) => {
        if (isGuest) {
            setIsLoginRequiredModalOpen(true);
            return;
        }
        await sendMessage(`Aşağıdaki notları kullanarak bir Arztbrief oluştur: ${notes}`);
    }, [sendMessage, isGuest]);

    useEffect(() => {
        if (currentView === 'simulation' && (userProfile || isGuest) && chatHistory.length === 0) {
            startSimulation();
        }
    }, [currentView, startSimulation, userProfile, isGuest, chatHistory.length]);
    
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
                    onCaseChange={(id) => setSelectedCaseId(id)}
                    chatHistory={chatHistory}
                    isLoading={isLoading}
                    isEvaluating={isEvaluating}
                    error={error}
                    onSendMessage={sendMessage}
                    onEndSimulation={endSimulation}
                    onGenerateArztbrief={generateArztbrief}
                    isPremium={isPremium}
                    isGuest={isGuest}
                    onLoginRequest={() => setIsLoginRequiredModalOpen(true)}
                    onUpgradeRequest={handleUpgradeRequest}
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
                    terms={TERMINOLOGY_LIST}
                    isPremium={isPremium}
                    selectedCategory={selectedFlashcardCategory}
                    onCategoryChange={setSelectedFlashcardCategory}
                    isGuest={isGuest}
                    onLoginRequest={() => setIsLoginRequiredModalOpen(true)}
                    onUpgradeRequest={handleUpgradeRequest}
                />;
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
             <div className="min-h-screen bg-gray-900">
                <Navbar 
                    currentView={currentView}
                    navigateTo={navigateTo}
                    userProfile={userProfile}
                    isGuest={isGuest}
                    onLogout={userProfile ? handleLogout : undefined}
                    onLogin={handleLoginRequestFromNav}
                    onEditProfile={userProfile ? () => setIsEditingProfile(true) : undefined}
                />
                <main className="pt-16">
                    {viewContent}
                </main>
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
            return <LoginView onLoginSuccess={handleLoginSuccess} onEnterGuestMode={handleEnterGuestMode} />;
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
            />
            <PremiumModal
                isOpen={isPremiumModalOpen}
                onClose={() => setIsPremiumModalOpen(false)}
                onConfirm={() => {
                    console.log("Ödeme sayfasına gidiliyor");
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
