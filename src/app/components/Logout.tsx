"use client";

import { signIn } from "next-auth/react";
import React from "react";

const Logout = () => {
  return <button onClick={() => signIn()}>Sign in</button>;
};

export default Logout;
