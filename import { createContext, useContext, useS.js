import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { achievements as achievementsData } from '@/data/achievements';
import toast from 'react-hot-toast';
import { auth, db } from '@/firebase-config';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, sendEmailVerification, EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// This is a mock user for demonstration purposes.
const initialUser = {
  name: 'New User',
  totalPoints: 0,
  completedLessons: 0,
  streak: 5,
  level: 3,
  completedLessonIds: ['l1', 'l2'],
  lessonHistory: [], // To track { lessonId, score, completedAt }
  achievements: ['First Steps'], // To track earned achievement names
  progress: {
    grammar: 75,
    vocabulary: 60,
    conversation: 80,
    'business english': 40,
  },
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // To handle initial auth state check
  const [theme, setTheme] = useState(() => localStorage.getItem('esl-theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const handleUser = async (fbUser) => {
        if (fbUser) {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUser({ uid: fbUser.uid, emailVerified: fbUser.emailVerified, isAdmin: userDoc.data().isAdmin || false, ...userDoc.data() });
          } else {
            // This case might happen if a user is created in auth but not in db.
            // We can create it here.
            const newUserProfile = { ...initialUser, email: fbUser.email, name: fbUser.displayName || 'New User' };
            await setDoc(userDocRef, newUserProfile);
            setUser({ uid: fbUser.uid, emailVerified: fbUser.emailVerified, isAdmin: false, ...newUserProfile });
          }
        } else {
          setUser(null);
        }
        setLoadingUser(false);
      };
      handleUser(firebaseUser);
    })

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('esl-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateProgress = async (skill, points) => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const newTotalPoints = user.totalPoints + points;
      const newSkillProgress = Math.min(100, (user.progress[skill] || 0) + (points / 2));
      
      const updates = {
        totalPoints: newTotalPoints,
        [`progress.${skill}`]: newSkillProgress
      };

      await updateDoc(userDocRef, updates);

      setUser(prevUser => ({
        ...prevUser,
        totalPoints: newTotalPoints,
        progress: { ...prevUser.progress, [skill]: newSkillProgress },
      }));
    }
  };

  const deleteAccount = async (currentPassword) => {
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // If re-authentication is successful, delete data and user
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      // Re-authenticate the user to ensure they know their current password
      await reauthenticateWithCredential(user, credential);
      // If re-authentication is successful, update the password
      await updatePassword(user, newPassword);
    } else {
      throw new Error("No user is currently signed in.");
    }
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    } else {
      throw new Error("No user is currently signed in.");
    }
  };

  const sendPasswordReset = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const newUserProfile = { ...initialUser, name: user.displayName || 'New User', email: user.email };
        await setDoc(userDocRef, newUserProfile);
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.");
      console.error("Google sign-in error:", error);
    }
  };

  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    toast.success("Verification email sent! Please check your inbox.");
    const newUserProfile = {
      ...initialUser,
      name: name || 'New User',
      email: email,
    };
    await setDoc(doc(db, 'users', userCredential.user.uid), newUserProfile);
    return userCredential;
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/dashboard');
  };

  const logout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const updateUserName = async (newName) => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { name: newName });
      const updatedUser = { ...user, name: newName };
      setUser(updatedUser);
    }
  };

  const resetProgress = async () => {
    const userDocRef = doc(db, 'users', user.uid);
    const newProgress = { ...initialUser, name: user.name, email: user.email };
    await setDoc(userDocRef, newProgress);
    setUser({ uid: user.uid, ...newProgress });
  };

  const checkAndAwardAchievements = (currentUser) => {
    const newlyEarned = [];
    achievementsData.forEach(achievement => {
      if (!currentUser.achievements.includes(achievement.name) && achievement.criteria(currentUser)) {
        newlyEarned.push(achievement.name);
      }
    });
    return newlyEarned;
  };

  const completeLesson = async (lessonId, score) => {
    setUser(prevUser => {
      const now = new Date().toISOString();
      const newHistory = [...prevUser.lessonHistory, { lessonId, score, completedAt: now }];
      const newCompletedIds = [...new Set([...prevUser.completedLessonIds, lessonId])];

      let updatedUser = {
        ...prevUser,
        lessonHistory: newHistory,
        completedLessonIds: newCompletedIds,
        completedLessons: newCompletedIds.length,
      };

      const newAchievements = checkAndAwardAchievements(updatedUser);
      if (newAchievements.length > 0) {
        updatedUser.achievements = [...new Set([...updatedUser.achievements, ...newAchievements])];
        newAchievements.forEach(achName => {
          const achDetails = achievementsData.find(a => a.name === achName);
          toast.success(`Achievement Unlocked: ${achDetails.icon} ${achDetails.name}!`, { duration: 4000 });
        });
      }

      // Asynchronously update Firestore without blocking UI
      const userDocRef = doc(db, 'users', updatedUser.uid);
      updateDoc(userDocRef, updatedUser).catch(console.error);

      return updatedUser;
    });
  };

  const value = { user, loadingUser, theme, toggleTheme, signup, login, logout, updateUserName, resetProgress, completeLesson, signInWithGoogle, sendPasswordReset, sendVerificationEmail, changePassword, deleteAccount, updateProgress };

  return <UserContext.Provider value={value}>{!loadingUser && children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};