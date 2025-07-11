import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext
import { saveExerciseResult } from '../utils/firebaseService';

const ExerciseHandler = ({ exercises, lessonId }) => { // Added lessonId prop
  const [userAnswers, setUserAnswers] = useState({}); // State to store user's answers

  const [feedback, setFeedback] = useState({}); // State to store feedback for each exercise
  const [score, setScore] = useState(null); // State to store the score
  const [showFeedback, setShowFeedback] = useState(false); // State to control feedback visibility\n\n  const { currentUser } = useAuth(); // Get current user from AuthContext

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

      // Determine correctness based on exercise type and user answer
      let isCorrect = false;
      if (exercise.type === 'multiple-choice') {
        isCorrect = userAnswer === exercise.answer;
      } else if (exercise.type === 'fill-in-the-blank') {
        // Case-insensitive and trim whitespace comparison for fill-in-the-blank
        isCorrect = userAnswer?.trim().toLowerCase() === exercise.answer?.trim().toLowerCase();
      }

      // Provide feedback and count correct answers only if an answer was provided
      if (userAnswer !== undefined && (userAnswer !== '' || (userAnswer?.trim() !== '' && exercise.type === 'fill-in-the-blank'))) {
        answeredCount++; // Count as answered if any input is present for fill-in-the-blank
        if (isCorrect) {
          correctCount++;
        } else {
          newFeedback[exercise.id] = 'not-answered';
 newFeedback[exercise.id] = 'incorrect'; // Set to 'incorrect' if answered but wrong
      } else {
        newFeedback[exercise.id] = 'not-answered';
      }
    });

    const finalScore = correctCount;

    setFeedback(newFeedback);
    setScore(finalScore); // Set the calculated score
    setShowFeedback(true); // Show feedback after submission
  
    // Save the result to Firebase
    if (currentUser && currentUser.uid && lessonId) { // Ensure currentUser and uid exist
      const exerciseResults = { userAnswers, feedback }; // You might want to refine what you save
      saveExerciseResult(currentUser.uid, lessonId, finalScore, exerciseResults);
    }

    // You would typically send the score and potentially answers to your backend or context here
    console.log(`Quiz submitted! Score: ${correctCount}/${exercises.length}`);
  };

  if (!exercises || exercises.length === 0) {
    return <p>No exercises available for this lesson.</p>;
  }

  return (
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
          )} {/* Closing parenthesis for multiple-choice div */}
          
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
 <p className="text-red-600">Unknown exercise type for: {exercise.question}</p>
          )}
        </div>
      ))}

      {/* Feedback Display */}
      {showFeedback && exercises.map(exercise => // Map through exercises to display feedback below each
        // Only show explicit feedback if it's not 'not-answered'
        feedback[exercise.id] && feedback[exercise.id] !== 'not-answered' && ( // Only show feedback for answered questions
          <div key={`feedback-${exercise.id}`} className={`feedback mt-3 text-sm font-medium ${feedback[exercise.id] === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
            {feedback[exercise.id] === 'correct' ? 'Correct!' : `Incorrect. The answer was: ${exercise.answer}`}

          {/* Add more exercise types as needed */}

      {/* Score Display */}
      {showFeedback && score !== null && (
        <div className="score-display mt-6 text-xl font-bold text-center">
          Your Score: {score}/{exercises.length}
        </div>
      )}

      {/* Submit Button */}
      {!showFeedback && ( // Only show the submit button if feedback is not currently shown
        <button
          onClick={handleSubmitAnswers}
          className="btn-primary mt-6 w-full" // Added w-full for better mobile layout // Moved the button outside of the feedback display map
          disabled={Object.keys(userAnswers).length === 0 || Object.keys(userAnswers).length < exercises.length} // Disable if no answers or not all exercises are answered
        >
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default ExerciseHandler;