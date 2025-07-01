import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, Target, Play, CheckCircle, Volume2 } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useUser } from '../context/UserContext';

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completeLesson } = useUser();
  const [lesson, setLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const foundLesson = lessons.find(l => l.id === parseInt(id));
    setLesson(foundLesson);
  }, [id]);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'content', name: 'Content', icon: Target },
    { id: 'practice', name: 'Practice', icon: Play }
  ];

  const handleStartQuiz = () => {
    navigate(`/quiz/${lesson.id}`);
  };

  const playPronunciation = (word) => {
    // In a real app, this would use Web Speech API or audio files
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <Link 
          to="/lessons" 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <div className="flex items-center space-x-4 mt-2 text-gray-600">
            <span className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{lesson.duration}</span>
            </span>
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {lesson.level}
            </span>
            <span className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium">
              {lesson.category}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      {lesson.completed && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-4 bg-green-50 border-green-200"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Lesson Completed!</p>
              <p className="text-sm text-green-700">Your score: {lesson.score}%</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === 'overview' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{lesson.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Learning Objectives</h3>
                <ul className="space-y-2">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="bg-primary-100 p-1 rounded-full mt-1">
                        <Target className="h-3 w-3 text-primary-600" />
                      </div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleStartQuiz}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>{lesson.completed ? 'Retake Quiz' : 'Start Interactive Quiz'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Vocabulary Section */}
              {lesson.content.vocabulary && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Vocabulary</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {lesson.content.vocabulary.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{item.word}</h4>
                          <button 
                            onClick={() => playPronunciation(item.word)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Play pronunciation"
                          >
                            <Volume2 className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.pronunciation}</p>
                        <p className="text-gray-700">{item.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar Rules */}
              {lesson.content.rules && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Grammar Rules</h3>
                  <div className="space-y-3">
                    {lesson.content.rules.map((rule, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Examples */}
              {lesson.content.examples && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Examples</h3>
                  <div className="space-y-4">
                    {lesson.content.examples.map((example, index) => (
                      <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-green-700 mb-1">Positive</p>
                          <p className="text-gray-900">{example.positive}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-700 mb-1">Negative</p>
                          <p className="text-gray-900">{example.negative}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-700 mb-1">Question</p>
                          <p className="text-gray-900">{example.question}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dialogues */}
              {lesson.content.dialogues && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Dialogues</h3>
                  {lesson.content.dialogues.map((dialogue, index) => (
                    <div key={index} className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">{dialogue.title}</h4>
                      <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                        {dialogue.conversation.map((line, lineIndex) => (
                          <div key={lineIndex} className="flex items-start space-x-3">
                            <span className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                              {line.speaker}
                            </span>
                            <p className="text-gray-700 flex-1">{line.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'practice' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center py-12">
                <Play className="h-16 w-16 text-primary-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Practice</h3>
                <p className="text-gray-600 mb-6">
                  Test your knowledge with our interactive quiz featuring multiple question types.
                </p>
                <button 
                  onClick={handleStartQuiz}
                  className="btn-primary flex items-center space-x-2 mx-auto"
                >
                  <Play className="h-5 w-5" />
                  <span>Start Practice Quiz</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LessonDetail;