import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { lessons, categories } from '../data/lessons';
import { useUser } from '../context/UserContext';
import { CheckCircle, Filter, Search } from 'lucide-react';
import Skeleton from '../components/skeletons/Skeleton';
import { useLoading } from '../hooks/useLoading';

const Lessons = () => {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const loading = useLoading(1000);

  const filteredLessons = lessons
    .filter(lesson => selectedCategory === 'All' || lesson.category === selectedCategory)
    .filter(lesson => lesson.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const isLessonCompleted = (lessonId) => {
    return user.completedLessonIds.includes(lessonId);
  };

  const LessonSkeleton = () => (
    <div className="card h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="p-6 bg-gray-50 rounded-b-xl border-t border-gray-200 flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => <LessonSkeleton key={index} />)}
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
          filteredLessons.map((lesson, index) => {
            const completed = isLessonCompleted(lesson.id);
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Link to={`/lesson/${lesson.id}`} className="card-link-wrapper">
                  <div className="card h-full flex flex-col">
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          lesson.category === 'Grammar' ? 'bg-blue-100 text-blue-800' :
                          lesson.category === 'Vocabulary' ? 'bg-green-100 text-green-800' :
                          lesson.category === 'Reading' ? 'bg-red-100 text-red-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {lesson.category}
                        </span>
                        {completed && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Completed</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-b-xl border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                      <span>{lesson.level}</span>
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
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