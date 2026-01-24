import React, { useState, useEffect } from 'react';
import type { SimulationMode } from '../types';

interface TimerProps {
    duration: number; // in seconds
    onTimeUp: () => void;
    stage: string; // Used to reset the timer when the stage changes
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, stage }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    // Reset the timer whenever the stage changes
    useEffect(() => {
        setTimeLeft(duration);
    }, [stage, duration]);

    // Handle the countdown logic
    useEffect(() => {
        // If time is up, call the callback and don't start a new interval
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        // Set up the interval
        const intervalId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        // Clean up the interval on component unmount or when dependencies change
        return () => clearInterval(intervalId);
    }, [timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const isRunningLow = timeLeft <= 300; // 5 minutes
    
    const timerColor = `text-red-400 ${isRunningLow ? 'animate-pulse' : ''}`;

    return (
        <div className={`text-lg font-bold p-2 rounded-md transition-colors ${timerColor}`}>
            <span>Sınav Süresi: </span>
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
    );
};

export default Timer;