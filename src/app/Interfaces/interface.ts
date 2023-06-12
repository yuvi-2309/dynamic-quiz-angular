export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface ShuffledAnswer {
  answer: string;
  isCorrect: boolean;
  isSelected: boolean;
}

export interface CategoryOptions {
  id: number;
  name: string;
}