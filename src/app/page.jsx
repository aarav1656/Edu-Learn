'use client';

import { useEffect } from 'react';
import LoginButton from './components/LoginButton';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import LandingPage from './components/LandingPage';

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

  const handleSignIn = () => {
    // Assuming LoginButton component handles the actual login
    // You might need to adjust this based on your LoginButton implementation
    const loginButton = document.createElement('div');
    loginButton.style.display = 'none';
    document.body.appendChild(loginButton);
    
    // Render LoginButton into the hidden div to trigger the login flow
    const cleanup = ReactDOM.render(<LoginButton />, loginButton);
    
    // Cleanup after login attempt
    setTimeout(() => {
      document.body.removeChild(loginButton);
      if (cleanup) cleanup();
    }, 100);
  };

  return (
    <main>
      <LandingPage 
        isAuthenticated={authState.isAuthenticated}
        onSignInClick={handleSignIn}
      />
      
      {/* You can keep this for debugging or remove it */}
      {authState.isAuthenticated && (
        <div className="fixed bottom-4 right-4 bg-green-100 p-4 rounded-lg shadow">
          <p>You are logged in!</p>
        </div>
      )}
    </main>
  );
}