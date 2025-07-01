import { motion } from 'framer-motion';
import { TrendingUp, Award, Calendar, Target, BookOpen, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { user, progress } = useUser();

  const skillsData = [
    { name: 'Grammar', progress: progress.grammar, color: 'bg-blue-500' },
    { name: 'Vocabulary', progress: progress.vocabulary, color: 'bg-green-500' },
    { name: 'Listening', progress: progress.listening, color: 'bg-purple-500' },
    { name: 'Speaking', progress: progress.speaking, color: 'bg-orange-500' },
    { name: 'Reading', progress: progress.reading, color: 'bg-red-500' },
    { name: 'Writing', progress: progress.writing, color: 'bg-indigo-500' }
  ];

  const recentActivity = [
    { lesson: 'Basic Greetings & Introductions', score: 95, date: '2 hours ago', type: 'completed' },
    { lesson: 'Present Simple Tense', score: 88, date: '1 day ago', type: 'completed' },
    { lesson: 'Food & Restaurant Vocabulary', score: null, date: '3 days ago', type: 'started' }
  ];

  const weeklyGoals = [
    { goal: 'Complete 5 lessons', current: 3, target: 5, icon: BookOpen },
    { goal: 'Study 10 hours', current: 7, target: 10, icon: Clock },
    { goal: 'Maintain 7-day streak', current: 7, target: 7, icon: Calendar }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Here's your learning progress overview</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-primary-600">{user.totalPoints}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Level</p>
              <p className="text-2xl font-bold text-secondary-600">Level {user.level}</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lessons Completed</p>
              <p className="text-2xl font-bold text-purple-600">{user.completedLessons}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600">{user.streak} days</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills Progress</h2>
          <div className="space-y-4">
            {skillsData.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.progress}%</span>
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
            ))}
          </div>
        </motion.div>

        {/* Weekly Goals */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Goals</h2>
          <div className="space-y-4">
            {weeklyGoals.map((goal, index) => {
              const Icon = goal.icon;
              const percentage = (goal.current / goal.target) * 100;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{goal.goal}</span>
                      <span className="text-sm text-gray-500">{goal.current}/{goal.target}</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                        className="progress-fill"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900">{activity.lesson}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.score && (
                  <p className="font-semibold text-green-600">{activity.score}%</p>
                )}
                <p className="text-sm text-gray-500 capitalize">{activity.type}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-full">
                <Award className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium text-gray-900">{achievement}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;