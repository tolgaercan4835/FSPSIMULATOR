import React, { useState } from 'react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        // In a real application, you would send the feedback to a server here.
        console.log("Feedback submitted:", feedback);
        setIsSubmitted(true);
    };

    const handleClose = () => {
        // Reset state for next time the modal is opened
        setIsSubmitted(false);
        setFeedback('');
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
        >
            <div 
                className="bg-gray-800 text-gray-200 rounded-lg shadow-2xl w-full max-w-lg flex flex-col border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 id="feedback-title" className="text-xl font-bold text-gray-100 tracking-tight">Geri Bildirim / Hata Bildir</h2>
                    <button 
                        onClick={handleClose} 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Kapat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </header>
                <div className="p-6">
                    {isSubmitted ? (
                        <div className="text-center py-8">
                            <div className="flex justify-center items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Teşekkürler!</h3>
                            <p className="text-gray-400 mt-2">Geri bildiriminiz bizim için değerlidir ve not alınmıştır.</p>
                            <button onClick={handleClose} className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                                Kapat
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-gray-400 mb-4">
                                Uygulama hakkındaki önerilerinizi, bulduğunuz hataları veya genel düşüncelerinizi bizimle paylaşın.
                            </p>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Lütfen geri bildiriminizi buraya yazın..."
                                className="w-full h-40 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!feedback.trim()}
                                className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                            >
                                Gönder
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;