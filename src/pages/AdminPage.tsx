import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminDashboard } from '../components/AdminPanel/AdminDashboard';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AdminDashboard onReturnToPublic={() => navigate('/')} />
  );
};
