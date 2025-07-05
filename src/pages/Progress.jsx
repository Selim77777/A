import { motion } from 'framer-motion';
import { TrendingUp, Award, Calendar, Target, BookOpen, Clock, Star, Trophy, CheckSquare } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { achievements as allAchievements } from '@/data/achievements';
import { lessons } from '@/data/lessons';
import { Link } from 'react-router-dom';

const Progress = () => {
  const { user } = useUser();

  const skillsData = [
    { name: 'Grammar', progress: user.progress.grammar, color: 'bg-blue-500', icon: '📚' },
    { name: 'Vocabulary', progress: user.progress.vocabulary, color: 'bg-green-500', icon: '📝' },
    { name: 'Listening', progress: user.progress.listening, color: 'bg-purple-500', icon: '👂' },
    { name: 'Speaking', progress: user.progress.speaking, color: 'bg-orange-500', icon: '🗣️' },
    { name: 'Reading', progress: user.progress.reading, color: 'bg-red-500', icon: '📖' },
    { name: 'Writing', progress: user.progress.writing, color: 'bg-indigo-500', icon: '✍️' }
  ];

  // Calculate weekly activity from lessonHistory
  const getWeeklyActivity = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = days.map(day => ({ day, lessons: 0, time: 0 }));
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    user.lessonHistory
      .filter(item => new Date(item.completedAt) > oneWeekAgo)
      .forEach(item => {
        const dayIndex = new Date(item.completedAt).getDay();
        const lessonDetails = lessons.find(l => l.id === item.lessonId);
        const duration = lessonDetails ? parseInt(lessonDetails.duration) || 15 : 15;
        weeklyData[dayIndex].lessons += 1;
        weeklyData[dayIndex].time += duration;
      });
    
    // Rotate array to start from Monday
    const sunday = weeklyData.shift();
    weeklyData.push(sunday);
    return weeklyData;
  };

  const weeklyData = getWeeklyActivity();

  const achievements = allAchievements.map(ach => ({
    ...ach,
    earned: user.achievements.includes(ach.name),
  }));

  const getSkillLevel = (progress) => {
    if (progress >= 80) return { level: 'Advanced', color: 'text-red-600' };
    if (progress >= 60) return { level: 'Intermediate', color: 'text-yellow-600' };
    return { level: 'Beginner', color: 'text-green-600' };
  };
  
  const completedLessonDetails = lessons.filter(lesson =>
    user.completedLessonIds.includes(lesson.id)
  );

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

      <div className="grid lg:grid-cols-3 gap-8">
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
          className="card p-6 lg:col-span-2"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>This Week's Activity</span>
          </h2>
          
          <div className="space-y-4">
            {weeklyData.map((dayData, index) => (
              <div key={dayData.day} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-center">
                    <span className="text-sm font-medium text-gray-600">{dayData.day}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-200 rounded-full h-2 w-24">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (dayData.lessons / 3) * 100)}%` }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                          className="bg-primary-500 h-2 rounded-full"
                        />
                      </div>
                      <span className="text-sm text-gray-600">{dayData.lessons} lessons</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{dayData.time}m</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary-600">
                  {weeklyData.reduce((sum, dayData) => sum + dayData.lessons, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Lessons</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-600">
                  {weeklyData.reduce((sum, dayData) => sum + dayData.time, 0)}m
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

      {/* Lesson History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center"><CheckSquare className="mr-3 h-5 w-5 text-green-600" />Lesson History</h2>
        {completedLessonDetails.length > 0 ? (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {completedLessonDetails.slice().reverse().map(lesson => (
                <li key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">{lesson.title}</p>
                    <p className="text-sm text-gray-500">{lesson.category} &middot; {lesson.level}</p>
                  </div>
                  <Link to={`/lesson/${lesson.id}`} className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                    Review
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">No lessons completed yet.</p>
          )}
      </motion.div>
    </div>
  );
};

export default Progress;