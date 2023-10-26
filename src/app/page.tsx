"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session?.user);

  return (
    <section>
      {status === "authenticated" ? (
        <div>
          <Image
            src={session.user?.image!}
            alt="user profile image"
            width={100}
            height={100}
          />
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </section>
  );
}
