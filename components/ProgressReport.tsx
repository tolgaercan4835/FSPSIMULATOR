import React, { useState, useMemo } from 'react';
import type { EvaluationRecord } from '../types';
import { marked } from 'marked';

interface ProgressReportProps {
    history: EvaluationRecord[];
    isGuest: boolean;
}

const ExcellentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const GoodIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 12a1 1 0 112 0 1 1 0 01-2 0zm1-8a1 1 0 00-1 1v4a1 1 0 102 0V5a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const WarningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-gray-700/50 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const ReportCard: React.FC<{ record: EvaluationRecord, isExpanded: boolean, onToggle: () => void }> = ({ record, isExpanded, onToggle }) => {
    
    const { score, color, icon, label } = React.useMemo(() => {
        const s = record.score;
        if (s === null) return { score: 'N/A', color: 'text-gray-400', icon: <GoodIcon />, label: 'Değerlendirilmedi' };
        if (s >= 80) return { score: s, color: 'text-green-400', icon: <ExcellentIcon />, label: 'Mükemmel' };
        if (s >= 50) return { score: s, color: 'text-yellow-400', icon: <GoodIcon />, label: 'İyi' };
        return { score: s, color: 'text-red-400', icon: <WarningIcon />, label: 'Geliştirilmeli' };
    }, [record.score]);
    
    const createMarkup = (text: string) => {
        const rawMarkup = marked(text, { breaks: true, gfm: true, mangle: false, headerIds: false });
        return { __html: rawMarkup };
    };

    return (
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 transition-all duration-300">
            <button 
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                onClick={onToggle}
                aria-expanded={isExpanded}
            >
                <div className="flex items-center gap-4">
                    {icon}
                    <div>
                        <p className="font-semibold text-lg text-gray-100">{record.patientName}</p>
                        <p className="text-sm text-gray-400">{new Date(record.date).toLocaleString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <div className="text-right hidden sm:block">
                        <p className={`font-bold text-xl ${color}`}>{score}/100</p>
                        <p className={`text-sm font-semibold ${color}`}>{label}</p>
                     </div>
                     <svg className={`h-6 w-6 text-gray-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {isExpanded && (
                <div className="p-6 border-t border-gray-700/50">
                    <div
                        className="prose prose-sm md:prose-base max-w-none prose-invert
                                    prose-h3:text-sky-400 prose-h3:border-b prose-h3:border-gray-600 prose-h3:pb-2 prose-h3:mt-6 prose-h3:mb-3
                                    prose-table:w-full prose-table:my-4 prose-table:border-collapse
                                    prose-thead:bg-gray-700/50
                                    prose-th:border prose-th:border-gray-600 prose-th:p-2 prose-th:text-left
                                    prose-td:border prose-td:border-gray-600 prose-td:p-2
                                    prose-ul:list-disc prose-ul:pl-5
                                    prose-p:my-2"
                        dangerouslySetInnerHTML={createMarkup(record.report)}
                    />
                </div>
            )}
        </div>
    );
};


const ProgressReport: React.FC<ProgressReportProps> = ({ history, isGuest }) => {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const stats = useMemo(() => {
        const totalSimulations = history.length;
        const scoredSimulations = history.filter(h => h.score !== null);
        const averageScore = scoredSimulations.length > 0 
            ? Math.round(scoredSimulations.reduce((sum, h) => sum + h.score!, 0) / scoredSimulations.length)
            : 0;
        return { totalSimulations, averageScore };
    }, [history]);

    const handleToggle = (id: number) => {
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="p-6 max-w-6xl mx-auto w-full bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
            <header className="text-center mb-12 pt-8">
                 <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">Gelişim Raporu</h1>
                 <p className="text-lg text-gray-400 mt-2">Simülasyon geçmişinizi ve performansınızı analiz edin.</p>
            </header>
            
            {isGuest ? (
                 <div className="text-center mt-20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mx-auto text-gray-600 mb-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <h2 className="text-xl font-semibold text-gray-300">Giriş Gerekli</h2>
                    <p className="text-gray-400 mt-2">Geçmiş simülasyonlarınızı ve gelişim raporlarınızı görmek için lütfen giriş yapın.</p>
                </div>
            ) : history.length === 0 ? (
                <div className="text-center mt-20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mx-auto text-gray-600 mb-4"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>
                    <h2 className="text-xl font-semibold text-gray-300">Henüz Rapor Yok</h2>
                    <p className="text-gray-400 mt-2">İlk simülasyonunuzu tamamladığınızda sonuçlarınız burada görünecektir.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <StatCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 8v4"/><path d="M12 12h.01"/></svg>}
                            label="Toplam Simülasyon"
                            value={stats.totalSimulations}
                            color="text-sky-400"
                        />
                         <StatCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>}
                            label="Ortalama Puan"
                            value={`${stats.averageScore} / 100`}
                            color="text-green-400"
                        />
                    </div>
                    <div className="space-y-6">
                        {sortedHistory.map(record => (
                            <ReportCard 
                                key={record.id} 
                                record={record}
                                isExpanded={expandedId === record.id}
                                onToggle={() => handleToggle(record.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProgressReport;