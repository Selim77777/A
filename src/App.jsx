import React, { Suspense } from 'react'; // Import Suspense
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from '/src/components/RootLayout'; // Use absolute path

import ProtectedRoute from '@/components/ProtectedRoute'; // Use @ alias

// Dynamically import page components using @ alias
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage')); // Use @ alias
const LoginPage = React.lazy(() => import('@/pages/LoginPage')); // Use @ alias
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage')); // Use @ alias
const SignUpPage = React.lazy(() => import('@/pages/SignUpPage')); // Use @ alias
const AchievementsPage = React.lazy(() => import('@/pages/AchievementsPage')); // Use @ alias
const Lessons = React.lazy(() => import('@/pages/Lessons')); // Use @ alias
const LessonDetail = React.lazy(() => import('@/pages/LessonDetail')); // Use @ alias
const Progress = React.lazy(() => import('@/pages/Progress')); // Use @ alias
const Quiz = React.lazy(() => import('@/pages/Quiz')); // Use @ alias
const Settings = React.lazy(() => import('@/pages/Settings')); // Use @ alias

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Suspense fallback={<div>Loading...</div>}><NotFoundPage /></Suspense>, // Wrap NotFoundPage in Suspense for errorElement
    children: [
      // Redirect root to the dashboard
      { index: true, element: <Navigate to="/dashboard" replace /> },

      // Public routes that use the RootLayout
      {
        path: "login",
        element: <Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense>,
      },
      {
        path: "signup",
        element: <Suspense fallback={<div>Loading...</div>}><SignUpPage /></Suspense>,
      },
      {
        element: <ProtectedRoute />, // Protected routes wrapped by ProtectedRoute
        children: [
          { path: "dashboard", element: <Suspense fallback={<div>Loading...</div>}><DashboardPage /></Suspense> },
          { path: "achievements", element: <Suspense fallback={<div>Loading...</div>}><AchievementsPage /></Suspense> },
          { path: "lessons", element: <Suspense fallback={<div>Loading...</div>}><Lessons /></Suspense> },
          { path: "lessons/:lessonId", element: <Suspense fallback={<div>Loading...</div>}><LessonDetail /></Suspense> },
          { path: "progress", element: <Suspense fallback={<div>Loading...</div>}><Progress /></Suspense> },
          { path: "quiz/:lessonId", element: <Suspense fallback={<div>Loading...</div>}><Quiz /></Suspense> },
          { path: "settings", element: <Suspense fallback={<div>Loading...</div>}><Settings /></Suspense> },
        ],
      },

      // Catch-all route for 404 Not Found - place this last
      { path: "*", element: <Suspense fallback={<div>Loading...</div>}><NotFoundPage /></Suspense> },
    ],
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
// Import the functions you need from the SDKs you need
