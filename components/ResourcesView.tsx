import React from 'react';

const ResourceCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; link?: string }> = ({ icon, title, children, link }) => (
  <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col h-full">
    <div className="flex items-center mb-4">
      <div className="bg-gray-900/50 text-sky-400 p-3 rounded-lg mr-4 border border-gray-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-100">{title}</h3>
    </div>
    <div className="text-gray-400 flex-grow space-y-3 text-sm">{children}</div>
    {link && (
      <a href={link} download className="mt-6 text-sky-400 font-semibold self-start bg-sky-500/10 hover:bg-sky-500/20 px-4 py-2 rounded-lg transition-colors">
        İndir &rarr;
      </a>
    )}
  </div>
);

const ResourcesView: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto w-full bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
            <header className="text-center mb-12 pt-8">
                 <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">Kaynaklar</h1>
                 <p className="text-lg text-gray-400 mt-2">FSP sınavına hazırlığınızı destekleyecek materyaller.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResourceCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>}
                    title="Anamnez Formu (PDF)"
                    link="#"
                >
                    <p>FSP sınavında kullanılan standart anamnez formunun bir örneği. Pratik yaparken bu şablonu kullanarak bilgileri yapısal bir şekilde toplamayı alışkanlık haline getirin.</p>
                </ResourceCard>
                
                <ResourceCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
                    title="Fizik Muayene Kontrol Listesi"
                >
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Allgemeinzustand:</strong> Guter/reduzierter AZ, adipöser EZ.</li>
                        <li><strong>Orientierung:</strong> Zeitlich, örtlich, personell orientiert.</li>
                        <li><strong>Herz:</strong> Herztöne rein, rhythmisch, keine Nebengeräusche.</li>
                        <li><strong>Lunge:</strong> Vesikuläres Atemgeräusch, keine Rasselgeräusche.</li>
                        <li><strong>Abdomen:</strong> Weich, indolent, keine Resistenzen.</li>
                        <li><strong>Neurologie:</strong> Grobneurologisch unauffällig.</li>
                        <li><strong>Extremitäten:</strong> Keine Ödeme, periphere Pulse tastbar.</li>
                    </ul>
                </ResourceCard>

                <ResourceCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
                    title="Kalıp Cümleler (Redemittel)"
                >
                    <p><strong>Giriş:</strong> "Guten Tag, mein Name ist Dr. [Adınız]. Ich bin der zuständige Arzt. Was führt Sie zu mir?"</p>
                    <p><strong>Soru Sorma:</strong> "Könnten Sie die Schmerzen genauer beschreiben? Seit wann haben Sie diese Beschwerden?"</p>
                    <p><strong>Empati:</strong> "Das muss sehr unangenehm für Sie sein. Ich verstehe Ihre Sorgen."</p>
                    <p><strong>Sonuç:</strong> "Vielen Dank für die Informationen. Ich werde Sie jetzt körperlich untersuchen."</p>
                </ResourceCard>

                <ResourceCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="7" cy="7" r="5" /><circle cx="17" cy="17" r="5" /><path d="M12 17.5V14l-2.5 2.5" /><path d="m14 10-2.5 2.5" /></svg>}
                    title="Sık Kullanılan İlaçlar"
                >
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Analgetika:</strong> Ibuprofen, Paracetamol, Novalgin</li>
                        <li><strong>Antihypertensiva:</strong> Ramipril, Amlodipin, Metoprolol</li>
                        <li><strong>Antikoagulantien:</strong> ASS, Eliquis, Marcumar</li>
                        <li><strong>PPI:</strong> Pantoprazol, Omeprazol</li>
                        <li><strong>Diuretika:</strong> HCT, Torasemid</li>
                    </ul>
                </ResourceCard>
            </div>
        </div>
    );
};

export default ResourcesView;
