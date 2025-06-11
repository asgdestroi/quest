
import { Submission } from '../types';

export function exportToCsv(filename: string, data: Submission[]): void {
  if (data.length === 0) {
    alert("Não há dados para exportar.");
    return;
  }

  const headers = ["ID da Submissão", "Nome do Aluno", "Escola", "Turma", "Pontuação", "Total de Questões", "Data da Submissão"];
  // Optional: Add individual answers if needed
  // QUIZ_QUESTIONS.forEach(q => headers.push(`Resposta Q${q.id}`));

  const rows = data.map(submission => {
    const row = [
      submission.id,
      submission.studentName,
      submission.school,
      submission.className,
      submission.score,
      submission.totalQuestions,
      new Date(submission.timestamp).toLocaleString('pt-BR'),
    ];
    // Optional: Add individual answers
    // submission.answers.forEach(ans => row.push(ans.selectedOptionId || 'N/A'));
    return row;
  });

  let csvContent = "data:text/csv;charset=utf-8,"
    + headers.join(",") + "\n"
    + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
