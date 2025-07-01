import { motion } from 'framer-motion';
import { TrendingUp, Award, Calendar, Target, BookOpen, Clock, Star, Trophy } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Progress = () => {
  const { user, progress } = useUser();

  const skillsData = [
    { name: 'Grammar', progress: progress.grammar, color: 'bg-blue-500', icon: '📚' },
    { name: 'Vocabulary', progress: progress.vocabulary, color: 'bg-green-500', icon: '📝' },
    { name: 'Listening', progress: progress.listening, color: 'bg-purple-500', icon: '👂' },
    { name: 'Speaking', progress: progress.speaking, color: 'bg-orange-500', icon: '🗣️' },
    { name: 'Reading', progress: progress.reading, color: 'bg-red-500', icon: '📖' },
    { name: 'Writing', progress: progress.writing, color: 'bg-indigo-500', icon: '✍️' }
  ];

  const weeklyData = [
    { day: 'Mon', lessons: 2, time: 45 },
    { day: 'Tue', lessons: 1, time: 30 },
    { day: 'Wed', lessons: 3, time: 60 },
    { day: 'Thu', lessons: 2, time: 40 },
    { day: 'Fri', lessons: 1, time: 25 },
    { day: 'Sat', lessons: 0, time: 0 },
    { day: 'Sun', lessons: 2, time: 50 }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete your first lesson', earned: true, icon: '🎯' },
    { name: 'Grammar Master', description: 'Score 90%+ on 5 grammar lessons', earned: true, icon: '📚' },
    { name: 'Vocabulary Builder', description: 'Learn 100 new words', earned: true, icon: '📝' },
    { name: 'Streak Master', description: 'Maintain a 7-day streak', earned: true, icon: '🔥' },
    { name: 'Perfect Score', description: 'Get 100% on any lesson', earned: false, icon: '⭐' },
    { name: 'Speed Learner', description: 'Complete 10 lessons in one week', earned: false, icon: '⚡' }
  ];

  const getSkillLevel = (progress) => {
    if (progress >= 80) return { level: 'Advanced', color: 'text-red-600' };
    if (progress >= 60) return { level: 'Intermediate', color: 'text-yellow-600' };
    return { level: 'Beginner', color: 'text-green-600' };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Progress</h1>
        <p className="text-gray-600">Track your English learning journey and achievements</p>
      </motion.div>

      {/* Overview Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div className="card p-6 text-center">
          <div className="bg-primary-100 p-3 rounded-full w-fit mx-auto mb-3">
            <Trophy className="h-6 w-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-primary-600 mb-1">{user.totalPoints}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>

        <div className="card p-6 text-center">
          <div className="bg-secondary-100 p-3 rounded-full w-fit mx-auto mb-3">
            <BookOpen className="h-6 w-6 text-secondary-600" />
          </div>
          <div className="text-2xl font-bold text-secondary-600 mb-1">{user.completedLessons}</div>
          <div className="text-sm text-gray-600">Lessons Completed</div>
        </div>

        <div className="card p-6 text-center">
          <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-3">
            <Calendar className="h-6 w-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-600 mb-1">{user.streak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>

        <div className="card p-6 text-center">
          <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-3">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">Level {user.level}</div>
          <div className="text-sm text-gray-600">Current Level</div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Skills Progress */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Skills Breakdown</span>
          </h2>
          
          <div className="space-y-6">
            {skillsData.map((skill, index) => {
              const skillLevel = getSkillLevel(skill.progress);
              return (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <div>
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className={`ml-2 text-sm ${skillLevel.color}`}>
                          {skillLevel.level}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{skill.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                      className={`progress-fill ${skill.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>This Week's Activity</span>
          </h2>
          
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-center">
                    <span className="text-sm font-medium text-gray-600">{day.day}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-200 rounded-full h-2 w-24">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(day.lessons / 3) * 100}%` }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                          className="bg-primary-500 h-2 rounded-full"
                        />
                      </div>
                      <span className="text-sm text-gray-600">{day.lessons} lessons</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{day.time}m</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary-600">
                  {weeklyData.reduce((sum, day) => sum + day.lessons, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Lessons</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-600">
                  {weeklyData.reduce((sum, day) => sum + day.time, 0)}m
                </p>
                <p className="text-sm text-gray-600">Study Time</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Achievements</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.earned
                  ? 'border-yellow-200 bg-yellow-50 hover:shadow-md'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                  }`}>
                    {achievement.name}
                  </h3>
                  {achievement.earned && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-yellow-700">Earned</span>
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-sm ${
                achievement.earned ? 'text-yellow-700' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Learning Goals */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Learning Goals</span>
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-blue-900">Complete 20 lessons this month</p>
                <p className="text-sm text-blue-700">Progress: {user.completedLessons}/20</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((user.completedLessons / 20) * 100)}%
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-green-900">Reach Level 4</p>
                <p className="text-sm text-green-700">Current: Level {user.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">75%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-orange-900">Maintain 30-day streak</p>
                <p className="text-sm text-orange-700">Current: {user.streak} days</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">
                {Math.round((user.streak / 30) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Progress;