export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Question {
    id?: number;
    type: QuestionType;
    text: string;
    options?: string[];
}

export interface Quiz {
    id: number;
    title: string;
    questions: Question[];
    createdAt?: string;
}

export interface CreateQuizDto {
    title: string;
    questions: {
        type: QuestionType;
        text: string;
        options?: string[];
    }[];
}
