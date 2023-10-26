"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

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
      <div className="mt-6">
        <h2>Login with email and password</h2>
        <form>
          <input type="text" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Login</button>

          <div className="bg-red-400 mt-3">error </div>
        </form>
        <div>
          don't have an account yet?{" "}
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
