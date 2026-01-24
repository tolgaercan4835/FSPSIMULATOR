import React, { useState } from 'react';

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const FeatureListItem: React.FC<{ children: React.ReactNode; isPremium?: boolean }> = ({ children, isPremium = false }) => (
    <div className={`flex items-start p-3 rounded-lg ${isPremium ? 'bg-green-500/10' : 'bg-gray-700/50'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isPremium ? 'text-green-400' : 'text-gray-400'} flex-shrink-0 mr-3`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-gray-300">{children}</span>
    </div>
);


const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [isRedirecting, setIsRedirecting] = useState(false);

    if (!isOpen) return null;

    const handleConfirmClick = () => {
        setIsRedirecting(true);
        // The onConfirm prop was closing the modal, preventing the redirect. It is now removed.
        window.location.href = 'https://fspexam.lemonsqueezy.com/checkout/buy/7052e44a-89a6-42f2-9957-f0e594fe8415?media=0&logo=0';
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="premium-title"
        >
            <div 
                className="bg-gray-800 text-gray-200 rounded-lg shadow-2xl w-full max-w-lg flex flex-col border border-gray-700 transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'scale-in 0.3s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
                <header className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 id="premium-title" className="text-xl font-bold text-gray-100 flex items-center tracking-tight">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Premium Erişimi Açın
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Kapat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </header>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                             <h3 className="font-semibold text-gray-400 text-center">Ücretsiz Plan</h3>
                            <FeatureListItem>
                                <strong>İlk 10 Vakaya</strong> Sınırlı Erişim
                            </FeatureListItem>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-green-400 text-center">🚀 Premium Plan</h3>
                            <FeatureListItem isPremium>Tüm <strong>90+ Vaka Çalışması</strong></FeatureListItem>
                            <FeatureListItem isPremium><strong>Sınav Modu</strong> (Süre & Puanlama)</FeatureListItem>
                            <FeatureListItem isPremium>Sınırsız <strong>Kelime Kartları</strong></FeatureListItem>
                            <FeatureListItem isPremium><strong>3 Aylık</strong> Erişim & Güncellemeler</FeatureListItem>
                        </div>
                    </div>
                   
                    <div className="bg-gray-900/50 p-4 rounded-lg text-center my-6 border border-gray-700">
                        <p className="font-semibold text-yellow-400">3 Aylık Premium Paket</p>
                        <div className="my-2 flex items-baseline justify-center gap-2">
                            <span className="text-4xl font-extrabold text-white">499 ₺</span>
                        </div>
                        <p className="text-sm text-gray-400">3 ay boyunca sınırsız erişim.</p>
                    </div>

                    <button 
                        onClick={handleConfirmClick}
                        disabled={isRedirecting}
                        className="w-full flex items-center justify-center bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50 shadow-lg disabled:bg-green-400 disabled:cursor-not-allowed"
                    >
                        {isRedirecting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Yönlendiriliyor...</span>
                            </>
                        ) : (
                            'Erişimi Hemen Aç'
                        )}
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes scale-in {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PremiumModal;