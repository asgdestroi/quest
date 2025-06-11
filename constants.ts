
import { QuizQuestion, SchoolName } from './types';

export const TEACHER_PASSWORD = "Profandre123";

export const SCHOOLS = [
  "E.E. Antônio Carlos",
  "E.E. José Freire",
] as const;

export const CLASSES_BY_SCHOOL: Record<SchoolName, ReadonlyArray<string>> = {
  "E.E. Antônio Carlos": [
    "1º EM REG 1 (2025)", "1º EM REG 2 (2025)", "1º EM REG 3 (2025)", "1º EM REG 4 (2025)",
    "2º EM REG 1 (2025)", "2º EM REG 2 (2025)", "2º EM REG 3 (2025)", "2º EM REG 4 (2025)",
    "3º EM REG 1 (2025)", "3º EM REG 2 (2025)", "3º EM REG 3 (2025)", "3º EM REG 4 (2025)",
  ],
  "E.E. José Freire": [
    "1º EM REG 1", "1º EM REG 2", "1º EM REG 3", "1º EM REG 4",
    "2º EM REG 1", "2º EM REG 2", "2º EM REG 3", "2º EM REG 4",
    "3º EM REG 1", "3º EM REG 2", "3º EM REG 3", "3º EM REG 4",
  ],
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Qual é a principal diferença entre grafite e pixo, segundo os artistas entrevistados no documentário \"Cidade Cinza\"?",
    options: [
      { id: 'a', text: "O grafite é sempre feito com permissão enquanto o pixo é sempre ilegal" },
      { id: 'b', text: "O grafite é considerado arte enquanto o pixo é visto apenas como vandalismo puro" },
      { id: 'c', text: "O grafite prioriza a estética e o apelo visual, já o pixo enfatiza a mensagem e a ocupação do espaço urbano" },
      { id: 'd', text: "O grafite utiliza apenas tintas spray profissionais enquanto o pixo usa materiais improvisados" },
      { id: 'e', text: "Não existe diferença significativa entre as duas manifestações urbanas" },
    ],
    correctAnswerId: 'c',
  },
  {
    id: 2,
    text: "Como os artistas retratados no documentário justificam o pixo como forma de expressão artística?",
    options: [
      { id: 'a', text: "Por ser uma técnica mais simples e acessível do que o grafite tradicional" },
      { id: 'b', text: "Por representar uma forma de contestação social e afirmação de presença no espaço público" },
      { id: 'c', text: "Por ser mais facilmente aceito e compreendido pelo grande público" },
      { id: 'd', text: "Por exigir menos habilidade técnica e preparo artístico" },
      { id: 'e', text: "Por ser sempre realizado com autorização dos proprietários dos muros" },
    ],
    correctAnswerId: 'b',
  },
  {
    id: 3,
    text: "Qual foi o papel dos irmãos Os Gêmeos no desenvolvimento do grafite em São Paulo, conforme apresentado no documentário?",
    options: [
      { id: 'a', text: "Foram os pioneiros absolutos na introdução do pixo na cidade" },
      { id: 'b', text: "Contribuíram para internacionalizar o grafite brasileiro, dando visibilidade global à cena paulistana" },
      { id: 'c', text: "Atuaram como críticos ferrenhos de qualquer forma de arte urbana" },
      { id: 'd', text: "Trabalharam exclusivamente em espaços institucionais, nunca em intervenções urbanas" },
      { id: 'e', text: "Foram responsáveis diretos pela criminalização do grafite na cidade" },
    ],
    correctAnswerId: 'b',
  },
  {
    id: 4,
    text: "Como \"Cidade Cinza\" retrata a relação entre os artistas urbanos e o poder público municipal?",
    options: [
      { id: 'a', text: "Mostra uma cooperação constante e harmoniosa entre as partes" },
      { id: 'b', text: "Revela um cenário de conflito com períodos de repressão, mas também momentos de reconhecimento oficial" },
      { id: 'c', text: "Apresenta uma completa ausência de interferência governamental" },
      { id: 'd', text: "Demonstra que todos os artistas foram contratados formalmente pela prefeitura" },
      { id: 'e', text: "Indica que a prefeitura apoiava apenas o pixo, nunca o grafite" },
    ],
    correctAnswerId: 'b',
  },
  {
    id: 5,
    text: "Qual a posição predominante entre os artistas do filme em relação à criminalização do pixo?",
    options: [
      { id: 'a', text: "Concordam plenamente com sua classificação como ato vandalico" },
      { id: 'b', text: "Defendem sua legitimidade como expressão cultural e criticam a repressão sistemática" },
      { id: 'c', text: "Acreditam que apenas o grafite deveria ser permitido por lei" },
      { id: 'd', text: "Consideram que o pixo só é aceitável em áreas abandonadas" },
      { id: 'e', text: "Não manifestam qualquer opinião formada sobre o assunto" },
    ],
    correctAnswerId: 'b',
  },
  {
    id: 6,
    text: "Qual foi o impacto da Lei Cidade Limpa sobre as manifestações de arte urbana em São Paulo, segundo o documentário?",
    options: [
      { id: 'a', text: "Estimulou o surgimento de novos artistas de rua" },
      { id: 'b', text: "Intensificou a fiscalização e repressão contra qualquer tipo de intervenção urbana" },
      { id: 'c', text: "Afetou apenas a publicidade comercial, sem relação com a arte de rua" },
      { id: 'd', text: "Transformou o pixo em patrimônio cultural oficial" },
      { id: 'e', text: "Na prática, nunca foi implementada de fato" },
    ],
    correctAnswerId: 'b',
  },
  {
    id: 7,
    text: "Como os artistas do filme percebem a inserção do grafite no circuito comercial de arte?",
    options: [
      { id: 'a', text: "Consideram que isso representa a perda da essência contestadora original" },
      { id: 'b', text: "Veem como a única forma legítima de valorização do grafite" },
      { id: 'c', text: "Acreditam que o mercado nunca realmente aceitou o grafite como arte" },
      { id: 'd', text: "Não fazem distinção entre grafite e pixo no contexto mercadológico" },
      { id: 'e', text: "Avaliam que o pixo tem maior valor comercial que o grafite" },
    ],
    correctAnswerId: 'a',
  },
  {
    id: 8,
    text: "O que o documentário revela sobre as tensões entre grafiteiros e pichadores?",
    options: [
      { id: 'a', text: "Mostra uma convivência sempre pacífica e colaborativa" },
      { id: 'b', text: "Expõe rivalidades, com grafiteiros muitas vezes criticando o pixo como vandalismo e pichadores acusando grafiteiros de \"vendidos\"" },
      { id: 'c', text: "Indica que todos os grafiteiros também praticam pixo regularmente" },
      { id: 'd', text: "Demonstra completa ausência de conflitos entre os grupos" },
      { id: 'e', text: "Revela que a polícia sempre mediou positivamente essas relações" },
    ],
    correctAnswerId: 'b',
  },
  {
    id: 9,
    text: "Qual é a visão central apresentada pelo documentário sobre o papel da arte urbana na transformação das cidades?",
    options: [
      { id: 'a', text: "Que ela contribui para piorar a degradação dos centros urbanos" },
      { id: 'b', text: "Que grafite e pixo funcionam como formas de resistência e humanização dos espaços cinzentos" },
      { id: 'c', text: "Que deveria ser restrita a museus e galerias especializadas" },
      { id: 'd', text: "Que não possui qualquer capacidade transformadora real" },
      { id: 'e', text: "Que apenas o grafite tem este poder, nunca o pixo" },
    ],
    correctAnswerId: 'b',
  },
  {
    id: 10,
    text: "Como os artistas entrevistados em \"Cidade Cinza\" enxergam o futuro dessas manifestações artísticas urbanas?",
    options: [
      { id: 'a', text: "Acreditam que ambas estão fadadas ao desaparecimento devido à repressão crescente" },
      { id: 'b', text: "Preveem que o grafite se tornará a única forma aceita de arte de rua" },
      { id: 'c', text: "Percebem que continuarão evoluindo e se adaptando como formas de expressão e resistência" },
      { id: 'd', text: "Esperam que o pixo substitua completamente o grafite no cenário urbano" },
      { id: 'e', text: "Não demonstram qualquer preocupação ou reflexão sobre o futuro" },
    ],
    correctAnswerId: 'c',
  }
];
