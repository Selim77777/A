import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/components/RootLayout';
import Home from '@/pages/Home';
import ProtectedRoute from '@/components/ProtectedRoute';
import Lessons from '@/pages/Lessons';
import Dashboard from '@/pages/Dashboard';
import Quiz from '@/pages/Quiz';
import Settings from '@/pages/Settings';
import Achievements from '@/pages/Achievements';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import Leaderboard from '@/pages/Leaderboard';
import VerifyEmail from '@/pages/VerifyEmail';
import ForgotPassword from '@/pages/ForgotPassword';
import Login from '@/pages/Login';
import About from '@/pages/About';
import Progress from '@/pages/Progress';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />, // Or a dedicated error page
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'verify-email', element: <VerifyEmail /> },
      { path: 'about', element: <About /> },
      { path: 'lessons', element: <Lessons /> },
      { path: 'profile/:userId', element: <Profile /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'quiz/:lessonId', element: <Quiz /> },
          { path: 'settings', element: <Settings /> },
          { path: 'achievements', element: <Achievements /> },
          { path: 'leaderboard', element: <Leaderboard /> },
          { path: 'progress', element: <Progress /> },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;