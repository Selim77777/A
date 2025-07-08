import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const AdminRoute = () => {
  const { user } = useUser();

  // This component assumes it's used within a ProtectedRoute,
  // so we don't need to check for `user` or `emailVerified` again.
  // If it were used independently, those checks would be necessary.

  if (!user.isAdmin) {
    // If the user is not an admin, redirect them away.
    // The dashboard is a safe default.
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is an admin, render the nested admin routes.
  return <Outlet />;
};

export default AdminRoute;