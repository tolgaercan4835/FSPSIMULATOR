
import React, { useEffect, useState } from 'react';

interface PendingMessageProps {
    content: string;
    duration: number;
    onCancel: () => void;
    onEdit: () => void;
}

const UserIcon = () => (
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    </div>
);

const PendingMessage: React.FC<PendingMessageProps> = ({ content, duration, onCancel, onEdit }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev - (100 / (duration / 100));
                if (newProgress <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return newProgress;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [duration]);

    return (
         <div className="flex justify-end items-start gap-3 opacity-75">
            <div className="bg-blue-800 text-white rounded-lg p-3 max-w-lg shadow relative overflow-hidden">
                <p className="text-sm break-words">{content}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                    <div 
                        className="h-full bg-blue-400"
                        style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
                    ></div>
                </div>
                <div className="absolute -bottom-2 -right-2 flex gap-1 p-1">
                    <button onClick={onCancel} className="text-xs text-white bg-black/30 rounded-full p-1.5 hover:bg-red-500/80 transition-colors" title="Geri Al">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="9" y1="10" x2="15" y2="10"></line></svg>
                    </button>
                    <button onClick={onEdit} className="text-xs text-white bg-black/30 rounded-full p-1.5 hover:bg-yellow-500/80 transition-colors" title="Düzenle">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>
                </div>
            </div>
            <UserIcon />
        </div>
    );
};

export default PendingMessage;
