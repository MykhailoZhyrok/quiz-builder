import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import QuestionEditor, {type FormValues} from '../components/QuestionEditor';
import { createQuiz } from '../services/api';

const questionSchema = z.object({
    type: z.enum(['boolean', 'input', 'checkbox']),
    text: z.string().min(1, 'Question text is required'),
    options: z.array(z.string().min(1)).optional(),
});
const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

export default function CreateQuizPage() {
    const navigate = useNavigate();
    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: '', questions: [{ type: 'boolean', text: '', options: ['True','False'] }] },
        mode: 'onChange',
    });

    const onSubmit = async (data: FormValues) => {
        await createQuiz(data);
        console.log(data)
        navigate('/quizzes');
    };

    return (
        <main>
            <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input className="mt-1 w-full border rounded px-3 py-2" placeholder="Quiz title" {...methods.register('title')} />
                        {methods.formState.errors.title && (
                            <p className="text-red-600 text-sm mt-1">{methods.formState.errors.title.message}</p>
                        )}
                    </div>

                    <QuestionEditor />

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={methods.formState.isSubmitting}>
                        Save
                    </button>
                </form>
            </FormProvider>
        </main>
    );
}
