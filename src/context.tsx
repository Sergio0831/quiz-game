import axios from "axios";
import React, { useState, useContext, createContext } from "react";
import { AppContextData, IQuestion, IResult, ITable } from "./types/type";

interface AppProps {
  children: React.ReactChild | React.ReactNode;
}

const defaultAppContextData: AppContextData = {
  waiting: true,
  loading: false,
  questions: [],
  index: 0,
  correct: 0,
  error: false,
  quiz: {
    amount: 10,
    category: "sports",
    difficulty: "easy"
  },
  isModalOpen: false,
  nextQuestion: () => {},
  checkAnswer: () => {},
  openModal: () => {},
  closeModal: () => {},
  handleChange: () => {},
  handleSubmit: () => {}
};

const table: ITable = {
  sports: 21,
  geography: 22,
  history: 23,
  politics: 24,
  vehicles: 28
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = createContext<AppContextData>(defaultAppContextData);

const AppProvider = ({ children }: AppProps) => {
  const [waiting, setWaiting] = useState<boolean>(
    defaultAppContextData.waiting
  );
  const [loading, setLoading] = useState<boolean>(
    defaultAppContextData.loading
  );
  const [questions, setQuestions] = useState<IQuestion[]>(
    defaultAppContextData.questions
  );
  const [index, setIndex] = useState<number>(defaultAppContextData.index);
  const [correct, setCorrect] = useState<number>(defaultAppContextData.correct);
  const [error, setError] = useState<boolean>(defaultAppContextData.error);
  const [quiz, setQuiz] = useState(defaultAppContextData.quiz);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    defaultAppContextData.isModalOpen
  );

  const fetchQuestions = async (url: string) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios
      .get<IResult>(url)
      .catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setWaiting(false);
        setLoading(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value: boolean) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    fetchQuestions(
      `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`
    );
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        quiz,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        openModal,
        closeModal,
        handleChange,
        handleSubmit
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
