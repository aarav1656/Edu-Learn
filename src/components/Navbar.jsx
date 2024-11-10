"use client";

import React from "react";
import Link from "next/link";
import { useOCAuth } from "@opencampus/ocid-connect-js/lib/react/OCContext";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const { authState, ocAuth } = useOCAuth();
  console.log(authState);
  return (
    <nav className="flex items-center justify-between p-5">
      <div className="flex items-center gap-12">
        <Link href="/" className="text-2xl font-bold">
          EDU-LEARN
        </Link>
        <div className="flex gap-8">
          <Link href="/" className="text-gray-800">
            Home
          </Link>
          <Link href="/about" className="text-gray-800">
            About Us
          </Link>
          <Link href="/team" className="text-gray-800">
            Team
          </Link>
          <Link href="/services" className="text-gray-800">
            Services
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        {authState ? <LoginButton /> : <div>Logged In</div>}
        <Link
          href="/contact"
          className="bg-black text-white px-5 py-2 rounded hover:bg-gray-900 font-medium"
        >
          Let's Talk
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
