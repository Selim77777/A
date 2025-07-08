import { motion } from 'framer-motion';

const Lessons = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-8"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Lessons</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-gray-600">
          Welcome to the lessons page. Here you will find a variety of interactive lessons to help you master English. Content for this section is coming soon!
        </p>
      </div>
    </motion.div>
  );
};

export default Lessons;