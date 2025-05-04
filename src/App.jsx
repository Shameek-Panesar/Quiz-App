import { useState, useEffect } from "react";
import Question from "./Components/Question";
import ProgressBar from "./Components/ProgressBar";
import Timer from "./Components/Timer";

const quizQuestions = [
  {
    question: "Who was the first President of the United States?",
    options: ["George Washington", "John Adams", "Thomas Jefferson", "Abraham Lincoln"],
    answer: "George Washington",
  },
  {
    question: "In which year did World War II end?",
    options: ["1940", "1945", "1939", "1950"],
    answer: "1945",
  },
  {
    question: "Which empire was ruled by Genghis Khan?",
    options: ["Roman Empire", "Mongol Empire", "Persian Empire", "Ottoman Empire"],
    answer: "Mongol Empire",
  },
  {
    question: "What was the name of the ship that brought the Pilgrims to America?",
    options: ["Mayflower", "Endeavour", "Discovery", "Santa Maria"],
    answer: "Mayflower",
  },
  {
    question: "Which wall divided Berlin from 1961 to 1989?",
    options: ["Berlin Wall", "Great Wall", "Iron Curtain", "Red Line"],
    answer: "Berlin Wall",
  },
];

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resetTimerTrigger, setResetTimerTrigger] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  const handleNext = () => {
    const isCorrect = selectedOption === questions[currentIdx].answer;
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("✅ Correct! Great job!");
    } else {
      setFeedback(`❌ Oops! The correct answer was: "${questions[currentIdx].answer}"`);
    }

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(currentIdx + 1);
        setSelectedOption(null);
        setResetTimerTrigger(prev => !prev);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const handleTimeout = () => {
    setFeedback(`⏰ Time's up! The correct answer was: "${questions[currentIdx].answer}"`);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(currentIdx + 1);
        setSelectedOption(null);
        setResetTimerTrigger(prev => !prev);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    const reshuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(reshuffled);
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setResetTimerTrigger(prev => !prev);
    setQuizStarted(false);
    setFeedback(null);
    setShowFeedback(false);
  };

  if (questions.length === 0) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">📚 History Quiz</h1>

        {!quizStarted ? (
          <div>
            <p className="mb-6 text-lg text-gray-700">
              Test your knowledge of history with this quick quiz!
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition"
            >
              Start Quiz
            </button>
          </div>
        ) : !showResult ? (
          <>
            <ProgressBar current={currentIdx + 1} total={questions.length} />
            <Timer
              duration={15}
              onTimeout={handleTimeout}
              resetTrigger={resetTimerTrigger}
            />
            <Question
              data={questions[currentIdx]}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            {showFeedback ? (
              <div className="mt-4 text-lg font-medium text-purple-700">
                {feedback}
              </div>
            ) : (
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
              >
                {currentIdx === questions.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-green-700">
              🎉 You scored {score} out of {questions.length}
            </h2>
            <button
              onClick={handleRestart}
              className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
