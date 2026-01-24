
import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import * as Avatars from './avatars';

interface ProfileCreationViewProps {
    onSaveProfile: (profile: UserProfile) => void;
    initialProfile?: Partial<UserProfile> | null;
    onCancel?: () => void;
}

const avatarOptions = Object.keys(Avatars).map(key => ({ id: key, Component: Avatars[key as keyof typeof Avatars] }));

const ProfileCreationView: React.FC<ProfileCreationViewProps> = ({ onSaveProfile, initialProfile = null, onCancel }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
    const [gender, setGender] = useState<'male' | 'female' | ''>('');
    
    const isEditing = !!(initialProfile && initialProfile.gender);

    useEffect(() => {
        if (initialProfile) {
            setFirstName(initialProfile.firstName || '');
            setLastName(initialProfile.lastName || '');
            setSelectedAvatarId(initialProfile.avatarId || null);
            setGender(initialProfile.gender || '');
        }
    }, [initialProfile]);

    const isFormValid = firstName.trim() !== '' && lastName.trim() !== '' && selectedAvatarId !== null && gender !== '';

    const handleSave = () => {
        if (isFormValid) {
            onSaveProfile({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                avatarId: selectedAvatarId!,
                gender: gender as 'male' | 'female',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">{isEditing ? 'Profili Düzenle' : 'Profilinizi Tamamlayın'}</h1>
                    <p className="text-gray-400">Simülasyon deneyiminizi kişiselleştirin.</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">Adınız</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Örn: Mehmet"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">Soyadınız</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Örn: Yılmaz"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Hitap Şekli (Anrede)</label>
                        <div className="flex gap-x-6">
                            <label className="flex items-center space-x-2 text-gray-200 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={(e) => setGender(e.target.value as 'male')}
                                    className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                                />
                                <span>Herr Dr.</span>
                            </label>
                             <label className="flex items-center space-x-2 text-gray-200 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={(e) => setGender(e.target.value as 'female')}
                                    className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                                />
                                <span>Frau Dr.</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">Avatarınızı Seçin</label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                            {avatarOptions.map(({ id, Component }) => (
                                <button
                                    key={id}
                                    onClick={() => setSelectedAvatarId(id)}
                                    className={`p-2 rounded-full transition-all duration-200 ${
                                        selectedAvatarId === id 
                                        ? 'bg-blue-600 ring-4 ring-blue-500/50' 
                                        : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                                >
                                    <Component />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={handleSave}
                        disabled={!isFormValid}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                    >
                        {isEditing ? 'Değişiklikleri Kaydet' : 'Kaydet ve Başla'}
                    </button>
                    {isEditing && onCancel && (
                        <button onClick={onCancel} className="w-full text-gray-400 text-sm mt-3 hover:text-white transition-colors">
                            İptal
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCreationView;