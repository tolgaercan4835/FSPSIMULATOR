
import React from 'react';
import type { ChatMessage } from '../types';
import { marked } from 'marked';

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

const Message: React.FC<ChatMessage> = ({ role, content }) => {
    const isUser = role === 'user';
    
    const createMarkup = (text: string) => {
        const rawMarkup = marked(text, { breaks: true, gfm: true });
        return { __html: rawMarkup };
    };

    if (isUser) {
        return (
            <div className="flex justify-end items-start gap-3">
                <div className="bg-blue-600 text-white rounded-lg p-3 max-w-lg shadow">
                    <p className="text-sm break-words">{content}</p>
                </div>
                <UserIcon />
            </div>
        );
    }

    return (
        <div className="flex justify-start items-start gap-3">
            <ModelIcon />
            <div className="bg-gray-700 text-gray-200 rounded-lg p-3 max-w-lg shadow">
                <div 
                    className="prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-invert prose-headings:text-gray-100 prose-strong:text-gray-100"
                    dangerouslySetInnerHTML={createMarkup(content)} 
                />
            </div>
        </div>
    );
};

export default Message;