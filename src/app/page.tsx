"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const page = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <h1>Hi {session.user?.name}</h1>
        <p>Here's your email: {session?.user?.email}</p>
        wish to countinue? <Link href="/dashboard">Dashboard</Link>
      </div>
    );
  }
  return <div>page</div>;
};

export default page;
