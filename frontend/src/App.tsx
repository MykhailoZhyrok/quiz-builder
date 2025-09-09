import { Link, Route, Routes, Navigate } from 'react-router-dom';
import CreateQuizPage from './pages/CreateQuizPage';
import QuizzesListPage from './pages/QuizzesListPage';
import QuizDetailPage from './pages/QuizDetailPage';

export default function App() {
    return (
        <div className="container py-6">
            <header className="flex items-center justify-between mb-6">
                <Link to="/" className="text-2xl font-bold">Quiz Builder</Link>
                <nav className="space-x-3">
                    <Link to="/create" className="bg-blue-600 text-white px-3 py-2 rounded">Create</Link>
                    <Link to="/quizzes" className="bg-gray-800 text-white px-3 py-2 rounded">Quizzes</Link>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Navigate to="/quizzes" />} />
                <Route path="/create" element={<CreateQuizPage />} />
                <Route path="/quizzes" element={<QuizzesListPage />} />
                <Route path="/quizzes/:id" element={<QuizDetailPage />} />
            </Routes>
        </div>
    );
}
