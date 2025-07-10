import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import RootLayout from "./components/RootLayout";
// Import existing pages with correct names and relative paths
import DashboardPage from './pages/DashboardPage';

import LoginPage from "./pages/LoginPage";
import NotFoundPage from './pages/NotFoundPage';

// Import the new SignUp page
import SignUpPage from "./pages/SignUpPage";
import AchievementsPage from "./pages/AchievementsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // Redirect root to the dashboard
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      {
        // Wrap all protected routes
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "achievements", element: <AchievementsPage /> },
          // You can add other protected pages like 'lessons', 'quiz', etc. here
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;