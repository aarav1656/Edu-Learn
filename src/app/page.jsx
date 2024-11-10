"use client";

import { useEffect } from "react";
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

      <Introduction />
    </div>
  );
}
