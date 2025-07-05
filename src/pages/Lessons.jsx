import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { lessons, categories } from '@/data/lessons';
import { useUser } from '@/context/UserContext';
import { Filter, Search } from 'lucide-react';
import { useLoading } from '@/hooks/useLoading.js';
import LessonCard from '@/components/LessonCard.jsx';

const Lessons = () => {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const loading = useLoading(1000);

  const filteredLessons = useMemo(() => {
    return lessons
      .filter(lesson => selectedCategory === 'All' || lesson.category === selectedCategory)
      .filter(lesson => lesson.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [lessons, selectedCategory, searchTerm]);

  const isLessonCompleted = (lessonId) => {
    return user.completedLessonIds.includes(lessonId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Explore Lessons</h1>
        <p className="text-lg text-gray-600 mt-1">Choose a topic to start learning and improve your English skills.</p>
      </motion.div>

      {/* Category and Search Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row items-center gap-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-auto md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search lessons by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </motion.div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={isLessonCompleted(lesson.id)}
              index={index}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-xl font-semibold text-gray-800">No lessons found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;