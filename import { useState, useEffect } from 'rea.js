import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '@/firebase-config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Skeleton from '@/components/skeletons/Skeleton';

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const lessonsCol = collection(db, 'lessons');
        const q = query(lessonsCol, orderBy('title'));
        const lessonSnapshot = await getDocs(q);
        const lessonList = lessonSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setLessons(lessonList);
      } catch (error) {
        console.error("Error fetching lessons for admin:", error);
        toast.error("Failed to load lessons.");
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  if (loading) {
    return (
      <div className="card p-4 space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-3">
            <Skeleton className="h-5 flex-1" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage Lessons</h1>
        <Link to="/admin/lessons/new" className="btn-primary space-x-2">
          <PlusCircle className="h-5 w-5" />
          <span>Add New Lesson</span>
        </Link>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Level</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {lessons.map(lesson => (
              <tr key={lesson.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{lesson.title}</th>
                <td className="px-6 py-4">{lesson.category}</td>
                <td className="px-6 py-4">{lesson.level}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Edit</button>
                  <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;