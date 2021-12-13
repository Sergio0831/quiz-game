export interface IQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  question: string;
  incorrect_answers: string[];
  type: string;
}

export interface IResult {
  results: IQuestion[];
}

export interface AppContextData {
  waiting: boolean;
  loading: boolean;
  questions: IQuestion[];
  index: number;
  correct: number;
  error: boolean;
  quiz: {
    amount: number;
    category: string;
    difficulty: string;
  };
  isModalOpen: boolean;
  nextQuestion: () => void;
  checkAnswer: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ITable {
  [key: string]: number | string;
}
