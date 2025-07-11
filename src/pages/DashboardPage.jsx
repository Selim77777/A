import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { Award, BookOpen, BarChart3, Zap, CheckCircle, Target, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lessons } from '@/data/lessons';
import Skeleton from '@/components/skeletons/Skeleton.jsx';
import { useLoading } from '@/hooks/useLoading.js';

const DashboardPage = () => {
  const { user } = useUser();
  const loading = useLoading(800);

  if (user === null) {
    return <p>Loading...</p>;
  }

  // Get the 5 most recently completed, unique lessons
  const getRecentLessons = () => {
    if (!user?.lessonHistory || user.lessonHistory.length === 0) {
      // Fallback to completedLessonIds if history is empty
      return lessons.filter(l => user.completedLessonIds.includes(l.id)).slice(0, 5);
    }
    const recentUniqueLessonIds = [...user.lessonHistory]
      .reverse()
      .map(historyItem => historyItem.lessonId)
      .filter((id, index, self) => self.indexOf(id) === index) // Get unique IDs
      .slice(0, 5);
    return recentUniqueLessonIds.map(id => lessons.find(lesson => lesson.id === id)).filter(Boolean); // filter(Boolean) removes any undefined if a lesson is not found
  };

  const recentLessonDetails = getRecentLessons();

  const stats = [
    { icon: Award, label: 'Total Points', value: user.totalPoints, color: 'text-primary-600' },
    { icon: BookOpen, label: 'Lessons Completed', value: user.completedLessons, color: 'text-secondary-600' },
    { icon: Zap, label: 'Day Streak', value: user.streak, color: 'text-orange-500' },
    { icon: BarChart3, label: 'Current Level', value: `Level ${user.level}`, color: 'text-purple-600' },
  ];

  const skills = [
    { name: 'Grammar', progress: user.progress.grammar || 0, color: 'bg-primary-500' },
    { name: 'Vocabulary', progress: user.progress.vocabulary || 0, color: 'bg-secondary-500' },
    { name: 'Reading', progress: user.progress.reading || 0, color: 'bg-green-500' },
    { name: 'Listening', progress: user.progress.listening || 0, color: 'bg-yellow-500' },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="card p-6 flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Progress Skeleton */}
          <div className="lg:col-span-2 card p-8 space-y-5">
            <Skeleton className="h-7 w-1/4 mb-4" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <Skeleton className="h-5 w-1/5" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-2.5 w-full" />
              </div>
            ))}
          </div>

          {/* Recent Activity Skeleton */}
          <div className="card p-8 space-y-4">
            <Skeleton className="h-7 w-3/4 mb-4" />
            {Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-8 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
            <p className="text-lg text-gray-600 mt-1">Welcome back, {user.name}! Here's your progress.</p>
          </div>
          <Link to="/settings" className="btn-secondary inline-flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="card p-6 flex items-center space-x-4"
          >
            <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skill Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 card p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Target className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Skill Progress</h2>
          </div>
          <div className="space-y-5">
            {skills.map(skill => (
              <div key={skill.name} className="cursor-pointer hover:bg-gray-100 rounded-md p-2 -mx-2 transition-colors duration-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm font-semibold text-gray-600">{skill.progress}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className={`progress-fill ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">Completed Lessons</h2>
          </div>
          {recentLessonDetails.length > 0 ? (
            <ul className="space-y-4">
              {recentLessonDetails.map(lesson => (
                <li key={lesson.id} className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{lesson.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">
              You haven't completed any lessons yet.
              <Link to="/lessons" className="text-primary-600 hover:underline font-medium ml-1">Start one now!</Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;