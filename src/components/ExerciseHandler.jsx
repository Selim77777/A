import React, { useState, useEffect } from 'react';

const ExerciseHandler = ({ exercises }) => {
  const [userAnswers, setUserAnswers] = useState({});

  const [feedback, setFeedback] = useState({}); // State to store feedback for each exercise
  const [score, setScore] = useState(null); // State to store the score
  const [showFeedback, setShowFeedback] = useState(false); // State to control feedback visibility

  const handleAnswerChange = (exerciseId, value) => {
    setUserAnswers(prevAnswers => ({

      ...prevAnswers,
      [exerciseId]: value,
    }));
    // Optionally hide feedback when the answer changes
    if (showFeedback) {
      setShowFeedback(false);
      setFeedback({}); // Clear feedback
      setScore(null); // Clear score
    }
  };

  // Placeholder for submitting answers and getting feedback
  const handleSubmitAnswers = () => {
    const newFeedback = {};
    let correctCount = 0;
    let answeredCount = 0;

    exercises.forEach(exercise => {
      const userAnswer = userAnswers[exercise.id]; // Retrieve answer by exercise ID

      // Handle comparison based on exercise type
      let isCorrect = false;
      if (exercise.type === 'multiple-choice') {
        isCorrect = userAnswer === exercise.answer;
      } else if (exercise.type === 'fill-in-the-blank') {
        // Case-insensitive and trim whitespace comparison
        isCorrect = userAnswer?.trim().toLowerCase() === exercise.answer?.trim().toLowerCase();
      }
      if (userAnswer !== undefined && userAnswer !== '') { // Check for empty string from fill-in-the-blank
        answeredCount++;
        if (userAnswer === exercise.answer) {
          newFeedback[exercise.id] = 'correct';
          correctCount++;
        } else {
          newFeedback[exercise.id] = 'incorrect';
        }
      } else {
        newFeedback[exercise.id] = 'not-answered';
      }
    });

    setFeedback(newFeedback);
    setScore(correctCount); // Set the calculated score
    setShowFeedback(true); // Show feedback after submission

    // You would typically send the score and potentially answers to your backend or context here
    console.log(`Quiz submitted! Score: ${correctCount}/${exercises.length}`);
  };

  if (!exercises || exercises.length === 0) {
    return <p>No exercises available for this lesson.</p>;
  }

  return (
    <div className="exercise-handler space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Exercises</h3>
      {exercises.map((exercise) => ( // Map by exercise.id for unique key
        <div key={exercise.id} className="exercise-item p-4 border rounded-md bg-gray-50">
          <p className="font-semibold mb-3">{exercise.question}</p>

          {exercise.type === 'multiple-choice' && (
            <div className="space-y-2">
              {exercise.options && exercise.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio" // Changed type from "radio" to "radio" - no change here
                    name={`exercise-${exercise.id}`}
                    value={option} // Use exercise option as value
                    checked={userAnswers[exercise.id] === option} // Check if user's answer matches option
                    onChange={() => handleAnswerChange(exercise.id, option)} // Pass exercise.id and option
                    disabled={showFeedback} // Disable input after submission
                    className="form-radio text-primary-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
          
          {exercise.type === 'fill-in-the-blank' && ( // Added check for fill-in-the-blank type
            <div>
              <input
                key={exercise.id} // Add a key for the input if it's conditional
                type="text"
                value={userAnswers[exercise.id] || ''} // Use userAnswers for value
                onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
                disabled={showFeedback} // Disable input after submission
                className="mt-2 p-2 border rounded w-full"
                placeholder="Your answer"
              />
            </div>
          )}

          {/* Add more exercise types as needed */}
          {!exercise.type && (
            <p>Unknown exercise type for: {exercise.question}</p>
          )}
        </div>
      ))}

      {/* Feedback Display */}
      {showFeedback && exercises.map(exercise => ( // Map through exercises to display feedback below each
        feedback[exercise.id] && (
          <div key={`feedback-${exercise.id}`} className={`feedback mt-3 text-sm font-medium ${
            feedback[exercise.id] === 'correct' ? 'text-green-700' :
            feedback[exercise.id] === 'incorrect' ? 'text-red-700' : 'text-gray-600'
          }`}>
            {feedback[exercise.id] === 'correct' && 'Correct!'}
            {feedback[exercise.id] === 'incorrect' && `Incorrect. The answer was: ${exercise.answer}`}
          </div>
      ))}

      {/* Submit Button */}
      {!showFeedback && ( // Hide button after submission
        <button
          onClick={handleSubmitAnswers}
          className="btn-primary mt-6"
          disabled={Object.keys(userAnswers).length === 0} // Disable if no answers are selected
        >
 onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Your answer"
              />
            </div>
          )}
          {/* Add more exercise types as needed */}
          Submit Answers
        </button>
      )}

      {/* Score Display */}
      {showFeedback && score !== null && (
        <div className="score-display mt-6 text-xl font-bold text-center">
          Your Score: {score}/{exercises.length}
        </div>
      )}
    </div>
  );
};

export default ExerciseHandler;