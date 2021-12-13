import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();

  return (
    <main>
      <section className='quiz quiz-form'>
        <form className='setup-form' onSubmit={handleSubmit}>
          {/* amount */}
          <div className='form-control'>
            <label htmlFor='amount'>number of question</label>
            <input
              type='number'
              name='amount'
              id='amount'
              value={quiz.amount}
              onChange={handleChange}
              className='form-input'
              min={1}
              max={50}
            />
          </div>
          {/* category */}
          <div className='form-control'>
            <select
              name='category'
              id='category'
              className='form-input'
              value={quiz.category}
              onChange={handleChange}
            >
              <option value='sports'>sports</option>
              <option value='history'>history</option>
              <option value='vehicles'>vehicles</option>
              <option value='politics'>politics</option>
              <option value='geography'>geography</option>
            </select>
          </div>
          {/* difficulty */}
          <div className='form-control'>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
            <button type='submit' className='submit-btn'>
              Start
            </button>
          </div>
          {error && (
            <p className='error'>
              can't generate questions, please try different options
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
