
import React from 'react';
import type { Case, ChatMessage } from '../types';
import PatientSelector from './PatientSelector';
import CaseFile from './CaseFile';
import ArztbriefGenerator from './ArztbriefGenerator';
import ChatInterface from './ChatInterface';

interface SimulationViewProps {
    cases: Case[];
    selectedCase: Case;
    onCaseChange: (id: number) => void;
    chatHistory: ChatMessage[];
    isLoading: boolean;
    isEvaluating: boolean;
    error: string | null;
    onSendMessage: (message: string) => void;
    onEndSimulation: () => void;
    onGenerateArztbrief: (notes: string) => void;
    isPremium: boolean;
    isGuest: boolean;
    onLoginRequest: () => void;
    onUpgradeRequest: () => void;
}

const SimulationView: React.FC<SimulationViewProps> = (props) => {
    return (
        <div className="font-sans">
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-[calc(100vh-4rem)]">
                <div className="flex flex-col gap-6 lg-col-span-1 overflow-y-auto pr-2">
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
                    <ArztbriefGenerator 
                        onGenerate={props.onGenerateArztbrief} 
                        isLoading={props.isLoading || props.isEvaluating}
                    />
                </div>

                <div className="lg:col-span-2 flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 h-full">
                    <ChatInterface
                        messages={props.chatHistory}
                        isLoading={props.isLoading}
                        isEvaluating={props.isEvaluating}
                        error={props.error}
                        onSendMessage={props.onSendMessage}
                        onEndSimulation={props.onEndSimulation}
                        isGuest={props.isGuest}
                        isPremium={props.isPremium}
                    />
                </div>
            </main>
        </div>
    );
};

export default SimulationView;
