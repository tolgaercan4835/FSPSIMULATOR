
import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface LoginViewProps {
    onLoginSuccess: (user: { given_name: string; family_name: string }) => void;
    onEnterGuestMode: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onEnterGuestMode }) => {
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
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100">FSP Sınav Simülatörü</h1>
            </div>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl">
                FSP (Fachspracheprüfung) sınavına yapay zeka destekli interaktif simülasyonlar, vaka analizleri ve detaylı terminoloji kartları ile hazırlanın.
            </p>
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Giriş Yap</h2>
                <p className="text-gray-400 mb-8">Başlamak için lütfen Google hesabınızla giriş yapın.</p>
                <div className="flex flex-col items-center gap-4">
                    <GoogleLogin
                        onSuccess={(credentialResponse: CredentialResponse) => {
                            if (credentialResponse.credential) {
                                const decoded = jwtDecode<{ given_name: string, family_name: string }>(credentialResponse.credential);
                                onLoginSuccess(decoded);
                            }
                        }}
                        onError={() => {
                            console.error('Google Login Failed');
                        }}
                        theme="filled_blue"
                        shape="pill"
                        text="signin_with"
                        logo_alignment="left"
                    />
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
