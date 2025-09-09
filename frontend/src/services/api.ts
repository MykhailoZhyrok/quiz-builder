import type { CreateQuizDto, Quiz } from '../types/quiz';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function http<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...init,
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }
    return res.json() as Promise<T>;
}

export const createQuiz = (payload: CreateQuizDto) =>
    http<Quiz>('/quizzes', { method: 'POST', body: JSON.stringify(payload) });

export const getQuizzes = () => http<Quiz[]>('/quizzes');

export const getQuiz = (id: number | string) => http<Quiz>(`/quizzes/${id}`);

export const deleteQuiz = (id: number | string) =>
    http<Quiz>(`/quizzes/${id}`, { method: 'DELETE' });
