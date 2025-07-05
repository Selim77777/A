import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { lessons } from '@/data/lessons';
import { useUser } from '@/context/UserContext';
import { Book, CheckCircle, Target, ArrowRight } from 'lucide-react';
import { useLoading } from '@/hooks/useLoading.js';
import LessonContent from '@/components/LessonContent.jsx';

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const lesson = useMemo(() => lessons.find(l => l.id === parseInt(lessonId)), [lessonId]);
  const loading = useLoading(700, [lessonId]);

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800">Lesson not found</h2>
        <p className="text-gray-600 mt-2">Sorry, we couldn't find the lesson you're looking for.</p>
        <Link to="/lessons" className="btn-primary mt-6">
          Back to Lessons
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson details...</p>
        </div>
      </div>
    );
  }

  const isCompleted = user.completedLessonIds.includes(lesson.id);

  const categoryStyles = {
    Grammar: 'bg-blue-100 text-blue-800',
    Vocabulary: 'bg-green-100 text-green-800',
    Reading: 'bg-red-100 text-red-800',
    Listening: 'bg-purple-100 text-purple-800',
  };

  const categoryStyle = categoryStyles[lesson.category] || categoryStyles.Listening;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="card p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full mb-4 inline-block ${categoryStyle}`}>
                {lesson.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-lg text-gray-600 mt-2">{lesson.description}</p>
            </div>
            {isCompleted && (
              <div className="flex-shrink-0 ml-6 flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Completed</span>
              </div>
            )}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Level</p>
              <p className="font-semibold text-gray-800">{lesson.level}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold text-gray-800">{lesson.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold text-gray-800">{lesson.category}</p>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="card p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><Target className="mr-3 h-6 w-6 text-secondary-600" /> Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {lesson.objectives.map((obj, index) => <li key={index}>{obj}</li>)}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><Book className="mr-3 h-6 w-6 text-primary-600" /> Lesson Material</h2>
            <LessonContent content={lesson.content} />
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => navigate(`/quiz/${lesson.id}`)}
            className="btn-primary btn-lg inline-flex items-center space-x-2"
          >
            <span>{isCompleted ? 'Retake Quiz' : 'Start Quiz'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LessonDetail;