import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteQuiz, getQuizzes } from '../services/api';
import type { Quiz } from '../types/quiz';

export default function QuizzesListPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        try {
            const data = await getQuizzes();
            setQuizzes(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const onDelete = async (id: number) => {
        await deleteQuiz(id);
        setQuizzes(prev => prev.filter(q => q.id !== id));
    };

    return (
        <main>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Quizzes</h1>
                <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded">+ Create</Link>
            </div>

            {loading ? (
                <p>Loading…</p>
            ) : quizzes.length === 0 ? (
                <p className="text-gray-600">No quizzes yet.</p>
            ) : (
                <ul className="space-y-3">
                    {quizzes.map((q) => (
                        <li key={q.id} className="border rounded p-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <Link to={`/quizzes/${q.id}`} className="font-semibold hover:underline">{q.title}</Link>
                                <p className="text-sm text-gray-600">{q.questions?.length ?? 0} question(s)</p>
                            </div>
                            <button onClick={() => onDelete(q.id)} className="text-red-600 hover:underline">Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
