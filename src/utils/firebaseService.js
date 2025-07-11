import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { app } from '../firebase'; // Assuming 'app' is exported from your firebase config

const db = getFirestore(app);

/**
 * Saves the exercise result for a user for a specific lesson to Firestore.
 * @param {string} userId - The ID of the user.
 * @param {string} lessonId - The ID of the lesson.
 * @param {number} score - The score obtained in the exercise.
 * @param {object} exerciseResults - An object containing detailed results per exercise.
 * @returns {Promise<void>} A promise that resolves when the data is successfully saved.
 */
export const saveExerciseResult = async (userId, lessonId, score, exerciseResults) => {
  if (!userId || !lessonId) {
    console.error("Cannot save exercise result: userId or lessonId is missing.");
    return;
  }

  const progressRef = doc(db, 'users', userId, 'progress', lessonId);

  try {
    await setDoc(progressRef, {
      score: score,
      completedAt: new Date(), // Record completion timestamp
      exerciseResults: exerciseResults // Save detailed results
      // Add other relevant data like total exercises, etc.
    }, { merge: true }); // Use merge: true to avoid overwriting other fields in the document

    console.log(`Exercise result saved for user ${userId}, lesson ${lessonId}`);
  } catch (error) {
    console.error("Error saving exercise result:", error);
    // Depending on your needs, you might want to re-throw the error or handle it differently
  }
};