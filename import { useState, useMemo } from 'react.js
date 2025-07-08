import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/data/lessons';
import { useUser } from '@/context/UserContext';
import { Filter, Search } from 'lucide-react';
import LessonCard from '@/components/LessonCard.jsx';
import { db } from '@/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Lessons = () => {
  const { user } = useUser();
  const [lessons, setLessons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const lessonsCol = collection(db, 'lessons');
        const lessonSnapshot = await getDocs(lessonsCol);
        const lessonList = lessonSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setLessons(lessonList);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast.error("Failed to load lessons.");
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    return lessons
      .filter(lesson => selectedCategory === 'All' || lesson.category === selectedCategory)
      .filter(lesson => lesson.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [selectedCategory, searchTerm]);

  const isLessonCompleted = (lessonId) => {
    // In a real app, user might be null initially
    return user?.completedLessonIds?.includes(lessonId) ?? false;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading lessons...</p>
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Explore Lessons</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Choose a topic to start learning and improve your English skills.</p>
      </motion.div>

      {/* Category and Search Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row items-center gap-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <button
            onClick={() => setSelectedCategory('All')}
            className={`btn-filter ${selectedCategory === 'All' ? 'btn-filter-active' : ''}`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`btn-filter ${
                selectedCategory === category.name ? 'btn-filter-active' : ''
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-auto md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search lessons by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field rounded-full pl-10 pr-4 py-2"
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
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">No lessons found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;