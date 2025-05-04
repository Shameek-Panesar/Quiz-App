import React from 'react'

const Result = ({ score, total, onRestart }) => {
  return (
    <>
      <div className="text-center p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-lg mb-4">You scored {score} out of {total}</p>
      <button
        onClick={onRestart}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Restart Quiz
      </button>
    </div>
    </>
  )
}

export default Result
