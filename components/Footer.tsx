import React from 'react';
import type { View } from '../types';

interface FooterProps {
    navigateTo: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
    return (
        <footer className="bg-gray-800 border-t border-gray-700 mt-12 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
                <div className="flex justify-center space-x-6 mb-4">
                    <button onClick={() => navigateTo('legal')} className="hover:text-sky-400 transition-colors">
                        Nutzungsbedingungen
                    </button>
                    <button onClick={() => navigateTo('legal')} className="hover:text-sky-400 transition-colors">
                        Datenschutzerklärung
                    </button>
                </div>
                <p>&copy; {new Date().getFullYear()} FSP Simülatörü. Tüm hakları saklıdır.</p>
            </div>
        </footer>
    );
};

export default Footer;