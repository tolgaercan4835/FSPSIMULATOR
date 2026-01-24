import React, { useState } from 'react';
import type { UserProfile, View } from '../types';
import * as Avatars from './avatars';

interface NavbarProps {
    currentView: View;
    navigateTo: (view: View) => void;
    userProfile: UserProfile | null;
    isGuest: boolean;
    onLogout?: () => void;
    onLogin: () => void;
    onEditProfile?: () => void;
}

const NavLink: React.FC<{
    label: string;
    view: View;
    currentView: string;
    navigateTo: (view: any) => void;
    onClick?: () => void;
}> = ({ label, view, currentView, navigateTo, onClick }) => {
    const isActive = currentView === view;
    
    const handleClick = () => {
        navigateTo(view);
        if(onClick) onClick();
    }

    return (
        <button
            onClick={handleClick}
            className={`px-3 py-2 rounded-md text-base font-medium transition-colors block text-left w-full whitespace-nowrap ${
                isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            aria-current={isActive ? 'page' : undefined}
        >
            {label}
        </button>
    );
};

const GoogleGIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <g fill="none" fillRule="evenodd">
            <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1682-1.8409H9v3.4818h4.8436c-.2086 1.125-.844 2.0782-1.7958 2.7218v2.2582h2.9085c1.7018-1.5668 2.6836-3.8732 2.6836-6.621v.0004z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9085-2.2582c-.806.544-1.8409.8682-3.0479.8682-2.344 0-4.3282-1.5818-5.0358-3.7104H.957v2.3318C2.4382 16.1455 5.426 18 9 18z" fill="#34A853"/>
            <path d="M3.9642 10.71c-.1827-.544-.2855-1.125-.2855-1.71s.1028-1.166.2855-1.71V4.9582H.957C.3477 6.1718 0 7.5477 0 9c0 1.4523.3477 2.8282.957 4.0418L3.9642 10.71z" fill="#FBBC05"/>
            <path d="M9 3.5795c1.3214 0 2.5077.4568 3.4405 1.346l2.5813-2.5814C13.4636.8918 11.43.0005 9 .0005 5.426 0 2.4382 1.8545.957 4.9586l3.0072 2.3318C4.6718 5.1618 6.656 3.5795 9 3.5795z" fill="#EA4335"/>
        </g>
    </svg>
);


const Navbar: React.FC<NavbarProps> = ({ currentView, navigateTo, userProfile, isGuest, onLogout, onLogin, onEditProfile }) => {
    const AvatarComponent = userProfile ? (Avatars[userProfile.avatarId as keyof typeof Avatars] || Avatars.Avatar1) : null;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Ana Sayfa', view: 'dashboard' },
        { label: 'Simülasyon', view: 'simulation' },
        { label: 'Terminoloji', view: 'study' },
        { label: 'Gelişim', view: 'progress' },
        { label: 'Kaynaklar', view: 'resources' },
    ] as const;

    return (
        <nav className="bg-gray-800 border-b border-gray-700 shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 text-white flex items-center whitespace-nowrap">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 h-8 w-8 mr-2"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2v20" /><path d="M12 12H2" /><path d="m15 5 3 3" /><path d="m6 18 3-3" /></svg>
                            <span className="font-bold text-2xl hidden sm:inline">FSP Simülatörü</span>
                            <span className="font-bold text-2xl sm:hidden">FSP Sim</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map(item => (
                                    <NavLink key={item.view} {...item} currentView={currentView} navigateTo={navigateTo} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block flex-shrink-0">
                        <div className="ml-4 flex items-center md:ml-6">
                             {isGuest ? (
                                <button onClick={onLogin} className="flex items-center justify-center bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors border border-gray-300 text-base">
                                    <GoogleGIcon />
                                    <span>Google ile Giriş Yap</span>
                                </button>
                            ) : userProfile && AvatarComponent && (
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <AvatarComponent />
                                        </div>
                                        <div className="ml-3 text-right">
                                            <div className="text-sm font-medium leading-none text-white whitespace-nowrap">Dr. {userProfile.lastName}</div>
                                             <div className="text-xs font-medium leading-none text-gray-400">{userProfile.firstName}</div>
                                        </div>
                                    </div>
                                    <button onClick={onEditProfile} className="text-gray-300 hover:text-white p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors" aria-label="Profili düzenle">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                    </button>
                                    <button onClick={onLogout} className="text-gray-300 hover:text-white p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors" aria-label="Çıkış Yap">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map(item => (
                            <NavLink key={item.view} {...item} currentView={currentView} navigateTo={navigateTo} onClick={() => setIsMobileMenuOpen(false)} />
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        {isGuest ? (
                             <div className="px-2">
                                <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors border border-gray-300 text-base">
                                    <GoogleGIcon />
                                    <span>Google ile Giriş Yap</span>
                                </button>
                            </div>
                        ) : userProfile && AvatarComponent && (
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                         <AvatarComponent />
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">Dr. {userProfile.firstName} {userProfile.lastName}</div>
                                </div>
                                <button onClick={onEditProfile} className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                </button>
                                <button onClick={onLogout} className="ml-2 bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;