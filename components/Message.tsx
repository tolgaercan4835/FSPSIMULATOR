import React from 'react';
import type { ChatMessage, SimulationMode } from '../types';
import { marked } from 'marked';

interface MessageProps extends ChatMessage {
    simulationMode: SimulationMode;
}

const UserIcon = () => (
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    </div>
);

const ModelIcon = () => (
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
    </div>
);

const Message: React.FC<MessageProps> = ({ role, content, simulationMode }) => {
    const isUser = role === 'user';
    
    const createMarkup = (text: string) => {
        const rawMarkup = marked(text, { breaks: true, gfm: true });
        return { __html: rawMarkup };
    };

    const handlePlayAudio = () => {
        if ('speechSynthesis' in window && content) {
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(content);
            utterance.lang = 'de-DE';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Üzgünüz, tarayıcınız sesli okumayı desteklemiyor.');
        }
    };

    if (isUser) {
        return (
            <div className="flex justify-end items-start gap-3">
                <div className="bg-blue-600 text-white rounded-xl rounded-br-none p-4 max-w-lg shadow-md">
                    <p className="text-sm break-words">{content}</p>
                </div>
                <UserIcon />
            </div>
        );
    }

    return (
        <div className="flex justify-start items-start gap-3 group">
            <ModelIcon />
            <div className="bg-gray-700 text-gray-200 rounded-xl rounded-bl-none p-4 max-w-lg shadow-md relative">
                <div 
                    className="prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-invert prose-headings:text-gray-100 prose-strong:text-gray-100"
                    dangerouslySetInnerHTML={createMarkup(content)} 
                />
                 {simulationMode === 'training' && (
                    <button 
                        onClick={handlePlayAudio} 
                        className="absolute top-1 right-1 p-1.5 rounded-full bg-gray-800/50 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600 hover:text-white"
                        aria-label="Mesajı Oku"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                 )}
            </div>
        </div>
    );
};

export default Message;