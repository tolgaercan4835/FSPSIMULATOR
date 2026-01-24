import React from 'react';

interface LoginRequiredModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({ isOpen, onClose, onLogin }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-required-title"
        >
            <div 
                className="bg-gray-800 text-gray-200 rounded-lg shadow-2xl w-full max-w-md flex flex-col border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 id="login-required-title" className="text-xl font-bold text-gray-100 tracking-tight">Giriş Gerekli</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Kapat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </header>
                <div className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                         <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <p className="text-gray-300 mb-6">
                        5 vaka daha kazanmak için Google ile Giriş yapın!
                    </p>
                    <button
                        onClick={onLogin}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"
                    >
                        Google ile Giriş Yap
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredModal;