"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setError("Invalid credentials");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button>Login</button>

          {error && <div className="text-red-500">{error}</div>}
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
