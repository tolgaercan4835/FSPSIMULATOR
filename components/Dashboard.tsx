import React from 'react';
import type { UserProfile } from '../types';

interface DashboardProps {
    onStartSimulation: () => void;
    onStudyTerms: () => void;
    onShowProgress: () => void;
    isPremium: boolean;
    onUpgrade: () => void;
    onFeedback: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; cta?: string }> = ({ icon, title, description, onClick, cta = "Başlat" }) => (
    <button
        onClick={onClick}
        className="bg-gray-800/50 rounded-xl shadow-lg hover:shadow-sky-500/10 hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300 p-6 text-left w-full flex flex-col items-start border border-gray-700 h-full"
    >
        <div className="bg-gray-900/50 text-sky-400 p-3 rounded-lg mb-4 border border-gray-700">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-400 flex-grow text-sm">{description}</p>
        <span className="mt-6 text-sky-400 font-semibold self-end">{cta} &rarr;</span>
    </button>
);

const Dashboard: React.FC<DashboardProps> = ({ onStartSimulation, onStudyTerms, onShowProgress, isPremium, onUpgrade, onFeedback }) => {
    
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
             <header className="text-center mb-12 w-full max-w-6xl pt-8">
                <div className="flex items-center justify-center mb-4">
                    <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">Ana Sayfa</h1>
                </div>
                <p className="text-lg text-gray-400 mt-2">FSP sınavına hazırlık için hepsi bir arada platformunuz.</p>
            </header>
            
            <main className="w-full max-w-6xl">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 8v4"/><path d="M12 12h.01"/></svg>}
                        title="Simülasyon Başlat"
                        description="Yapay zeka kontrollü hastalarla anamnez pratiği yapın ve gerçekçi bir sınav deneyimi yaşayın."
                        onClick={onStartSimulation}
                    />
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M7 15h4" /><path d="M14 15h2" /><path d="M7 11h2" /><path d="M12 11h4" /></svg>}
                        title="Terminoloji Çalış"
                        description="İnteraktif kelime kartları ile tıbbi Almanca (Fachsprache) bilginizi güçlendirin."
                        onClick={onStudyTerms}
                    />
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>}
                        title="Gelişim Raporum"
                        description="Geçmiş simülasyon sonuçlarınızı inceleyin ve zaman içindeki ilerlemenizi takip edin."
                        onClick={onShowProgress}
                        cta="İncele"
                    />
                     <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
                        title="Geri Bildirim & Hata Bildir"
                        description="Uygulamayı geliştirmemize yardımcı olun. Önerilerinizi ve hataları bizimle paylaşın."
                        onClick={onFeedback}
                        cta="Bildir"
                    />
                </div>

                {!isPremium && (
                     <div className="mt-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-sky-400/30 transform hover:-translate-y-1 transition-all duration-300">
                        <button onClick={onUpgrade} className="w-full h-full flex flex-col md:flex-row items-center justify-between p-8 text-left">
                             <div className="flex items-center mb-4 md:mb-0">
                                <div className="bg-white/20 text-yellow-300 p-4 rounded-full mr-6 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 2l-3.09 6.26L2 9.27l5 4.87L5.82 21 12 17.67 18.18 21l-1.18-6.86 5-4.87-6.91-1.01L12 2z"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Premium'a Yükselt</h3>
                                    <p className="text-sky-100 flex-grow">Tüm 90+ vakaya ve tüm terminoloji setlerine sınırsız erişim sağlayın.</p>
                                </div>
                            </div>
                            <span className="bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg mt-4 md:mt-0 whitespace-nowrap group-hover:bg-yellow-300 transition-colors">
                                Şimdi Yükselt &rarr;
                            </span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;