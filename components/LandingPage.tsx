import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

interface DecodedJwt {
    given_name: string;
    family_name: string;
    email: string;
}

interface LandingPageProps {
    onLoginSuccess: (user: DecodedJwt) => void;
    onEnterGuestMode: () => void;
}

const GoogleGIcon = () => (
    <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
            <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1682-1.8409H9v3.4818h4.8436c-.2086 1.125-.844 2.0782-1.7958 2.7218v2.2582h2.9085c1.7018-1.5668 2.6836-3.8732 2.6836-6.621v.0004z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9085-2.2582c-.806.544-1.8409.8682-3.0479.8682-2.344 0-4.3282-1.5818-5.0358-3.7104H.957v2.3318C2.4382 16.1455 5.426 18 9 18z" fill="#34A853"/>
            <path d="M3.9642 10.71c-.1827-.544-.2855-1.125-.2855-1.71s.1028-1.166.2855-1.71V4.9582H.957C.3477 6.1718 0 7.5477 0 9c0 1.4523.3477 2.8282.957 4.0418L3.9642 10.71z" fill="#FBBC05"/>
            <path d="M9 3.5795c1.3214 0 2.5077.4568 3.4405 1.346l2.5813-2.5814C13.4636.8918 11.43.0005 9 .0005 5.426 0 2.4382 1.8545.957 4.9586l3.0072 2.3318C4.6718 5.1618 6.656 3.5795 9 3.5795z" fill="#EA4335"/>
        </g>
    </svg>
);

const AppMockup: React.FC = () => (
  <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[470px] max-w-[280px] md:h-[520px] md:max-w-[320px] shadow-2xl">
      <div className="rounded-xl overflow-hidden w-full h-full bg-gray-900">
          <div className="w-full h-8 bg-gray-800 flex items-center px-2">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-2 space-y-3">
            <div className="flex justify-start items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-600 flex-shrink-0"></div>
              <div className="w-4/5 h-10 rounded-lg bg-gray-700"></div>
            </div>
            <div className="flex justify-end items-start gap-2">
              <div className="w-3/5 h-8 rounded-lg bg-sky-600"></div>
              <div className="w-6 h-6 rounded-full bg-sky-500 flex-shrink-0"></div>
            </div>
             <div className="flex justify-start items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-600 flex-shrink-0"></div>
              <div className="w-1/2 h-8 rounded-lg bg-gray-700"></div>
            </div>
            <div className="flex justify-end items-start gap-2">
              <div className="w-4/5 h-10 rounded-lg bg-sky-600"></div>
              <div className="w-6 h-6 rounded-full bg-sky-500 flex-shrink-0"></div>
            </div>
             <div className="flex justify-start items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-600 flex-shrink-0"></div>
              <div className="w-2/5 h-8 rounded-lg bg-gray-700 animate-pulse"></div>
            </div>
          </div>
      </div>
  </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onLoginSuccess, onEnterGuestMode }) => {
    
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                if (!userInfoResponse.ok) {
                    throw new Error('Failed to fetch user info');
                }
                const userInfo = await userInfoResponse.json();
                onLoginSuccess(userInfo as DecodedJwt);
            } catch (error) {
                console.error('Error fetching user info from Google:', error);
            }
        },
        onError: () => {
            console.error('Google Login Failed');
        },
    });

    return (
        <div className="bg-gray-900 text-white font-sans">
            <header className="py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-500 h-8 w-8 mr-2"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2v20" /><path d="M12 12H2" /><path d="m15 5 3 3" /><path d="m6 18 3-3" /></svg>
                    <span className="font-bold text-2xl">FSP Simülatörü</span>
                </div>
                <button onClick={() => login()} className="hidden sm:flex items-center justify-center bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors">
                    Giriş Yap
                </button>
            </header>

            <section className="py-20 px-6 text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center container mx-auto">
                <div className="mb-12 lg:mb-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
                        FSP Sınavını Şansa Bırakmayın.
                        <span className="block text-sky-400">Yapay Zeka ile %100 Hazırlanın.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
                        Sınırsız vaka simülasyonu, gerçekçi hasta diyalogları ve anlık geri bildirim ile Almanya'daki doktorluk kariyerinize ilk adımı atın.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button onClick={() => login()} className="flex items-center justify-center bg-sky-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-sky-500 transition-transform transform hover:scale-105 shadow-lg">
                            <GoogleGIcon /> <span className="ml-2">Ücretsiz Başla</span>
                        </button>
                        <button onClick={onEnterGuestMode} className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-600 transition-transform transform hover:scale-105 shadow-lg">
                            Örnek Vaka Gör &rarr;
                        </button>
                    </div>
                </div>
                <div>
                  <AppMockup />
                </div>
            </section>

            <section className="py-20 bg-gray-800/50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sınavın Her Aşamasına Hazır Olun</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">FSP Simülatörü, sınavın 3 temel bölümü için size özel pratik imkanı sunar.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {/* Feature 1 */}
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
                             <h3 className="text-xl font-bold text-sky-400 mb-2">Anamnez Görüşmesi</h3>
                             <p className="text-gray-400">Yapay zeka ile gerçekçi hasta diyalogları kurun.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
                            <h3 className="text-xl font-bold text-sky-400 mb-2">Arztbrief Yazımı</h3>
                            <p className="text-gray-400">Topladığınız bilgileri resmi doktor mektubuna dönüştürün.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
                            <h3 className="text-xl font-bold text-sky-400 mb-2">Vaka Sunumu</h3>
                            <p className="text-gray-400">Kıdemli doktora vakanızı sunun ve soruları yanıtlayın.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tüm Özelliklere Ömür Boyu Erişin</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">Tek seferlik ödeme ile tüm vakalara, özelliklere ve gelecekteki güncellemelere sahip olun.</p>
                    <div className="flex justify-center">
                         <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border-2 border-sky-500 w-full max-w-md transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-bold text-yellow-400">Lansmana Özel Fiyat</h3>
                            <p className="text-gray-400 mt-2">Tek Seferlik Ödeme</p>
                            <div className="my-8">
                                <span className="text-5xl font-extrabold text-white">399 ₺</span>
                                <span className="text-2xl text-gray-500 line-through ml-2">1.299 ₺</span>
                            </div>
                            <ul className="text-left space-y-3 text-gray-300 mb-8">
                                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>90+ Vaka Simülasyonu</li>
                                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Sınav Modu & Puanlama</li>
                                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Tüm Terminoloji Kartları</li>
                                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Ömür Boyu Erişim ve Güncellemeler</li>
                            </ul>
                            <button onClick={() => login()} className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-sky-500 transition-colors shadow-lg">
                                Premium Erişimi Aç
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
