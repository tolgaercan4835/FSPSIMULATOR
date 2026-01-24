import React, { useMemo } from 'react';
import { marked } from 'marked';

interface EvaluationModalProps {
    isOpen: boolean;
    onClose: () => void;
    evaluationResult: string;
    isPremium: boolean;
    onUpgrade: () => void;
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({ isOpen, onClose, evaluationResult, isPremium, onUpgrade }) => {
    if (!isOpen) return null;

    const createMarkup = (text: string) => {
        const rawMarkup = marked(text, { breaks: true, gfm: true, mangle: false, headerIds: false });
        return { __html: rawMarkup };
    };

    const scoreData = useMemo(() => {
        if (!evaluationResult || !isPremium) return { score: null, color: 'text-gray-200' };
        
        const scoreMatch = evaluationResult.match(/\*\*Puan:\*\*\s*(\d+)\/100/);
        const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
        
        let color = 'text-gray-200';
        if (score !== null) {
            if (score >= 85) color = 'text-green-400';
            else if (score >= 60) color = 'text-yellow-400';
            else color = 'text-red-400';
        }
        
        return { score, color };
    }, [evaluationResult, isPremium]);
    
    const formattedResult = isPremium 
        ? evaluationResult.replace(/\*\*Puan:\*\*\s*\d+\/100/, (match) => {
            return `<strong class="text-2xl ${scoreData.color}">${match}</strong>`;
          })
        : evaluationResult;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="evaluation-title"
        >
            <div 
                className="bg-gray-800 text-gray-200 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-gray-800">
                    <h2 id="evaluation-title" className="text-xl font-bold text-gray-100 tracking-tight">Sınav Sonuç Karnesi</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Kapat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </header>
                <div className="p-6 overflow-y-auto">
                    {evaluationResult ? (
                        <>
                            <div
                               className="prose prose-sm md:prose-base max-w-none prose-invert
                                          prose-h3:text-blue-400 prose-h3:border-b prose-h3:border-blue-800 prose-h3:pb-2 prose-h3:mt-6 prose-h3:mb-3
                                          prose-table:w-full prose-table:border prose-table:border-gray-600 prose-table:border-collapse
                                          prose-th:border prose-th:border-gray-600 prose-th:p-2 prose-th:bg-gray-700 prose-th:text-left
                                          prose-td:border prose-td:border-gray-600 prose-td:p-2
                                          prose-ul:list-disc prose-ul:pl-5
                                          prose-p:my-2"
                               dangerouslySetInnerHTML={createMarkup(formattedResult)}
                            />
                            {!isPremium && (
                                <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border-2 border-dashed border-yellow-500/30 flex flex-col sm:flex-row items-center gap-4">
                                    <div className="flex-shrink-0 text-yellow-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <h4 className="font-bold text-yellow-400">🔍 Premium Üyeler:</h4>
                                        <p className="text-sm text-gray-300">Satır satır hata analizi, Puanlama ve Alternatif Cümle önerilerini görür.</p>
                                    </div>
                                    <button 
                                        onClick={onUpgrade} 
                                        className="bg-yellow-500 text-gray-900 font-bold py-2 px-5 rounded-md hover:bg-yellow-400 transition-colors whitespace-nowrap w-full sm:w-auto"
                                    >
                                        Yükselt
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-64">
                            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-4 text-gray-400">Değerlendirme sonuçları yükleniyor...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EvaluationModal;