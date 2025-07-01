import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Globe, Heart, Star, Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "Structured lessons covering grammar, vocabulary, speaking, listening, reading, and writing skills."
    },
    {
      icon: Users,
      title: "Personalized Learning",
      description: "Adaptive learning paths that adjust to your pace, learning style, and proficiency level."
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Detailed analytics, achievement badges, and progress reports to keep you motivated."
    },
    {
      icon: Globe,
      title: "Real-World Application",
      description: "Practical scenarios and authentic materials to prepare you for real-life English usage."
    }
  ];

  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Business Professional",
      text: "This platform transformed my English skills. The interactive lessons and personalized feedback helped me advance in my career.",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Ahmed Hassan",
      role: "University Student",
      text: "Perfect for academic English preparation. The structured approach and comprehensive content are exactly what I needed.",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Li Wei",
      role: "International Professional",
      text: "The business English modules are outstanding. I feel much more confident in professional communications now.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "500+", label: "Interactive Lessons" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Countries Served" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">ESL Master</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Empowering English language learners worldwide with innovative, interactive, and personalized learning experiences. 
            Our mission is to make English learning accessible, engaging, and effective for everyone.
          </p>
          <div className="flex items-center justify-center space-x-2 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
            <span className="ml-2 text-gray-600 font-medium">Trusted by thousands of learners</span>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-12 text-center bg-gradient-to-r from-primary-50 to-secondary-50"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that language learning should be an enjoyable and rewarding journey. Our platform combines 
            cutting-edge technology with proven pedagogical methods to create an immersive learning environment 
            that adapts to each student's unique needs and learning style. We're committed to breaking down language 
            barriers and opening doors to new opportunities for our learners worldwide.
          </p>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="py-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our innovative approach to ESL education combines the best of traditional teaching methods 
            with modern technology to deliver exceptional learning outcomes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Educator Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card p-12"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Your ESL Educator</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              With over 10 years of experience in ESL education, I've helped thousands of students achieve 
              their English language goals. My passion for teaching and commitment to student success drives 
              every aspect of this platform.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-primary-600" />
                </div>
                <span className="text-gray-700">Certified TESOL/TEFL Instructor</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-secondary-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-secondary-600" />
                </div>
                <span className="text-gray-700">Master's in Applied Linguistics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700">10+ Years Teaching Experience</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                alt="ESL Educator"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
            <p className="text-gray-600 mb-4">Lead ESL Instructor & Platform Creator</p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-500">
                <Mail className="h-4 w-4" />
                <span className="text-sm">sarah@eslmaster.com</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="py-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
          <p className="text-lg text-gray-600">Hear from our students about their learning journey</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="card p-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your English Journey?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of successful English learners and take your language skills to the next level.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Start Learning Today
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200">
            Contact Us
          </button>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>support@eslmaster.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Available Worldwide</span>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;