
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUIZ_QUESTIONS, SCHOOLS, CLASSES_BY_SCHOOL } from '../constants';
import { SchoolName, StudentInfo, StudentAnswer, Submission } from '../types';
import { Button, Input, Select } from './common/FormControls';
import { QuizQuestionDisplay } from './common/QuizComponents';
import { useSubmissions } from '../hooks/useSubmissions';

type QuizStep = 'info' | 'quiz' | 'result';

export const StudentQuiz: React.FC = () => {
  const [step, setStep] = useState<QuizStep>('info');
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Record<number, string | null>>({});
  const [score, setScore] = useState<number>(0);
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  const [, addSubmission] = useSubmissions();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize answers state
    const initialAnswers: Record<number, string | null> = {};
    QUIZ_QUESTIONS.forEach(q => initialAnswers[q.id] = null);
    setCurrentAnswers(initialAnswers);
  }, []);

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const school = e.target.value as SchoolName;
    setStudentInfo(prev => ({ ...prev!, school: school, className: '' })); // Reset class
    setAvailableClasses(school ? [...CLASSES_BY_SCHOOL[school]] : []);
  };

  const handleInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const school = formData.get('school') as SchoolName;
    const className = formData.get('className') as string;

    if (name && school && className) {
      setStudentInfo({ name, school, className });
      setStep('quiz');
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleOptionSelect = useCallback((questionId: number, optionId: string) => {
    setCurrentAnswers(prev => ({ ...prev, [questionId]: optionId }));
  }, []);

  const handleSubmitQuiz = () => {
    if (!studentInfo) return;

    let calculatedScore = 0;
    const studentAnswersArray: StudentAnswer[] = [];

    QUIZ_QUESTIONS.forEach(question => {
      const selectedOptionId = currentAnswers[question.id];
      studentAnswersArray.push({ questionId: question.id, selectedOptionId });
      if (selectedOptionId === question.correctAnswerId) {
        calculatedScore += 10; // Each question worth 10 points
      }
    });
    setScore(calculatedScore);

    const newSubmission: Submission = {
      id: crypto.randomUUID(),
      studentName: studentInfo.name,
      school: studentInfo.school,
      className: studentInfo.className,
      score: calculatedScore,
      totalQuestions: QUIZ_QUESTIONS.length,
      answers: studentAnswersArray,
      timestamp: Date.now(),
    };
    addSubmission(newSubmission);
    setStep('result');
  };
  
  const allQuestionsAnswered = Object.values(currentAnswers).every(answer => answer !== null);

  if (step === 'info') {
    return (
      <div className="max-w-xl mx-auto bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-sky-400 mb-8 text-center">Identificação do Aluno</h2>
        <form onSubmit={handleInfoSubmit} className="space-y-6">
          <Input name="name" label="Nome Completo:" placeholder="Seu nome completo" required />
          <Select
            name="school"
            label="Escola:"
            options={SCHOOLS.map(s => ({ value: s, label: s }))}
            onChange={handleSchoolChange}
            required
            value={studentInfo?.school || ''}
          />
          {studentInfo?.school && (
            <Select
              name="className"
              label="Turma:"
              options={availableClasses.map(c => ({ value: c, label: c }))}
              required
              value={studentInfo?.className || ''}
              onChange={(e) => setStudentInfo(prev => ({ ...prev!, className: e.target.value }))}
            />
          )}
          <Button type="submit" className="w-full !py-4 text-lg">Iniciar Quiz</Button>
        </form>
      </div>
    );
  }

  if (step === 'quiz') {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-sky-400 mb-8 text-center">Questionário: Cidade Cinza</h2>
        <p className="text-center text-slate-300 mb-8">Olá, {studentInfo?.name}! Responda às questões abaixo.</p>
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map(q => (
            <QuizQuestionDisplay
              key={q.id}
              question={q}
              selectedOption={currentAnswers[q.id]}
              onOptionSelect={handleOptionSelect}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button onClick={handleSubmitQuiz} className="!py-4 text-lg" disabled={!allQuestionsAnswered}>
            Finalizar e Ver Resultado
          </Button>
          {!allQuestionsAnswered && <p className="text-sm text-yellow-400 mt-2">Por favor, responda todas as questões para finalizar.</p>}
        </div>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="max-w-xl mx-auto text-center bg-slate-800 p-10 rounded-xl shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-sky-400 mb-6">Quiz Finalizado!</h2>
        <p className="text-xl text-slate-200 mb-2">Obrigado por participar, {studentInfo?.name}.</p>
        <p className="text-5xl font-extrabold text-green-400 my-6">{score} <span className="text-3xl text-slate-300">/ {QUIZ_QUESTIONS.length * 10}</span></p>
        <p className="text-lg text-slate-300 mb-8">Sua pontuação foi registrada.</p>
        <div className="space-y-4">
          <Button onClick={() => { setStep('info'); setStudentInfo(null); setCurrentAnswers({}); }} className="w-full">
            Responder Novamente (Outro Aluno)
          </Button>
          <Button onClick={() => navigate('/')} variant="secondary" className="w-full">
            Voltar para o Início
          </Button>
        </div>
      </div>
    );
  }

  return null; // Should not reach here
};
