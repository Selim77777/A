import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BookOpen, CheckCircle, Play, Filter } from 'lucide-react';
import { lessons, categories } from '../data/lessons';

const Lessons = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredLessons = lessons.filter(lesson => {
    const categoryMatch = selectedCategory === 'All' || lesson.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || lesson.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const categoryData = categories.find(cat => cat.name === category);
    return categoryData ? categoryData.color : 'bg-gray-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Lessons</h1>
        <p className="text-gray-600">Choose from our comprehensive collection of ESL lessons</p>
      </motion.div>

      {/* Categories Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="card p-4 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <span className="text-2xl">{category.icon}</span>
            </div>
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.count} lessons</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filter Lessons</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level === 'All' ? 'All Levels' : level}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Lessons Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="lesson-card group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(lesson.category)}`} />
                <span className="text-sm font-medium text-gray-600">{lesson.category}</span>
              </div>
              {lesson.completed && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {lesson.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{lesson.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
                {lesson.level}
              </span>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{lesson.duration}</span>
              </div>
            </div>

            {lesson.completed && lesson.score && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Your Score</span>
                  <span className="text-sm font-semibold text-green-600">{lesson.score}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill bg-green-500" 
                    style={{ width: `${lesson.score}%` }}
                  />
                </div>
              </div>
            )}

            <Link 
              to={`/lessons/${lesson.id}`}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              {lesson.completed ? (
                <>
                  <BookOpen className="h-4 w-4" />
                  <span>Review Lesson</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Start Lesson</span>
                </>
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredLessons.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more lessons.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Lessons;