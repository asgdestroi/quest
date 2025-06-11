
import React from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StudentQuiz } from './components/StudentQuiz';
import { TeacherArea } from './components/TeacherArea';
import { Button } from './components/common/FormControls';

const HomePage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-extrabold text-sky-400 mb-6 animate-pulse">
        Bem-vindo ao Quiz de Artes!
      </h1>
      <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
        Baseado no documentário "Cidade Cinza". Alunos podem responder ao questionário,
        e professores podem gerenciar as notas.
      </p>
      <div className="space-y-6 sm:space-y-0 sm:space-x-8 flex flex-col sm:flex-row justify-center items-center">
        <Link to="/aluno">
          <Button className="w-64 !py-5 text-xl transform hover:scale-105">
            Sou Aluno
          </Button>
        </Link>
        <Link to="/professor">
          <Button variant="secondary" className="w-64 !py-5 text-xl transform hover:scale-105">
            Sou Professor
          </Button>
        </Link>
      </div>
      <div className="mt-16 p-6 bg-slate-800 rounded-lg shadow-xl max-w-3xl mx-auto border border-slate-700">
        <h3 className="text-2xl font-semibold text-sky-300 mb-3">Sobre o Quiz</h3>
        <p className="text-slate-400">
          Este quiz contém 10 perguntas sobre o documentário "Cidade Cinza". Cada pergunta respondida corretamente vale 10 pontos. 
          As respostas são armazenadas localmente no seu navegador. O professor pode acessar a área restrita para visualizar
          e exportar os resultados dos alunos que realizaram o quiz neste mesmo navegador/computador.
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aluno" element={<StudentQuiz />} />
          <Route path="/professor" element={<TeacherArea />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
