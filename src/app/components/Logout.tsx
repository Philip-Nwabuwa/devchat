"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const Router = useRouter();
  const handleSignOut = () => {
    signOut();
    Router.push("/login");
  };

  return <button onClick={handleSignOut}>Sign out</button>;
};

export default Logout;
