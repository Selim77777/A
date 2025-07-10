import { lessons } from '@/data/lessons.js';

// Helper to shuffle arrays for randomizing questions and options
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Create a global vocabulary pool to ensure enough incorrect options
const allVocabularyWords = [
  ...new Set(lessons.flatMap(l => l.content.vocabulary || []).map(v => v.word))
];

export function generateQuizQuestions(lessonContent = {}, numQuestions = 5) {
  const questions = [];

  // 1. Use pre-defined exercises if available
  if (lessonContent.exercises) {
    questions.push(...lessonContent.exercises.map(ex => ({
      question: ex.question,
      options: shuffleArray(ex.options),
      answer: ex.answer,
    })));
  }

  // 2. Generate questions from vocabulary if available
  if (lessonContent.vocabulary) {
    const lessonVocab = lessonContent.vocabulary;
    const vocabQuestions = lessonVocab.map(vocabItem => {
      // Create a pool of incorrect options from other vocabulary words
      let incorrectOptionsPool = lessonVocab
        .filter(v => v.word !== vocabItem.word)
        .map(v => v.word);
      
      // If not enough incorrect options in the lesson, pull from the global pool
      if (incorrectOptionsPool.length < 3) {
        const globalDistractors = allVocabularyWords.filter(word => word !== vocabItem.word && !incorrectOptionsPool.includes(word));
        incorrectOptionsPool.push(...shuffleArray(globalDistractors).slice(0, 3 - incorrectOptionsPool.length));
      }
      
      const incorrectOptions = shuffleArray(incorrectOptionsPool).slice(0, 3);
      const options = shuffleArray([vocabItem.word, ...incorrectOptions]);

      return {
        question: `Which word means: "${vocabItem.meaning}"?`,
        options: options,
        answer: vocabItem.word,
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