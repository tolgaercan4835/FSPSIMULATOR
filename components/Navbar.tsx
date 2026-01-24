
import React, { useState } from 'react';
import type { UserProfile } from '../types';
import * as Avatars from './avatars';

interface NavbarProps {
    currentView: 'dashboard' | 'simulation' | 'progress' | 'study';
    navigateTo: (view: 'dashboard' | 'simulation' | 'progress' | 'study') => void;
    userProfile: UserProfile | null;
    isGuest: boolean;
    onLogout?: () => void;
    onLogin: () => void;
    onEditProfile?: () => void;
}

const NavLink: React.FC<{
    label: string;
    view: 'dashboard' | 'simulation' | 'progress' | 'study';
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
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors block text-left w-full ${
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

const Navbar: React.FC<NavbarProps> = ({ currentView, navigateTo, userProfile, isGuest, onLogout, onLogin, onEditProfile }) => {
    const AvatarComponent = userProfile ? (Avatars[userProfile.avatarId as keyof typeof Avatars] || Avatars.Avatar1) : null;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Ana Panel', view: 'dashboard' },
        { label: 'Simülasyon', view: 'simulation' },
        { label: 'Terminoloji', view: 'study' },
        { label: 'Gelişim', view: 'progress' },
    ] as const;

    return (
        <nav className="bg-gray-800 border-b border-gray-700 shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 text-white flex items-center">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 h-8 w-8 mr-2"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2v20" /><path d="M12 12H2" /><path d="m15 5 3 3" /><path d="m6 18 3-3" /></svg>
                            <span className="font-bold text-xl hidden sm:inline">FSP Simülatörü</span>
                            <span className="font-bold text-xl sm:hidden">FSP Sim</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map(item => (
                                    <NavLink key={item.view} {...item} currentView={currentView} navigateTo={navigateTo} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                             {isGuest ? (
                                <button onClick={onLogin} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm">
                                    Google ile Giriş Yap
                                </button>
                            ) : userProfile && AvatarComponent && (
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <AvatarComponent />
                                        </div>
                                        <div className="ml-3 text-right">
                                            <div className="text-sm font-medium leading-none text-white">Dr. {userProfile.lastName}</div>
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
                                <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full text-left bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm">
                                    Google ile Giriş Yap
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
