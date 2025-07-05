import { createContext, useState, useContext, useEffect } from 'react';
import { achievements as achievementsData } from '@/data/achievements';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const initialUserState = {
    name: 'Alex',
    totalPoints: 1250,
    completedLessons: 2,
    streak: 5,
    level: 3,
    progress: {
      grammar: 60,
      vocabulary: 75,
      reading: 40,
      listening: 50,
      writing: 20,
      speaking: 10,
    },
    completedLessonIds: [1, 3],
    lessonHistory: [], // To track { lessonId, score, completedAt }
    achievements: ['First Steps'], // To track earned achievement names
    theme: 'light', // Add theme state: 'light' or 'dark'
  };

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('esl-user-data');
      return storedUser ? JSON.parse(storedUser) : initialUserState;
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      return initialUserState;
    }
  });

  useEffect(() => {
    localStorage.setItem('esl-user-data', JSON.stringify(user));
  }, [user]);

  const updateProgress = (skill, points) => {
    setUser(prevUser => ({
      ...prevUser,
      totalPoints: prevUser.totalPoints + points,
      progress: {
        ...prevUser.progress,
        [skill]: Math.min(100, (prevUser.progress[skill] || 0) + (points / 2)),
      },
    }));
  };

  const completeLesson = (lessonId, score) => {
    setUser(prevUser => {
      const now = new Date().toISOString();
      const newHistory = [...prevUser.lessonHistory, { lessonId, score, completedAt: now }];

      let updatedUser = {
        ...prevUser,
        lessonHistory: newHistory,
      };

      // Only increment count and add ID if it's the first time
      if (!prevUser.completedLessonIds.includes(lessonId)) {
        updatedUser.completedLessons = prevUser.completedLessons + 1;
        updatedUser.completedLessonIds = [...prevUser.completedLessonIds, lessonId];
      }

      // Check for new achievements
      const newAchievements = checkAndAwardAchievements(updatedUser);
      if (newAchievements.length > 0) {
        updatedUser.achievements = [...new Set([...updatedUser.achievements, ...newAchievements])];
        newAchievements.forEach(achName => {
          const achDetails = achievementsData.find(a => a.name === achName);
          toast.success(`Achievement Unlocked: ${achDetails.icon} ${achDetails.name}!`, { duration: 4000 });
        });
      }

      return updatedUser;
    });
  };

  const checkAndAwardAchievements = (currentUser) => {
    const earned = [];
    // Example: 'Vocabulary Builder' - Learn 100 new words (simplified to completing 5 vocab lessons)
    if (!currentUser.achievements.includes('Vocabulary Builder') && currentUser.completedLessonIds.filter(id => id === 2 || id > 5).length >= 5) {
      earned.push('Vocabulary Builder');
    }
    return earned;
  };

  const updateUserName = (newName) => {
    setUser(prevUser => ({
      ...prevUser,
      name: newName,
    }));
  };

  const resetProgress = () => {
    setUser(initialUserState);
    toast.success("Your progress has been reset.");
  };

  const value = { user, updateProgress, completeLesson, updateUserName, resetProgress };


  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};