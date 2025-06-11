
import { SCHOOLS, CLASSES_BY_SCHOOL } from './constants';

export type SchoolName = typeof SCHOOLS[number];
export type ClassName<S extends SchoolName> = typeof CLASSES_BY_SCHOOL[S][number];

export interface QuestionOption {
  id: string; // 'a', 'b', 'c', 'd', 'e'
  text: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuestionOption[];
  correctAnswerId: string;
}

export interface StudentAnswer {
  questionId: number;
  selectedOptionId: string | null;
}

export interface Submission {
  id: string; // unique id for submission
  studentName: string;
  school: SchoolName;
  className: string; // Needs to be string to accommodate all class names
  score: number;
  totalQuestions: number;
  answers: StudentAnswer[];
  timestamp: number;
}

export interface StudentInfo {
  name: string;
  school: SchoolName;
  className: string;
}
