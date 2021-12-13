import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
import { useGlobalContext } from "./context";

const App = () => {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    isModalOpen,
    nextQuestion,
    checkAnswer
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer];
  let answers = [...incorrect_answers];
  const tempindex = Math.floor(Math.random() * 4);
  if (tempindex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempindex]);
    answers[tempindex] = correct_answer;
  }

  return (
    <main>
      {isModalOpen && <Modal />}
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => (
              <button
                key={index}
                className='answer-btn'
                dangerouslySetInnerHTML={{ __html: answer }}
                onClick={() => checkAnswer(correct_answer === answer)}
              />
            ))}
          </div>
        </article>
        <button onClick={nextQuestion} className='next-question'>
          next question
        </button>
      </section>
    </main>
  );
};

export default App;
