import { useState, useCallback, useRef, useEffect } from 'react';

const useTextToSpeech = (apiKey: string) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);

    useEffect(() => {
        // Initialize AudioContext lazily on first use and ensure it's not re-created
        if (!audioContextRef.current) {
            try {
                 audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (e) {
                console.error("Web Audio API is not supported in this browser.", e);
            }
        }
        
        // Cleanup on unmount
        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playAudio = useCallback(async (text: string, gender: 'male' | 'female') => {
        if (!apiKey || !text.trim() || !audioContextRef.current || audioContextRef.current.state === 'closed') return;
        
        // Stop any currently playing audio
        if (sourceRef.current) {
            try {
                sourceRef.current.stop();
            } catch (e) {
                console.warn("Could not stop previous audio source.", e);
            }
        }

        setIsSpeaking(true);

        const voiceName = gender === 'male' ? 'de-DE-Neural2-B' : 'de-DE-Neural2-F';

        try {
            const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: { text },
                    voice: {
                        languageCode: 'de-DE',
                        name: voiceName,
                    },
                    audioConfig: {
                        audioEncoding: 'MP3',
                        speakingRate: 0.95,
                        pitch: 0.0,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Google TTS API error: ${errorData.error.message || response.statusText}`);
            }

            const data = await response.json();
            if (!data.audioContent) {
                throw new Error("No audio content received from TTS API.");
            }

            const audioContent = data.audioContent;
            
            // Decode base64 to ArrayBuffer
            const binaryString = window.atob(audioContent);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            // Check if context is running, if not, resume it
            if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
            }

            const audioBuffer = await audioContextRef.current.decodeAudioData(bytes.buffer);

            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.onended = () => {
                setIsSpeaking(false);
                sourceRef.current = null;
            };
            source.start(0);
            sourceRef.current = source;

        } catch (error) {
            console.error('Error with Text-to-Speech:', error);
            setIsSpeaking(false);
        }
    }, [apiKey]);

    return { isSpeaking, playAudio };
};

export default useTextToSpeech;