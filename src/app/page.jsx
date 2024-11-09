// page.jsx
'use client';

import { useEffect } from 'react';
import LoginButton from './components/LoginButton';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import LandingPage from './components/LandingPage';
import Introduction from './components/Introduction';

export default function Home() {
  const { authState, ocAuth } = useOCAuth();

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
    <main className="relative">
      <LandingPage 
        isAuthenticated={authState.isAuthenticated}
        LoginButton={LoginButton}
      />
      
      {/* Success message */}
      {authState.isAuthenticated && (
        <div className="fixed bottom-4 right-4 bg-green-100 p-4 rounded-lg shadow">
          <p>You are logged in!</p>
        </div>
      )}
    </main>
    <Introduction />
    </div>
  );
}