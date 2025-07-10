// Helper to shuffle arrays for randomizing questions and options
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function generateQuizQuestions(lessonContent = {}, numQuestions = 5) {
  const questions = [];

  // 1. Use pre-defined exercises if available
  if (lessonContent.exercises) {
    questions.push(...lessonContent.exercises.map(ex => ({
      question: ex.question,
      options: shuffleArray(ex.options),
      correctAnswer: ex.answer,
    })));
  }

  // 2. Generate questions from vocabulary if available
  if (lessonContent.vocabulary) {
    const vocabQuestions = lessonContent.vocabulary.map(vocabItem => {
      // Create a pool of incorrect options from other vocabulary words
      const otherWords = lessonContent.vocabulary
        .filter(v => v.word !== vocabItem.word)
        .map(v => v.word);
      
      const incorrectOptions = shuffleArray(otherWords).slice(0, 3);
      const options = shuffleArray([vocabItem.word, ...incorrectOptions]);

      return {
        question: `Which word means: "${vocabItem.meaning}"?`,
        options: options,
        correctAnswer: vocabItem.word,
      };
    });
    questions.push(...vocabQuestions);
  }

  // If no questions are generated, return an empty array or a default message
  if (questions.length === 0) {
    return [];
  }

  // Shuffle all generated questions and return the requested number
  return shuffleArray(questions).slice(0, numQuestions);
}