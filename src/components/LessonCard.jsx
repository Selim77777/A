import PropTypes from "prop-types";
import { BookOpen } from "lucide-react"; // Using an icon from lucide-react

export default function LessonCard({ title, description, level }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
          <BookOpen size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {level && <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{level}</span>}
        </div>
      </div>
      <p className="text-gray-600 line-clamp-2">{description}</p>
    </div>
  );
}

LessonCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  level: PropTypes.string,
};
// c:/Users/BAHZ/ESL Pathway/A/src/components/LessonCard.jsx