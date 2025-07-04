import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { lessons } from '../data/lessons';
import { useUser } from '../context/UserContext';
import { Book, CheckCircle, Target, ArrowRight, List, Lightbulb, Mic, FileText } from 'lucide-react';
import Skeleton from '../components/skeletons/Skeleton';
import { useLoading } from '../hooks/useLoading';

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [lesson, setLesson] = useState(null);
  const loading = useLoading(700, [lessonId]);

  useEffect(() => {
    const foundLesson = lessons.find(l => l.id === parseInt(lessonId));
    setLesson(foundLesson);
  }, [lessonId]);

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
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="card p-8 mb-8">
          <div className="flex justify-between items-start">
            <div className="w-2/3">
              <Skeleton className="h-5 w-1/4 mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="card p-8 mb-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-5/6 mb-2" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="border-t border-gray-200 pt-8">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="text-center">
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  const isCompleted = user.completedLessonIds.includes(lesson.id);

  const renderContent = () => {
    const { content } = lesson;
    return (
      <>
        {content.rules && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center"><List className="mr-2 h-5 w-5 text-primary-600" /> Grammar Rules</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {content.rules.map((rule, index) => <li key={index}>{rule}</li>)}
            </ul>
          </div>
        )}
        {content.examples && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-yellow-500" /> Examples</h3>
            {content.examples.map((example, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
                <p><strong>Positive:</strong> {example.positive}</p>
                <p><strong>Negative:</strong> {example.negative}</p>
                <p><strong>Question:</strong> {example.question}</p>
              </div>
            ))}
          </div>
        )}
        {content.vocabulary && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center"><FileText className="mr-2 h-5 w-5 text-green-600" /> Vocabulary</h3>
            <div className="space-y-3">
              {content.vocabulary.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-bold text-gray-900">{item.word} <span className="font-normal text-gray-600">{item.pronunciation}</span></p>
                  <p className="text-gray-700">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {content.dialogues && (
           <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center"><Mic className="mr-2 h-5 w-5 text-red-500" /> Dialogue</h3>
            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
              {content.dialogues[0].conversation.map((line, index) => (
                <p key={index}><strong>{line.speaker}:</strong> {line.text}</p>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

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
              <span className={`px-3 py-1 text-xs font-semibold rounded-full mb-4 inline-block ${
                lesson.category === 'Grammar' ? 'bg-blue-100 text-blue-800' :
                lesson.category === 'Vocabulary' ? 'bg-green-100 text-green-800' :
                lesson.category === 'Reading' ? 'bg-red-100 text-red-800' :
                'bg-purple-100 text-purple-800'
              }`}>
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
            {renderContent()}
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