
export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export interface Case {
    id: number;
    name: string;
    age: number;
    symptom: string;
    diagnosis: string;
    history: string;
    greeting: string;
}

export interface Term {
    id: number;
    category: string;
    latin: string;
    english: string;
    turkish: string;
    german_medical: string;
    german_common: string;
}


export interface EvaluationRecord {
    id: number;
    date: string;
    patientName: string;
    score: number | null;
    report: string;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    avatarId: string;
    gender: 'male' | 'female';
}
