
import React, { useState, useEffect, useMemo } from 'react';
import { TEACHER_PASSWORD, SCHOOLS, CLASSES_BY_SCHOOL } from '../constants';
import { Submission, SchoolName } from '../types';
import { Button, Input, Select } from './common/FormControls';
import { useSubmissions } from '../hooks/useSubmissions';
import { exportToCsv } from '../utils/csvExporter';

type TeacherStep = 'login' | 'dashboard';

interface Filters {
  school: SchoolName | 'all';
  className: string | 'all';
}

export const TeacherArea: React.FC = () => {
  const [step, setStep] = useState<TeacherStep>('login');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submissions] = useSubmissions();
  const [filters, setFilters] = useState<Filters>({ school: 'all', className: 'all' });
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);

  useEffect(() => {
    if (filters.school === 'all') {
      const allClasses = Object.values(CLASSES_BY_SCHOOL).flat();
      // Remove duplicates if any class name appears in multiple schools (though not the case here)
      setAvailableClasses(Array.from(new Set(allClasses)));
    } else {
      setAvailableClasses([...CLASSES_BY_SCHOOL[filters.school as SchoolName]]);
    }
    // Reset class filter if selected school doesn't contain the currently selected class
    if (filters.school !== 'all' && filters.className !== 'all' && !CLASSES_BY_SCHOOL[filters.school as SchoolName].includes(filters.className)) {
        setFilters(prev => ({...prev, className: 'all'}));
    }
  }, [filters.school]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === TEACHER_PASSWORD) {
      setStep('dashboard');
      setError('');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter(s => filters.school === 'all' || s.school === filters.school)
      .filter(s => filters.className === 'all' || s.className === filters.className)
      .sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
  }, [submissions, filters]);

  const handleExport = () => {
    let filename = "notas_quiz_artes";
    if (filters.school !== 'all') filename += `_${filters.school.replace(/\s+/g, '_')}`;
    if (filters.className !== 'all') filename += `_${filters.className.replace(/\s+/g, '_')}`;
    filename += ".csv";
    exportToCsv(filename, filteredSubmissions);
  };
  
  const schoolOptions = [{ value: 'all', label: 'Todas as Escolas' }, ...SCHOOLS.map(s => ({ value: s, label: s }))];
  const classOptions = [{ value: 'all', label: 'Todas as Turmas' }, ...availableClasses.map(c => ({ value: c, label: c }))];


  if (step === 'login') {
    return (
      <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 mt-10">
        <h2 className="text-3xl font-bold text-sky-400 mb-8 text-center">Acesso do Professor</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            type="password"
            label="Senha:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full !py-4 text-lg">Entrar</Button>
        </form>
      </div>
    );
  }

  if (step === 'dashboard') {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-sky-400">Painel do Professor</h2>
          <Button onClick={() => { setStep('login'); setPassword(''); }} variant="secondary">Sair</Button>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700 mb-8">
          <h3 className="text-2xl font-semibold text-sky-400 mb-4">Filtros e Exportação</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Select
              label="Filtrar por Escola:"
              options={schoolOptions}
              value={filters.school}
              onChange={(e) => setFilters({ ...filters, school: e.target.value as SchoolName | 'all', className: 'all' })}
            />
            <Select
              label="Filtrar por Turma:"
              options={classOptions}
              value={filters.className}
              onChange={(e) => setFilters({ ...filters, className: e.target.value })}
              disabled={availableClasses.length === 0 && filters.school !== 'all'}
            />
            <div className="md:self-end">
                <Button onClick={handleExport} className="w-full !py-3.5" disabled={filteredSubmissions.length === 0}>
                  {filteredSubmissions.length === 0 ? "Sem dados para exportar" : "Baixar Planilha (CSV)"}
                </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden">
          <h3 className="text-2xl font-semibold text-sky-400 p-6">Resultados dos Alunos</h3>
          {filteredSubmissions.length === 0 ? (
            <p className="p-6 text-slate-400 text-center">Nenhuma submissão encontrada com os filtros atuais.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Aluno</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Escola</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Turma</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Pontuação</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredSubmissions.map(sub => (
                    <tr key={sub.id} className="hover:bg-slate-750 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-100">{sub.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{sub.school}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{sub.className}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        <span className={`font-semibold ${sub.score >= (sub.totalQuestions * 10 * 0.6) ? 'text-green-400' : 'text-red-400'}`}>
                           {sub.score} / {sub.totalQuestions * 10}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{new Date(sub.timestamp).toLocaleString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null; // Should not reach here
};
