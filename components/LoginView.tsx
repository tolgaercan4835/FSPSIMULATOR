import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

interface DecodedJwt {
    given_name: string;
    family_name: string;
    email: string;
}

interface LoginViewProps {
    onLoginSuccess: (user: DecodedJwt) => void;
    onEnterGuestMode: () => void;
}

const GoogleGIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="mr-3">
        <g fill="none" fillRule="evenodd">
            <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1682-1.8409H9v3.4818h4.8436c-.2086 1.125-.844 2.0782-1.7958 2.7218v2.2582h2.9085c1.7018-1.5668 2.6836-3.8732 2.6836-6.621v.0004z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9085-2.2582c-.806.544-1.8409.8682-3.0479.8682-2.344 0-4.3282-1.5818-5.0358-3.7104H.957v2.3318C2.4382 16.1455 5.426 18 9 18z" fill="#34A853"/>
            <path d="M3.9642 10.71c-.1827-.544-.2855-1.125-.2855-1.71s.1028-1.166.2855-1.71V4.9582H.957C.3477 6.1718 0 7.5477 0 9c0 1.4523.3477 2.8282.957 4.0418L3.9642 10.71z" fill="#FBBC05"/>
            <path d="M9 3.5795c1.3214 0 2.5077.4568 3.4405 1.346l2.5813-2.5814C13.4636.8918 11.43.0005 9 .0005 5.426 0 2.4382 1.8545.957 4.9586l3.0072 2.3318C4.6718 5.1618 6.656 3.5795 9 3.5795z" fill="#EA4335"/>
        </g>
    </svg>
);

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onEnterGuestMode }) => {
    
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
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-center">
            <div className="flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 h-12 w-12 mr-4">
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 2v20" />
                    <path d="M12 12H2" />
                    <path d="m15 5 3 3" />
                    <path d="m6 18 3-3" />
                </svg>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 tracking-tight">FSP Sınav Simülatörü</h1>
            </div>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl">
                FSP (Fachspracheprüfung) sınavına yapay zeka destekli interaktif simülasyonlar, vaka analizleri ve detaylı terminoloji kartları ile hazırlanın.
            </p>
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Giriş Yap</h2>
                <p className="text-gray-400 mb-8">Başlamak için lütfen Google hesabınızla giriş yapın.</p>
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => login()}
                        className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors border border-gray-300"
                    >
                        <GoogleGIcon />
                        <span>Google ile Giriş Yap</span>
                    </button>

                    <div className="relative flex py-2 items-center w-full">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">veya</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>
                    <button
                      onClick={onEnterGuestMode}
                      className="w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      Giriş Yapmadan Devam Et (Ücretsiz Deneme)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginView;