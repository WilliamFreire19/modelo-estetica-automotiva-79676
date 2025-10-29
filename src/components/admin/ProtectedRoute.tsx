import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    // roles?: string[]; // Optional: if you have role-based access
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (/*{ roles }*/) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        // You can return a loading spinner here if you prefer
        return <div>Loading authentication status...</div>;
    }

    if (!isAuthenticated) {
        // Redirect them to the /admin/login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the admin dashboard page.
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // Optional: Role-based access control
    // if (roles && !roles.some(role => user.roles.includes(role))) {
    //     return <Navigate to="/admin/unauthorized" replace />;
    // }

    return <Outlet />; // Render the child route components
};

export default ProtectedRoute;
