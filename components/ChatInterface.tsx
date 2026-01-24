
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import Message from './Message';
import PendingMessage from './PendingMessage';

interface ChatInterfaceProps {
    messages: ChatMessage[];
    isLoading: boolean;
    isEvaluating: boolean;
    error: string | null;
    onSendMessage: (message: string) => void;
    onEndSimulation: () => void;
    isGuest?: boolean;
    isPremium?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, isEvaluating, error, onSendMessage, onEndSimulation, isGuest, isPremium }) => {
    const [userInput, setUserInput] = useState('');
    const [pendingMessage, setPendingMessage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const SEND_DELAY = 5000; // 5 seconds

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, pendingMessage]);

    useEffect(() => {
        if (pendingMessage) {
            const timer = setTimeout(() => {
                onSendMessage(pendingMessage);
                setPendingMessage(null);
            }, SEND_DELAY);

            return () => clearTimeout(timer);
        }
    }, [pendingMessage, onSendMessage]);

    const handleSend = () => {
        if (userInput.trim() && !isLoading && !isEvaluating && !pendingMessage) {
            setPendingMessage(userInput);
            setUserInput('');
        }
    };

    const handleCancelSend = () => {
        setPendingMessage(null);
    };
    
    const handleEditSend = () => {
        setUserInput(pendingMessage || '');
        setPendingMessage(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    
    const isUIBlocked = isLoading || isEvaluating || !!pendingMessage;

    const getButtonClass = () => {
        if (isGuest) {
            return 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 disabled:bg-yellow-300 focus:ring-yellow-500';
        }
        if (!isPremium) {
            return 'bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300 focus:ring-green-500';
        }
        return 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-500 focus:ring-red-500';
    };

    const getButtonText = () => {
        if (isGuest) return 'Giriş Yap ve Değerlendir';
        if (!isPremium) return 'Premium ile Değerlendir';
        if (isEvaluating) return (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Değerlendiriliyor...
            </>
        );
        return 'Simülasyonu Bitir ve Değerlendir';
    };


    return (
        <div className="flex flex-col h-full bg-gray-800">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => (
                    <Message key={index} role={msg.role} content={msg.content} />
                ))}
                {pendingMessage && (
                    <PendingMessage 
                        content={pendingMessage}
                        duration={SEND_DELAY}
                        onCancel={handleCancelSend}
                        onEdit={handleEditSend}
                    />
                )}
                {isLoading && messages.length > 0 && messages[messages.length-1].role === 'user' && (
                    <div className="flex justify-start">
                        <div className="bg-gray-700 rounded-lg p-3 max-w-lg">
                           <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {error && (
                <div className="p-4 bg-red-900/50 text-red-300 border-t border-red-800 text-sm">
                    <strong>Hata:</strong> {error}
                </div>
            )}

            <div className="p-4 bg-gray-900 border-t border-gray-700">
                <div className="flex items-center bg-gray-700 rounded-lg p-2">
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Mesajınızı Almanca yazın..."
                        className="flex-1 bg-transparent border-none focus:ring-0 resize-none p-2 text-gray-200 placeholder-gray-400"
                        rows={1}
                        disabled={isUIBlocked}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isUIBlocked || !userInput.trim()}
                        className="ml-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
                 <button
                    onClick={onEndSimulation}
                    disabled={isLoading || isEvaluating}
                    className={`mt-3 w-full flex justify-center items-center font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${getButtonClass()}`}
                >
                    {getButtonText()}
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
