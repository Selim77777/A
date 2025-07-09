export function generateQuizQuestions(lessonContent = [], numQuestions = 5) {
  return lessonContent.slice(0, numQuestions).map((lesson, index) => ({
    question: `What did you learn in lesson ${index + 1}?`,
    options: ['A', 'B', 'C', 'D'], // Replace with real logic
    correctAnswer: 'A',
  }));
}