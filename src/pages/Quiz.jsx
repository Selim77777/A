import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import { lessons } from '../data/lessons';
import Modal from '../components/Modal';
import { useUser } from '../context/UserContext';

const Quiz = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user, updateProgress, completeLesson } = useUser();
  
  const [lesson, setLesson] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);

  const questions = useMemo(() => {
    if (!lesson) return [];

    const generateQuizQuestions = (lessonContent) => {
      const allVocabMeanings = lessons
        .flatMap(l => l.content.vocabulary || [])
        .map(v => v.meaning);

      const getDistractors = (correctAnswer, count) => {
        const distractors = new Set();
        const possibleDistractors = allVocabMeanings.filter(m => m !== correctAnswer);
        while (distractors.size < count && possibleDistractors.length > 0) {
          const randomIndex = Math.floor(Math.random() * possibleDistractors.length);
          distractors.add(possibleDistractors.splice(randomIndex, 1)[0]);
        }
        return Array.from(distractors);
      };

      const questions = [];
      
      if (lessonContent.vocabulary) {
        lessonContent.vocabulary.forEach(item => {
          const distractors = getDistractors(item.meaning, 3);
          questions.push({
            type: 'multiple-choice',
            question: `What does "${item.word}" mean?`,
            options: [item.meaning, ...distractors].sort(() => Math.random() - 0.5),
            answer: item.meaning,
            category: 'vocabulary'
          });
        });
      }

      if (lessonContent.exercises) {
        questions.push(...lessonContent.exercises);
      }

      if (lessonContent.rules) {
        questions.push({
          type: 'multiple-choice',
          question: 'Which sentence uses correct grammar?',
          options: [
            'He goes to work every day',
            'He go to work every day',
            'He going to work every day',
            'He gone to work every day'
          ],
          answer: 'He goes to work every day',
          category: 'grammar'
        });
      }

      return questions.sort(() => 0.5 - Math.random()).slice(0, 5);
    };
    return generateQuizQuestions(lesson.content);
  }, [lesson]);

  useEffect(() => {
    const foundLesson = lessons.find(l => l.id === parseInt(lessonId));
    if (foundLesson) {
      setLesson(foundLesson);
      setAnswers(new Array(questions.length).fill(null));
    }
  }, [lessonId, questions.length]);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      selected: selectedAnswer,
      correct: selectedAnswer === currentQ.answer,
      question: currentQ.question
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      // Quiz completed
      const correctAnswers = newAnswers.filter(a => a.correct).length;
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      setScore(finalScore);
      setQuizCompleted(true);
      
      // Update user progress
      updateProgress(lesson.category.toLowerCase(), finalScore > 70 ? 10 : 5);
      completeLesson(lesson.id, finalScore);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevAnswer = answers[currentQuestion - 1];
      setSelectedAnswer(prevAnswer ? prevAnswer.selected : '');
      setShowResult(false);
    }
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
    setQuizCompleted(false);
    setIsRestartModalOpen(false);
  };

  const goToLessons = () => {
    navigate('/lessons');
  };

  if (quizCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="card p-8 text-center">
          <div className="mb-6">
            {score >= 80 ? (
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            ) : score >= 60 ? (
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            )}
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
            <p className="text-xl text-gray-600">Your Score: {score}%</p>
          </div>

          <div className="mb-8">
            <div className="progress-bar mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`progress-fill ${
                  score >= 80 ? 'bg-yellow-500' : 
                  score >= 60 ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {answers.filter(a => a.correct).length}
                </p>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {answers.filter(a => !a.correct).length}
                </p>
                <p className="text-sm text-gray-600">Incorrect</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">{questions.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Review Your Answers</h3>
            {answers.map((answer, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                answer.correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start space-x-3">
                  {answer.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">
                      Question {index + 1}: {answer.question}
                    </p>
                    <p className="text-sm text-gray-600">
                      Your answer: <span className={answer.correct ? 'text-green-700' : 'text-red-700'}>
                        {answer.selected}
                      </span>
                    </p>
                    {!answer.correct && (
                      <p className="text-sm text-green-700">
                        Correct answer: {questions[index].answer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => setIsRestartModalOpen(true)}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Quiz</span>
            </button>
            <button 
              onClick={goToLessons}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <ArrowRight className="h-4 w-4" />
              <span>Continue Learning</span>
            </button>
          </div>
        </div>
        <Modal
          isOpen={isRestartModalOpen}
          onClose={() => setIsRestartModalOpen(false)}
          title="Restart Quiz?"
        >
          <p className="text-gray-600 mb-6">
            Are you sure you want to restart this quiz? Your current attempt's score will not be saved.
          </p>
          <div className="flex justify-end gap-4">
            <button onClick={() => setIsRestartModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button onClick={restartQuiz} className="btn-primary bg-red-600 hover:bg-red-700">
              Restart
            </button>
          </div>
        </Modal>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title} - Quiz</h1>
          <span className="text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="progress-bar">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="progress-fill"
          />
        </div>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="card p-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? showResult
                      ? option === currentQ.answer
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-red-500 bg-red-50 text-red-900'
                      : 'border-primary-500 bg-primary-50 text-primary-900'
                    : showResult && option === currentQ.answer
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && selectedAnswer === option && (
                    option === currentQ.answer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )
                  )}
                  {showResult && option === currentQ.answer && selectedAnswer !== option && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Result Feedback */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg mb-6 ${
                selectedAnswer === currentQ.answer
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                {selectedAnswer === currentQ.answer ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-medium ${
                  selectedAnswer === currentQ.answer ? 'text-green-900' : 'text-red-900'
                }`}>
                  {selectedAnswer === currentQ.answer ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              {selectedAnswer !== currentQ.answer && (
                <p className="text-sm text-red-700 mt-2">
                  The correct answer is: {currentQ.answer}
                </p>
              )}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center space-x-2"
              >
                <span>{currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;