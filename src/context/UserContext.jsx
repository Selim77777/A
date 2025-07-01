import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Sarah Johnson',
    level: 3,
    totalPoints: 1250,
    completedLessons: 15,
    streak: 7,
    achievements: ['First Steps', 'Grammar Master', 'Vocabulary Builder']
  });

  const [progress, setProgress] = useState({
    grammar: 75,
    vocabulary: 60,
    listening: 45,
    speaking: 30,
    reading: 80,
    writing: 55
  });

  const updateProgress = (skill, points) => {
    setProgress(prev => ({
      ...prev,
      [skill]: Math.min(100, prev[skill] + points)
    }));
    
    setUser(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points
    }));
  };

  const completeLesson = (lessonId) => {
    setUser(prev => ({
      ...prev,
      completedLessons: prev.completedLessons + 1,
      totalPoints: prev.totalPoints + 50
    }));
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      progress,
      updateProgress,
      completeLesson
    }}>
      {children}
    </UserContext.Provider>
  );
};