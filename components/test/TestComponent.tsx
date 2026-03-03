'use client';
import { useAuth } from '@/hooks/auth/useAuth';
import React from 'react';
import Loader from '../common/loader';

const TestComponent = () => {
   const { user, isLoading } = useAuth();

   console.log(user);
   if (isLoading) return <Loader isPending={isLoading} />;
   return <div>{user.id}</div>;
};

export default TestComponent;
