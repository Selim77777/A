import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Frown, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        <Frown className="h-24 w-24 text-primary-400 mx-auto mb-6" />
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-lg text-gray-500 mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="btn-primary btn-lg inline-flex items-center space-x-2"
        >
          <Home className="h-5 w-5" />
          <span>Go Back Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;