import { useFieldArray, useFormContext } from 'react-hook-form';
import type { QuestionType } from '../types/quiz';

export type FormValues = {
    title: string;
    questions: {
        type: QuestionType;
        text: string;
        options?: string[];
    }[];
};

export default function QuestionEditor() {
    const { control, register, watch, setValue } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({ control, name: 'questions' });

    const addQuestion = () =>
        append({ type: 'boolean', text: '', options: ['True', 'False'] });

    const typeChanged = (index: number, newType: QuestionType) => {
        if (newType === 'checkbox') setValue(`questions.${index}.options`, ['', '']);
        else if (newType === 'boolean') setValue(`questions.${index}.options`, ['True', 'False']);
        else setValue(`questions.${index}.options`, undefined);
    };

    return (
        <div className="space-y-6">
            {fields.map((field, index) => {
                const qType = watch(`questions.${index}.type`);
                const options = watch(`questions.${index}.options`) || [];

                return (
                    <div key={field.id} className="border rounded p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Question {index + 1}</h3>
                            <button type="button" className="text-red-600 hover:underline" onClick={() => remove(index)}>
                                Remove
                            </button>
                        </div>

                        <label className="block mt-3 text-sm font-medium">Type</label>
                        <select
                            className="mt-1 w-full border rounded px-3 py-2"
                            {...register(`questions.${index}.type` as const)}
                            onChange={(e) => typeChanged(index, e.target.value as QuestionType)}
                            value={qType}
                        >
                            <option value="boolean">Boolean (True/False)</option>
                            <option value="input">Input (short text)</option>
                            <option value="checkbox">Checkbox (multiple correct)</option>
                        </select>

                        <label className="block mt-3 text-sm font-medium">Text</label>
                        <input
                            className="mt-1 w-full border rounded px-3 py-2"
                            placeholder="Enter question text"
                            {...register(`questions.${index}.text` as const, { required: true })}
                        />

                        {qType !== 'input' && (
                            <>
                                <div className="mt-3 flex items-center justify-between">
                                    <label className="text-sm font-medium">Options</label>
                                    {qType === 'checkbox' && (
                                        <button
                                            type="button"
                                            className="text-blue-600 hover:underline text-sm"
                                            onClick={() => setValue(`questions.${index}.options`, [...options, ''])}
                                        >
                                            + Add option
                                        </button>
                                    )}
                                </div>

                                <div className="mt-2 space-y-2">
                                    {(options || []).map((_, optIdx) => (
                                        <div className="flex gap-2" key={optIdx}>
                                            <input
                                                className="flex-1 border rounded px-3 py-2"
                                                placeholder={`Option ${optIdx + 1}`}
                                                {...register(`questions.${index}.options.${optIdx}` as const)}
                                            />
                                            {qType === 'checkbox' && options.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="text-red-600 hover:underline"
                                                    onClick={() => {
                                                        const next = [...options];
                                                        next.splice(optIdx, 1);
                                                        setValue(`questions.${index}.options`, next);
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            <button type="button" className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded" onClick={addQuestion}>
                + Add question
            </button>
        </div>
    );
}
