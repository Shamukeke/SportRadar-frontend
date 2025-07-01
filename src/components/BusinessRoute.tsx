import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface BusinessRouteProps {
  children: JSX.Element;
}

const BusinessRoute: React.FC<BusinessRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.type !== 'business') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default BusinessRoute;
