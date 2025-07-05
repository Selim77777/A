import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, TrendingUp, Play, Star } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const features = [
  {
    icon: BookOpen,
    title: "Interactive Lessons",
    description: "Engaging lessons with multimedia content, quizzes, and real-world scenarios."
  },
  {
    icon: Users,
    title: "Personalized Learning",
    description: "Adaptive learning paths that adjust to your pace and learning style."
  },
  {
    icon: Award,
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed analytics and achievement badges."
  },
  {
    icon: TrendingUp,
    title: "Skill Development",
    description: "Focus on grammar, vocabulary, speaking, listening, reading, and writing."
  }
];

const testimonials = [
  {
    name: "Maria Rodriguez",
    level: "Intermediate",
    text: "This platform helped me improve my English so much! The interactive exercises are amazing.",
    rating: 5
  },
  {
    name: "Ahmed Hassan",
    level: "Beginner",
    text: "Perfect for beginners like me. The lessons are clear and easy to follow.",
    rating: 5
  },
  {
    name: "Li Wei",
    level: "Advanced",
    text: "Great for business English preparation. The professional modules are excellent.",
    rating: 5
  }
];

const Home = () => {
  const { user } = useUser();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master English with
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Interactive Learning</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Welcome back, {user?.name ?? 'learner'}! Continue your English learning journey with personalized lessons, 
            interactive exercises, and real-time progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lessons" className="btn-primary inline-flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Continue Learning</span>
            </Link>
            <Link to="/dashboard" className="btn-secondary inline-flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>View Progress</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">{user?.totalPoints ?? 0}</div>
          <div className="text-gray-600">Total Points</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-secondary-600 mb-2">{user?.completedLessons ?? 0}</div>
          <div className="text-gray-600">Lessons Completed</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{user?.streak ?? 0}</div>
          <div className="text-gray-600">Day Streak</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">Level {user?.level ?? 1}</div>
          <div className="text-gray-600">Current Level</div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ESL Master?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines proven teaching methods with modern technology to create 
            an engaging and effective learning experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="py-16 bg-white rounded-2xl shadow-lg"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <p className="text-lg text-gray-600">Join thousands of successful English learners</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 px-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.level} Level</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center py-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Continue Your Journey?</h2>
        <p className="text-xl mb-8 opacity-90">
          Take your English skills to the next level with our comprehensive lessons.
        </p>
        <Link to="/lessons" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>Start Learning Now</span>
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;