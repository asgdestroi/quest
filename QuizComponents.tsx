
import React from 'react';
import { QuizQuestion, QuestionOption } from '../../types';

interface QuizQuestionDisplayProps {
  question: QuizQuestion;
  selectedOption: string | null;
  onOptionSelect: (questionId: number, optionId: string) => void;
}

export const QuizQuestionDisplay: React.FC<QuizQuestionDisplayProps> = ({ question, selectedOption, onOptionSelect }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-xl mb-6 border border-slate-700">
      <h3 className="text-xl font-semibold text-sky-400 mb-4">{`Questão ${question.id}: ${question.text}`}</h3>
      <div className="space-y-3">
        {question.options.map((option: QuestionOption) => (
          <button
            key={option.id}
            onClick={() => onOptionSelect(question.id, option.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-150 ease-in-out
                        ${selectedOption === option.id 
                            ? 'bg-sky-500 border-sky-400 text-white ring-2 ring-sky-300' 
                            : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-sky-500 text-slate-200'}
                        focus:outline-none focus:ring-2 focus:ring-sky-400`}
          >
            <span className="font-semibold mr-2">{option.id.toUpperCase()})</span> {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};
