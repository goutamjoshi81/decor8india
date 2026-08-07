import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientDashboard } from '../components/ClientPortal/ClientDashboard';

export const ClientPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ClientDashboard onReturnToPublic={() => navigate('/')} />
  );
};
