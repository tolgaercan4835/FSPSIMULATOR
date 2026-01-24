import React, { useState, useEffect } from 'react';

interface TimerProps {
    duration: number; // in seconds
    onTimeUp: () => void;
    stage: string; // Used to reset the timer when the stage changes
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, stage }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        // Reset timer whenever the stage changes
        setTimeLeft(duration);
    }, [stage, duration]);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const isRunningLow = timeLeft <= 300; // 5 minutes

    return (
        <div className={`text-lg font-bold p-2 rounded-md transition-colors ${isRunningLow ? 'text-red-400 animate-pulse' : 'text-gray-300'}`}>
            Kalan Süre: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
    );
};

export default Timer;