import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuiz } from '../services/api';
import type { Quiz } from '../types/quiz';

export default function QuizDetailPage() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const data = await getQuiz(id);
                setQuiz(data);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return <main>Loading…</main>;
    if (!quiz) return <main>Not found</main>;

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
            <ol className="space-y-4 list-decimal list-inside">
                {quiz.questions.map((q, idx) => (
                    <li key={idx} className="border rounded p-4">
                        <p className="font-medium">{q.text}</p>

                        {q.type === 'boolean' && (
                            <div className="mt-2 space-y-1 text-gray-700">
                                <label className="flex items-center gap-2"><input type="radio" disabled /> True</label>
                                <label className="flex items-center gap-2"><input type="radio" disabled /> False</label>
                            </div>
                        )}

                        {q.type === 'input' && (
                            <input className="mt-2 w-full border rounded px-3 py-2" placeholder="(short text answer)" disabled />
                        )}

                        {q.type === 'checkbox' && (
                            <div className="mt-2 space-y-1 text-gray-700">
                                {(q.options || []).map((opt, i) => (
                                    <label key={i} className="flex items-center gap-2">
                                        <input type="checkbox" disabled /> {opt}
                                    </label>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </main>
    );
}
