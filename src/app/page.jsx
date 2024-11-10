"use client";

import { useEffect } from "react";
import LoginButton from "../components/LoginButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import LandingPage from "../components/LandingPage";
import Introduction from "../components/Introduction";

export default function Home() {
  const { authState, ocAuth } = useOCAuth();

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  // Add a loading state
  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LandingPage />
      {authState.isAuthenticated ? <p>You are logged in!</p> : <LoginButton />}
      <Introduction />
    </div>
  );
}
